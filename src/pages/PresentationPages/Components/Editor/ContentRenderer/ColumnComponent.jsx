import React, { useEffect, useState } from "react";
import { cn } from "../../../../../lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "src/components/ui/resizable";
import { MasterRecursiveComponent } from "../MasterRecursiveComponent";

const ColumnComponent = ({
  content,
  className,
  slideId,
  onContentChange,
  isPreview = false,
  isEditable = true,
}) => {
  const [columns, setColumns] = useState([]);

  const createDefaultColumns = (count) => {
    return Array(count)
      .fill(null)
      .map(() => ({
        id: Math.random().toString(36).substring(2),
        type: "paragraph",
        name: "Paragraph",
        content: "",
        placeholder: "Start typing...",
      }));
  };

  useEffect(() => {
    if (content.length === 0) {
      setColumns(createDefaultColumns(2));
    } else {
      setColumns(content);
    }
  }, [content]);

  return (
    <div className="relative w-full h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className={cn("h-full w-full", !isEditable && "!border-0", className)}
      >
        {columns.map((item, index) => (
          <React.Fragment key={item.id}>
            <ResizablePanel minSize={20} defaultSize={100 / columns.length}>
              <div className={cn("h-full w-full", item.className)}>
                <MasterRecursiveComponent
                  content={item}
                  isPreview={isPreview}
                  onContentChange={onContentChange}
                  slideId={slideId}
                  isEditable={isEditable}
                />
              </div>
            </ResizablePanel>
            {index < columns.length - 1 && isEditable && (
              <ResizableHandle withHandler={!isPreview} />
            )}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default ColumnComponent;
