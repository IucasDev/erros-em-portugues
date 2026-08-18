# Erros em Português

https://github.com/user-attachments/assets/7105dbf9-5228-43b6-bb18-141608c16e3e

Traduz os erros e avisos que aparecem no VS Code para português — direto
num painel próprio na barra lateral chamado **Problemas (PT-BR)**.

## O que essa extensão faz por você

Se você programa em português mas os erros do editor aparecem em inglês,
essa extensão resolve isso: ela lê os mesmos diagnósticos que o VS Code já
mostra (erros de sintaxe, tipo, variáveis não usadas, etc.) e exibe a
versão traduzida ao lado, num painel próprio chamado **"Erros PT-BR"** na
barra de atividades.

Funciona automaticamente, sem configuração: basta instalar e abrir um
arquivo com erro.

**Cobertura atual do dicionário:**

- **TypeScript / JavaScript** — erros de tipo, nomes não encontrados, módulos, etc.
- **ESLint** — variáveis não usadas, não definidas, etc.
- **Python** — `SyntaxError`, `NameError`, `TypeError`, `ModuleNotFoundError`, etc.

Se uma mensagem não bate com nenhum padrão conhecido, ela continua
aparecendo no idioma original — a extensão nunca esconde ou quebra um
erro, só traduz o que reconhece.

> **Por que um painel separado, e não o painel "Problems" de sempre?**
> O VS Code não permite que uma extensão reescreva as mensagens do painel
> nativo "Problems" — elas vêm direto do compilador/linguagem/linter. Por
> isso a extensão cria seu próprio painel, que espelha os mesmos
> diagnósticos, só que com a mensagem traduzida. Clicar num item leva você
> direto pra linha do erro no código, igual no painel original.

## Como instalar

Procure por **"Erros em Português"** na aba de Extensions do VS Code
(`Ctrl+Shift+X`) e clique em instalar. Depois de instalada, abra o ícone
**"Erros PT-BR"** na barra de atividades (lateral esquerda) para ver o
painel.

---

## Para desenvolvedores

### Como testar (modo desenvolvedor)

1. Abra esta pasta no VS Code.
2. Rode `npm install`.
3. Pressione `F5` (ou vá em "Executar Extensão" no menu Run and Debug).
4. Uma segunda janela do VS Code vai abrir com a extensão ativa.
5. Abra o ícone "Erros PT-BR" na barra de atividades (lateral esquerda).
6. Abra qualquer arquivo com erro (TypeScript, JavaScript, Python etc.) —
   os problemas aparecem traduzidos no painel.

### Como gerar o instalador (.vsix)

```bash
npm install -g @vscode/vsce
vsce package
```

Isso gera um arquivo `.vsix`. Para instalar manualmente:

- No VS Code: `Extensions` → menu "..." → **Install from VSIX...**
- Ou pelo terminal: `code --install-extension erros-em-portugues-0.0.2.vsix`

### Próximos passos possíveis

- Adicionar mais padrões ao dicionário (`src/dictionary.ts`)
- Botão de "copiar mensagem traduzida"
- Opção de configuração pra escolher quais linguagens traduzir

## Licença

MIT
