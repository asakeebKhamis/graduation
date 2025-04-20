import React from "react";
import { cn } from "../../../../../lib/utils";
import { useStore } from "../../../../../context/StoreContext";

export default function Divider({ className }) {
  const { currentTheme } = useStore();
  return (
    <hr
      className={cn("my-4", className)}
      style={{ borderColor: currentTheme.accentColor }}
    />
  );
}
