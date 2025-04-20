"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { themes } from "../utils/constants";
import { toast } from "sonner";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    { title: "title 1", createAt: "2025-04-10T12:13:55.000000Z" },
    { title: "title 2", createAt: "2025-04-10T12:13:55.000000Z" },
    { title: "title 3", createAt: "2025-04-10T12:13:55.000000Z" },
  ]);

  // --------------------------------------
  const [page, setPage] = useState("create");
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(themes[4]);
  const [project, setProject] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  console.log(isSaving);

  // Initialize with a default slide if empty
  useEffect(() => {
    if (!isInitialized && slides.length === 0) {
      setSlides([
        // {
        //   slideName: "04 - How It Works",
        //   type: "blank-card",
        //   className:
        //     "p-8 mx-auto flex flex-col justify-center items-center min-h-[200px] bg-gradient-to-tr from-green-400 to-blue-500 text-white rounded-2xl shadow-lg",
        //   content: {
        //     id: "col-04-how-it-works",
        //     type: "column",
        //     name: "Column",
        //     content: [
        //       {
        //         id: "title-04",
        //         type: "title",
        //         name: "Main Title",
        //         content: "How PowerSlide Works",
        //         placeholder: "Presentation Title",
        //       },
        //       {
        //         id: "heading-04",
        //         type: "heading1",
        //         name: "Subtitle",
        //         content: "Simple Steps to Create Amazing Slides",
        //         placeholder: "Subtitle",
        //       },
        //       {
        //         id: "olist-04",
        //         type: "numberedList",
        //         name: "Steps List",
        //         content: [
        //           "Choose a template",
        //           "Drag & drop elements",
        //           "Customize your design",
        //           "Export and share",
        //         ],
        //       },
        //     ],
        //   },
        //   id: "slide-04",
        //   slideOrder: 3,
        //   elements: [],
        // },
        // {
        //   slideName: "05 - Best Practices",
        //   type: "threeColumnsWithHeadings",
        //   className:
        //     "p-6 mx-auto flex justify-center items-start gap-6 rounded-2xl shadow-md",
        //   content: {
        //     id: "col-05-best-practices",
        //     type: "column",
        //     name: "Column",
        //     content: [
        //       {
        //         id: "title-05",
        //         type: "title",
        //         name: "Section Title",
        //         content: "Presentation Best Practices",
        //         placeholder: "Untitled Card",
        //       },
        //       {
        //         id: "cols-05",
        //         type: "resizable-column",
        //         name: "Tips Columns",
        //         className: "flex gap-4",
        //         content: [
        //           {
        //             id: "f1-05",
        //             type: "column",
        //             name: "Tip 1",
        //             content: [
        //               {
        //                 id: "h3-05-1",
        //                 type: "heading3",
        //                 name: "Heading",
        //                 content: "Keep It Simple",
        //                 placeholder: "Heading",
        //               },
        //               {
        //                 id: "olist-05-1",
        //                 type: "numberedList",
        //                 name: "Steps",
        //                 content: [
        //                   "Limit text per slide",
        //                   "Use clear visuals",
        //                   "Focus on key points",
        //                 ],
        //               },
        //             ],
        //           },
        //           {
        //             id: "f2-05",
        //             type: "column",
        //             name: "Tip 2",
        //             content: [
        //               {
        //                 id: "h3-05-2",
        //                 type: "heading3",
        //                 name: "Heading",
        //                 content: "Stay Consistent",
        //                 placeholder: "Heading",
        //               },
        //               {
        //                 id: "olist-05-2",
        //                 type: "numberedList",
        //                 name: "Steps",
        //                 content: [
        //                   "Same fonts & colors",
        //                   "Aligned elements",
        //                   "Smooth transitions",
        //                 ],
        //               },
        //             ],
        //           },
        //           {
        //             id: "f3-05",
        //             type: "column",
        //             name: "Tip 3",
        //             content: [
        //               {
        //                 id: "h3-05-3",
        //                 type: "heading3",
        //                 name: "Heading",
        //                 content: "Engage Your Audience",
        //                 placeholder: "Heading",
        //               },
        //               {
        //                 id: "olist-05-3",
        //                 type: "numberedList",
        //                 name: "Steps",
        //                 content: [
        //                   "Ask questions",
        //                   "Tell stories",
        //                   "Use humor wisely",
        //                 ],
        //               },
        //             ],
        //           },
        //         ],
        //       },
        //       {
        //         id: "para-05",
        //         type: "paragraph",
        //         name: "Summary",
        //         content:
        //           "Following these tips will help you deliver presentations that are both memorable and impactful.",
        //         placeholder: "Start typing...",
        //       },
        //     ],
        //   },
        //   id: "slide-05",
        //   slideOrder: 4,
        //   elements: [],
        // },
        // {
        //   slideName: "06 - Thank You",
        //   type: "fourColumns",
        //   className: "p-6 rounded-2xl shadow-sm",
        //   content: {
        //     id: "col-06-thank-you",
        //     type: "column",
        //     name: "Column",
        //     content: [
        //       {
        //         id: "title-06",
        //         type: "title",
        //         name: "Section Title",
        //         content: "Thank You!",
        //         placeholder: "Untitled Card",
        //       },
        //       {
        //         id: "quote-06",
        //         type: "blockquote",
        //         name: "Blockquote",
        //         content: "Great presentations create great opportunities.",
        //         placeholder: "Type here",
        //       },
        //       {
        //         id: "divider-06",
        //         type: "divider",
        //         name: "Divider",
        //         content: "",
        //       },
        //       {
        //         id: "olist-06",
        //         type: "numberedList",
        //         name: "Closing Actions",
        //         content: [
        //           "Review your slides",
        //           "Practice your delivery",
        //           "Wow your audience!",
        //         ],
        //       },
        //     ],
        //   },
        //   id: "slide-06",
        //   slideOrder: 5,
        //   elements: [],
        // },
      ]);
      setIsInitialized(true);
    }
  }, [slides, isInitialized]);

  const getOrderedSlides = () => {
    return [...slides].sort(
      (a, b) => (a.slideOrder || 0) - (b.slideOrder || 0)
    );
  };

  const getSlideById = (id) => {
    return slides.find((slide) => slide.id === id);
  };

  const addSlideAtIndex = (slide, index) => {
    const newSlides = [...slides];

    // Update slideOrder for all slides after the insertion point
    newSlides.forEach((s) => {
      if ((s.slideOrder || 0) >= index) {
        s.slideOrder = (s.slideOrder || 0) + 1;
      }
    });

    // Set the slideOrder for the new slide
    slide.slideOrder = index;

    setSlides([...newSlides, slide]);
    setCurrentSlide(index);
  };

  const removeSlide = (id) => {
    if (slides.length <= 1) {
      toast.error("Cannot delete the last slide");
      return;
    }

    const slideIndex = slides.findIndex((slide) => slide.id === id);
    if (slideIndex === -1) return;

    const slideOrder = slides[slideIndex].slideOrder || 0;
    const newSlides = slides.filter((slide) => slide.id !== id);

    // Update slideOrder for all slides after the removed one
    newSlides.forEach((slide) => {
      if ((slide.slideOrder || 0) > slideOrder) {
        slide.slideOrder = (slide.slideOrder || 0) - 1;
      }
    });

    setSlides(newSlides);

    // Update currentSlide if necessary
    if (currentSlide >= newSlides.length) {
      setCurrentSlide(Math.max(0, newSlides.length - 1));
    } else if (currentSlide === slideIndex) {
      // If we're deleting the current slide, move to the previous one
      setCurrentSlide(Math.max(0, currentSlide - 1));
    }
  };

  const reorderSlides = (fromIndex, toIndex) => {
    const orderedSlides = getOrderedSlides();
    const [movedSlide] = orderedSlides.splice(fromIndex, 1);
    orderedSlides.splice(toIndex, 0, movedSlide);

    // Update slideOrder for all slides
    const updatedSlides = orderedSlides.map((slide, index) => ({
      ...slide,
      slideOrder: index,
    }));

    setSlides(updatedSlides);
    setCurrentSlide(toIndex);
  };

  const updateContentItem = (slideId, contentId, newContent) => {
    setSlides((prevSlides) => {
      // Create a new array to avoid mutation
      return prevSlides.map((slide) => {
        if (slide.id !== slideId) return slide;

        // Helper function to recursively update content
        const updateContent = (content) => {
          if (!content) return content;

          if (Array.isArray(content)) {
            return content.map((item) => updateContent(item));
          }

          if (content.id === contentId) {
            return { ...content, content: newContent };
          }

          if (content.content) {
            if (Array.isArray(content.content)) {
              return {
                ...content,
                content: content.content.map((item) => updateContent(item)),
              };
            } else if (typeof content.content === "object") {
              return {
                ...content,
                content: updateContent(content.content),
              };
            }
          }

          return content;
        };

        // Update elements array for free placement
        const updatedElements = slide.elements
          ? slide.elements.map((element) => {
              if (element.id === contentId) {
                return { ...element, content: newContent };
              } else if (element.content && element.content.id === contentId) {
                return {
                  ...element,
                  content: { ...element.content, content: newContent },
                };
              }
              return element;
            })
          : [];

        return {
          ...slide,
          content: updateContent(slide.content),
          elements: updatedElements,
        };
      });
    });
  };

  // Fix the updateSlide function to avoid unnecessary updates
  const updateSlide = (slideId, updatedSlide) => {
    setSlides((prevSlides) => {
      // Find the slide to update
      const slideIndex = prevSlides.findIndex((slide) => slide.id === slideId);
      if (slideIndex === -1) return prevSlides;

      // Create a new array with the updated slide
      const newSlides = [...prevSlides];
      newSlides[slideIndex] = { ...newSlides[slideIndex], ...updatedSlide };

      // Only return a new array if something actually changed
      return JSON.stringify(prevSlides[slideIndex]) !==
        JSON.stringify(newSlides[slideIndex])
        ? newSlides
        : prevSlides;
    });
  };

  // Fix the addComponentInSlide function to avoid unnecessary updates
  const addComponentInSlide = (slideId, component, parentId, index) => {
    setSlides((prevSlides) => {
      return prevSlides.map((slide) => {
        if (slide.id !== slideId) return slide;

        // If parentId is provided, we need to add the component to a specific parent
        if (parentId) {
          // Helper function to recursively find and update the parent
          const updateParent = (content) => {
            if (!content) return content;

            if (Array.isArray(content)) {
              return content.map((item) => updateParent(item));
            }

            if (content.id === parentId) {
              const newContent = Array.isArray(content.content)
                ? [...content.content]
                : [];
              if (index !== undefined) {
                newContent.splice(index, 0, component);
              } else {
                newContent.push(component);
              }
              return { ...content, content: newContent };
            }

            if (content.content) {
              if (Array.isArray(content.content)) {
                return {
                  ...content,
                  content: content.content.map((item) => updateParent(item)),
                };
              } else if (typeof content.content === "object") {
                return {
                  ...content,
                  content: updateParent(content.content),
                };
              }
            }

            return content;
          };

          return {
            ...slide,
            content: updateParent(slide.content),
          };
        }

        // If no parentId, add to elements array for free placement
        // Check if the component already exists to avoid duplicates
        const elements = slide.elements || [];
        const elementExists = elements.some((el) => el.id === component.id);

        return {
          ...slide,
          elements: elementExists ? elements : [...elements, component],
        };
      });
    });
  };

  const removeComponentFromSlide = (slideId, componentId) => {
    setSlides((prevSlides) => {
      return prevSlides.map((slide) => {
        if (slide.id !== slideId) return slide;

        // Helper function to recursively remove the component
        const removeComponent = (content) => {
          if (!content) return content;

          if (Array.isArray(content)) {
            return content
              .filter((item) => item.id !== componentId)
              .map((item) => removeComponent(item));
          }

          if (content.id === componentId) {
            return null;
          }

          if (content.content) {
            if (Array.isArray(content.content)) {
              const filteredContent = content.content
                .filter((item) => item.id !== componentId)
                .map((item) => removeComponent(item))
                .filter(Boolean);

              return {
                ...content,
                content: filteredContent,
              };
            } else if (typeof content.content === "object") {
              const updatedContent = removeComponent(content.content);
              return {
                ...content,
                content: updatedContent,
              };
            }
          }

          return content;
        };

        // Remove from elements array for free placement
        const elements = slide.elements || [];

        return {
          ...slide,
          content: removeComponent(slide.content),
          elements: elements.filter((element) => element.id !== componentId),
        };
      });
    });
  };

  const value = {
    page,
    setPage,
    projects,
    setProjects,
    isSaving,
    setIsSaving,
    // --------------------------------
    slides,
    setSlides,
    currentSlide,
    setCurrentSlide,
    currentTheme,
    setCurrentTheme,
    project,
    setProject,
    prompts,
    setPrompts,
    getOrderedSlides,
    getSlideById,
    addSlideAtIndex,
    removeSlide,
    reorderSlides,
    updateContentItem,
    updateSlide,
    addComponentInSlide,
    removeComponentFromSlide,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
