import { FlexItem } from "@salt-ds/core";
import { Color, ColorChooser } from "@salt-ds/lab";
import { useCallback, useState } from "react";

const defaultColor = Color.makeColorFromHex("#D65513");

const IndividualPicker = ({
  hex,
  onHexChange,
}: {
  hex: string;
  onHexChange?: (newHex: string) => void;
}) => {
  const [selectedColor, setSelectedColor] = useState(
    Color.makeColorFromHex(hex)
  );
  const onSelect = useCallback(
    (color?: Color) => {
      setSelectedColor(color);
      if (color) {
        onHexChange?.(color.hex);
      }
    },
    [setSelectedColor]
  );
  const onClear = () => {
    setSelectedColor(defaultColor);
  };
  return (
    <ColorChooser color={selectedColor} onSelect={onSelect} onClear={onClear} />
  );
};

const ThemeTokens = ({
  themeObj,
  onThemeObjChange,
}: {
  themeObj: any;
  onThemeObjChange?: (newThemeObj: any) => void;
}) => {
  if (typeof themeObj === "string") {
    return (
      <div>
        <IndividualPicker
          hex={themeObj}
          onHexChange={(newHex) => onThemeObjChange?.(newHex)}
        />
      </div>
    );
  } else if (typeof themeObj === "object") {
    const allKeys = Object.keys(themeObj);
    return (
      <div>
        {allKeys.map((k) => {
          return (
            <>
              <strong>{k}</strong>
              <ThemeTokens
                themeObj={themeObj[k]}
                onThemeObjChange={(newObj) => {
                  const updatedObj = { ...themeObj, [k]: newObj };
                  onThemeObjChange?.(updatedObj);
                }}
              />
            </>
          );
        })}
      </div>
    );
  }

  return null;
};

export const ColorPickers = ({
  themeObj,
  onThemeObjChange,
}: {
  themeObj: any;
  onThemeObjChange?: (newThemeObj: any) => void;
}) => {
  return (
    <FlexItem grow={1}>
      {/* <div>Choose colors</div> */}
      <h1>Custom Theme</h1>
      <div>
        <ThemeTokens themeObj={themeObj} onThemeObjChange={onThemeObjChange} />
      </div>
    </FlexItem>
  );
};
