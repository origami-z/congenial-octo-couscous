import { SandpackState } from "@codesandbox/sandpack-react";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

export const compressFiles = (files: SandpackState["files"]) => {
  const filesJsonString = JSON.stringify(files);
  const compressed = compressToEncodedURIComponent(filesJsonString);
  return compressed;
};

/**
 * Copied from
 * https://github.com/microsoft/TypeScript-Website/blob/f189f5bcb676dcf6ff04966192593fa40942c62f/packages/playground/src/createUI.ts
 */
const flashInfo = (message: string, timeout = 1000) => {
  let flashBG = document.getElementById("flash-bg");
  if (flashBG) {
    flashBG.parentElement?.removeChild(flashBG);
  }

  flashBG = document.createElement("div");
  flashBG.id = "flash-bg";

  const p = document.createElement("p");
  p.textContent = message;
  flashBG.appendChild(p);
  document.body.appendChild(flashBG);

  setTimeout(() => {
    flashBG?.parentElement?.removeChild(flashBG);
  }, timeout);
};

const PARAM_PREFIX = "#files/";

export const shareFiles = (files: SandpackState["files"]) => {
  const compressed = compressFiles(files);
  const newURL = PARAM_PREFIX + compressed;

  console.log("compressed length", compressed.length);
  console.log({ compressed, newURL });

  // Update the URL, then write that to the clipboard
  window.history.replaceState({}, "", newURL);
  window.navigator.clipboard.writeText(location.href.toString()).then(
    () => flashInfo("URL copied to clipboard"),
    (e: any) => alert(e)
  );
};

export const getInitialFiles = (fallback: SandpackState["files"]) => {
  if (location.hash.startsWith(PARAM_PREFIX)) {
    const compressedCode = location.hash.replace(PARAM_PREFIX, "").trim();
    if (compressedCode) {
      const decoded = decompressFromEncodedURIComponent(compressedCode);
      if (decoded) {
        try {
          const files = JSON.parse(decoded);
          return files;
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
  return fallback;
};
