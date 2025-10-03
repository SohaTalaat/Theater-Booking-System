<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TheaterController;
use App\Http\Controllers\Api\ShowController;
use App\Http\Controllers\Api\SeatController;
use App\Http\Controllers\Api\AddonController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;

// Protected user info
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes
Route::get('/theaters', [TheaterController::class, 'index']);
Route::get('/theaters/{id}', [TheaterController::class, 'show']);

Route::get('/shows', [ShowController::class, 'index']);
Route::get('/shows/{id}', [ShowController::class, 'show']);
Route::get('/theaters/{id}/shows', [ShowController::class, 'byTheater']);

Route::get('/theaters/{id}/seats', [SeatController::class, 'byTheater']);
Route::get('/seats/{id}', [SeatController::class, 'show']);

Route::get('/addons', [AddonController::class, 'index']);

// Booking routes (require auth)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
});

// Admin protected routes
Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    // Theaters
    Route::post('/theaters', [TheaterController::class, 'store']);
    Route::put('/theaters/{id}', [TheaterController::class, 'update']);
    Route::delete('/theaters/{id}', [TheaterController::class, 'destroy']);

    // Shows
    Route::post('/shows', [ShowController::class, 'store']);
    Route::put('/shows/{id}', [ShowController::class, 'update']);
    Route::delete('/shows/{id}', [ShowController::class, 'destroy']);

    // Seats
    Route::post('/seats', [SeatController::class, 'store']);
    Route::put('/seats/{id}', [SeatController::class, 'update']);
    Route::delete('/seats/{id}', [SeatController::class, 'destroy']);

    // Addons
    Route::post('/addons', [AddonController::class, 'store']);
    Route::put('/addons/{id}', [AddonController::class, 'update']);
    Route::delete('/addons/{id}', [AddonController::class, 'destroy']);
});

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
