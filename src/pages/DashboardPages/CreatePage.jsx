import React, { Suspense, useState } from "react";
import CreatePageSkeleton from "./Components/CreatePage/CreatePageSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import CreateFromScratch from "./Components/CreatePage/CreateFromScratch";
import CreativeAIStep from "./Components/CreatePage/CreativeAIStep";
import { CreateStep } from "./Components/CreatePage/CreateStep";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  return (
    <main className="w-full h-full pt-6">
      <Suspense fallback={<CreatePageSkeleton />}>
        <RenderPage />
      </Suspense>
    </main>
  );
}

const RenderPage = () => {
  const { page, setPage } = useStore();
  const navigate = useNavigate();

  const handleBack = () => {
    setPage("create");
  };

  const handleSelectOption = (option) => {
    switch (option) {
      case "template":
        navigate("/templates");
        break;
      case "create-scratch":
        setPage("create-scratch");
        break;
      case "creative-ai":
      default:
        setPage("creative-ai");
    }
  };

  const renderStep = () => {
    switch (page) {
      case "create":
        return <CreateStep onSelectOption={handleSelectOption} />;
      case "create-scratch":
        return <CreateFromScratch onBack={handleBack} />;
      case "creative-ai":
        return <CreativeAIStep onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
};
