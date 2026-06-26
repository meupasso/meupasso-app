-- Adiciona coluna pago_em para diferenciar pagamentos reais de liberação manual
ALTER TABLE analises_empregabilidade
ADD COLUMN IF NOT EXISTS pago_em TIMESTAMPTZ;
