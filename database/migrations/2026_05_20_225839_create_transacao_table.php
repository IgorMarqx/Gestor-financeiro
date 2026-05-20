<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transacao', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('familia_id')->nullable();
            $table->unsignedBigInteger('conta_id');
            $table->unsignedBigInteger('user_id');
            $table->enum('tipo', ['debito', 'credito']);
            $table->decimal('valor', 15, 2);
            $table->string('descricao')->nullable();
            $table->string('anexo_url')->nullable();

            $table->foreign('familia_id')->references('id')->on('familias')->onDelete('cascade');
            $table->foreign('conta_id')->references('id')->on('conta')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transacao');
    }
};
