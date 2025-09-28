<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Seat extends Model
{
    use HasFactory;

    protected $fillable = [
        'seat_number',
        'theater_id',
        'status'
    ];

    public function theater()
    {
        $this->belongsTo(Theater::class);
    }

    public function bookings()
    {
        $this->belongsToMany(Booking::class, 'booking_seat')
            ->withTimestamps();
    }
}
