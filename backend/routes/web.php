<?php

use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\Api\AuthController;


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// Route::post('/register', [AuthController::class, 'register']);
// Route::post('/login', [AuthController::class, 'login']);
// Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


require __DIR__ . '/auth.php';
