<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

// Rota POST para o Front-end enviar os dados para 
Route::post('/products', [ProductController::class, 'store']);