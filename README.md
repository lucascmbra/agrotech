# AgroTech | Todos Contra a Fome

Protótipo navegável da **Fase 3** (Engenharia de Software — FIAP, 1ESOR 2026): uma plataforma de apoio à agricultura familiar e aos pequenos produtores rurais, alinhada à **ODS 2 — Fome Zero e Agricultura Sustentável (Meta 2.4)**.

## Descrição

Segundo o Censo Agropecuário 2017 (IBGE), a agricultura familiar responde por cerca de 77% dos estabelecimentos agropecuários do país, mas poucos receberam orientação técnica. O AgroTech propõe uma tecnologia simples que aproxima informação de quem produz, em três etapas: **planejamento**, **monitoramento** e **recomendações compreensíveis**. Este site é a interface prototipada dessa proposta (Entregas 1 e 2).

## Tecnologias

- HTML5 semântico
- CSS3 (Flexbox, Grid, media queries, variáveis CSS)
- JavaScript puro (Vanilla JS)
- Ícones e ilustrações em SVG (sem bibliotecas, sem frameworks, sem backend)

## Como executar

1. Baixe/clone a pasta `agrotech/`.
2. Abra `index.html` no navegador (duplo clique) **ou** sirva a pasta com qualquer servidor estático, por exemplo:
   ```bash
   cd agrotech
   python3 -m http.server 8000
   # acesse http://localhost:8000
   ```
3. **GitHub Pages:** envie a pasta para um repositório e ative Pages na branch desejada. Todos os caminhos são relativos e funcionam em hospedagem estática.

### Vídeo de abertura

A página inicial usa `assets/videos/video.mp4` no destaque de abertura, com `autoplay`, `loop`, `muted` e `playsinline`. Quando o sistema prefere movimento reduzido, a reprodução automática é desativada. O poster `assets/images/header-poster.jpg` foi extraído do próprio vídeo.

### Apresentação do projeto

A home mantém uma seção de apresentação do projeto, abaixo das ferramentas, acessível pelo botão "Conheça o projeto" no banner. Como o arquivo do pitch ainda não foi adicionado, a seção exibe o poster e um aviso de disponibilidade. Quando o pitch estiver pronto, substitua `.pitch-placeholder` em `index.html` por um player `<video controls playsinline>` com a origem do vídeo de apresentação. O arquivo `video.mp4` atual é o vídeo de fundo da abertura.

### Imagens

O planejamento usa a foto `persona2`, e o contato usa `persona1`. As páginas carregam versões JPEG de 720 e 1440 pixels por meio de `srcset`, para reduzir o download no celular. As fotos originais foram preservadas em `assets/images/`.

## Estrutura

```text
agrotech/
├── index.html           Início (abertura com vídeo e acesso às ferramentas)
├── planejamento.html    Planejamento do Cultivo (formulário)
├── monitoramento.html   Monitoramento da Plantação (indicadores + observações)
├── ia.html              Recomendações Inteligentes (análise simulada)
├── contato.html         Fale Conosco (formulário com validação HTML5)
├── css/styles.css
├── js/main.js
├── assets/{images,icons,videos}/
└── README.md
```

## Páginas

| Página | Conteúdo |
| --- | --- |
| Início | Abertura com vídeo, acesso às ferramentas, apresentação em vídeo e apresentação do projeto |
| Planejamento | Cultura, área (ha) e localização com `required`, `min`, `max`; mensagem demonstrativa |
| Monitoramento | Cartões de umidade, temperatura e luz com pequenas curvas de leitura e anotações com contador de registros |
| Recomendações IA | Resultado da análise, duas dicas e botão "Nova análise"; respostas simuladas com aviso único |
| Contato | Nome, e-mail, assunto (`select`), mensagem; `required`, `minlength`, `maxlength`, `type="email"` |

## Acessibilidade e responsividade

Menu hambúrguer funcional no mobile (fecha com `Esc`), link "pular para o conteúdo", foco visível, labels associados, um `h1` por página, página ativa com `aria-current="page"`, mensagens em regiões `aria-live` e respeito a `prefers-reduced-motion`.

## Limitações do protótipo

- Não há backend, autenticação, banco de dados, APIs, IA real nem integração com sensores.
- Indicadores do Monitoramento são **dados fictícios** fixos.
- O "planejamento" e as "recomendações" são **simulações de interface**, não análises agronômicas.
- Observações registradas ficam apenas na página e somem ao recarregar.
- O formulário de contato **não envia** mensagens: o envio é simulado.
- O autoplay pode ser bloqueado pelo navegador; o poster e o botão de reprodução ficam disponíveis.
