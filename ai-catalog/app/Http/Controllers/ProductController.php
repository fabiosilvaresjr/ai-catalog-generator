<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // GET
    public function index()
    {
        $produtos = Product::with('marketingCopys')->orderBy('created_at', 'desc')->get();
        return response()->json($produtos, 200);
    }

    // CRIAR
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'features' => 'required|string',
            'image_path' => 'nullable|string'
        ]);

        $produto = Product::create($validated);

        return response()->json([
            'mensagem' => 'Produto cadastrado no estoque com sucesso!',
            'dados' => $produto
        ], 201);
    }

    // ATUALIZAR
    public function update(Request $request, $id)
    {
        $produto = Product::find($id);

        if (!$produto) {
            return response()->json(['mensagem' => 'Produto não encontrado.'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'category' => 'sometimes|string|max:100',
            'features' => 'sometimes|string',
        ]);

        $produto->update($validated);

        return response()->json([
            'mensagem' => 'Produto atualizado com sucesso!',
            'dados' => $produto
        ], 200);
    }

    // DELETAR
    public function destroy($id)
    {
        $produto = Product::find($id);

        if (!$produto) {
            return response()->json(['mensagem' => 'Produto não encontrado.'], 404);
        }

        $produto->delete();

        return response()->json(['mensagem' => 'Produto deletado do estoque com sucesso!'], 200);
    }
}