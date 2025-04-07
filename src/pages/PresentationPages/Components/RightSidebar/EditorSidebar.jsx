import { LayoutTemplate, Palette, Type } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useStore } from "../../../../context/StoreContext";
import LayoutChooser from "./Tabs/LayoutChooser";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { components } from "../../../../utils/constants";
import ComponentCard from "./Tabs/ComponentTabs/ComponentPreview";
import ThemeChooser from "./Tabs/ThemeChooser";

const EditorSidebar = (props) => {
  const { currentTheme } = useStore();
  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-10">
      <div
        className="rounded-xl border-r-0 border border-background-70 shadow-lg p-2 flex flex-col items-center space-y-4"
        style={{
          backgroundColor: currentTheme.sidebarBackground,
          borderColor: currentTheme.borderColor,
        }}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
            >
              <LayoutTemplate className="h-5 w-5" />
              <span className="sr-only">Choose Layout</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="left"
            align="center"
            className="w-[480px] p-0"
            style={{
              backgroundColor: currentTheme.backgroundColor,
              color: currentTheme.fontColor,
            }}
          >
            <LayoutChooser />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
            >
              <Type className="h-5 w-5" />
              <span className="sr-only">Type Layout</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="left"
            align="center"
            className="w-[480px] p-0 h-[400px] overflow-auto"
            style={{
              backgroundColor: currentTheme.backgroundColor,
              color: currentTheme.fontColor,
            }}
          >
            {components.map((group) => (
              <div className="space-y-2" key={group.name}>
                <h3 className="text-sm font-medium text-muted-foreground px-1">
                  {group.name}
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {group.components.map((item) => (
                    <ComponentCard key={item.componentType} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
            >
              <Palette className="h-5 w-5" />
              <span className="sr-only">CHange Style</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="left"
            align="center"
            className="w-80 p-2 overflow-auto"
            style={{
              backgroundColor: currentTheme.backgroundColor,
              color: currentTheme.fontColor,
            }}
          >
            <ThemeChooser />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default EditorSidebar;
