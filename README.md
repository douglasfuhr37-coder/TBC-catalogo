# Versão com abertura animada

Três cenas: Kit TBC, Body Splash e Geleia de Banho. Troca automática a cada cinco segundos, navegação e pausa. A preferência de movimento reduzido do dispositivo desativa a reprodução automática.

Esta versão é independente. A versão anterior permanece no arquivo TBC_Catalogo_Com_Instagram.zip. Descompacte cada versão em uma pasta diferente e abra index.html para comparar.

# TBC Casa & Bem-Estar
Catálogo estático com carrinho e fechamento pelo WhatsApp.

A página permite adicionar produtos antes de escolher a cidade. Os preços iniciais são de entrega local; no carrinho, a cidade confirma a modalidade, os valores e o frete. Até essa escolha, o total é apresentado como estimativa.
WhatsApp no cabeçalho, botão flutuante e área de contato. No celular, há uma barra para abrir o carrinho.

## Publicação
Envie index.html, style.css, app.js, catalogo.js e a pasta assets para a raiz do repositório GitHub. Não envie o ZIP como arquivo do site: descompacte antes.
Na Cloudflare Pages, conecte o repositório, escolha nenhum framework, deixe o comando de build vazio e use a raiz como pasta de publicação.
Para upload direto na Cloudflare, envie este ZIP com index.html na raiz.

## Alterações
Preços, fragrâncias e fretes ficam em catalogo.js. Alterações no GitHub são publicadas após conexão à Cloudflare.
Não há painel administrativo nem baixa automática de estoque. Cada variante começa com limite de 6 por carrinho. O atendimento confirma e controla as vendas; vários clientes podem solicitar o mesmo estoque. O kit tem limite próprio e não desconta componentes automaticamente.
Carrinhos são guardados no navegador e compartilhados por link. O catálogo recalcula preços atuais ao reabrir; o link só funciona para outras pessoas após publicação em endereço público.
Para atualizar estoques diferentes por variante, será necessário implementar armazenamento compartilhado e gerenciamento.
Fotos padronizadas com parede bege quente, base de pedra clara, luz natural e folhagem discreta, sem textos promocionais externos. São composições editadas com IA a partir das referências fornecidas; conferir detalhes das embalagens antes da publicação. A foto de Body Splash é representativa da linha.
Instagram ativo: https://www.instagram.com/tbc.casaebemestar/ — botões no cabeçalho e na área de contato, além de QR code clicável. O endereço está em CONTACTS.instagram, no final de catalogo.js. Se trocar o perfil, atualize também o QR code e o texto do @.
Modo de uso e cuidados aguardam rótulos traseiros. Não foram inventadas orientações.

## Validação desta revisão
Verificados no navegador: adição sem cidade, escolha da entrega dentro do carrinho, fretes locais, preços de outras cidades, mensagem e link de carrinho no WhatsApp, limite por fragrância, imagens e layout em tela de 390 px sem rolagem horizontal.
