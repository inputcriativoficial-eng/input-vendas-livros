# Configuração do backend Input Criativo

## 1. Banco e autenticação
1. Crie um projeto no Supabase.
2. Execute primeiro `supabase/schema.sql` e depois os arquivos em `supabase/migrations/` (ou use o schema consolidado atualizado).
3. Em Authentication → URL Configuration, cadastre a URL do GitHub Pages em Site URL e Redirect URLs.
4. No `app.js`, configure apenas `SUPABASE_URL` e a chave publicável/anon. Nunca use a secret/service-role key no browser.

## 2. Segredos das Edge Functions
Configure no Supabase Dashboard → Edge Functions → Secrets:
- `MERCADOPAGO_ACCESS_TOKEN`: Access Token da aplicação Mercado Pago (comece com credenciais de teste).
- `MERCADOPAGO_WEBHOOK_SECRET`: assinatura secreta configurada na seção Webhooks do Mercado Pago.
- `MERCADOPAGO_WEBHOOK_URL`: URL pública da função `mercadopago-webhook`.
- `FRONTEND_URL`: URL exata da loja publicada.

O Supabase injeta `SUPABASE_URL` e chaves server-side no runtime. Não grave segredos no GitHub, no HTML ou no JavaScript do navegador.

## 3. Implantar funções
Com Supabase CLI instalado e projeto vinculado:
```bash
supabase login
supabase link --project-ref SEU_PROJECT_REF
supabase functions deploy create-checkout
supabase functions deploy admin-books
supabase functions deploy my-library
supabase functions deploy mercadopago-webhook --no-verify-jwt
```
A função de webhook precisa aceitar chamadas externas do Mercado Pago; a função de checkout exige JWT válido do cliente.

## 4. Configurar Mercado Pago
1. No painel de desenvolvedores, crie/seleciona a aplicação e use credenciais de teste.
2. Cadastre a URL `MERCADOPAGO_WEBHOOK_URL` para eventos de pagamento.
3. Copie a chave secreta da configuração de Webhooks para `MERCADOPAGO_WEBHOOK_SECRET`.
4. Faça um pagamento de teste e confirme que o webhook valida assinatura e consulta o pagamento diretamente na API antes de marcar o pedido como pago.

## 5. Cuidados
- O preço é lido do banco pelo servidor; o navegador não determina valores.
- O pedido só é marcado como pago depois da confirmação da API do Mercado Pago e validação da assinatura do webhook.
- Acesso aos PDFs ainda depende de criar bucket privado e uma função de autorização/leitura assinada. Não publique PDFs no diretório do GitHub Pages.
- Antes de produção, realizar testes de ponta a ponta, política antifraude, revisão das políticas RLS e revisão jurídica/tributária.

## 6. Painel administrativo
1. Crie a conta de administrador pela página principal.
2. No Supabase SQL Editor, localize o UUID do usuário em Authentication → Users.
3. Promova somente a conta autorizada: `update public.profiles set role='admin' where id='UUID-DO-ADMIN';`.
4. Faça login na loja e acesse `/admin.html`.
5. O endpoint `admin-books` verifica JWT e a coluna `profiles.role` em cada operação. Não conceda edição direta dessa coluna a usuários.

## 7. Biblioteca do cliente
A página `/library.html` chama a função autenticada `my-library`. A função só lista itens de pedidos pagos pertencentes ao usuário autenticado. PDFs de compra podem receber URL assinada de curta duração (60 segundos) se o arquivo existir no bucket privado `books`.

**Limitação atual:** aluguel já registra e verifica prazo no banco, mas o leitor temporário protegido ainda precisa ser desenvolvido. Não suba PDFs no repositório público e não considere um link de PDF como proteção contra cópia.
