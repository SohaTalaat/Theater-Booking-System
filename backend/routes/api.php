<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TheaterController;
use App\Http\Controllers\Api\ShowController;
use App\Http\Controllers\Api\SeatController;
use App\Http\Controllers\Api\AddonController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
//routes of theater
Route::get('/theaters', [TheaterController::class, 'index']);
Route::get('/theaters/{id}', [TheaterController::class, 'show']);

// routes of Shows
Route::get('/shows', [ShowController::class, 'index']);
Route::get('/shows/{id}', [ShowController::class, 'show']);
Route::get('/theaters/{id}/shows', [ShowController::class, 'byTheater']);


// routes of seats

Route::get('/theaters/{id}/seats', [SeatController::class, 'byTheater']);

// routes of addons

Route::get('/addons', [AddonController::class, 'index']);

//routes of booking

Route::get('/bookings', [BookingController::class, 'index']); //list all bookings

Route::post('/bookings', [BookingController::class, 'store']); //create booking

Route::get('/bookings/{id}', [BookingController::class, 'show']); // booking details

Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);// delete booking

// routes of login and logout

Route::post('/register',[AuthController::class,'register']);

Route::post('/login',[AuthController::class,'login']);

Route::post('/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');

