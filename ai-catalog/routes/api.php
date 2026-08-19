<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MarketingCopyController;

// ==========================================
// ROTAS DE PRODUTOS 
// ==========================================

Route::get('/products', [ProductController::class, 'index']);

Route::post('/products', [ProductController::class, 'store']);

Route::put('/products/{id}', [ProductController::class, 'update']);

Route::delete('/products/{id}', [ProductController::class, 'destroy']);


// ==========================================
// ROTAS DE MARKETING
// ==========================================

Route::post('/marketing-copys', [MarketingCopyController::class, 'store']);

Route::put('/marketing-copys/{id}', [MarketingCopyController::class, 'update']);

Route::delete('/marketing-copys/{id}', [MarketingCopyController::class, 'destroy']);