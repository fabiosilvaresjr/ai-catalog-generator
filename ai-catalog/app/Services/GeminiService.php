<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected string $apiKey;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key') ?? 'chave_nao_configurada';
        $this->baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    }

    public function gerarCatalogo(string $nome, string $categoria, string $descricaoBase): string
    {
        try {
            $prompt = "Crie uma descrição comercial para: Nome: {$nome}, Categoria: {$categoria}, Base: {$descricaoBase}";

            $response = Http::post("{$this->baseUrl}?key={$this->apiKey}", [
                'contents' => [['parts' => [['text' => $prompt]]]]
            ]);

            // 200, retorna o texto real
            if ($response->successful()) {
                return trim($response->json('candidates.0.content.parts.0.text'));
            }

            // 404, anota erro no log
            Log::error("Falha na API do Google: " . $response->body());
            return $this->fallbackDescricao($nome);

        } catch (\Exception $e) {
            return $this->fallbackDescricao($nome);
        }
    }

    private function fallbackDescricao(string $nome): string
    {
        return "Descrição gerada via Fallback de Segurança: O produto {$nome} apresenta alta qualidade, conectividade moderna e excelente custo-benefício para o seu dia a dia. (API Temporariamente Indisponível)";
    }
}