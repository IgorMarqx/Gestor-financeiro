<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('dashboard');
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
