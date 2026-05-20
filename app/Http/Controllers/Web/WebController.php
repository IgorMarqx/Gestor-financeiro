<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class WebController extends Controller
{
    public function home(): RedirectResponse|Response
    {
        if (auth()->check()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('auth/login');
    }

    public function dashboard()
    {
        return Inertia::render('dashboard');
    }

    public function transacoesIndex()
    {
        return Inertia::render('transacoes/index');
    }

    public function chatIndex()
    {
        return Inertia::render('chat/index');
    }

    public function familiaIndex()
    {
        return Inertia::render('familia/index');
    }
}
