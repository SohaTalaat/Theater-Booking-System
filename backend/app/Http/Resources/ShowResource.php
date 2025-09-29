<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'theater_id'=> $this->theater_id,
            'title'     => $this->title,
            'price'     => $this->price,
            'show_time' => $this->show_time,
            'duration'  => $this->duration,
            'theater'   => new TheaterResource($this->whenLoaded('theater')),
        ];
    }
}
