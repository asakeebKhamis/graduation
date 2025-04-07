import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../../../utils/motionVariants";
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useStore } from "../../../../context/StoreContext";
import { Input } from "src/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "src/components/ui/select";
import CardList from "../Common/CardList";
import RecentPrompt from "./RecentPrompt";
import { toast } from "sonner";
import { generateCreativePrompt } from "../../../../utils/CreativeAi";
import { useNavigate } from "react-router-dom";

export default function CreativeAIStep({ onBack }) {
  const navigate = useNavigate();

  const {
    currentAiPrompt,
    setCurrentAiPrompt,
    prompts,
    setPrompts,
    // Creative Ai
    outlinesCreativeAi,
    addMultipleOutlinesCreativeAi,
    addOutlineCreativeAi,
    resetOutlinesCreativeAi,
  } = useStore();

  const [editingCard, setEditingCard] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [noOfCards, setNoOfCards] = useState(0);
  const [editText, setEditText] = useState("");

  // Reset function
  const resetCards = () => {
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");
    setCurrentAiPrompt("");
    resetOutlinesCreativeAi();
    setNoOfCards(0);
  };

  useEffect(() => {
    setNoOfCards(outlinesCreativeAi.length);
  }, [outlinesCreativeAi.length]);

  const generateOutline = async () => {
    if (currentAiPrompt === "") {
      toast.error("Error", {
        description: "Please enter a prompt to generate an outline.",
      });
      return;
    }

    setIsGenerating(true);
    const res = await generateCreativePrompt(currentAiPrompt);

    if (res.status === 200 && res?.data?.outlines) {
      const cardsData = res.data.outlines.map((outline, idx) => ({
        id: Math.random().toString(36).substring(2),
        title: outline,
        order: idx + 1,
      }));

      addMultipleOutlinesCreativeAi(cardsData);
      setNoOfCards(cardsData.length);
      toast.success("Success", {
        description: "Outlines generated successfully",
      });
    } else {
      toast.error("Error", {
        description:
          res.error || "Failed to generate outline. Please try again.",
      });
    }
    setIsGenerating(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    if (outlinesCreativeAi.length === 0) {
      toast.error("Error", {
        description: "Please add at least one card to generate slides",
      });
      setIsGenerating(false);
      return;
    }

    try {
      // const res = await createProject(
      //   currentAiPrompt,
      //   outlinesCreativeAi.slice(0, noOfCards)
      // );

      const res = await new Promise((resolve) =>
        setTimeout(() => {
          resolve("Create Project");
        }, 3000)
      );

      navigate(
        `/presentation/${Math.random().toString(36).substring(2)}/select-theme`
      );
      setPrompts({
        id: Math.random().toString(36).substring(2),
        title: currentAiPrompt || outlinesCreativeAi?.[0]?.title,
        outlines: outlinesCreativeAi,
        createdAt: new Date().toISOString(),
      });

      toast.success("Success", {
        description: "Project created successfully!",
      });

      setCurrentAiPrompt("");
      resetOutlinesCreativeAi();

      // if (res.status !== 200) {
      //   toast.error("Error", {
      //     description: res.error || "Failed to create project",
      //   });
      //   return;
      // }

      // if (res.data) {
      //   navigate(`/presentation/${res.data.id}/select-theme`);
      //   // srtProject(res.data);

      //   setPrompts({
      //     id: Math.random().toString(36).substring(2),
      //     title: currentAiPrompt || outlinesCreativeAi?.[0]?.title,
      //     outlines: outlinesCreativeAi,
      //     createdAt: new Date().toISOString(),
      //   });

      //   toast.success("Success", {
      //     description: "Project created successfully!",
      //   });

      //   setCurrentAiPrompt("");
      //   resetOutlinesCreativeAi();
      // } else {
      //   toast.error("Error", {
      //     description: "Failed to create project.",
      //   });
      // }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Error", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={onBack} variant="outline" className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Generate with <span className="text-ufo">Creative AI</span>
        </h1>
        <p className="text-muted-foreground">
          What would you like to create today?
        </p>
      </motion.div>
      <motion.div
        className="bg-primary/10 p-4 rounded-xl flex justify-between items-center"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl flex-1">
          <Input
            placeholder="Enter Prompt and add to the cards..."
            className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
            required
            value={currentAiPrompt || ""}
            onChange={(e) => setCurrentAiPrompt(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={noOfCards.toString()}
            onValueChange={(value) => setNoOfCards(parseInt(value))}
          >
            <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
              <SelectValue placeholder="Select number of cards" />
            </SelectTrigger>
            <SelectContent className="w-fit">
              {outlinesCreativeAi.length === 0 ? (
                <SelectItem value="0" className="font-semibold">
                  No cards
                </SelectItem>
              ) : (
                Array.from(
                  { length: outlinesCreativeAi.length },
                  (_, idx) => idx + 1
                ).map((num) => (
                  <SelectItem
                    key={num}
                    value={num.toString()}
                    className="font-semibold"
                  >
                    {num} {num === 1 ? "Card" : "Cards"}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          <Button
            variant="destructive"
            onClick={resetCards}
            size="icon"
            aria-label="Reset cards"
            disabled={isGenerating}
            className="ml-2"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
      <div className="w-full flex justify-center items-center">
        <Button
          className="font-medium text-lg flex gap-2 items-center"
          onClick={generateOutline}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Outline"
          )}
        </Button>
      </div>
      <CardList
        outlines={outlinesCreativeAi}
        addOutline={addOutlineCreativeAi}
        addMultipleOutlines={addMultipleOutlinesCreativeAi}
        editingCard={editingCard}
        selectedCard={selectedCard}
        editText={editText}
        onEditChange={setEditText}
        onCardSelect={setSelectedCard}
        setEditText={setEditText}
        setEditingCard={setEditingCard}
        setSelectedCard={setSelectedCard}
        onCardDoubleClick={(id, title) => {
          setEditingCard(id);
          setEditText(title);
        }}
      />

      {outlinesCreativeAi.length > 0 && (
        <Button
          className="w-full"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      )}

      {prompts?.length > 0 && <RecentPrompt />}
    </motion.div>
  );
}
