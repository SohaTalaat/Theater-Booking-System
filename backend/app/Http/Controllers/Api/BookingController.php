<?php

namespace App\Http\Controllers\Api;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return BookingResource::collection(
            Booking::with(['show', 'seats', 'addons'])->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $booking=Booking::create([
            'user_id'    => 1, // later will be with auth .. eshta? 
            'show_id'    => $request->show_id,
            'status'     => 'confirmed',
            'total_cost' => $request->total_cost,
        ]);

        if($request->seats){
            $booking->seats()->attach($request->seats);
        }

        if($request->addons){
            foreach($request->addons as $addon){
                $booking->addons()->attach($addon['id'],
                [  'quantity'    => $addon['quantity'],
                    'total_price' => $addon['total_price'],]);
            }
        }
         return new BookingResource($booking->load(['show', 'seats', 'addons']));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new BookingResource(
            Booking::with(['show','seats','addons'])->findOrFail($id)
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
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
