import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  containerVariants,
  itemVariants,
} from "../../../../utils/motionVariants";
import { motion } from "framer-motion";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { useStore } from "../../../../context/StoreContext";
import CardList from "./../Common/CardList";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "src/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateFromScratch({ onBack }) {
  const navigate = useNavigate();

  const {
    // Scratch
    outlinesScratch,
    setOutlinesScratch,
    addMultipleOutlinesScratch,
    addOutlineScratch,
    resetOutlinesScratch,
  } = useStore();

  const handleBack = () => {
    resetOutlinesScratch();
    onBack();
  };
  const resetCards = () => {
    resetOutlinesScratch();
    setEditText("");
  };

  const [editingCard, setEditingCard] = useState(null);
  const [editText, setEditText] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // Handler Functions
  const handleAddCard = () => {
    const newCard = {
      id: Math.random().toString(36).substring(2),
      title: editText || "New Section",
      order: outlinesScratch.length + 1,
    };
    setEditText("");
    console.log(newCard);
    addOutlineScratch(newCard);
  };

  const handleGenerate = async () => {
    if (outlinesScratch.length === 0) {
      toast.error("Error", {
        description: "Please add at least one card to generate slides",
      });
      return;
    }
    // const res = await createProject(outlines[0]?.title, outlines);
    const res = await new Promise((resolve) => {
      setTimeout(() => resolve("Operation completed"), 3000);
    });

    navigate(
      `/presentation/${Math.random().toString(36).substring(2)}/select-theme`
    );

    if (res.status !== 200) {
      toast.error("Error", {
        description: res.error || "Failed to create project",
      });
      return;
    }

    if (res.data) {
      // setProject(res.data);
      resetOutlinesScratch();
      toast.success("Success", {
        description: "Project created successfully!",
      });
      navigate(`/presentation/${res.data.id}/select-theme`);
    } else {
      toast.error("Error", {
        description: "Failed to create project.",
      });
    }
  };

  return (
    <motion.div
      className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={handleBack} variant="outline" className="mb-4">
        <ChevronLeft />
        Back
      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary text-left">
        Prompt
      </h1>
      <motion.div
        className="bg-primary/10 p-4 rounded-xl"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Enter Prompt and add to the cards..."
            className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow"
          />

          <div className="flex items-center gap-3">
            <Select
              value={
                outlinesScratch.length > 0
                  ? outlinesScratch.length.toString()
                  : "0"
              }
            >
              <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                <SelectValue placeholder="Select number of cards" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                {outlinesScratch.length === 0 ? (
                  <SelectItem value="0" className="font-semibold">
                    No cards
                  </SelectItem>
                ) : (
                  Array.from(
                    { length: outlinesScratch.length },
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
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
      <CardList
        outlines={outlinesScratch}
        addOutline={addOutlineScratch}
        addMultipleOutlines={addMultipleOutlinesScratch}
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

      {/* Add Card Button Component */}
      <Button
        onClick={handleAddCard}
        variant="secondary"
        className="w-full bg-primary-10 border"
      >
        Add Card
      </Button>

      {/* Generate PPT Button Component */}
      {outlinesScratch?.length > 0 && (
        <Button className="w-full" onClick={handleGenerate}>
          Generate PPT
        </Button>
      )}
    </motion.div>
  );
}
