<?php

use Illuminate\Support\Facades\Route;
use App\Models\Product; 

//
Route::get('/', function () {
    return view('welcome');
});

Route::get('/teste-banco', function () {
    
    // teste do primeiro produto
    $produto = Product::create([
        'name' => 'Mouse Sem Fio Ergonômico',
        'category' => 'Periféricos',
        'base_description' => 'Mouse vertical ergonômico com clique silencioso e conexão Bluetooth.'
    ]);

    // Resposta em JSON
    return response()->json([
        'mensagem' => 'Sucesso! O produto foi salvo no Banco de Dados.',
        'dados' => $produto
    ]);
});