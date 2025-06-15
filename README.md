# Component Generator

A simple yet powerful Visual Studio Code extension to quickly scaffold React components with customizable templates.

## ✨ Features

- ✅ Right-click in the Explorer to generate a new component.
- ✅ Input a name like `Button` or a nested path like `components/Button`.
- ✅ Automatically creates the directory structure and files.
- ✅ Supports customizable file templates via `.vscode/settings.json`.
- ✅ If no folder is selected, components are created in the workspace root.

## 📦 Generated Files

By default, when you generate a component named `Button`, the following files are created:

```
components/
└── Button/
    ├── Button.tsx
    ├── Button.module.scss
    └── index.ts
```

All contents are customizable.

## ⚙️ Custom Templates

You can override the default templates in your workspace settings.

### Example:

```jsonc
// .vscode/settings.json
{
  "new-component-generator.templates": {
    "{{ComponentName}}.tsx": "import React from \"react\";\n\ntype {{ComponentName}}Props = {};\n\nfunction {{ComponentName}}({}: {{ComponentName}}Props) {\n  return (\n    <div className=\"\">\n      {{ComponentName}}\n    </div>\n  );\n}\n\nexport default {{ComponentName}};\n",
    "index.ts": "export { default } from \"./{{ComponentName}}\";\n"
  }
}
```

- Use `{{ComponentName}}` as a placeholder in your templates.
- You can define any filenames and contents.

## 🚀 How to Use

- Open a folder in VS Code.
- Right-click on a folder in the Explorer and choose Generate Component.
- Enter a component name like MyComponent or shared/Card.
- The component will be generated with the specified templates.
- If you trigger the command via the Command Palette or without right-clicking, the component will be created in the root of the workspace.

## 🧱 Requirements

- VS Code version ^1.70.0 or later.
- Node.js if you want to build it locally.

## 📸 Demo
![demo-generate-component](https://raw.githubusercontent.com/baoloc008/component-generator/main/src/assets/demo-generate-component.gif)

## 📝 License

MIT
