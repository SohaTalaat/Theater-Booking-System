<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Booking extends Model
{

    use HasFactory;

    protected $fillable = [
        'status',
        'total_cost',
        'user_id',
        'show_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function show()
    {
        return $this->belongsTo(Show::class);
    }

    public function seats()
    {
        return $this->belongsToMany(Seat::class, 'booking_seat')
            ->withTimestamps();
    }

    public function addons()
    {
        return $this->belongsToMany(Addon::class, 'booking_addon')
            ->withPivot('quantity', 'total_price')
            ->withTimestamps();
    }
}
