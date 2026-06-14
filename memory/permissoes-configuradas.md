---
name: permissoes-configuradas
description: Permissões liberadas no settings.local.json para comandos comuns
metadata:
  type: feedback
---

O usuário autorizou as seguintes permissões no `.claude/settings.local.json`:
- `Bash(vercel *)` — deploy e gerenciamento Vercel
- `Bash(node scripts/*)` — execução de scripts Node
- `Bash(npm run build)` — build do Next.js
- `Bash(npx *)` — execução via npx

**Why:** Evitar bloqueios do autoclassifier em tarefas rotineiras de desenvolvimento.
**How to apply:** Confiar nessas permissões como já autorizadas; não pedir confirmação extra para comandos que se enquadrem nos padrões acima.
