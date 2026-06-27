-- ============================================================
-- DIAGNÓSTICO: Verificar RLS e políticas da tabela friendships
-- ============================================================

-- 1.1 RLS está habilitado?
SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relname = 'friendships';

-- 1.2 Quais políticas existem?
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'friendships';

-- 1.3 Qual é a role usada pelo anon key?
SELECT current_user, current_database();

-- 1.4 Teste prático: quantas friendships o anon consegue ver?
--     (rode isso NO SQL EDITOR, não pelo cliente)
SELECT COUNT(*) AS total_registros FROM friendships;
SELECT COUNT(*) AS accepted_count FROM friendships WHERE status = 'accepted';

-- ============================================================
-- CORREÇÃO: Criar política de SELECT para friendships
-- ============================================================
-- Se o SELECT 1.2 acima mostrar 0 políticas, rode este bloco:
-- ============================================================

-- Permite que usuários autenticados vejam suas próprias amizades
CREATE POLICY "Usuários podem ver suas amizades" 
ON friendships 
FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- Permite que usuários autenticados insiram amizades
CREATE POLICY "Usuários podem inserir amizades" 
ON friendships 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Permite que usuários autenticados atualizem suas amizades
CREATE POLICY "Usuários podem atualizar suas amizades" 
ON friendships 
FOR UPDATE 
USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- ============================================================
-- CORREÇÃO ALTERNATIVA: Se o problema for o JOIN com profiles
-- ============================================================
-- O carregarAmigos() usa embedded JOIN (profiles_user:user_id(...))
-- que depende de permissão de SELECT em profiles também.
-- Verifique se profiles tem política de SELECT:
-- ============================================================

SELECT schemaname, tablename, policyname, cmd
FROM pg_policies 
WHERE tablename = 'profiles';

-- Se profiles não tiver política de SELECT para authenticated:
CREATE POLICY "Usuários podem ver todos os perfis" 
ON profiles 
FOR SELECT 
USING (true);

-- ============================================================
-- VERIFICAÇÃO FINAL
-- ============================================================
SELECT 
  'friendships' AS tabela,
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE status = 'accepted') AS aceitas,
  COUNT(*) FILTER (WHERE status = 'pending') AS pendentes
FROM friendships;