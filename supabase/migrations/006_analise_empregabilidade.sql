-- Create analises_empregabilidade table
-- Produto standalone de Análise de Empregabilidade, cobrado avulso (R$ 19,90)
CREATE TABLE IF NOT EXISTS analises_empregabilidade (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'processando' CHECK (status IN ('processando', 'concluido', 'erro')),
  objetivo_vaga TEXT,
  github_username TEXT,
  pago BOOLEAN NOT NULL DEFAULT false,

  -- Dados brutos coletados
  json_curriculo JSONB,
  json_linkedin JSONB,
  json_github JSONB,

  -- Dados processados pela IA (preenchidos posteriormente)
  json_cruzamento JSONB,
  json_o_que_falta JSONB,
  json_recrutador JSONB,
  json_plano JSONB,
  json_vagas JSONB,

  -- Reescruta dos documentos
  json_curriculo_reescrito JSONB,
  json_linkedin_reescrito JSONB,

  -- Relatório final consolidado
  json_relatorio_final JSONB
);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_analises_user_id ON analises_empregabilidade(user_id);
CREATE INDEX IF NOT EXISTS idx_analises_status ON analises_empregabilidade(status);
CREATE INDEX IF NOT EXISTS idx_analises_criado_em ON analises_empregabilidade(criado_em DESC);

-- Enable Row Level Security
ALTER TABLE analises_empregabilidade ENABLE ROW LEVEL SECURITY;

-- Users can read only their own analyses
CREATE POLICY "Usuários podem ver suas próprias análises"
  ON analises_empregabilidade
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own analyses
CREATE POLICY "Usuários podem criar análises"
  ON analises_empregabilidade
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own analyses
CREATE POLICY "Usuários podem atualizar suas próprias análises"
  ON analises_empregabilidade
  FOR UPDATE
  USING (auth.uid() = user_id);
