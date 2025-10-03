<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;

class BookingController extends Controller
{
    public function index()
    {
        return BookingResource::collection(
            Booking::with(['show', 'seats', 'addons'])->get()
        );
    }

    public function store(BookingRequest $request)
    {
        $booking = Booking::create([
            'user_id'    => 1,
            'show_id'    => $request->show_id,
            'status'     => 'confirmed',
            'total_cost' => $request->total_cost,
        ]);

        if ($request->seats) {
            $booking->seats()->attach($request->seats);
        }

        if ($request->addons) {
            foreach ($request->addons as $addon) {
                $booking->addons()->attach($addon['id'], [
                    'quantity'    => $addon['quantity'],
                    'total_price' => $addon['total_price'],
                ]);
            }
        }

        return new BookingResource($booking->load(['show', 'seats', 'addons']));
    }

    public function show(string $id)
    {
        return new BookingResource(
            Booking::with(['show', 'seats', 'addons'])->findOrFail($id)
        );
    }

    public function destroy(string $id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();

        return response()->json([
            'success' => true,
            'message' => 'Booking cancelled successfully'
        ]);
    }
}
