<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 
        'category', 
        'base_description', 
        'ai_generated_catalog'
    ];
}
