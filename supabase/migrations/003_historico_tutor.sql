-- Histórico de conversas do tutor por exercício
CREATE TABLE IF NOT EXISTS historico_tutor (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  exercicio_id TEXT NOT NULL,
  linguagem TEXT,
  mensagens JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(usuario_id, exercicio_id)
);

CREATE INDEX IF NOT EXISTS idx_historico_usuario ON historico_tutor(usuario_id);
CREATE INDEX IF NOT EXISTS idx_historico_exercicio ON historico_tutor(exercicio_id);
