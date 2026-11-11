# Nexo

Clube de jogadores com painel de perfil, missões e saldo.

Projeto independente com React, Next.js, TypeScript e Tailwind CSS.

## Executar

```powershell
npm install
npm run dev
```

Abra http://localhost:3105. Na instalação original, as dependências são gerenciadas pelo workspace da pasta raiz e já estão instaladas.

## Produção

```powershell
npm run typecheck
npm run build
npm start
```

O build exporta o site para `out/`. `npm start` serve essa exportação localmente.

## Interações

Busca, filtros, ordenação, favoritos, detalhes dos jogos, passaporte global, conquistas, missões, saldo, recompensas e convite demonstrativo. Progresso salvo no navegador. Para reiniciar: Créditos das imagens → Reiniciar demonstração.

Os jogos e as imagens são referências de terceiros para avaliar a interface. O botão de primeira partida e o aceite do convite são simulações explícitas. Não há conta real, backend, DNS ou integração com jogos/subdomínios.

`app/page.tsx`: composição da proposta. `app/theme.css`: identidade visual. `app/studio.tsx`: dados e interações. `app/globals.css`: estilos comuns. As licenças de fontes e ícones estão em `public/licenses/`. Créditos e links dos jogos estão no rodapé do site.
