"use client";

import { useState } from "react";
import { useStore } from "../../../context/StoreContext";
import { Loader2, Wand2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { aiAPI, presentationAPI, ErrorMessage } from "../../../lib/api";

export default function ThemePicker({ onThemeSelect, selectedTheme, themes }) {
  const navigate = useNavigate();
  const { id: presentationId } = useParams();
  const { prompts, setPrompts, setSlides, currentTheme, outlinesCreativeAi } =
    useStore();
  const [loading, setLoading] = useState(false);
  const [presentationTitle, setPresentationTitle] = useState("");
  const [presentationDescription, setPresentationDescription] = useState("");

  const handleGenerateLayouts = async () => {
    setLoading(true);

    if (!selectedTheme) {
      toast.error("Error", {
        description: "Please select a theme",
      });
      setLoading(false);
      return;
    }

    try {
      // If we have a presentation ID, we're updating an existing presentation
      if (presentationId) {
        // Update theme
        await presentationAPI.updateTheme(presentationId, selectedTheme.name);

        // Navigate to the presentation editor
        navigate(`/presentation/${presentationId}`);
        toast.success("Theme updated successfully");
      }
      // Otherwise, we're creating a new presentation
      else {
        // Create new presentation
        const createRes = await presentationAPI.create({
          title: presentationTitle || "Untitled Presentation",
          description: presentationDescription || "",
          themeName: selectedTheme.name,
        });

        if (createRes.status !== 201) {
          throw new Error(
            createRes.data?.error || "Failed to create presentation"
          );
        }

        const newPresentationId = createRes.data.data.id;

        // Generate layouts if we have outlines
        if (outlinesCreativeAi && outlinesCreativeAi.length > 0) {
          const layoutsRes = await aiAPI.generateLayouts(
            newPresentationId,
            outlinesCreativeAi,
            selectedTheme.name
          );

          if (layoutsRes.status === 200 && layoutsRes.data?.data) {
            // Update slides
            await presentationAPI.updateSlides(
              newPresentationId,
              layoutsRes.data.data
            );
            setSlides(layoutsRes.data.data);
          }
        }

        // Navigate to the new presentation
        navigate(`/presentation/${newPresentationId}`);
        toast.success("Presentation created successfully");
      }
    } catch (error) {
      console.error("Layout generation error:", error);
      toast.error("Error", {
        description: ErrorMessage(error) || "Failed to generate layouts",
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

        <div className="space-y-4">
          <div>
            <label
              className="text-sm font-medium block mb-1"
              style={{ color: selectedTheme.accentColor }}
            >
              Presentation Title
            </label>
            <input
              value={presentationTitle}
              onChange={(e) => setPresentationTitle(e.target.value)}
              placeholder="Enter presentation title"
              className="w-full p-2 rounded border"
              style={{ borderColor: `${selectedTheme.accentColor}40` }}
            />
          </div>

          <div>
            <label
              className="text-sm font-medium block mb-1"
              style={{ color: selectedTheme.accentColor }}
            >
              Presentation Description
            </label>
            <textarea
              value={presentationDescription}
              onChange={(e) => setPresentationDescription(e.target.value)}
              placeholder="Describe what your presentation is about"
              className="w-full min-h-[100px] p-2 rounded border"
              style={{ borderColor: `${selectedTheme.accentColor}40` }}
            />
          </div>
        </div>

        <Button
          className="w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.backgroundColor,
          }}
          onClick={handleGenerateLayouts}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span className="animate-pulse">Generating...</span>
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-5 w-5" />
              {presentationId ? "Apply Theme" : "Generate Presentation"}
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
                className={`flex flex-col items-center justify-start p-6 w-full h-auto ${
                  selectedTheme.name === theme.name
                    ? "ring-2 ring-offset-2"
                    : ""
                }`}
                style={{
                  background: theme.gradientBackground || theme.backgroundColor,
                  fontFamily: theme.fontFamily,
                  color: theme.fontColor,
                  ringColor: theme.accentColor,
                }}
              >
                <div className="w-full flex items-center justify-between">
                  <span className="text-xl font-bold">{theme.name}</span>
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
                  <div className="text-base opacity-80">
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
