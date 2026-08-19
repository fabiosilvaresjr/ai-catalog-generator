<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MarketingCopy extends Model
{
    use HasFactory;

    protected $table = 'marketing_copys';

    protected $fillable = [
        'product_id',
        'target_platform',
        'prompt_context',
        'ai_generated_text',
    ];

    // Relacionamento N:1
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}