-- Adiciona coluna de imagem personalizada por post
ALTER TABLE blog_historico
ADD COLUMN IF NOT EXISTS imagem_url text;
