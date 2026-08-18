interface RegraTraducao {
  padrao: RegExp;
  traduzir: (m: RegExpMatchArray) => string;
}

const regras: RegraTraducao[] = [
  // TypeScript / JavaScript
  {
    padrao: /^Cannot find name '(.+)'\.?/,
    traduzir: (m) => `Não foi possível encontrar o nome '${m[1]}'.`
  },
  {
    padrao: /^Cannot find module '(.+)' or its corresponding type declarations\.?/,
    traduzir: (m) => `Não foi possível encontrar o módulo '${m[1]}' ou suas declarações de tipo.`
  },
  {
    padrao: /^Property '(.+)' does not exist on type '(.+)'\.?/,
    traduzir: (m) => `A propriedade '${m[1]}' não existe no tipo '${m[2]}'.`
  },
  {
    padrao: /^Type '(.+)' is not assignable to type '(.+)'\.?/,
    traduzir: (m) => `O tipo '${m[1]}' não pode ser atribuído ao tipo '${m[2]}'.`
  },
  {
    padrao: /^Expected (\d+) arguments?, but got (\d+)\.?/,
    traduzir: (m) => `Esperado(s) ${m[1]} argumento(s), mas foi(ram) passado(s) ${m[2]}.`
  },
  {
    padrao: /^Argument of type '(.+)' is not assignable to parameter of type '(.+)'\.?/,
    traduzir: (m) => `O argumento do tipo '${m[1]}' não pode ser atribuído a um parâmetro do tipo '${m[2]}'.`
  },
  {
    padrao: /^'(.+)' is declared but its value is never read\.?/,
    traduzir: (m) => `'${m[1]}' foi declarado(a), mas seu valor nunca é utilizado.`
  },
  {
    padrao: /^Unexpected token\.?/,
    traduzir: () => `Símbolo inesperado.`
  },
  {
    padrao: /^Missing semicolon\.?/,
    traduzir: () => `Falta um ponto e vírgula.`
  },
  {
    padrao: /^Object is possibly '(undefined|null)'\.?/,
    traduzir: (m) => `O objeto possivelmente é '${m[1]}'.`
  },
  // ESLint
  {
    padrao: /^'(.+)' is defined but never used\.?/,
    traduzir: (m) => `'${m[1]}' foi definido(a), mas nunca é utilizado(a).`
  },
  {
    padrao: /^'(.+)' is not defined\.?/,
    traduzir: (m) => `'${m[1]}' não está definido(a).`
  },
  {
    padrao: /^Missing return type on function\.?/,
    traduzir: () => `Falta o tipo de retorno na função.`
  },
  // Python
  {
    padrao: /^SyntaxError: invalid syntax/,
    traduzir: () => `Erro de sintaxe: sintaxe inválida.`
  },
  {
    padrao: /^NameError: name '(.+)' is not defined/,
    traduzir: (m) => `Erro de nome: '${m[1]}' não está definido.`
  },
  {
    padrao: /^IndentationError: (.+)/,
    traduzir: (m) => `Erro de indentação: ${m[1]}.`
  },
  {
    padrao: /^ModuleNotFoundError: No module named '(.+)'/,
    traduzir: (m) => `Módulo não encontrado: nenhum módulo chamado '${m[1]}'.`
  },
  {
    padrao: /^TypeError: (.+)/,
    traduzir: (m) => `Erro de tipo: ${m[1]}.`
  },
  {
    padrao: /^ValueError: (.+)/,
    traduzir: (m) => `Erro de valor: ${m[1]}.`
  },
  {
    padrao: /^IndexError: (.+)/,
    traduzir: (m) => `Erro de índice: ${m[1]}.`
  },
  {
    padrao: /^KeyError: (.+)/,
    traduzir: (m) => `Erro de chave: ${m[1]}.`
  },
  {
    padrao: /^AttributeError: (.+)/,
    traduzir: (m) => `Erro de atributo: ${m[1]}.`
  }
];

/**
 * Traduz uma mensagem de diagnóstico usando o dicionário local de padrões.
 * Se nenhum padrão bater, devolve a mensagem original sem alterações.
 */
export function traduzirMensagem(mensagemOriginal: string): string {
  const texto = mensagemOriginal.trim();
  for (const regra of regras) {
    const m = texto.match(regra.padrao);
    if (m) {
      return regra.traduzir(m);
    }
  }
  return mensagemOriginal;
}
