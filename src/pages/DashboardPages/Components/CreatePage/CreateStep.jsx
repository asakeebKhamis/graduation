import React from "react";
import { CreatePageCard } from "./../../../../utils/constants";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../../../utils/motionVariants";
import { Button } from "../../../../components/ui/button";
import RecentPrompt from "./RecentPrompt";
import { useStore } from "../../../../context/StoreContext";

export const CreateStep = ({ onSelectOption }) => {
  const { prompts } = useStore();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          How would you like to get started?
        </h1>
        <p className="text-muted-foreground">
          Choose your preferred method to begin
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid gap-6 md:grid-cols-3"
      >
        {CreatePageCard.map((option) => (
          <motion.div
            key={option.type}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              transition: { duration: 0.1 },
            }}
            className={`
            ${
              option.highlight
                ? "bg-vivid-gradient"
                : "hover:bg-vivid-gradient border"
            }
            rounded-xl p-[1px] transition-all duration-300 ease-in-out
        `}
          >
            <motion.div
              className="w-full p-4 flex flex-col gap-y-6 items-start bg-white dark:bg-black rounded-xl"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.1 },
              }}
            >
              <div className="flex flex-col items-start w-full gap-y-3">
                <div>
                  <p className="text-primary text-lg font-semibold">
                    {option.title}
                  </p>
                  <p
                    className={`${
                      option.highlight ? "text-ufo" : "text-primary"
                    } text-4xl font-bold`}
                  >
                    {option.highlightedText}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm font-normal">
                  {option.description}
                </p>
              </div>
              <motion.div
                className="self-end"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={option.highlight ? "default" : "outline"}
                  className="w-fit rounded-xl font-bold"
                  size="sm"
                  onClick={() => onSelectOption(option.type)}
                >
                  {option.highlight ? "Generate" : "Continue"}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      {prompts.length !== 0 && <RecentPrompt />}
    </motion.div>
  );
};
