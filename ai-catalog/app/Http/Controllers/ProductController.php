<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Services\GeminiService; 

class ProductController extends Controller
{
    public function store(GeminiService $geminiService)
    {
        // to do: Request (do React).
        $name = 'Mouse Sem Fio Ergonômico';
        $category = 'Periféricos';
        $base_description = 'Mouse vertical ergonômico com clique silencioso e conexão Bluetooth.';
        
        // Gemini gerando descricao (Variáveis 100% alinhadas)
        $textoGeradoPelaIA = $geminiService->gerarCatalogo($name, $category, $base_description);
        
        // Salvando no banco (Variáveis 100% alinhadas)
        $produto = Product::create([
            'name' => $name,
            'category' => $category,
            'base_description' => $base_description,
            'ai_generated_catalog' => $textoGeradoPelaIA
        ]);

        return response()->json([
            'mensagem' => 'Sucesso! IA gerou o texto e o produto foi salvo.',
            'dados' => $produto
        ]);
    }
}