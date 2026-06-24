-- Adicionar colunas de perfil à tabela perfis
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS github_url TEXT;
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
