-- Add repos_selecionados column to analises_empregabilidade
-- Stores which repositories were analyzed (the ones selected by user or auto-selected)
ALTER TABLE analises_empregabilidade
ADD COLUMN IF NOT EXISTS repos_selecionados text[];
