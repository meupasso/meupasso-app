-- Adicionar coluna de expiração do plano Pro
-- Quando pro_expiracao é NULL e plano='pro' → Pro permanente (pagante)
-- Quando pro_expiracao é passado e plano='pro' → Pro expirado, deve voltar a gratis
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS pro_expiracao DATE;
