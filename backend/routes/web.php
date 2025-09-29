<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__ . '/auth.php';
