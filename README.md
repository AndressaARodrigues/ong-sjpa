# Landing page — ONG SJPA

Landing page da **Sociedade Juizforana de Proteção aos Animais (SJPA)**, de Juiz de Fora/MG.


## Como abrir

1. Descompacte a pasta.
2. Abra o `index.html` no navegador. Para recarregar sozinho ao salvar, use a extensão **Live Server** do VS Code.

> As fotos já estão na pasta `assets/img/`, então funcionam offline. Só as fontes do Google precisam de internet; sem ela, o navegador usa uma fonte parecida. Se alguma foto faltar, o site mostra um fundo verde com uma patinha no lugar.

## Estrutura

```
sjpa-landing/
├── index.html            # conteúdo e estrutura (HTML5 semântico)
├── assets/
│   ├── css/style.css     # visual, layout responsivo e animações
│   ├── js/main.js        # interações (JavaScript puro, sem bibliotecas)
│   └── img/
│       ├── logo-sjpa.png
│       ├── favicon.png
│       ├── hero-cachorro.jpg   # foto do topo
│       ├── sobre.jpg
│       ├── voluntario.jpg
│       └── pets/               # fotos dos cards de adoção (flor, thor, pipoca, mel, luna, bidu)
└── README.md
```

## Tecnologias

- **HTML5** semântico (`header`, `nav`, `main`, `section`, `article`, `footer`, `dialog`, `details`).
- **CSS3** com variáveis (`:root`), Flexbox, Grid, `clamp()`, `@keyframes` e media queries para tablet e celular.
- **JavaScript (ES6+)** puro, com `IntersectionObserver`, `requestAnimationFrame`, `<dialog>` e Clipboard API.
- **Google Fonts**: Poppins (títulos) e Nunito Sans (texto).
- Ícones em **SVG** inline (sprite no topo do `index.html`), sem dependências externas.

## Seções

Topo (hero) · Números · Quem somos · Adote (carrossel com filtro e modal) · Como funciona a adoção · Como ajudar · Kits de doação + campanha + Pix · Voluntariado · Dúvidas (FAQ) · Contato (formulário) · Rodapé.

## Animações e interações

| Onde | O que acontece |
|---|---|
| Topo | Texto e foto entram com fade/zoom; a moldura da foto muda de forma (*blob*); as patinhas e os selos flutuam; as ondas se movem; o botão "Doe agora" tem um brilho passando |
| Cabeçalho | Fica fixo, diminui e ganha sombra ao rolar; o link da seção visível fica sublinhado; no celular vira menu hambúrguer animado |
| Rolagem | As seções aparecem com fade (de baixo, da esquerda ou da direita) quando entram na tela |
| Números | Contadores sobem de 0 até o valor final |
| Adote | Filtro Todos / Cães / Gatos com animação; carrossel com setas (ou setas do teclado); zoom na foto ao passar o mouse; modal "Conheça minha história" |
| Quero adotar (modal) | Rola até o contato e preenche assunto e mensagem com o nome do animal |
| Kits | Cards sobem no hover, o ícone balança; "Doe agora" rola até o Pix e destaca o bloco com o kit escolhido |
| Campanha | Barra de progresso preenche com listras animadas |
| FAQ | Abre e fecha com animação |
| Formulário | Valida nome, e-mail e mensagem; campo com erro treme; aviso (toast) ao enviar |
| Geral | Botão "voltar ao topo"; botão para copiar o CNPJ |

Quem ativa "reduzir movimento" no sistema operacional vê o site sem animações (`prefers-reduced-motion`).

## Dados: o que é real e o que é fictício

Os trechos fictícios também estão marcados no `index.html` com comentários `<!-- MOCK -->`.

