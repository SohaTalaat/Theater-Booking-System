<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TheaterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'     => $this->id,
            'name'   => $this->name,
            'location' => $this->location,
            'shows'  => ShowResource::collection($this->whenLoaded('shows')),
            'seats'  => ShowResource::collection($this->whenLoaded('seats')),
            'created_at' => $this->created_at,
        ];
    }
}
