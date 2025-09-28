<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Theater extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location'
    ];

    public function show()
    {
        return $this->hasMany(Show::class);
    }

    public function seats()
    {
        return $this->hasMany(Seat::class);
    }
}
