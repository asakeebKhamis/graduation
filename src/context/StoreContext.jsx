import { createContext, useState, useContext, useEffect } from "react";
import Cookie from "js-cookie";
import { themes } from "../utils/constants";

const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  const [page, setPage] = useState("create");
  const [prompts, setPrompts] = useState([]);
  const [currentAiPrompt, setCurrentAiPrompt] = useState("");
  const [slides, setSlides] = useState([
    {
      id: "ow5mzj1syq",
      slideName: "Introduction",
      type: "accentLeft",
      className: "min-h-[600px] bg-gradient-to-r from-blue-500 to-indigo-500",
      content: {
        id: "1234567890",
        type: "column",
        name: "Column",
        content: [
          {
            id: "abcdefghij",
            type: "resizable-column",
            name: "Image Column",
            restrictToDrop: true,
            content: [
              {
                id: "123abc",
                type: "image",
                name: "Introduction Image",
                content:
                  "https://via.placeholder.com/600x400/007bff/fff?text=Introduction",
                alt: "Conceptual illustration of xsadsadsad",
              },
            ],
          },
          {
            id: "fedcba9876",
            type: "column",
            name: "Text Column",
            content: [
              {
                id: "999999999",
                type: "heading1",
                name: "Introduction",
                content:
                  "This presentation will explore the various facets of the topic, xsadsadsad.",
              },
              {
                id: "111111111",
                type: "paragraph",
                name: "Description",
                content:
                  "A brief overview of the subject at hand.  This will set the stage for the presentation.",
              },
            ],
          },
        ],
      },
    },
    {
      id: "9gnf4b6r9o",
      slideName: "Key Terms & Concepts",
      type: "twoColumnsWithHeadings",
      className: "min-h-[500px] bg-gray-100",
      content: {
        id: "2345678901",
        type: "column",
        name: "Column",
        content: [
          {
            id: "abcde",
            type: "column",
            name: "Column 1",
            content: [
              {
                id: "123xyz",
                type: "heading2",
                name: "Terms",
                content: "Key Terms and Concepts",
              },
            ],
          },
          {
            id: "fedcba",
            type: "column",
            name: "Column 2",
            content: [
              {
                id: "456abc",
                type: "bulletList",
                name: "Concepts",
                content: ["Term 1", "Term 2", "Term 3"],
              },
            ],
          },
        ],
      },
    },
    {
      id: "rm8vk6r1by",
      slideName: "Historical Context",
      type: "imageAndText",
      className: "min-h-[400px] bg-indigo-50",
      content: {
        id: "3456789012",
        type: "column",
        name: "Column",
        content: [
          {
            id: "zyxwvu",
            type: "image",
            name: "Historical Image",
            content:
              "https://via.placeholder.com/600x400/007bff/fff?text=Historical",
            alt: "Timeline graphic related to xsadsadsad",
          },
          {
            id: "13579",
            type: "column",
            name: "Text",
            content: [
              {
                id: "24680",
                type: "heading3",
                name: "Historical Background",
                content: "A brief overview of the historical context.",
              },
            ],
          },
        ],
      },
    },
  ]);
  const [project, setProject] = useState("");
  const [currentTheme, setCurrentTheme] = useState(themes[4]);
  console.log(slides, project, prompts, currentAiPrompt);

  const [outlinesCreativeAi, setOutlinesCreativeAi] = useState([]);
  const addMultipleOutlinesCreativeAi = (outlines) => {
    setOutlinesCreativeAi([...outlines]);
  };
  const addOutlineCreativeAi = (outline) => {
    setOutlinesCreativeAi((prev) => [...prev, outline]);
  };
  const resetOutlinesCreativeAi = () => {
    setOutlinesCreativeAi([]);
  };

  const [outlinesScratch, setOutlinesScratch] = useState([]);
  const addMultipleOutlinesScratch = (outlines) => {
    setOutlinesScratch([...outlines]);
  };
  const addOutlineScratch = (outline) => {
    setOutlinesScratch((prev) => [...prev, outline]);
  };
  const resetOutlinesScratch = () => {
    setOutlinesScratch([]);
  };

  // Slides
  const getOrderedSlides = () =>
    [...slides].sort((a, b) => a.slideOrder - b.slideOrder);

  const reorderSlides = (fromIndex, toIndex) => {
    const newSlides = [...slides];
    const [removed] = newSlides.splice(fromIndex, 1);
    newSlides.splice(toIndex, 0, removed);

    return newSlides.map((slide, index) => ({
      ...slide,
      slideOrder: index,
    }));
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const addSlideAtIndex = (slide, index) => {
    const newSlides = [...slides];
    newSlides.splice(index, 0, {
      ...slide,
      id: Math.random().toString(36).substring(2),
    });
    newSlides.forEach((s, i) => {
      s.slideOrder = i;
    });
    return {
      slides: newSlides,
      currentSlide: index,
    };
  };

  const removeSlide = (id) => {
    slides.filter((slide) => slide.id !== id);
  };

  const updateCurrentSlide = (slideId, contentId, newContent) => {
    const updateContentRecursively = (item, contentId, newContent) => {
      if (item.id === contentId) {
        return { ...item, content: newContent };
      }

      if (
        Array.isArray(item.content) &&
        item.content.every((i) => typeof i !== "string")
      ) {
        return {
          ...item,
          content: item.content.map((subItem) => {
            if (typeof subItem !== "string") {
              return updateContentRecursively(subItem, contentId, newContent);
            }
            return subItem;
          }),
        };
      }

      return item;
    };

    // Usage in state update
    return slides.map((slide) =>
      slide.id === slideId
        ? {
            ...slide,
            content: updateContentRecursively(
              slide.content,
              contentId,
              newContent
            ),
          }
        : slide
    );
  };

  const addComponentInSlide = (slideId, item, parentId, index) => {
    const updatedSlides = slides.map((slide) => {
      if (slide.id === slideId) {
        const updateContentRecursively = (content) => {
          if (content.id === parentId && Array.isArray(content.content)) {
            const updatedContent = [...content.content];
            updatedContent.splice(index, 0, item);
            return {
              ...content,
              content: updatedContent,
            };
          }
          return content;
        };

        return {
          ...slide,
          content: updateContentRecursively(slide.content),
        };
      }
      return slide;
    });

    return { slides: updatedSlides };
  };

  return (
    <StoreContext.Provider
      value={{
        page,
        setPage,
        prompts,
        setPrompts,
        currentAiPrompt,
        setCurrentAiPrompt,

        // Creative Ai
        outlinesCreativeAi,
        setOutlinesCreativeAi,
        addMultipleOutlinesCreativeAi,
        addOutlineCreativeAi,
        resetOutlinesCreativeAi,

        // Scratch
        outlinesScratch,
        setOutlinesScratch,
        addMultipleOutlinesScratch,
        addOutlineScratch,
        resetOutlinesScratch,

        // Presentation
        slides,
        setSlides,
        project,
        setProject,
        currentTheme,
        setCurrentTheme,

        // Slides
        getOrderedSlides,
        reorderSlides,
        removeSlide,
        addSlideAtIndex,
        currentSlide,
        setCurrentSlide,
        updateCurrentSlide,
        addComponentInSlide,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
