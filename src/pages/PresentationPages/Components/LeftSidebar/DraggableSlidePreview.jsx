import { useDrag, useDrop } from "react-dnd";
import { useStore } from "../../../../context/StoreContext";
import { useRef } from "react";
import { cn } from "../../../../lib/utils";
import ScaledPreview from "./ScaledPreview";

const DraggableSlidePreview = ({ index, moveSlide, slide }) => {
  const { currentSlide, setCurrentSlide } = useStore();
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "SLIDE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "SLIDE",
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveSlide(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={cn(
        "relative cursor-pointer group",
        index === currentSlide ? "before:bg-blue-500" : "before:bg-transparent",
        isDragging ? "opacity-50" : "opacity-100"
      )}
      onClick={() => setCurrentSlide(index)}
    >
      <div className="pl-2 mb-4 relative">
        <ScaledPreview 
          slide={slide}
          isActive={index === currentSlide}
          index={index}
        />
      </div>
    </div>
  );
};

export default DraggableSlidePreview;
