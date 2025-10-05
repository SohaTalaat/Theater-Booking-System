<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ShowResource;
use Illuminate\Http\Request;
use App\Models\Show;

class ShowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Show::with('theater')->get();
    }


    public function byTheater($theaterId)
    {
        return ShowResource::collection(Show::where('theater_id', $theaterId)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'theater_id' => 'required|exists:theaters,id',
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'show_time' => 'required|date',
            'duration' => 'required|integer|min:0',
        ]);

        return new ShowResource(Show::create($validated));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new ShowResource(
            Show::with('theater', 'bookings')->findOrFail($id)
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $show = Show::findOrFail($id);

        $validated = $request->validate([
            'theater_id' => 'sometimes|exists:theaters,id',
            'title' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'show_time' => 'sometimes|date',
            'duration' => 'sometimes|integer|min:0',
        ]);

        $show->update($validated);
        return new ShowResource($show);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Show::findOrFail($id)->delete();
        return response()->json(['message' => 'Show deleted successfully']);
    }
}
