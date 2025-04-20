"use client";

import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../../../utils/motionVariants";
import { Card } from "../../../../components/ui/card";
import { Sparkles, Pencil, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CreateStep = ({ onSelectOption }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Create a New Presentation
        </h1>
        <p className="text-muted-foreground">
          Choose how you want to create your presentation
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
          onClick={() => onSelectOption("creative-ai")}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Creative AI</h2>
            <p className="text-muted-foreground">
              Let our AI generate a presentation outline based on your prompt
            </p>
          </div>
        </Card>

        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
          onClick={() => onSelectOption("create-scratch")}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Pencil className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">From Scratch</h2>
            <p className="text-muted-foreground">
              Create your own presentation outline from scratch
            </p>
          </div>
        </Card>

        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
          onClick={() => navigate("/project-form")}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Project Form</h2>
            <p className="text-muted-foreground">
              Create a detailed presentation using our comprehensive project
              form
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
