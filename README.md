# Input Criativo — nova plataforma

Nova loja digital criada em branch independente: `nova-plataforma`.

## O que já está no repositório
- Loja responsiva, catálogo, pesquisa e categorias.
- Carrinho com compra definitiva e aluguel de 7, 15 e 30 dias.
- Cadastro/login com Supabase Auth (após configurar URL e chave pública).
- Checkout server-side com criação de preferência Mercado Pago.
- Webhook com validação HMAC da assinatura e consulta do pagamento na API do provedor.
- Esquema PostgreSQL com perfis, livros, pedidos, itens e cashback.
- Painel administrativo protegido por papel `admin`.
- Página de biblioteca do cliente, filtrada por pedidos pagos.
- Bucket de armazenamento de livros configurado como privado.

## Arquitetura
- GitHub Pages: frontend estático.
- Supabase Auth: cadastro e autenticação.
- Supabase PostgreSQL: catálogo, clientes, pedidos e permissões.
- Supabase Edge Functions: checkout, webhook, painel administrativo e biblioteca.
- Supabase Storage: PDFs privados.
- Mercado Pago: Checkout Pro (Pix/cartão conforme habilitação da conta).

## Publicar o frontend
1. Abra Settings → Pages.
2. Selecione Deploy from a branch.
3. Escolha `nova-plataforma` e `/(root)`.
4. Salve e aguarde a publicação.

## Instalar o backend
Siga o guia completo em [BACKEND_SETUP.md](BACKEND_SETUP.md). Execute o schema e a migration, configure as secrets do Supabase, implante as Edge Functions e configure a notificação Webhook no Mercado Pago.

No `app.js`, `admin.js` e `library.js`, configure somente a URL do projeto e a chave publishable/anon. Nunca coloque chave secreta, service role, senha do banco ou Access Token do Mercado Pago no frontend.

## Antes de vender
O código de integração foi adicionado, mas não está operacional até que o projeto Supabase e as credenciais do Mercado Pago sejam configurados e testados. Não há garantia de checkout ativo antes do teste real em ambiente sandbox.

- Preços são consultados no banco pelo backend, não aceitos do navegador.
- Pedidos só são marcados como pagos após webhook assinado e confirmação direta com o Mercado Pago.
- PDFs de compra usam URL assinada de curta duração, quando o caminho do arquivo estiver cadastrado.
- Aluguel tem controle de prazo no banco; o leitor temporário protegido ainda precisa ser concluído.
- Cashback, recuperação de senha personalizada, painel de relatórios e testes completos ainda precisam de implementação.
