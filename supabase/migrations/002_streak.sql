-- Adicionar colunas de streak de estudos à tabela perfis
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS streak_atual INT DEFAULT 0;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS streak_maximo INT DEFAULT 0;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS ultimo_estudo DATE;
