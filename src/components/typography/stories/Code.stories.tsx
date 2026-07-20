import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../Code';

const meta: Meta<typeof Code> = {
    title: 'Typography/Code',
    component: Code,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        language: {
            control: 'select',
            options: ['javascript', 'typescript', 'python', 'php', 'html', 'css', 'json', 'bash', ''],
        },
        inline: { control: 'boolean' },
        showLineNumbers: { control: 'boolean' },
        copyable: { control: 'boolean' },
        highlight: { control: 'boolean' },
        wrap: { control: 'boolean' },
        maxHeight: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof Code>;

const jsCode = `function greet(name) {
  return \`Hello, \${name}!\`;
}

const result = greet('World');
console.log(result);`;

const tsCode = `interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json());
}`;

const phpCode = `<?php

namespace App\\Services;

class UserService
{
    public function find(int $id): ?User
    {
        return User::find($id);
    }
}`;

const htmlCode = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ma page</title>
</head>
<body>
    <h1>Bonjour le monde</h1>
</body>
</html>`;

const cssCode = `.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: var(--background);
}

.container:hover {
  transform: translateY(-2px);
}`;

const jsonCode = `{
  "name": "aurora-ui",
  "version": "1.0.0",
  "description": "Modern React component library",
  "dependencies": {
    "react": "^18.2.0",
    "tailwindcss": "^3.4.0"
  }
}`;

const longCode = `// Ceci est un très long commentaire qui pourrait être tronqué ou enveloppé
const veryLongVariableName = {
  property1: 'value1',
  property2: 'value2',
  property3: 'value3',
  property4: 'value4',
  property5: 'value5',
  property6: 'value6',
  property7: 'value7',
  property8: 'value8',
  property9: 'value9',
  property10: 'value10'
};

function veryLongFunctionName(param1, param2, param3, param4, param5) {
  // Cette fonction a beaucoup de paramètres et de code
  const result = param1 + param2 + param3 + param4 + param5;
  return result;
}`;

export const JavaScript: Story = {
    args: {
        children: jsCode,
        language: 'javascript',
        copyable: true,
    },
};

export const TypeScript: Story = {
    args: {
        children: tsCode,
        language: 'typescript',
        copyable: true,
    },
};

export const PHP: Story = {
    args: {
        children: phpCode,
        language: 'php',
        copyable: true,
    },
};

export const HTML: Story = {
    args: {
        children: htmlCode,
        language: 'html',
        copyable: true,
    },
};

export const CSS: Story = {
    args: {
        children: cssCode,
        language: 'css',
        copyable: true,
    },
};

export const JSON: Story = {
    args: {
        children: jsonCode,
        language: 'json',
        copyable: true,
    },
};

export const WithLineNumbers: Story = {
    args: {
        children: jsCode,
        language: 'javascript',
        showLineNumbers: true,
        copyable: true,
    },
};

export const WithoutCopy: Story = {
    args: {
        children: jsCode,
        language: 'javascript',
        copyable: false,
    },
};

export const WithoutHighlight: Story = {
    args: {
        children: jsCode,
        language: 'javascript',
        highlight: false,
        copyable: true,
    },
};

export const WithWrap: Story = {
    args: {
        children: longCode,
        language: 'javascript',
        wrap: true,
        copyable: true,
        className: 'max-w-md',
    },
};

export const WithMaxHeight: Story = {
    args: {
        children: longCode,
        language: 'javascript',
        maxHeight: 200,
        copyable: true,
    },
};

export const WithWrapAndMaxHeight: Story = {
    args: {
        children: longCode,
        language: 'javascript',
        wrap: true,
        maxHeight: 200,
        copyable: true,
        className: 'max-w-md',
    },
};

export const Inline: Story = {
    args: {
        children: 'const result = await fetch("/api");',
        inline: true,
    },
    parameters: {
        layout: 'centered',
    },
};

export const InlineWithColor: Story = {
    render: () => (
        <p className="text-foreground max-w-md">
            Utilisez la fonction <Code inline>useEffect</Code> pour gérer les effets de bord.
            Le type <Code inline language="typescript">Promise&lt;T&gt;</Code> est utilisé pour les appels asynchrones.
            <br />
            <br />
            Exemple d'appel : <Code inline>await getUser(123)</Code>
        </p>
    ),
};

export const MultipleCodes: Story = {
    render: () => (
        <div className="flex flex-col gap-4 max-w-2xl w-full">
            <Code language="javascript" copyable>
                {jsCode}
            </Code>
            <Code language="python" copyable>
                {`def hello(name):
    return f"Hello, {name}!"

print(hello("World"))`}
            </Code>
            <Code language="bash" copyable>
                {`npm install @andy-defer/aurora-ui
npm run build
npm run storybook`}
            </Code>
        </div>
    ),
};

export const AllOptions: Story = {
    args: {
        children: jsCode,
        language: 'javascript',
        showLineNumbers: true,
        copyable: true,
        highlight: true,
        wrap: false,
    },
};