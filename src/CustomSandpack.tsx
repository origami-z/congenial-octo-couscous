import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { useState } from "react";
import { DEFAULT_FILES, dependencies } from "./custom-setup";
import { ExportButton } from "./ExportButton";
import { getInitialFiles } from "./utils";

const MutableKeyMap = completionKeymap.slice();

const CustomLayout = () => {
  const [showEditor, setShowEditor] = useState(false);
  return (
    <SandpackLayout>
      {showEditor && (
        <SandpackCodeEditor
          closableTabs
          showLineNumbers
          extensions={[autocompletion()]}
          extensionsKeymap={MutableKeyMap}
        />
      )}
      <SandpackPreview
        actionsChildren={
          <div>
            <button onClick={() => setShowEditor((x) => !x)}>
              {showEditor ? "Hide " : "Show "}Editor
            </button>
            <ExportButton />
          </div>
        }
      />
    </SandpackLayout>
  );
};

const convertThemeObjToCss = (themeObj: any): string[] => {
  if (typeof themeObj === "object") {
    const allKeys = Object.keys(themeObj);
    return allKeys.flatMap((k) => {
      const value = themeObj[k];
      if (typeof value === "object") {
        return convertThemeObjToCss(value).map(
          (mappedCode) => `${k}-${mappedCode}`
        );
      } else if (typeof value === "string") {
        return `${k}: ${value};`;
      } else {
        return "";
      }
    });
  } else {
    return [];
  }
};

export const CustomSandpack = ({ themeObj }: any) => {
  const defaultFiles = getInitialFiles(DEFAULT_FILES);
  const convertedCode = convertThemeObjToCss(themeObj).map(
    (x) => `--salt-palette-${x}`
  );
  console.log({ themeObj, convertedCode });
  const code = `.custom-theme.salt-theme {
  ${convertedCode.join("\n  ")}
}`;
  const files = {
    ...defaultFiles,
    "/App.css": {
      code,
    },
    "/theme.json": {
      code: JSON.stringify(themeObj, null, 2),
    },
  };
  return (
    <SandpackProvider
      template="react-ts"
      theme="light"
      customSetup={{
        dependencies,
      }}
      files={files}
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
