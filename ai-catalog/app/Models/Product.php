<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'features',
        'image_path',
    ];

    
    //Relacionamento 1:N 
     
    public function marketingCopys(): HasMany
    {
        return $this->hasMany(MarketingCopy::class);
    }
}