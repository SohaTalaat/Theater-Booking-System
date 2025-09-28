<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Show extends Model
{
    use HasFactory;

    protected $fillable = [
        'theater_id',
        'title',
        'price',
        'show_time',
        'duration'
    ];

    public function theater()
    {
        return $this->belongsTo(Theater::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
