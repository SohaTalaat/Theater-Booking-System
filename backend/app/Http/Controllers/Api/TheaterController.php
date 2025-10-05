<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TheaterResource;
use App\Models\Theater;
use Illuminate\Http\Request;

class TheaterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TheaterResource::collection(Theater::with(['seats', 'shows'])->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
        ]);

        return new TheaterResource(Theater::create($validated));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new TheaterResource(Theater::with(['shows', 'seats'])->findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $theater = Theater::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'location' => 'nullable|string|max:255',
        ]);

        $theater->update($validated);
        return new TheaterResource($theater);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Theater::findOrFail($id)->delete();
        return response()->json(['message' => 'Theater deleted successfully']);
    }
}
