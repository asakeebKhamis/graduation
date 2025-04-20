"use client";

import { useStore } from "../../../../../context/StoreContext";
import { cn } from "../../../../../lib/utils";
import { useState } from "react";

const TableOfContents = ({
  items,
  onItemClick,
  className,
  isEditable = true,
}) => {
  const { currentTheme } = useStore();
  const [editableItems, setEditableItems] = useState(
    items || ["Section 1", "Section 2", "Section 3"]
  );

  const handleItemChange = (index, value) => {
    if (!isEditable) return;

    const newItems = [...editableItems];
    newItems[index] = value;
    setEditableItems(newItems);
    // Propagate changes up if needed
    if (typeof onItemClick === "function") {
      onItemClick({ type: "update", items: newItems });
    }
  };

  const handleAddItem = () => {
    if (!isEditable) return;

    const newItems = [...editableItems, `Section ${editableItems.length + 1}`];
    setEditableItems(newItems);
    // Propagate changes up if needed
    if (typeof onItemClick === "function") {
      onItemClick({ type: "update", items: newItems });
    }
  };

  const handleRemoveItem = (index) => {
    if (!isEditable || editableItems.length <= 1) return;

    const newItems = [...editableItems];
    newItems.splice(index, 1);
    setEditableItems(newItems);
    // Propagate changes up if needed
    if (typeof onItemClick === "function") {
      onItemClick({ type: "update", items: newItems });
    }
  };

  return (
    <nav
      className={cn("space-y-2", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {editableItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {isEditable ? (
            <>
              <input
                type="text"
                value={item}
                onChange={(e) => handleItemChange(idx, e.target.value)}
                className="bg-transparent outline-none border-b border-dashed border-gray-300 w-full py-1"
                style={{ color: currentTheme.fontColor }}
              />
              <button
                onClick={() => handleRemoveItem(idx)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ×
              </button>
            </>
          ) : (
            <div
              className={cn("cursor-pointer hover:underline")}
              onClick={() => onItemClick(item)}
            >
              {item}
            </div>
          )}
        </div>
      ))}
      {isEditable && (
        <button
          onClick={handleAddItem}
          className="text-sm text-blue-500 hover:text-blue-700 mt-2"
        >
          + Add section
        </button>
      )}
    </nav>
  );
};

export default TableOfContents;
