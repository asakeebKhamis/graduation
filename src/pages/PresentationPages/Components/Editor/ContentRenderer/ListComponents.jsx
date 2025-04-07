import { useStore } from "../../../../../context/StoreContext";
import { cn } from "../../../../../lib/utils";
import { Input } from "src/components/ui/input";

const ListItem = ({
  item,
  index,
  onChange,
  onKeyDown,
  isEditable,
  fontColor,
}) => (
  <Input
    type="text"
    value={item}
    onChange={(e) => onChange(index, e.target.value)}
    onKeyDown={(e) => onKeyDown(e, index)}
    className="bg-transparent outline-none w-full py-1"
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

// TodoList component
const TodoList = ({ items, onChange, className, isEditable = true }) => {
  const { currentTheme } = useStore();

  const toggleCheckbox = (index) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] = newItems[index].startsWith("[x] ")
        ? newItems[index].replace("[x] ", "[ ] ")
        : newItems[index].replace("[ ] ", "[x] ");
      onChange(newItems);
    }
  };

  const handleChange = (index, value) => {
    if (isEditable) {
      const newItems = [...items];
      newItems[index] =
        value.startsWith("[ ] ") || value.startsWith("[x] ")
          ? value
          : `[ ] ${value}`;
      onChange(newItems);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, "[ ] ");
      onChange(newItems);
      setTimeout(() => {
        const nextInput = document.querySelector(
          `li:nth-child(${index + 2}) input[type="text"]`
        );
        if (nextInput) nextInput.focus();
      }, 0);
    } else if (
      e.key === "Backspace" &&
      items[index].replace(/^\[[ x]\] /, "") === "" &&
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
      className={cn("space-y-1", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={item.startsWith("[x] ")}
            onChange={() => toggleCheckbox(index)}
            className="form-checkbox"
            disabled={!isEditable}
          />
          <ListItem
            item={item.replace(/^\[[ x]\] /, "")}
            index={index}
            onChange={(index, value) =>
              handleChange(
                index,
                `${item.startsWith("[x] ") ? "[x] " : "[ ] "}${value}`
              )
            }
            onKeyDown={handleKeyDown}
            isEditable={isEditable}
            fontColor={currentTheme.fontColor}
          />
        </li>
      ))}
    </ul>
  );
};

export { BulletList, NumberedList, TodoList };
