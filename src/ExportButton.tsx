import { useActiveCode, useSandpack } from "@codesandbox/sandpack-react";
import { compressFiles, shareFiles } from "./utils";

export const ExportButton = () => {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const { activeFile, files } = sandpack;

  //   console.log({ sandpack, files });
  const extension = activeFile.slice(activeFile.lastIndexOf(".") + 1); // js

  const handleClick = () => {
    shareFiles(files);
  };
  return <button onClick={handleClick}>Share</button>;
};
