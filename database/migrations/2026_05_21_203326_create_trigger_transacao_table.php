<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS transacao_after_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS transacao_after_update');
        DB::unprepared('DROP TRIGGER IF EXISTS transacao_after_delete');

        DB::unprepared("
            CREATE TRIGGER transacao_after_insert
            AFTER INSERT ON transacao
            FOR EACH ROW
            BEGIN
                INSERT INTO users_saldo (user_id, saldo, created_at, updated_at)
                SELECT NEW.user_id, 0, NOW(), NOW()
                WHERE NOT EXISTS (
                    SELECT 1 FROM users_saldo WHERE user_id = NEW.user_id
                );

                UPDATE users_saldo
                SET saldo = saldo + IF(NEW.tipo = 'credito', NEW.valor, -NEW.valor),
                    updated_at = NOW()
                WHERE user_id = NEW.user_id;

                UPDATE conta
                SET saldo_atual = saldo_atual + IF(NEW.tipo = 'credito', NEW.valor, -NEW.valor),
                    updated_at = NOW()
                WHERE id = NEW.conta_id;
            END
        ");

        DB::unprepared("
            CREATE TRIGGER transacao_after_update
            AFTER UPDATE ON transacao
            FOR EACH ROW
            BEGIN
                INSERT INTO users_saldo (user_id, saldo, created_at, updated_at)
                SELECT OLD.user_id, 0, NOW(), NOW()
                WHERE NOT EXISTS (
                    SELECT 1 FROM users_saldo WHERE user_id = OLD.user_id
                );

                INSERT INTO users_saldo (user_id, saldo, created_at, updated_at)
                SELECT NEW.user_id, 0, NOW(), NOW()
                WHERE NOT EXISTS (
                    SELECT 1 FROM users_saldo WHERE user_id = NEW.user_id
                );

                UPDATE users_saldo
                SET saldo = saldo - IF(OLD.tipo = 'credito', OLD.valor, -OLD.valor),
                    updated_at = NOW()
                WHERE user_id = OLD.user_id;

                UPDATE conta
                SET saldo_atual = saldo_atual - IF(OLD.tipo = 'credito', OLD.valor, -OLD.valor),
                    updated_at = NOW()
                WHERE id = OLD.conta_id;

                UPDATE users_saldo
                SET saldo = saldo + IF(NEW.tipo = 'credito', NEW.valor, -NEW.valor),
                    updated_at = NOW()
                WHERE user_id = NEW.user_id;

                UPDATE conta
                SET saldo_atual = saldo_atual + IF(NEW.tipo = 'credito', NEW.valor, -NEW.valor),
                    updated_at = NOW()
                WHERE id = NEW.conta_id;
            END
        ");

        DB::unprepared("
            CREATE TRIGGER transacao_after_delete
            AFTER DELETE ON transacao
            FOR EACH ROW
            BEGIN
                INSERT INTO users_saldo (user_id, saldo, created_at, updated_at)
                SELECT OLD.user_id, 0, NOW(), NOW()
                WHERE NOT EXISTS (
                    SELECT 1 FROM users_saldo WHERE user_id = OLD.user_id
                );

                UPDATE users_saldo
                SET saldo = saldo - IF(OLD.tipo = 'credito', OLD.valor, -OLD.valor),
                    updated_at = NOW()
                WHERE user_id = OLD.user_id;

                UPDATE conta
                SET saldo_atual = saldo_atual - IF(OLD.tipo = 'credito', OLD.valor, -OLD.valor),
                    updated_at = NOW()
                WHERE id = OLD.conta_id;
            END
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS transacao_after_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS transacao_after_update');
        DB::unprepared('DROP TRIGGER IF EXISTS transacao_after_delete');
    }
};
