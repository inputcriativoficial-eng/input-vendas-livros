# Input Criativo — nova plataforma

Nova base da livraria digital, criada na branch nova-plataforma, separada da versão antiga.

## Incluído
- Loja responsiva com catálogo, busca e categorias.
- Carrinho demonstrativo.
- Compra definitiva e aluguel por 7, 15 e 30 dias.
- Interface de cadastro/login preparada para Supabase Auth.
- Sem credenciais privadas ou token de pagamento no frontend.

## Arquitetura
GitHub Pages hospeda somente arquivos estáticos; não executa Node.js nem guarda segredos. Arquitetura proposta:
- GitHub Pages: frontend.
- Supabase Auth: cadastro, login e recuperação de senha.
- Supabase PostgreSQL: clientes, livros, pedidos e biblioteca.
- Supabase Storage privado: PDFs.
- Supabase Edge Functions: cobranças Mercado Pago e webhooks.
- Mercado Pago: Pix e cartão.

Checkout está desativado nesta fundação. Nenhum pagamento é simulado ou considerado aprovado.

## Publicar no GitHub Pages
1. Abra Settings → Pages.
2. Em Build and deployment, selecione Deploy from a branch.
3. Escolha branch nova-plataforma e pasta /(root).
4. Salve e aguarde a publicação.
5. Para usar www.inputcriativo.com.br, configure o domínio em Pages e os DNS conforme instruções do GitHub.

## Configurar Supabase
1. Crie um projeto Supabase.
2. Execute supabase/schema.sql no SQL Editor.
3. Configure Site URL e Redirect URLs em Authentication → URL Configuration.
4. Insira Project URL e anon/public key no início de app.js.
5. Nunca publique service_role, senha do banco ou Mercado Pago Access Token.

## Regras de negócio
- Compra definitiva: acesso permanente à biblioteca.
- Aluguel: acesso de leitura por 7, 15 ou 30 dias, sem PDF para download.
- Cashback: somente após validação das regras no servidor.
- PDFs: bucket privado e links temporários após autorização.
- Pagamento: pedido pendente até confirmação autenticada do provedor.

## Ainda não implementado
Checkout real, webhook do Mercado Pago, leitor protegido, biblioteca do cliente, painel administrativo completo, cashback automatizado e testes de segurança. Esta é uma base inicial, não uma loja pronta para receber pagamentos reais.