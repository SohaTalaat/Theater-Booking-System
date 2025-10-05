<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Seat;
use App\Models\Show;
use Illuminate\Support\Facades\Auth;


class BookingController extends Controller
{
    public function index()
    {
        return BookingResource::collection(
            Booking::where('user_id', Auth::id())->with(['show.theater', 'seats', 'addons'])->get()
        );
    }

    public function store(BookingRequest $request)
    {
        $show = Show::findOrFail($request->show_id);
        $seatCount = count($request->seats);
        $totalCost = $show->price * $seatCount;

        $booking = Booking::create([
            'user_id'    => Auth::id(),
            'show_id'    => $request->show_id,
            'status'     => 'confirmed',
            'total_cost' => $totalCost,
        ]);

        // attach seats and update their status
        if ($request->seats) {
            $booking->seats()->attach($request->seats);
            Seat::whereIn('id', $request->seats)->update(['status' => 'booked']);
        }

        // attach addons
        if ($request->addons) {
            foreach ($request->addons as $addon) {

                $addonModel = \App\Models\Addon::findOrFail($addon['id']);
                $quantity = $addon['quantity'] ?? 1;
                $addonTotal = $addonModel->price * $quantity;

                $booking->addons()->attach($addon['id'], [
                    'quantity'    => $addon['quantity'],
                    'total_price' => $addon['total_price'],
                ]);
                $totalCost += $addonTotal;
            }

            $booking->update(['total_cost' => $totalCost]);
        }

        return new BookingResource($booking->load(['show', 'seats', 'addons']));
    }

    public function show(string $id)
    {
        $booking = Booking::with(['show.theater', 'seats', 'addons'])->findOrFail($id);

        if ($booking->user_id !== Auth::id() && !Auth::user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return new BookingResource($booking);
    }

    public function destroy(string $id)
    {
        $booking = Booking::with('seats')->findOrFail($id);

        // free the seats
        $seatIds = $booking->seats->pluck('id')->toArray();
        Seat::whereIn('id', $seatIds)->update(['status' => 'available']);

        $booking->delete();

        return response()->json([
            'success' => true,
            'message' => 'Booking cancelled successfully, seats released'
        ]);
    }
}
