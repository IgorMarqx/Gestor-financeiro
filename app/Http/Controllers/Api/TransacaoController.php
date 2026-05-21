<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Transacao\TransacaoCreateRequest;
use App\Http\Requests\Transacao\TransacaoUpdateRequest;
use App\Services\TransacaoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransacaoController extends ApiController
{
    public function __construct(private readonly TransacaoService $transacaoService) {}

    public function index(Request $request): JsonResponse
    {
        $transacoes = $this->transacaoService->list($request->user());

        return $this->apiSuccess($transacoes, 'OK');
    }

    public function store(TransacaoCreateRequest $request): JsonResponse
    {
        $transacao = $this->transacaoService->create($request->user(), $request->validated());

        return $this->apiSuccess($transacao, 'Transação cadastrada com sucesso.', 201);
    }

    public function update(TransacaoUpdateRequest $request, int $transacaoId): JsonResponse
    {
        $transacao = $this->transacaoService->update($request->user(), $transacaoId, $request->validated());
        if (! $transacao) {
            return $this->apiError('Transação não encontrada.', null, 404);
        }

        return $this->apiSuccess($transacao, 'Transação atualizada com sucesso.');
    }

    public function destroy(Request $request, int $transacaoId): JsonResponse
    {
        if (! $this->transacaoService->delete($request->user(), $transacaoId)) {
            return $this->apiError('Transação não encontrada.', null, 404);
        }

        return $this->apiSuccess(null, 'Transação removida com sucesso.');
    }
}
