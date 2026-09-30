# 🍽️ Sabor da Casa — Microfrontends com Next.js e Module Federation

Projeto de estudo de arquitetura de microfrontends. O cliente escolhe pratos em um cardápio e acompanha o pedido em tempo real, e cada parte da tela é uma aplicação independente.

## Arquitetura

O repositório tem três aplicações, todas em **Next.js 15 (Pages Router)** e integradas em **tempo de execução** com **Webpack Module Federation** (`@module-federation/nextjs-mf`).

| Aplicação        | Pasta        | Porta | Papel                                                                                    |
| ---------------- | ------------ | ----- | ---------------------------------------------------------------------------------------- |
| Micro Cardápio   | `catalogo/`  | 3001  | Expõe o componente `Cardapio` (lista estática de pratos com botão "Adicionar ao pedido") |
| Micro Pedido     | `carrinho/`  | 3002  | Expõe o componente `Pedidos` (lista os itens escolhidos)                                 |
| Container (host) | `container/` | 3000  | Consome os dois micros com `React.lazy` + `Suspense` e monta o layout da página          |

> Ajuste os nomes das pastas e a porta do container se forem diferentes no seu repositório.

### Módulos expostos e consumidos

- `catalogo` expõe `./Cardapio` e o container o importa como `catalogo/Cardapio`.
- `carrinho` expõe `./Pedidos` e o container o importa como `carrinho/Pedidos`.
- O container aponta para os micros pelos `remoteEntry.js`:
  - `catalogo@http://localhost:3001/_next/static/chunks/remoteEntry.js`
  - `carrinho@http://localhost:3002/_next/static/chunks/remoteEntry.js`

## Como rodar

Requisitos: Node.js e npm.

Cada aplicação é independente, então instale e rode uma por vez, cada uma no seu terminal.

### 1. Micro Cardápio (porta 3001)

```bash
cd catalogo
npm install
npm run dev
```

Abra http://localhost:3001 para testar o cardápio sozinho.

### 2. Micro Pedido (porta 3002)

```bash
cd carrinho
npm install
npm run dev
```

Abra http://localhost:3002 para testar o pedido sozinho.

### 3. Container (porta 3000)

Suba **por último**, com os dois micros já rodando:

```bash
cd container
npm install
npm run dev
```

Abra http://localhost:3000 para ver a aplicação completa.

> No Windows, o script `dev` usa `set NEXT_PRIVATE_LOCAL_WEBPACK=true && next dev`. Em Linux/macOS, troque `set` por `export` (ou use a variável antes do comando).

## Como funciona a comunicação entre os micros

Os micros **não se conhecem**. Eles conversam por **eventos globais do navegador** (`CustomEvent`), o que mantém os dois desacoplados.

1. **Cardápio (emissor):** ao clicar em "Adicionar ao pedido", dispara o evento `adicionarCarrinho` na `window`, levando o prato no campo `detail`:

   ```js
   window.dispatchEvent(new CustomEvent("adicionarCarrinho", { detail: item }));
   ```

2. **Pedido (receptor):** dentro de um `useEffect`, escuta o evento e adiciona o prato ao estado. O listener é removido ao desmontar o componente:

   ```js
   useEffect(() => {
     const handler = (e) => setItens((prev) => [...prev, e.detail]);
     window.addEventListener("adicionarCarrinho", handler);
     return () => window.removeEventListener("adicionarCarrinho", handler);
   }, []);
   ```

O objeto enviado em `detail` tem o formato `{ id, name, descricao }`.

**Observação:** o receptor só recebe eventos disparados **depois** de montado. Por isso o container renderiza os dois micros juntos na mesma página.

## Versões fixadas (importante)

O `@module-federation/nextjs-mf` é sensível a versões. Por isso, nos `package.json`, `webpack`, `enhanced-resolve` e `nextjs-mf` estão **fixos**, sem `^`, e o bloco `overrides` garante uma única instância de cada. **Não atualize essas versões** sem testar, para evitar erros de build.

## Estrutura de pastas

```
.
├── catalogo/            # Micro Cardápio
│   ├── src/components/Cardapio.jsx
│   ├── src/pages/
│   └── next.config.mjs  # expõe ./Cardapio
├── carrinho/            # Micro Pedido
│   ├── src/components/Pedidos.jsx
│   ├── src/pages/
│   └── next.config.mjs  # expõe ./Pedidos
└── container/           # Container (host)
    ├── src/pages/index.js
    └── next.config.mjs  # consome os remotes
```

## Tecnologias

- Next.js 15
- React
- Webpack Module Federation (`@module-federation/nextjs-mf`)
- Tailwind CSS (estilização e responsividade)
