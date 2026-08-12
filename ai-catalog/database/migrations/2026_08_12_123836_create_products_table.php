<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
     // Run the migrations.
     
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name'); 
            $table->string('category'); 
            $table->text('base_description'); 
            $table->text('ai_generated_catalog')->nullable();
            $table->timestamps();
        });
    }

    
    // Reverse the migrations.
     
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
