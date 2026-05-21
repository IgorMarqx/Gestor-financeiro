<?php

use App\Http\Controllers\Api\TransacaoController;
use Illuminate\Support\Facades\Route;

Route::prefix('transacao')->group(function () {
    Route::get('/', [TransacaoController::class, 'index'])->name('api.transacao.index');
    Route::post('/', [TransacaoController::class, 'store'])->name('api.transacao.store');
    Route::put('/{transacaoId}', [TransacaoController::class, 'update'])->name('api.transacao.update');
    Route::delete('/{transacaoId}', [TransacaoController::class, 'destroy'])->name('api.transacao.destroy');
});
