<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conta extends Model
{
    use HasFactory;

    protected $table = 'conta';

    protected $fillable = [
        'user_id',
        'familia_id',
        'nome',
        'saldo_atual',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'saldo_atual' => 'decimal:2',
    ];
}
