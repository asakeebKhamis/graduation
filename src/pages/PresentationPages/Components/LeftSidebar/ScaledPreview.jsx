import { useStore } from "../../../../context/StoreContext";
import { cn } from "../../../../lib/utils";
import { MasterRecursiveComponent } from "../Editor/MasterRecursiveComponent";

const ScaledPreview = ({ index, isActive, slide }) => {
  const { currentTheme } = useStore();

  return (
    <div
      className={cn(
        "w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200 p-2 ring-2 ring-primary ring-offset-2",
        isActive
          ? "ring-2 ring-blue-500 ring-offset-2"
          : "hover:ring-2 hover:ring-gray-200 hover:ring-offset-2"
      )}
      style={{
        fontFamily: currentTheme.fontFamily,
        color: currentTheme.accentColor,
        backgroundColor: currentTheme.slideBackgroundColor,
        backgroundImage: currentTheme.gradientBackground,
      }}
    >
      <div className="scale-[0.25] origin-top-left w-[400%] h-[400%] overflow-hidden">
        <MasterRecursiveComponent
          slideId={slide.id}
          content={slide.content}
          onContentChange={() => {}}
          isPreview={true}
          isEditable={false}
        />
      </div>
    </div>
  );
};

export default ScaledPreview;
