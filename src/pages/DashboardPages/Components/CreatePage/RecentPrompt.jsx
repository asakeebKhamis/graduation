import { motion } from "framer-motion";
import React from "react";
import { containerVariants, itemVariants } from "../../../../utils/motionVariants";
import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";
import { useStore } from "../../../../context/StoreContext";

export default function RecentPrompt() {
  const {
    setPage,
    prompts,
    setCurrentAiPrompt,
    // Creative Ai
    addMultipleOutlinesCreativeAi,
  } = useStore();

  const handleEdit = (id) => {
    try {
      const prompt = prompts.find((prompt) => prompt?.id === id);

      if (!prompt) {
        console.error("Prompt not found with id:", id);
        return;
      }

      setPage("creative-ai");
      addMultipleOutlinesCreativeAi(prompt.outlines || []);
      setCurrentAiPrompt(prompt.title || "");
    } catch (error) {
      toast.error("Error", {
        description: "Prompt not found!",
      });
    }
  };
  return (
    <motion.div variants={containerVariants} className="space-y-4 mt-20">
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-semibold text-center"
      >
        Your Recent Prompts
      </motion.h2>

      <motion.div
        variants={containerVariants}
        className="space-y-2 w-full lg:max-w-[80%] mx-auto"
      >
        {prompts.map((prompt, i) => (
          <motion.div key={prompt.id} variants={itemVariants}>
            <Card className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors duration-300">
              <div className="max-w-[70%]">
                <h3 className="font-semibold text-xl line-clamp-1">
                  {/* {prompt?.title} */}
                  This is the title
                </h3>
                <p className="font-semibold text-sm text-muted-foreground">
                  {/* {timeAgo(prompt?.createdAt)} */} 2 days ago
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-ufo">Creative AI</span>
                <span>|</span>
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-xl bg-primary-20 dark:hover:bg-gray-700 hover:bg-gray-200 text-primary"
                  onClick={() => handleEdit(prompt?.id)}
                >
                  Edit
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
