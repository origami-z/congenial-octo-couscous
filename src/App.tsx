import { FlexItem, FlexLayout } from "@salt-ds/core";
import { ColorPickers } from "./ColorPickers";
import { CustomSandpack } from "./CustomSandpack";
import { useState } from "react";

import "./App.css";

const defaultTheme = {
  interact: {
    cta: { background: "#D65513" },
    background: { active: "#a4d5f4" },
  },
};

const App = () => {
  const [customTheme, setCustomTheme] = useState<any>(defaultTheme);
  return (
    <FlexLayout>
      <ColorPickers
        themeObj={customTheme}
        onThemeObjChange={(newTheme) => setCustomTheme(newTheme)}
      />
      <FlexItem grow={1}>
        <CustomSandpack themeObj={customTheme} />
      </FlexItem>
    </FlexLayout>
  );
};
export default App;
