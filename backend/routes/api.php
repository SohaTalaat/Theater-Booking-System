<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TheaterController;
use App\Http\Controllers\Api\ShowController;
use App\Http\Controllers\Api\SeatController;
use App\Http\Controllers\Api\AddonController;
use App\Http\Controllers\Api\BookingController;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
//routes of theater
Route::get('/theaters',[TheaterController::class,'index']);
Route::get('/theaters/{id}',[TheaterController::class,'show']);

// routes of Shows
Route::get('/theaters/{id}/shows',[ShowController::class,'byTheater']);
Route::get('/shows/{id}',[ShowController::class,'show']);

// routes of seats 

Route::get('/shows/{id}/seats',[SeatController::class,'byShow']);

// routes of addons

Route::get('/addons',[AddonController::class,'index']);

//routes of booking

Route::get('/bookings',[BookingController::class,'index']); //list all bookings

Route::post('/bookings',[BookingController::class,'store']);//create booking

Route::get('/bookings/{id}',[BookingController::class,'show']); // booking details

Route::delete('/bookings/{id}',[BookingController::class,'destroy']);// delete booking

