import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Card from "./Card";
import AddCardButton from "./AddCardButton";

export default function CardList({
  addMultipleOutlines,
  editText,
  editingCard,
  onCardDoubleClick,
  onCardSelect,
  onEditChange,
  outlines,
  selectedCard,
  setEditText,
  setEditingCard,
  setSelectedCard,
  addOutLine,
}) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragOffsetY = useRef();

  // Drag and Drop Handlers
  const onDragOver = (e, index) => {
    e.preventDefault();
    if (!draggedItem) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 2;

    if (y < threshold) {
      setDragOverIndex(index);
    } else {
      setDragOverIndex(index + 1);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (!draggedItem || dragOverIndex == null) return;

    const updatedCards = [...outlines];
    const draggedIndex = updatedCards.findIndex(
      (card) => card.id === draggedItem.id
    );

    if (draggedIndex === -1 || draggedIndex === dragOverIndex) return;

    const [removedCard] = updatedCards.splice(draggedIndex, 1);
    updatedCards.splice(
      dragOverIndex > draggedIndex ? dragOverIndex - 1 : dragOverIndex,
      0,
      removedCard
    );

    // Update the order of the cards and reset dragged item
    addMultipleOutlines(
      updatedCards.map((card, index) => ({ ...card, order: index + 1 }))
    );
    setDraggedItem(null);
  };

  const onDragStart = (e, card) => {
    setDraggedItem(card);
    e.dataTransfer.effectAllowed = "move";

    const rect = e.currentTarget.getBoundingClientRect();
    dragOffsetY.current = e.clientY - rect.top;

    const draggedEl = e.currentTarget.cloneNode(true);
    draggedEl.style.position = "absolute";
    draggedEl.style.top = "-1000px";
    draggedEl.style.opacity = "0.8";
    draggedEl.style.width = `${e.currentTarget.offsetWidth}px`;
    document.body.appendChild(draggedEl);
    e.dataTransfer.setDragImage(draggedEl, 0, dragOffsetY.current);

    setTimeout(() => {
      setDragOverIndex(outlines.findIndex((c) => c.id === card.id));
      document.body.removeChild(draggedEl);
    }, 0);
  };

  const onDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const getDragOverStyles = (cardIndex) => {
    if (dragOverIndex === null || draggedItem === null) return {};

    if (cardIndex === dragOverIndex) {
      return {
        borderTop: "2px solid #000",
        marginTop: "0.5rem",
        transition: "margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
      };
    } else if (cardIndex === dragOverIndex - 1) {
      return {
        borderBottom: "2px solid #000",
        marginBottom: "0.5rem",
        transition: "margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
      };
    }
    return {};
  };

  // Card Component
  const onCardUpdate = (id, newTitle) => {
    addMultipleOutlines(
      outlines.map((card) =>
        card.id === id ? { ...card, title: newTitle } : card
      )
    );
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");
  };

  const onCardDelete = (id) => {
    addMultipleOutlines(
      outlines
        .filter((card) => card.id !== id)
        .map((card, index) => ({ ...card, order: index + 1 }))
    );
  };
  
  const onAddCard = (index) => {
    const newCard = {
      id: Math.random().toString(36).substring(2),
      title: editText || "New Section",
      order: (index !== undefined ? index + 1 : outlines.length) + 1,
    };

    const updatedCards =
      index !== undefined
        ? [
            ...outlines.slice(0, index + 1),
            newCard,
            ...outlines
              .slice(index + 1)
              .map((card) => ({ ...card, order: card.order + 1 })),
          ]
        : [...outlines, newCard];

    addMultipleOutlines(updatedCards);
    setEditText("");
  };

  return (
    <motion.div
      className="space-y-2 -my-2"
      layout
      onDragOver={(e) => {
        e.preventDefault();
        if (
          outlines.length === 0 ||
          e.clientY > e.currentTarget.getBoundingClientRect().bottom - 20
        ) {
          onDragOver(e, outlines.length);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(e);
      }}
    >
      <AnimatePresence>
        {outlines?.map((card, index) => (
          <React.Fragment key={card.id}>
            <Card
              key={card.id}
              card={card}
              index={index}
              isEditing={editingCard === card.id}
              isSelected={selectedCard === card.id}
              editText={editText}
              onEditChange={onEditChange}
              onEditBlur={() => onCardUpdate(card.id, editText)}
              onEditKeyDown={(e) => {
                if (e.key === "Enter") {
                  onCardUpdate(card.id, editText);
                }
              }}
              onCardClick={() => onCardSelect(card.id)}
              onCardDoubleClick={() => onCardDoubleClick(card.id, card.title)}
              onDeleteClick={() => onCardDelete(card.id)}
              dragHandlers={{
                onDragStart: (e) => onDragStart(e, card),
                onDragEnd: onDragEnd,
              }}
              onDragOver={(e) => onDragOver(e, index)}
              dragOverStyles={getDragOverStyles(index)}
            />
            <AddCardButton onAddCard={() => onAddCard(index)} />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
