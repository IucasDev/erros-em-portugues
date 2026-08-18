import * as vscode from 'vscode';
import * as path from 'path';
import { traduzirMensagem } from './dictionary';

class ItemArquivo extends vscode.TreeItem {
  constructor(
    public readonly uri: vscode.Uri,
    public readonly diagnosticos: vscode.Diagnostic[]
  ) {
    super(path.basename(uri.fsPath), vscode.TreeItemCollapsibleState.Expanded);
    this.resourceUri = uri;
    this.description = vscode.workspace.asRelativePath(uri);
    this.contextValue = 'arquivo';
  }
}

class ItemProblema extends vscode.TreeItem {
  constructor(
    public readonly uri: vscode.Uri,
    public readonly diagnostico: vscode.Diagnostic
  ) {
    super(traduzirMensagem(diagnostico.message), vscode.TreeItemCollapsibleState.None);

    const linha = diagnostico.range.start.line + 1;
    const coluna = diagnostico.range.start.character + 1;
    this.description = `Linha ${linha}, Coluna ${coluna}`;
    this.tooltip = `Original: ${diagnostico.message}`;

    this.iconPath = new vscode.ThemeIcon(
      diagnostico.severity === vscode.DiagnosticSeverity.Error
        ? 'error'
        : diagnostico.severity === vscode.DiagnosticSeverity.Warning
          ? 'warning'
          : 'info',
      new vscode.ThemeColor(
        diagnostico.severity === vscode.DiagnosticSeverity.Error
          ? 'problemsErrorIcon.foreground'
          : diagnostico.severity === vscode.DiagnosticSeverity.Warning
            ? 'problemsWarningIcon.foreground'
            : 'problemsInfoIcon.foreground'
      )
    );

    this.command = {
      command: 'erros-pt-br.goToProblem',
      title: 'Ir para o problema',
      arguments: [uri, diagnostico.range]
    };
  }
}

type ItemArvore = ItemArquivo | ItemProblema;

class ProvedorProblemasPT implements vscode.TreeDataProvider<ItemArvore> {
  private _onDidChangeTreeData = new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  atualizar(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(elemento: ItemArvore): vscode.TreeItem {
    return elemento;
  }

  getChildren(elemento?: ItemArvore): ItemArvore[] {
    if (!elemento) {
      return vscode.languages.getDiagnostics()
        .filter(([, diags]) => diags.length > 0)
        .map(([uri, diags]) => new ItemArquivo(uri, diags));
    }

    if (elemento instanceof ItemArquivo) {
      return elemento.diagnosticos.map((d) => new ItemProblema(elemento.uri, d));
    }

    return [];
  }
}

export function activate(context: vscode.ExtensionContext) {
  const provedor = new ProvedorProblemasPT();

  const view = vscode.window.createTreeView('erros-pt-br.problemsView', {
    treeDataProvider: provedor
  });

  const disposableDiagnosticos = vscode.languages.onDidChangeDiagnostics(() => {
    provedor.atualizar();
  });

  const disposableRefresh = vscode.commands.registerCommand('erros-pt-br.refresh', () => {
    provedor.atualizar();
  });

  const disposableGoTo = vscode.commands.registerCommand(
    'erros-pt-br.goToProblem',
    async (uri: vscode.Uri, range: vscode.Range) => {
      const documento = await vscode.workspace.openTextDocument(uri);
      const editor = await vscode.window.showTextDocument(documento);
      editor.selection = new vscode.Selection(range.start, range.end);
      editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
    }
  );

  context.subscriptions.push(view, disposableDiagnosticos, disposableRefresh, disposableGoTo);
}

export function deactivate() {}
