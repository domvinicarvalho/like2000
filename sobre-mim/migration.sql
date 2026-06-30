-- ============================================================
-- MIGRAÇÃO: Adicionar coluna sobre_mim_config à tabela profiles
-- Necessário para o "Sobre mim" Decorator
-- ============================================================

-- Adiciona coluna para armazenar a configuração dos campos
-- (texto raw + decoração escolhida) como JSON string
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS sobre_mim_config TEXT;

-- A coluna bio já existe e continuará armazenando o texto
-- decorado final para exibição no perfil.
-- A nova coluna sobre_mim_config armazena um JSON com:
-- {
--   "campos": [
--     { "key": "nome_profissao", "texto": "...", "config": { "font": "...", "frame": "...", "emoji": "...", "kaomoji": "..." } },
--     ...
--   ],
--   "separador": "dash_simple"
-- }

-- Para verificar se a coluna foi adicionada:
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name = 'profiles' AND column_name IN ('bio', 'sobre_mim_config');
