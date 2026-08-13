<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController; 

Route::get('/', function () {
    return view('welcome');
});

Route::get('/teste-controller', [ProductController::class, 'store']);