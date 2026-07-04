-- Corrige vazamento de privacidade: usuário logado via notas de outros usuários
-- (e notas anônimas) porque não havia RLS na tabela notas.
ALTER TABLE notas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "usuarios veem suas notas" ON notas;
CREATE POLICY "usuarios veem suas notas" ON notas
FOR SELECT USING (usuario_id = (SELECT auth.uid()) OR usuario_id IS NULL);

DROP POLICY IF EXISTS "qualquer um cria nota" ON notas;
CREATE POLICY "qualquer um cria nota" ON notas
FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "usuarios atualizam suas notas" ON notas;
CREATE POLICY "usuarios atualizam suas notas" ON notas
FOR UPDATE USING (usuario_id = (SELECT auth.uid()) OR usuario_id IS NULL);

DROP POLICY IF EXISTS "usuarios deletam suas notas" ON notas;
CREATE POLICY "usuarios deletam suas notas" ON notas
FOR DELETE USING (usuario_id = (SELECT auth.uid()));
