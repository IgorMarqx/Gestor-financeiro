<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transacao extends Model
{
    use HasFactory;

    protected $table = 'transacao';

    protected $fillable = [
        'familia_id',
        'conta_id',
        'user_id',
        'tipo',
        'valor',
        'descricao',
        'anexo_url',
    ];

    protected $casts = [
        'valor' => 'decimal:2',
    ];

    public function conta(): BelongsTo
    {
        return $this->belongsTo(Conta::class, 'conta_id');
    }
}
