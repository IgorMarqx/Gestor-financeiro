<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Web\WebController;

Route::get('/', [WebController::class, 'home'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [WebController::class, 'dashboard'])->name('dashboard');
    Route::get('transacoes', [WebController::class, 'transacoesIndex'])->name('transacoes.index');
    Route::get('chat', [WebController::class, 'chatIndex'])->name('chat.index');
    Route::get('familia', [WebController::class, 'familiaIndex'])->name('familia.index');
});

require __DIR__ . '/settings.php';
