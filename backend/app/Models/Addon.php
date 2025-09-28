<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Addon extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price'
    ];

    public function bookings()
    {
        return $this->belongsToMany(Booking::class, 'booking_addon')
            ->withPivot('quantity', 'total_price')
            ->withTimestamps();
    }
}
