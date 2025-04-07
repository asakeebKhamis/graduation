import { useDrag } from "react-dnd";
import { useStore } from "../../../../../context/StoreContext";
import { layouts } from "../../../../../utils/constants";
import LayoutPreviewItem from "./ComponentTabs/LayoutPreviewItem";

const LayoutChooser = () => {
  return (
    <div className="h-[400px] overflow-auto">
      <div className="p-4">
        {layouts.map((group) => (
          <div key={group.name} className="mb-6">
            <h3 className="text-sm font-medium my-4">{group.name}</h3>
            <div className="grid grid-cols-3 gap-2">
              {group.layouts.map((layout) => (
                <DraggableLayoutItem key={layout.layoutType} {...layout} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutChooser;

export const DraggableLayoutItem = ({
  component,
  icon: Icon,
  layoutType,
  name,
  type,
}) => {
  const { currentTheme } = useStore();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "layout",
    item: { type, layoutType, component },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        background: currentTheme.slideBackgroundColor,
      }}
      className="border rounded-lg"
    >
      <LayoutPreviewItem
        name={name}
        Icon={Icon}
        type={type}
        component={component}
      />
    </div>
  );
};
