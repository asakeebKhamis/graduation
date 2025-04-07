import { useStore } from "../../../../../context/StoreContext";
import { cn } from "../../../../../lib/utils";

const TableOfContents = ({ items, onItemClick, className }) => {
  const { currentTheme } = useStore();

  return (
    <nav
      className={cn("space-y-2", className)}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className={cn("cursor-pointer hover:underline transition-colors")}
          onClick={() => onItemClick(item.id)}
        >
          {item}
        </div>
      ))}
    </nav>
  );
};

export default TableOfContents;
