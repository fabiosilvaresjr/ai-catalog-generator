<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

// GET: listar produtos (Dashboard)
Route::get('/products', [ProductController::class, 'index']);

// POST: Front-end -> back
Route::post('/products', [ProductController::class, 'store']);

// DELETE produto
Route::delete('/products/{id}', [ProductController::class, 'destroy']);