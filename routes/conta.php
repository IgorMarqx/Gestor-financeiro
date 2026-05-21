<?php

use App\Http\Controllers\Api\ContaController;
use Illuminate\Support\Facades\Route;

Route::prefix('conta')->group(function () {
    Route::get('/', [ContaController::class, 'index'])->name('api.conta.index');
    Route::post('/', [ContaController::class, 'store'])->name('api.conta.store');
});
