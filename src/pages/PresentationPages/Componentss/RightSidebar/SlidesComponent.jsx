export const Title = {
  id: Math.random().toString(36).substring(2),
  type: "heading1",
  name: "Title",
  content: "",
  placeholder: "Title",
};

export const Heading1 = {
  id: Math.random().toString(36).substring(2),
  type: "heading1",
  name: "Heading 1",
  content: "",
  placeholder: "Heading 1",
};

export const Heading2 = {
  id: Math.random().toString(36).substring(2),
  type: "heading2",
  name: "Heading 2",
  content: "",
  placeholder: "Heading 2",
};

export const Heading3 = {
  id: Math.random().toString(36).substring(2),
  type: "heading3",
  name: "Heading 3",
  content: "",
  placeholder: "Heading 3",
};

export const Heading4 = {
  id: Math.random().toString(36).substring(2),
  type: "heading",
  name: "Heading 4",
  content: "",
  placeholder: "Heading 4",
};

export const Paragraph = {
  id: Math.random().toString(36).substring(2),
  type: "paragraph",
  name: "Paragraph",
  content: "",
  placeholder: "Start typing...",
};

export const Table = {
  id: Math.random().toString(36).substring(2),
  type: "table",
  name: "Table",
  initialRows: 2,
  initialColumns: 2,
  content: [],
};

export const Blockquote = {
  id: Math.random().toString(36).substring(2),
  type: "blockquote",
  name: "Blockquote",
  content: "",
  placeholder: "Type here",
};

export const CustomImage = {
  id: Math.random().toString(36).substring(2),
  type: "image",
  name: "Image",
  content: "",
  alt: "Image",
};

export const NumberedListComponent = {
  id: Math.random().toString(36).substring(2),
  type: "numberedList",
  name: "Numbered List",
  content: ["First item", "Second item", "Third item"],
};

export const BulletListComponent = {
  id: Math.random().toString(36).substring(2),
  type: "bulletList",
  name: "Bullet List",
  content: ["First item", "Second item", "Third item"],
};

export const TodolistComponent = {
  id: Math.random().toString(36).substring(2),
  type: "todolist",
  name: "Todo List",
  content: [
    { text: "Task 1", checked: false },
    { text: "Task 2", checked: false },
    { text: "Task 3", checked: false },
  ],
};

export const CalloutBoxComponent = {
  id: Math.random().toString(36).substring(2),
  type: "calloutBox",
  name: "Callout Box",
  content: "This is a callout box",
};

export const CodeBlockComponent = {
  id: Math.random().toString(36).substring(2),
  type: "codeBlock",
  name: "Code Block",
  language: "javascript",
  content: "console.log('Hello World!');",
};

export const CustomButtonComponent = {
  id: Math.random().toString(36).substring(2),
  type: "customButton",
  name: "Custom Button",
  content: "Click me",
  link: "#",
  bgColor: "#3b82f6", // Fixed the color code
  isTransparent: false,
};

export const TableOfContentsComponent = {
  id: Math.random().toString(36).substring(2),
  type: "tableOfContents",
  name: "Table of Contents",
  content: ["Section 1", "Section 2", "Section 3"],
};

export const DividerComponent = {
  id: Math.random().toString(36).substring(2),
  type: "divider",
  name: "Divider",
  content: "",
};

export const ResizableColumn = {
  id: Math.random().toString(36).substring(2),
  type: "resizable-column",
  name: "Text and Image",
  className: "border",
  content: [
    {
      id: Math.random().toString(36).substring(2),
      type: "column",
      name: "Column",
      content: [
        {
          id: Math.random().toString(36).substring(2),
          type: "paragraph",
          name: "Paragraph",
          content: "",
          placeholder: "Start typing...",
        },
      ],
    },
    {
      id: Math.random().toString(36).substring(2),
      type: "column",
      name: "Column",
      content: [
        {
          id: Math.random().toString(36).substring(2),
          type: "paragraph",
          name: "Paragraph",
          content: "",
          placeholder: "Start typing...",
        },
      ],
    },
  ],
};
