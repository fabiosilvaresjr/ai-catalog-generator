<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MarketingCopy;
use App\Models\Product;
use App\Services\AiService;

class MarketingCopyController extends Controller
{
    // CRIAR
    public function store(Request $request, AiService $aiService)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'target_platform' => 'nullable|string',
            'prompt_context' => 'nullable|string',
        ]);

        $produto = Product::findOrFail($validated['product_id']);

        //instrucoes IA
        $instrucaoParaIA = "Características: " . $produto->features;
        if (!empty($validated['prompt_context'])) {
            $instrucaoParaIA .= " | Direcionamento extra do Marketing: " . $validated['prompt_context'];
        }

        // Função IA
        $textoGeradoPelaIA = $aiService->gerarCatalogo(
            $produto->name, 
            $produto->category, 
            $instrucaoParaIA
        );

        $copy = MarketingCopy::create([
            'product_id' => $produto->id,
            'target_platform' => $validated['target_platform'] ?? 'Geral',
            'prompt_context' => $validated['prompt_context'] ?? null,
            'ai_generated_text' => $textoGeradoPelaIA
        ]);

        return response()->json([
            'mensagem' => 'Texto de marketing gerado com sucesso!',
            'dados' => $copy
        ], 201);
    }

    // ATUALIZAR
    public function update(Request $request, $id)
    {
        $copy = MarketingCopy::find($id);

        if (!$copy) {
            return response()->json(['mensagem' => 'Copy não encontrada.'], 404);
        }

        $validated = $request->validate([
            'ai_generated_text' => 'required|string',
        ]);

        $copy->update([
            'ai_generated_text' => $validated['ai_generated_text']
        ]);

        return response()->json([
            'mensagem' => 'Texto de marketing atualizado pelo usuário com sucesso!',
            'dados' => $copy
        ], 200);
    }

    // DELETAR
    public function destroy($id)
    {
        $copy = MarketingCopy::find($id);

        if (!$copy) {
            return response()->json(['mensagem' => 'Copy não encontrada.'], 404);
        }

        $copy->delete();

        return response()->json(['mensagem' => 'Copy de marketing excluída com sucesso!'], 200);
    }
}