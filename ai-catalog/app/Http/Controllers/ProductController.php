<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Services\AiService; 

class ProductController extends Controller
{

// metodo de listagem
    public function index()
    {
        // busca do banco
        $produtos = Product::orderBy('created_at', 'desc')->get();

        return response()->json($produtos, 200);
    }

public function store(Request $request, AiService $aiService)
    {
        // Validacao dos campos recebidos do front
        $validated = $request->validate([
            'name' => 'required|string',
            'category' => 'required|string',
            'base_description' => 'required|string',
        ]);
        
        // IA com dados validados dro front
        $textoGeradoPelaIA = $aiService->gerarCatalogo(
            $validated['name'], 
            $validated['category'], 
            $validated['base_description']
        );
        
        // Salvar no banco de dados
        $produto = Product::create([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'base_description' => $validated['base_description'],
            'ai_generated_catalog' => $textoGeradoPelaIA
        ]);

        return response()->json([
            'mensagem' => 'Sucesso! IA gerou o texto e o produto foi salvo.',
            'dados' => $produto
        ], 201);
    }
}