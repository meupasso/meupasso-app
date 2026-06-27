-- Add email contact field and recovery email tracking
ALTER TABLE analises_empregabilidade
ADD COLUMN IF NOT EXISTS email_contato text;

ALTER TABLE analises_empregabilidade
ADD COLUMN IF NOT EXISTS email_recuperacao_enviado boolean NOT NULL DEFAULT false;
