// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

function ensureDirExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "new-component-generator.generateComponent",
    async (uri: vscode.Uri) => {
      const input = await vscode.window.showInputBox({
        prompt: "Enter the component name",
        placeHolder: "MyComponent",
      });

      if (!input) {
        return;
      }

      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage("No workspace folder found.");
        return;
      }

      const rootDir = uri?.fsPath ?? workspaceFolders[0].uri.fsPath;
      const parsedPath = input.replace(/\\/g, "/").split("/");
      const componentName = parsedPath[parsedPath.length - 1];
      const relativePath = parsedPath.slice(0, -1).join("/");

      const componentDir = path.join(rootDir, relativePath, componentName);
      ensureDirExists(componentDir);

      const config = vscode.workspace.getConfiguration("new-component-generator");

			const customTemplates: Record<string, string> = config.get("templates") || {};

      const defaultTemplates: Record<string, string> = {
        "index.ts": `export { default } from "./{{ComponentName}}";\n`,
        "{{ComponentName}}.tsx": `import React from \"react\";\nimport styles from \"./styles.module.scss\";\n\ntype {{ComponentName}}Props = {};\n\nfunction {{ComponentName}}({}: {{ComponentName}}Props) {\n  return (\n    <div className={styles.container}>\n      {{ComponentName}}\n    </div>\n  );\n}\n\nexport default {{ComponentName}};\n`,
        "styles.module.scss": `.container {}\n`,
      };

			const templates = Object.keys(customTemplates).length > 0 ? customTemplates : defaultTemplates;

      for (const [filename, template] of Object.entries(templates)) {
        const fileNameParsed = filename.replace(
          /{{ComponentName}}/g,
          componentName
        );
        const fileContent = template.replace(
          /{{ComponentName}}/g,
          componentName
        );
        const filePath = path.join(componentDir, fileNameParsed);
        fs.writeFileSync(filePath, fileContent);
      }

      vscode.window.showInformationMessage(
        `Component ${componentName} created successfully!`
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
