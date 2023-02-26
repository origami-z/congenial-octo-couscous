import {
  Sandpack,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { MonacoEditor } from "./MonacoEditor";
import { dependencies, DEFAULT_FILES } from "./custom-setup";
import "./App.css";
import { ExportButton } from "./ExportButton";
import { getInitialFiles } from "./utils";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";

const MutableKeyMap = completionKeymap.slice();

const CustomLayout = () => {
  return (
    <SandpackLayout>
      <SandpackLayout>
        <SandpackFileExplorer />
        <SandpackCodeEditor
          closableTabs
          showLineNumbers
          extensions={[autocompletion()]}
          extensionsKeymap={MutableKeyMap}
        />
      </SandpackLayout>
      <SandpackPreview actionsChildren={<ExportButton />} />
    </SandpackLayout>
  );
};

const App = () => {
  const defaultFiles = getInitialFiles(DEFAULT_FILES);

  return (
    <SandpackProvider
      template="react-ts"
      theme="light"
      customSetup={{
        dependencies,
      }}
      files={defaultFiles}
      options={{
        classes: {
          "sp-wrapper": "custom-wrapper",
          "sp-layout": "custom-layout",
          "sp-tab-button": "custom-tab",
        },
        // Custom bundler URL: https://sandpack.codesandbox.io/docs/guides/hosting-the-bundler
        // bundlerURL: ''
      }}
    >
      <CustomLayout />
    </SandpackProvider>
  );
};
export default App;
