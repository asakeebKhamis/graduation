import { motion } from "framer-motion";
import React, { useCallback, useEffect } from "react";
import { cn } from "../../../../lib/utils";
import BlockQuote from "./ContentRenderer/BlockQuote";
import CalloutBox from "./ContentRenderer/CalloutBox";
import CodeBlock from "./ContentRenderer/CodeBlock";
import ColumnComponent from "./ContentRenderer/ColumnComponent";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from "./ContentRenderer/Headings";
import CustomImage from "./ContentRenderer/ImageComponent";
import {
  BulletList,
  NumberedList,
  TodoList,
} from "./ContentRenderer/ListComponents";
import Paragraph from "./ContentRenderer/Paragraph";
import TableComponent from "./ContentRenderer/TableComponent";
import DropZone from "./DropZone";
import TableOfContents from "./ContentRenderer/TableOfContents";
import Divider from "./ContentRenderer/Divider";
import { useStore } from "../../../../context/StoreContext";
import { Trash2 } from "lucide-react";
import { Button } from "src/components/ui/button";

const ContentRenderer = React.memo(
  ({ content, onContentChange, slideId, index, isPreview, isEditable }) => {
    const handleChange = useCallback(
      (e) => {
        onContentChange(content.id, e.target.value);
      },
      [content.id, onContentChange]
    );
    const { removeComponentFromSlide } = useStore();

    const handleDelete = (e) => {
      e.stopPropagation();
      removeComponentFromSlide(slideId, content.id);
    };

    const commonProps = {
      placeholder: content.placeholder,
      value: content.content,
      onChange: handleChange,
      isPreview: isPreview,
    };

    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    };

    const deleteBtn = !isPreview && (
      <Button
        onClick={handleDelete}
        aria-label="Delete element"
        className=" opacity-100 transition-opacity duration-200 group-hover:opacity-100 bg-destructive hover:bg-destructive/80 text-white text-xs font-medium p-2"
      >
        <Trash2 className="size-4" />
      </Button>
    );

    switch (content.type) {
      case "heading1":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <Heading1 {...commonProps} />
          </motion.div>
        );
      case "heading2":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <Heading2 {...commonProps} />
          </motion.div>
        );
      case "heading3":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <Heading3 {...commonProps} />
          </motion.div>
        );
      case "heading4":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <Heading4 {...commonProps} />
          </motion.div>
        );
      case "title":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <Title {...commonProps} />
          </motion.div>
        );
      case "paragraph":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <Paragraph {...commonProps} />
          </motion.div>
        );
      case "table":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <TableComponent
              content={content.content}
              onChange={(newContent) =>
                onContentChange(
                  content.id,
                  newContent != null ? newContent : ""
                )
              }
              initialColSize={content.initialColumns}
              initialRowSize={content.initialRows}
              isPreview={isPreview}
              isEditable={isEditable}
            />
          </motion.div>
        );
      case "resizable-column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              {...animationProps}
              className="w-full h-full my-1"
            >
              <ColumnComponent
                content={content.content}
                className={content.className}
                onContentChange={onContentChange}
                slideId={slideId}
                isPreview={isPreview}
                isEditable={isEditable}
              />
            </motion.div>
          );
        }
        return null;
      case "image":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <CustomImage
              src={content.content}
              alt={content.alt || "image"}
              className={content.className}
              isPreview={isPreview}
              contentId={content.id}
              onContentChange={onContentChange}
              isEditable={isEditable}
            />
          </motion.div>
        );
      case "blockquote":
        return (
          <motion.div
            {...animationProps}
            className={cn("w-full h-full my-1", content.className)}
          >
            <BlockQuote>
              <Paragraph {...commonProps} />
            </BlockQuote>
          </motion.div>
        );
      case "numberedList":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <NumberedList
              items={content.content}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
              isEditable={isEditable}
            />
          </motion.div>
        );
      case "bulletList":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <BulletList
              items={content.content}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
              isEditable={isEditable}
            />
          </motion.div>
        );
      case "todolist":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <TodoList
              items={content.content}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
              isEditable={isEditable}
            />
          </motion.div>
        );
      case "calloutBox":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <CalloutBox
              type={content.callOutType || "info"}
              className={content.className}
            >
              <Paragraph {...commonProps} />
            </CalloutBox>
          </motion.div>
        );
      case "codeBlock":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <CodeBlock
              code={content.code}
              language={content.language}
              onChange={(newCode) => onContentChange(content.id, newCode)}
              className={content.className}
              isEditable={isEditable}
            />
          </motion.div>
        );
      case "tableOfContents":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <TableOfContents
              items={content.content}
              onItemClick={(id) => {
                console.log(`Navigate to section: ${id}`);
                // Add actual navigation logic here
              }}
              className={content.className}
            />
          </motion.div>
        );
      case "divider":
        return (
          <motion.div
            {...animationProps}
            className="w-full h-full my-1"
          >
            <Divider className={content.className} />
          </motion.div>
        );
      case "column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              {...animationProps}
              className={cn("w-full flex flex-col", content.className)}
            >
              {content.content.length > 0 ? (
                content.content.map((subItem, subIndex) => (
                  <React.Fragment key={subItem.id || `item-${subIndex}`}>
                    {!!isPreview &&
                      !subItem.restrictToDrop &&
                      subIndex === 0 &&
                      isEditable && (
                        <DropZone
                          index={0}
                          parentId={content.id}
                          slideId={slideId}
                        />
                      )}
                    <MasterRecursiveComponent
                      content={subItem}
                      onContentChange={onContentChange}
                      isPreview={isPreview}
                      slideId={slideId}
                      index={subIndex}
                      isEditable={isEditable}
                    />
                    {!isPreview && !subItem.restrictToDrop && isEditable && (
                      <DropZone
                        index={subIndex + 1}
                        parentId={content.id}
                        slideId={slideId}
                      />
                    )}
                  </React.Fragment>
                ))
              ) : isEditable ? (
                <DropZone index={0} parentId={content.id} slideId={slideId} />
              ) : null}
            </motion.div>
          );
        }

        return null;
      default:
        return null;
    }
  }
);

ContentRenderer.displayName = "ContentRenderer";

export const MasterRecursiveComponent = React.memo(
  ({
    content,
    onContentChange,
    slideId,
    index,
    isPreview = false,
    isEditable = true,
  }) => {
    if (isPreview) {
      return (
        <ContentRenderer
          content={content}
          onContentChange={onContentChange}
          isPreview={isPreview}
          isEditable={isEditable}
          slideId={slideId}
          index={index}
        />
      );
    }
    return (
      <React.Fragment>
        <ContentRenderer
          content={content}
          onContentChange={onContentChange}
          isPreview={isPreview}
          isEditable={isEditable}
          slideId={slideId}
          index={index}
        />
      </React.Fragment>
    );
  }
);

MasterRecursiveComponent.displayName = "MasterRecursiveComponent";
