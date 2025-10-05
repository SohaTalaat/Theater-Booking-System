<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\AddonResource;
use App\Models\Addon;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AddonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AddonResource::collection(Addon::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        return new AddonResource(Addon::create($validated));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $addon = Addon::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
        ]);

        $addon->update($validated);
        return new AddonResource($addon);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Addon::findOrFail($id)->delete();
        return response()->json(['message' => 'Addon deleted successfully']);
    }
}
