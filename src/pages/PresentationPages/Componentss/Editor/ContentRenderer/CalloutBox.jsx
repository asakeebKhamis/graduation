import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Info,
} from "lucide-react";
import { cn } from "../../../../../lib/utils";

const icons = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  question: HelpCircle,
  caution: AlertCircle,
};

// CalloutBox component
const CalloutBox = ({ type, children, className }) => {
  const Icon = icons[type];
  const colors = {
    success: {
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-700",
    },
    warning: {
      bg: "bg-yellow-100",
      border: "border-yellow-500",
      text: "text-yellow-700",
    },
    info: {
      bg: "bg-blue-100",
      border: "border-blue-500",
      text: "text-blue-700",
    },
    question: {
      bg: "bg-purple-100",
      border: "border-purple-500",
      text: "text-purple-700",
    },
    caution: {
      bg: "bg-red-100",
      border: "border-red-500",
      text: "text-red-700",
    },
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg border-l-4 flex items-start gap-3",
        colors[type].bg,
        colors[type].border,
        colors[type].text,
        className
      )}
    >
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default CalloutBox;
