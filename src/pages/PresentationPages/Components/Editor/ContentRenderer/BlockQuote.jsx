import { useStore } from "../../../../../context/StoreContext";
import { cn } from "../../../../../lib/utils";

const BlockQuote = ({ children, className, ...props }) => {
  const { currentTheme } = useStore();

  return (
    <blockquote
      className={cn(
        "pl-4 border-l-4 italic",
        "my-4 py-2",
        "text-gray-700 dark:text-gray-300",
        className
      )}
      style={{
        borderLeftColor: currentTheme.accentColor,
      }}
      {...props}
    >
      {children}
    </blockquote>
  );
};

export default BlockQuote;
