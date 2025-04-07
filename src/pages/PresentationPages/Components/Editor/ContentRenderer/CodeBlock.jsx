import { useStore } from "../../../../../context/StoreContext";
import { cn } from "../../../../../lib/utils";

const CodeBlock = ({
  code,
  language,
  onChange,
  className,
  isEditable = true,
}) => {
  const { currentTheme } = useStore();

  return (
    <pre
      className={cn("p-4 rounded-lg overflow-x-auto", className)}
      style={{
        backgroundColor: `${currentTheme.accentColor}20`,
      }}
    >
      <code className={`language-${language}`}>
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full bg-transparent outline-none font-mono whitespace-pre"
          style={{ color: currentTheme.fontColor }}
          readOnly={!isEditable}
          spellCheck="false"
        />
      </code>
    </pre>
  );
};

export default CodeBlock;
