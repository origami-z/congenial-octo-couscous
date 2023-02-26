import { SandpackState } from "@codesandbox/sandpack-react";

export const dependencies = {
  "@salt-ds/core": "latest",
  "@salt-ds/icons": "latest",
  "@salt-ds/lab": "latest",
  "@salt-ds/theme": "latest",
};
export const DEFAULT_FILES: SandpackState["files"] = {
  "/App.tsx": {
    code: `import { Button, SaltProvider, StackLayout } from '@salt-ds/core';
import { ThumbsUpIcon } from '@salt-ds/icons';
import { List } from '@salt-ds/lab';
import "./App.css";

const shortColorData = [
  'Baby blue',
  'Black',
  'Blue',
  'Brown',
  'Green',
  'Orange',
  'Pink',
  'Purple',
  'Red',
  'White',
  'Yellow',
];

export default function App(): JSX.Element {
  return (
    <StackLayout>
      <List source={shortColorData} />
      <Button>
        <ThumbsUpIcon />
      </Button>
    </StackLayout>
  )
}
`,
  },
  "/App.css": {
    code: `h1 {
  color: red;
}`,
  },
  "/public/index.html": {
    code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=PT+Mono&display=swap"
rel="stylesheet"
/>
</head>
<body>
<div id="root"></div>
</body>
</html>`,
    hidden: true,
  },
  "/index.tsx": {
    code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import <SaltProvider>
import { SaltProvider } from "@salt-ds/core";

// Import theme CSS
import "@salt-ds/theme/index.css";

import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
<StrictMode>
<SaltProvider>
<App />
</SaltProvider>
</StrictMode>
);`,
    hidden: true,
  },
};
