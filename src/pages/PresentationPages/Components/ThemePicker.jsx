import React, { useState } from "react";
import { useStore } from "../../../context/StoreContext";
import { Loader2, Wand2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import { generateLayouts } from "../../../utils/CreativeAi";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function ThemePicker({ onThemeSelect, selectedTheme, themes }) {
  const navigate = useNavigate();

  const { id: presentationId } = useParams();

  const { prompts, setSlides, currentTheme } = useStore();
  const [loading, setLoading] = useState(false);

  const handleGenerateLayouts = async () => {
    setLoading(true);

    if (!selectedTheme) {
      toast.error("Error", {
        description: "Please select a theme",
      });
      setLoading(false);
      return;
    }

    // if (!project?.id) {
    //   toast.error("Error", {
    //     description: "Please create a project first",
    //   });
    //   //   router.push("/create-page");
    //   setLoading(false);
    //   return;
    // }

    try {
      const res = await generateLayouts(
        presentationId,
        prompts,
        currentTheme.name
      );
      console.log(res);
      if (res.status !== 200 || !res?.data) {
        throw new Error("Failed to generate layouts");
      }

      toast.success("Success", {
        description: "Layouts generated successfully",
      });
      setSlides(res.data);
      navigate(`/presentation/${Math.random().toString(36).substring(2)}`);

      // router.push(`/presentation/${project?.id}`);
    } catch (error) {
      console.error("Layout generation error:", error);
      toast.error("Error", {
        description: "Failed to generate layouts",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-[400px] overflow-hidden sticky top-0 h-screen flex flex-col"
      style={{
        backgroundColor:
          selectedTheme.sidebarColor || selectedTheme.backgroundColor,
        borderLeft: `1px solid ${selectedTheme.accentColor}20`,
      }}
    >
      <div className="p-8 space-y-6 flex-shrink-0">
        <div className="space-y-2">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: selectedTheme.accentColor }}
          >
            Pick a theme
          </h2>
          <p
            className="text-sm"
            style={{ color: `${selectedTheme.accentColor}80` }}
          >
            Choose from our curated collection or generate a custom theme
          </p>
        </div>
        <Button
          className="w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.backgroundColor,
          }}
          onClick={handleGenerateLayouts}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span className="animate-pulse">Generating...</span>
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-5 w-5" />
              Generate Theme
            </>
          )}
        </Button>
      </div>
      <div className="flex-grow px-8 pb-8 overflow-auto">
        <div className="grid grid-cols-1 gap-4">
          {themes.map((theme) => (
            <motion.div
              key={theme.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => onThemeSelect(theme)}
                className="flex flex-col items-center justify-start p-6 w-full h-auto border"
                style={{ backgroundColor: theme.slideBackgroundColor }}
              >
                <div className="w-full flex items-center justify-between">
                  <span
                    className="text-xl font-bold"
                    style={{ color: theme.fontColor }}
                  >
                    {theme.name}
                  </span>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                </div>

                <div className="space-y-1 w-full mt-4">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: theme.accentColor }}
                  >
                    Title
                  </div>
                  <div
                    className="text-base opacity-80"
                    style={{ color: theme.fontColor }}
                  >
                    Body &{" "}
                    <span style={{ color: theme.accentColor }}>link</span>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
