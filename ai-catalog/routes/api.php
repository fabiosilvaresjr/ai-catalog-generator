<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

// GET para listar produtos (Dashboard)
Route::get('/products', [ProductController::class, 'index']);

// POST para o Front-end -> back
Route::post('/products', [ProductController::class, 'store']);