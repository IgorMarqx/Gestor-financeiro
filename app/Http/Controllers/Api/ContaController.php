<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Conta\ContaCreateRequest;
use App\Models\Conta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContaController extends ApiController
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $familiaId = $user?->familiaVinculadaId();
        $search = trim((string) $request->query('q', ''));

        $contas = Conta::query()
            ->when(
                $familiaId !== null,
                fn ($query) => $query->where('familia_id', $familiaId),
                fn ($query) => $query->where('user_id', $user->id),
            )
            ->when($search !== '', fn ($query) => $query->where('nome', 'like', "%{$search}%"))
            ->orderBy('nome')
            ->limit(20)
            ->get(['id', 'nome', 'saldo_atual']);

        return $this->apiSuccess($contas, 'OK');
    }

    public function store(ContaCreateRequest $request): JsonResponse
    {
        $user = $request->user();
        $data = $request->validated();

        $conta = Conta::query()->create([
            'user_id' => $user->id,
            'familia_id' => $user->familiaVinculadaId(),
            'nome' => $data['nome'],
            'saldo_atual' => $data['saldo_atual'] ?? 0,
            'created_by' => (string) $user->id,
        ]);

        return $this->apiSuccess($conta, 'Conta criada com sucesso.', 201);
    }
}
