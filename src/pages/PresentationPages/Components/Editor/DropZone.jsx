import { useDrop } from "react-dnd";
import { useStore } from "../../../../context/StoreContext";
import { cn } from "../../../../lib/utils";

const DropZone = ({ index, parentId, slideId }) => {
  const { addComponentInSlide } = useStore();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "CONTENT_ITEM",
    drop: (item) => {
      if (item.type === "component") {
        addComponentInSlide(
          slideId,
          {
            ...item.component,
            id: Math.random().toString(36).substring(2),
          },
          parentId,
          index
        );
        return { handled: true };
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={cn(
        "rounded-md transition-all duration-200",
        isOver && canDrop ? "border bg-muted/80" : "border-gray-300",
        canDrop && "h-20 border bg-muted/80"
      )}
    >
      {isOver && canDrop && (
        <div className="h-full flex items-center justify-center">Drop Here</div>
      )}
    </div>
  );
};

export default DropZone;
