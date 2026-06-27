-- ============================================================
-- ETAPA 1: INSPECIONAR O QUE EXISTE NA TABELA friendships
-- ============================================================

-- 1.1 Ver a estrutura real da tabela
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'friendships'
ORDER BY ordinal_position;

-- 1.2 Ver constraints (unique, PK, FK)
SELECT
  con.conname AS constraint_name,
  con.contype AS constraint_type,
  pg_get_constraintdef(con.oid) AS constraint_definition
FROM pg_constraint con
JOIN pg_class rel ON rel.oid = con.conrelid
WHERE rel.relname = 'friendships';

-- 1.3 Ver TODOS os registros atuais na tabela friendships
--     (incluindo os que existiam antes e os que foram inseridos)
SELECT 
  f.id,
  f.user_id,
  u.nickname AS user_nickname,
  f.friend_id,
  fr.nickname AS friend_nickname,
  f.status,
  f.updated_at,
  f.xp_awarded
FROM friendships f
LEFT JOIN profiles u ON u.id = f.user_id
LEFT JOIN profiles fr ON fr.id = f.friend_id
ORDER BY f.updated_at DESC;

-- 1.4 Ver quais pares da lista existem (em qualquer direção)
WITH target_nicks AS (
  SELECT unnest(ARRAY[
    'bad_idea',
    'domvinicarvalho',
    'emo_never_dies',
    'like2000',
    'shuffle_party',
    'baile_piriemo',
    'follow_the_bunny',
    'secret_things'
  ]) AS nickname
),
target_ids AS (
  SELECT p.id, p.nickname
  FROM profiles p
  INNER JOIN target_nicks tn ON p.nickname = tn.nickname
)
SELECT 
  CASE WHEN f.id IS NOT NULL THEN 'EXISTE' ELSE 'FALTA' END AS situacao,
  u.nickname AS de,
  fr.nickname AS para,
  f.status,
  f.xp_awarded
FROM target_ids u
CROSS JOIN target_ids fr
LEFT JOIN friendships f 
  ON f.user_id = u.id AND f.friend_id = fr.id
WHERE u.id <> fr.id
ORDER BY u.nickname, fr.nickname;

-- ============================================================
-- ETAPA 2: CORREÇÃO
-- ============================================================
-- Esta CTE insere os registros faltantes com status 'accepted'
-- e atualiza registros existentes que podem ter status errado.
-- Ela NÃO mexe em registros que já estão corretos.
-- ============================================================

WITH target_nicks AS (
  SELECT unnest(ARRAY[
    'bad_idea',
    'domvinicarvalho',
    'emo_never_dies',
    'like2000',
    'shuffle_party',
    'baile_piriemo',
    'follow_the_bunny',
    'secret_things'
  ]) AS nickname
),
target_ids AS (
  SELECT p.id, p.nickname
  FROM profiles p
  INNER JOIN target_nicks tn ON p.nickname = tn.nickname
),
pairs AS (
  SELECT a.id AS user_id, b.id AS friend_id
  FROM target_ids a
  CROSS JOIN target_ids b
  WHERE a.id <> b.id
),
upsert_a_to_b AS (
  INSERT INTO friendships (user_id, friend_id, status, updated_at, xp_awarded)
  SELECT p.user_id, p.friend_id, 'accepted', now(), false
  FROM pairs p
  WHERE NOT EXISTS (
    SELECT 1 FROM friendships f
    WHERE f.user_id = p.user_id AND f.friend_id = p.friend_id
  )
  ON CONFLICT (user_id, friend_id) 
  DO UPDATE SET status = 'accepted', updated_at = now()
  RETURNING user_id, friend_id, 'inserido' AS acao
),
update_existing AS (
  UPDATE friendships f
  SET status = 'accepted', updated_at = now()
  FROM pairs p
  WHERE f.user_id = p.user_id 
    AND f.friend_id = p.friend_id
    AND f.status IS DISTINCT FROM 'accepted'
  RETURNING f.user_id, f.friend_id, 'corrigido' AS acao
)
SELECT 
  'CORREÇÃO CONCLUÍDA' AS mensagem,
  (SELECT COUNT(*) FROM upsert_a_to_b) AS registros_inseridos,
  (SELECT COUNT(*) FROM update_existing) AS registros_corrigidos;