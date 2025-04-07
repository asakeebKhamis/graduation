import React, { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "../../../../context/StoreContext";
import { cn } from "../../../../lib/utils";
import { useDrag, useDrop } from "react-dnd";
import { Skeleton } from "src/components/ui/skeleton";
import { MasterRecursiveComponent } from "./MasterRecursiveComponent";
import { EllipsisVertical, Trash } from "lucide-react";
import { Button } from "src/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";

export const DropZone = ({ index, onDrop, isEditable }) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ["SLIDE", "layout"],
    drop: (item) => {
      onDrop(item, index);
    },
    canDrop: () => isEditable,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  if (!isEditable) return null;

  return (
    <div
      className={cn(
        "h-4 my-2 rounded-md transition-all duration-200",
        isOver && canDrop ? "border-green-500 bg-green-100" : "border-gray-300",
        canDrop ? "border-blue-300" : ""
      )}
      ref={dropRef}
    >
      {isOver && canDrop && (
        <div className="h-full flex items-center justify-center text-green-600">
          Drop Here
        </div>
      )}
    </div>
  );
};

export const DraggableSlide = ({
  slide,
  index,
  moveSlide,
  handleDelete,
  isEditable,
}) => {
  const ref = useRef(null);
  const { currentSlide, setCurrentSlide, currentTheme, updateContentItem } =
    useStore();

  const [{ isDragging }, drag] = useDrag({
    type: "SLIDE",
    item: {
      index,
      type: "SLIDE",
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isEditable,
  });

  const [_, drop] = useDrop({
    accept: ["SLIDE", "LAYOUT"],
    hover(item) {
      if (!ref.current || !isEditable) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (item.type === "SLIDE" && dragIndex !== hoverIndex) {
        moveSlide(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  drag(drop(ref));

  const handleContentChange = (contentId, newContent) => {
    console.log("Content changed", slide, contentId, newContent);
    if (isEditable) {
      updateContentItem(slide.id, contentId, newContent);
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "w-full rounded-lg shadow-lg relative p-0 min-h-[400px] max-h-[800px]",
        "shadow-xl transition-shadow duration-300",
        "flex flex-col",
        index === currentSlide ? "ring-2 ring-blue-500 ring-offset-2" : "",
        slide.className,
        isDragging ? "opacity-50" : "opacity-100"
      )}
      style={{
        backgroundImage: currentTheme.gradientBackground,
      }}
      onClick={() => setCurrentSlide(index)}
    >
      <div className="h-full w-full flex-grow overflow-hidden">
        <MasterRecursiveComponent
          content={slide.content}
          isPreview={false}
          slideId={slide.id}
          isEditable={isEditable}
          onContentChange={handleContentChange}
        />

        {isEditable && (
          <Popover>
            <PopoverTrigger asChild className="absolute top-2 left-2">
              <Button size="sm" variant="outline">
                <EllipsisVertical className="w-5 h-5" />
                <span className="sr-only">Slide options</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0">
              <div className="flex space-x-2">
                <Button variant="ghost" onClick={() => handleDelete(slide.id)}>
                  <Trash className="w-5 h-5 text-red-500" />
                  <span className="sr-only">Delete slide</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

const Editor = ({ isEditable }) => {
  const [loading, setLoading] = useState(true);

  const {
    getOrderedSlides,
    currentSlide,
    removeSlide,
    addSlideAtIndex,
    reorderSlides,
    slides,
    project,
  } = useStore();

  const orderedSlides = getOrderedSlides();
  const slideRefs = useRef(null);

  const moveSlide = (dragIndex, hoverIndex) => {
    if (isEditable) {
      reorderSlides(dragIndex, hoverIndex);
    }
  };

  const handleDrop = (item, dropIndex) => {
    if (!isEditable) return;
    if (item.type == "layout") {
      addSlideAtIndex(
        {
          ...item.component,
          id: Math.random().toString(36).substring(2),
          slideOrder: dropIndex,
        },
        dropIndex
      );
    } else if (item.type === "SLIDE" && item.index !== undefined) {
      moveSlide(item.index, dropIndex);
    }
  };

  const handleDelete = (id) => {
    if (isEditable) {
      console.log("Deleting", id);
      removeSlide(id);
    }
  };

  useEffect(() => {
    if (slideRefs.current?.[currentSlide]) {
      slideRefs.current[currentSlide]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSlide]);

  const autosaveTimeoutRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);

  const saveSlides = useCallback(async () => {
    if (!isEditable || !project) return;

    try {
      setIsSaving(true);
      // await updateSlides(project.id, JSON.parse(JSON.stringify(slides)));
    } catch (error) {
      console.error("Failed to save slides:", error);
    } finally {
      setIsSaving(false);
    }
  }, [isEditable, project, slides]);

  useEffect(() => {
    // Clear existing timer if any
    if (autosaveTimeoutRef.current) {
      clearTimeout(autosaveTimeoutRef.current);
    }

    // Set up new autosave timer if editable
    if (isEditable) {
      autosaveTimeoutRef.current = setTimeout(() => {
        saveSlides();
      }, 2000); // 2 second debounce
    }

    // Cleanup on unmount or dependency change
    return () => {
      if (autosaveTimeoutRef.current) {
        clearTimeout(autosaveTimeoutRef.current);
      }
    };
  }, [slides, isEditable, project, saveSlides]);

  useEffect(() => {
    if (typeof window !== "undefined") setLoading(false);
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full max-v-3x1 mx-auto px-4 mb-20">
      {loading ? (
        <div className="w-full px-4 flex flex-col space-y-6">
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
        </div>
      ) : (
        <div className="flex-1 mt-8 overflow-auto">
          <div className="px-4 pb-4 space-y-4 pt-2">
            {isEditable && (
              <DropZone index={0} onDrop={handleDrop} isEditable={isEditable} />
            )}

            {orderedSlides.map((slide, index) => (
              <React.Fragment key={slide.id || index}>
                <DraggableSlide
                  slide={slide}
                  index={index}
                  moveSlide={moveSlide}
                  handleDelete={handleDelete}
                  isEditable={isEditable}
                />
                \
                {isEditable && (
                  <DropZone
                    index={index + 1}
                    onDrop={handleDrop}
                    isEditable={isEditable}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
