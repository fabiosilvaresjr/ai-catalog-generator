<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiService
{
  protected string $baseUrl;
    protected string $model;

    public function __construct()
    {
        // URL padrão do Ollama
        $this->baseUrl = 'http://127.0.0.1:11434/api/generate';
        
        // IA usada
        $this->model = 'llama3.2:3b'; 
    }

    public function gerarCatalogo(string $nome, string $categoria, string $descricaoBase): string
    {
        try {
            $prompt = "Você é um especialista em e-commerce e Copywriting.
            Crie uma descrição comercial persuasiva e otimizada para SEO para o seguinte produto.
            Nome do Produto: {$nome}
            Categoria: {$categoria}
            Características básicas: {$descricaoBase}
            Retorne APENAS o texto da descrição, sem formatações extras.";

            // timeout(60) éé o tempo para a IA processar
            $response = Http::timeout(60)->post($this->baseUrl, [
                'model' => $this->model,
                'prompt' => $prompt,
                'stream' => false // entregar resposta d euma vez
            ]);

            if ($response->successful()) {
                // resposta dentro de 'response'
                return trim($response->json('response'));
            }

            Log::error("Falha no Ollama: " . $response->body());
            return $this->fallbackDescricao($nome);

        } catch (\Exception $e) {
            Log::error("Erro de conexão com Ollama: " . $e->getMessage());
            return $this->fallbackDescricao($nome);
        }
    }

    private function fallbackDescricao(string $nome): string
    {
        return "Descrição gerada via Fallback: O produto {$nome} apresenta alta qualidade, conectividade moderna e excelente custo-benefício. (IA Local Indisponível)";
    }
}