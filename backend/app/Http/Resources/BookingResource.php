<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'status'      => $this->status,
            'total_cost'  => $this->total_cost,
            'user_id'     => $this->user_id,
            'show'        => new ShowResource($this->whenLoaded('show')),
            'seats'       => SeatResource::collection($this->whenLoaded('seats')),
            'addons'      => $this->whenLoaded('addons', function () {
                return $this->addons->map(function ($addon) {
                    return [
                        'id'          => $addon->id,
                        'name'        => $addon->name,
                        'price'       => $addon->price,
                        'pivot'       => [
                            'quantity'    => $addon->pivot->quantity,
                            'total_price' => $addon->pivot->total_price,
                        ]
                    ];
                });
            }),
            'created_at'  => $this->created_at,
        ];
    
    }
}
