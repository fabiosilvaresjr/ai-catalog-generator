<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('marketing_copys', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            
            $table->string('target_platform')->default('Geral'); // etiqueta
            $table->text('prompt_context')->nullable(); // Prompt direcionado
            $table->text('ai_generated_text'); // Marketing IA
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marketing_copys');
    }
};
