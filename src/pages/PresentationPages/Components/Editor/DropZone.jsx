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
        "h-3 w-full transition-all duration-200",
        isOver && canDrop ? "border-blue-500 bg-blue-100" : "border-gray-300",
        "hover:border-blue-300"
      )}
    >
      {isOver && canDrop && (
        <div className="w-full h-full flex text-sm items-center justify-center text-green-600">
          Drop here
        </div>
      )}
    </div>
  );
};

export default DropZone;
