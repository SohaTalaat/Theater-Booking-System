<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\SeatResource;
use App\Http\Controllers\Controller;
use App\Http\Requests\SeatStoreRequest;
use App\Http\Requests\SeatUpdateRequest;
use App\Models\Seat;

class SeatController extends Controller
{
    public function byTheater($theaterId)
    {
        return SeatResource::collection(
            Seat::where('theater_id', $theaterId)->get()
        );
    }

    public function show($id)
    {
        return new SeatResource(Seat::findOrFail($id));
    }

    public function store(SeatStoreRequest $request)
    {
        $seat = Seat::create([
            'seat_number' => $request->seat_number,
            'theater_id'  => $request->theater_id,
            'status'      => 'available',
        ]);

        return new SeatResource($seat);
    }

    public function update(SeatUpdateRequest $request, $id)
    {
        $seat = Seat::findOrFail($id);
        $seat->update($request->only('status'));

        return new SeatResource($seat);
    }

    public function destroy($id)
    {
        $seat = Seat::findOrFail($id);
        $seat->delete();

        return response()->json(['message' => 'Seat deleted successfully']);
    }
}
