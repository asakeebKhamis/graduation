"use client";

import { useStore } from "../../../../../context/StoreContext";
import { cn } from "../../../../../lib/utils";

const ListItem = ({
  item,
  index,
  onChange,
  onKeyDown,
  isEditable,
  fontColor,
}) => (
  <input
    type="text"
    value={item}
    onChange={(e) => onChange(index, e.target.value)}
    onKeyDown={(e) => onKeyDown(e, index)}
    className="bg-transparent outline-none py-1"
    style={{ color: fontColor }}
    readOnly={!isEditable}
  />
);

const NumberedList = ({ items, onChange, className, isEditable = true }) => {
  const { currentTheme } = useStore();

  const handleChange = (index, value) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = value;
      onChange(newItems);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "");
      onChange(newItems);
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        );
        if (nextInput) nextInput.focus();
      }, 0);
    } else if (
      e.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
    ) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index, 1);
      onChange(newItems);
    }
  };

  return (
    <ol
      className={cn("list-decimal list-inside space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li key={index}>
          <ListItem
            item={item}
            index={index}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            isEditable={isEditable}
            fontColor={currentTheme.fontColor}
          />
        </li>
      ))}
    </ol>
  );
};

const BulletList = ({ items, onChange, className, isEditable = true }) => {
  const { currentTheme } = useStore();

  const handleChange = (index, value) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = value;
      onChange(newItems);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "");
      onChange(newItems);
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input`
        );
        if (nextInput) nextInput.focus();
      }, 0);
    } else if (
      e.key === "Backspace" &&
      items[index] === "" &&
      items.length > 1
    ) {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index, 1);
      onChange(newItems);
    }
  };

  return (
    <ul
      className={cn("list-disc pl-5 space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li key={index} className="pl-1 marker:text-current">
          <ListItem
            item={item}
            index={index}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            isEditable={isEditable}
            fontColor={currentTheme.fontColor}
          />
        </li>
      ))}
    </ul>
  );
};

// Fixed TodoList component
const TodoList = ({ items, onChange, className, isEditable = true }) => {
  const { currentTheme } = useStore();

  // Ensure items are in the correct format
  const normalizeItems = (items) => {
    if (!Array.isArray(items)) return [{ text: "", checked: false }];

    return items.map((item) => {
      if (typeof item === "string") {
        // Convert string format to object format
        return {
          text: item.replace(/^\[[ x]\] /, ""),
          checked: item.startsWith("[x] "),
        };
      }
      // Already in object format or invalid format
      return item && typeof item === "object"
        ? item
        : { text: "", checked: false };
    });
  };

  const normalizedItems = normalizeItems(items);

  const toggleCheckbox = (index) => {
    if (isEditable) {
      const newItems = [...normalizedItems];
      newItems[index] = {
        ...newItems[index],
        checked: !newItems[index].checked,
      };
      onChange(newItems);
    }
  };

  const handleChange = (index, value) => {
    if (isEditable) {
      const newItems = [...normalizedItems];
      newItems[index] = {
        ...newItems[index],
        text: value,
      };
      onChange(newItems);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...normalizedItems];
      newItems.splice(index + 1, 0, { text: "", checked: false });
      onChange(newItems);
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input[type="text"]`
        );
        if (nextInput) nextInput.focus();
      }, 0);
    } else if (
      e.key === "Backspace" &&
      normalizedItems[index].text === "" &&
      normalizedItems.length > 1
    ) {
      e.preventDefault();
      const newItems = [...normalizedItems];
      newItems.splice(index, 1);
      onChange(newItems);
    }
  };

  return (
    <ul
      className={cn("space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {normalizedItems.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => toggleCheckbox(index)}
            className="form-checkbox"
            disabled={!isEditable}
          />
          <input
            type="text"
            value={item.text || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="bg-transparent outline-none w-full py-1"
            style={{ color: currentTheme.fontColor }}
            readOnly={!isEditable}
          />
        </li>
      ))}
    </ul>
  );
};

export { BulletList, NumberedList, TodoList };