| Informação | Situação | Fonte |
|---|---|---|
| Nome: Sociedade Juizforana de Proteção aos Animais | Real | Tribuna de Minas (out/2024) |
| "Há quase 40 anos" / "38+ anos" | Real (38 anos em 2024) | Tribuna de Minas (out/2024) |
| Mais de 600 animais sob cuidado | Real | Tribuna de Minas (2024) e Acessa.com (dez/2022) |
| CNPJ 20.460.556/0001-78 | Real | Tribuna de Minas (out/2024) |
| Abrigo na BR-040, km 787 | Real | Acessa.com (2015 e 2022) |
| Telefone (32) 99965-5493 | Real | Acessa.com (dez/2022) |
| Atendimento seg. a sex., 8h às 13h | Real | Acessa.com (dez/2022) |
| Instagram @ong_sjpa | Real | Tribuna de Minas (out/2024) |
| Kits de doação (R$ 25, R$ 50, R$ 100), retirada de doações e parceiros | Real | Material visual da ONG (prints) |
| Flor: fêmea, sem raça definida | Real (nome e dados); **foto ilustrativa** | Material visual da ONG (prints) |
| Thor, Pipoca, Mel, Luna e Bidu | **Fictício** | — |
| Histórias e tags (castrado, vacinado…) dos animais | **Fictício** | — |
| 1.200 adoções e 150 voluntários | **Fictício** | — |
| Missão, visão e valores | **Fictício** | — |
| Etapas da adoção e respostas do FAQ sobre custo, apadrinhamento e outras cidades | **Fictício** | — |
| Campanha "2 toneladas de ração" (1.260 kg / 63%) | **Fictício** | — |
| E-mail contato@exemplo.org | **Placeholder** | — |
| QR codes do Pix (Caixa e PicPay) | **A inserir**: não foram simulados, para não arriscar um Pix errado | — |

As reportagens são de 2015 a 2024. Confirme os dados com a ONG antes de publicar.

- Tribuna de Minas (out/2024): https://tribunademinas.com.br/noticias/cidade/04-10-2024/dia-animais-abrigo.html
- Acessa.com (dez/2022): https://www.acessa.com/cidade/2022/12/118384-com-dividas-que-giram-em-torno-de-rs-50-mil-reais-sociedade-juiz-forense-de-protecao-aos-animais-faz-campanha-de-natal.html
- Acessa.com (jun/2015): https://www.acessa.com/cidade/arquivo/noticias/2015/06/23-sjpa-faz-convocacao-de-mutirao-de-ajuda-para-o-proximo-domingo/

## Créditos das fotos

Todas do Unsplash, com licença livre para uso ([Unsplash License](https://unsplash.com/license)), salvas em `assets/img/`. As fotos dos animais são ilustrativas: troque pelas fotos reais dos animais da ONG (basta substituir os arquivos em `assets/img/pets/` mantendo os nomes).

| Uso | Página da foto |
|---|---|
| Topo (cachorro acenando) | https://unsplash.com/photos/a-small-black-and-brown-dog-sitting-on-its-hind-legs-hz_BchTSLX8 |
| Quem somos | https://unsplash.com/photos/a-person-petting-a-brown-and-white-dog-UbUOVEP6DQc |
| Flor | https://unsplash.com/photos/short-coat-brown-and-white-dog-sitting-near-gray-concrete-wall-during-daytime-1K7Qf8OBXjU |
| Thor | https://unsplash.com/photos/black-dog-staring-at-the-camera-DKHnBJyWCQ8 |
| Pipoca | https://unsplash.com/photos/orange-tabby-cat-on-gray-textile-ta72KbDboYo |
| Mel | https://unsplash.com/photos/a-brown-and-white-dog-sitting-on-top-of-a-cement-floor-gRy-mGW6KUQ |
| Luna | https://unsplash.com/photos/a-grey-and-white-cat-sitting-on-top-of-a-wooden-floor-45LAFKDye-0 |
| Bidu | https://unsplash.com/photos/a-cute-dog-looks-up-at-the-camera-Y5W-1NlqBQw |
| Voluntariado | https://unsplash.com/photos/woman-sitting-and-playing-with-dog-outdoors-xvYxGcwFvuE |

## Próximos passos

- [ ] Inserir os QR codes reais do Pix (Caixa e PicPay) e confirmar a chave.
- [ ] Trocar o e-mail de exemplo pelo e-mail real da ONG.
- [ ] Confirmar se o telefone também atende por WhatsApp (se sim, adicionar um botão de WhatsApp).
- [ ] Trocar os animais fictícios pelos animais reais disponíveis para adoção, com fotos próprias.
- [ ] Conectar o formulário a um serviço de envio (ex.: Formspree, EmailJS ou um back-end próprio).
- [ ] Logo em alta resolução (de preferência em SVG ou PNG grande, sem fundo).
- [ ] Publicar (ex.: GitHub Pages, Netlify ou Vercel; todos têm plano gratuito para sites estáticos).
