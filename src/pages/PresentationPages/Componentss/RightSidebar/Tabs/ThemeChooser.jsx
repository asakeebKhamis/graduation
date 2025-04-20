import { useTheme } from "next-themes";
import React from "react";
import { useStore } from "../../../../../context/StoreContext";
import { themes } from "../../../../../utils/constants";
import { Button } from "../../../../../components/ui/button";
import { toast } from "sonner";

export default function ThemeChooser() {
  const { currentTheme, setCurrentTheme, project } = useStore();
  const { setTheme } = useTheme();

  const handleThemeChange = async (theme) => {
    // if (!project) {
    //   toast.error("Error", {
    //     description: "Failed to update theme",
    //   });
    //   return;
    // }
    setTheme(theme.type);
    setCurrentTheme(theme);

    try {
      //   const res = await updateTheme();
    } catch (error) {}
  };

  return (
    <div className="h-[480px] overflow-auto">
      <div className="mb-4 text-center font-bold">Themes</div>
      <div className="flex flex-col space-y-4">
        {themes.map((theme) => (
          <Button
            key={theme.name}
            variant={currentTheme.name === theme.name ? "default" : "outline"}
            className="flex flex-col items-center justify-start px-4 w-full h-auto"
            onClick={() => handleThemeChange(theme)}
            style={{
              fontFamily: theme.fontFamily,
              color: theme.fontColor,
              background: theme.gradientBackground || theme.backgroundColor,
            }}
          >
            <div className="w-full flex items-center justify-between">
              <span className="text-xl font-bold">{theme.name}</span>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.accentColor }}
              />
            </div>
            <div className="space-y-1 w-full">
              <div
                className="text-2xl font-bold"
                style={{ color: theme.accentColor }}
              >
                Title
              </div>
              <div className="text-base opacity-80">
                Body & <span style={{ color: theme.accentColor }}>Link</span>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
