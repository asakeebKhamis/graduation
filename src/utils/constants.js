import {
  BlankCardIcon,
  FourColumnsIcon,
  FourImageColumnsIcon,
  ImageAndTextIcon,
  TextAndImageIcon,
  ThreeColumnsIcon,
  ThreeColumnsWithHeadingsIcon,
  ThreeImageColumnsIcon,
  TwoColumnsIcon,
  TwoColumnsWithHeadingsIcon,
  TwoImageColumnsIcon,
} from "../pages/PresentationPages/Components/RightSidebar/IconsComponent";
import {
  Blockquote,
  BulletListComponent,
  CalloutBoxComponent,
  CodeBlockComponent,
  CustomButtonComponent,
  CustomImage,
  DividerComponent,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  NumberedListComponent,
  Paragraph,
  ResizableColumn,
  Table,
  TableOfContentsComponent,
  Title,
  TodolistComponent,
} from "../pages/PresentationPages/Components/RightSidebar/SlidesComponent";
import {
  AccentLeft,
  AccentRight,
  BlankCard,
  FourColumns,
  FourImageColumns,
  ImageAndText,
  TextAndImage,
  ThreeColumns,
  ThreeColumnsWithHeadings,
  ThreeImageColumns,
  TwoColumns,
  TwoColumnsWithHeadings,
  TwoImageColumns,
} from "../pages/PresentationPages/Components/RightSidebar/SlidesLayout";

export const CreatePageCard = [
  {
    title: "Use a",
    highlightedText: "Template",
    description: "Write a prompt and leave everything else for us to handle",
    type: "template",
  },
  {
    title: "Generate with",
    highlightedText: "Creative AI",
    description: "Write a prompt and leave everything else for us to handle",
    type: "creative-ai",
    highlight: true,
  },
  {
    title: "Start from",
    highlightedText: "Scratch",
    description: "Write a prompt and leave everything else for us to handle",
    type: "create-scratch",
  },
];

export const themes = [
  {
    name: "Default",
    fontFamily: "'Inter', sans-serif",
    fontColor: "#333333",
    backgroundColor: "#101010",
    slideBackgroundColor: "#ffffff",
    accentColor: "#308741",
    type: "light",
  },
  {
    name: "Ocean",
    fontFamily: "'Roboto', sans-serif",
    fontColor: "#ffffff",
    backgroundColor: "#022c43",
    slideBackgroundColor: "#1b3a4b",
    accentColor: "#ff6b6b",
    type: "dark",
  },
  {
    name: "Sunset",
    fontFamily: "'Lato', sans-serif",
    fontColor: "#ffffff",
    backgroundColor: "#ff9a76",
    slideBackgroundColor: "#ffccbc",
    accentColor: "#d84315",
    type: "light",
  },
  {
    name: "Forest",
    fontFamily: "'Georgia', serif",
    fontColor: "#e0e0e0",
    backgroundColor: "#2e7d32",
    slideBackgroundColor: "#a5d6a7",
    accentColor: "#1b5e20",
    type: "dark",
  },
  {
    name: "Midnight",
    fontFamily: "'Roboto', sans-serif",
    fontColor: "#cfcfcf",
    backgroundColor: "#0d0d0d",
    slideBackgroundColor: "#262626",
    accentColor: "#ffcc00",
    type: "dark",
  },
  {
    name: "Lavender",
    fontFamily: "'Helvetica', sans-serif",
    fontColor: "#4a148c",
    backgroundColor: "#f3e5f5",
    slideBackgroundColor: "#e1bee7",
    accentColor: "#ab47bc",
    type: "light",
  },
  {
    name: "Coral",
    fontFamily: "'Verdana', sans-serif",
    fontColor: "#ffffff",
    backgroundColor: "#ff7043",
    slideBackgroundColor: "#ffab91",
    accentColor: "#bf360c",
    type: "dark",
  },
  {
    name: "Slate",
    fontFamily: "'Tahoma', sans-serif",
    fontColor: "#212121",
    backgroundColor: "#eceff1",
    slideBackgroundColor: "#cfd8dc",
    accentColor: "#37474f",
    type: "light",
  },
  {
    name: "Crimson",
    fontFamily: "'Times New Roman', serif",
    fontColor: "#ffffff",
    backgroundColor: "#b71c1c",
    slideBackgroundColor: "#ef9a9a",
    accentColor: "#d32f2f",
    type: "dark",
  },
  {
    name: "Emerald",
    fontFamily: "'Palatino', serif",
    fontColor: "#ffffff",
    backgroundColor: "#004d40",
    slideBackgroundColor: "#80cbc4",
    accentColor: "#00796b",
    type: "dark",
  },
  {
    name: "Sky",
    fontFamily: "'Arial', sans-serif",
    fontColor: "#01579b",
    backgroundColor: "#e1f5fe",
    slideBackgroundColor: "#81d4fa",
    accentColor: "#0288d1",
    type: "light",
  },
  {
    name: "Rose",
    fontFamily: "'Lucida Console', monospace",
    fontColor: "#880e4f",
    backgroundColor: "#fce4ec",
    slideBackgroundColor: "#f8bbd0",
    accentColor: "#c2185b",
    type: "light",
  },
  {
    name: "Dusk",
    fontFamily: "'Cambria', serif",
    fontColor: "#e0e0e0",
    backgroundColor: "#424242",
    slideBackgroundColor: "#616161",
    accentColor: "#ffab00",
    type: "dark",
  },
  {
    name: "Mint",
    fontFamily: "'Gill Sans', sans-serif",
    fontColor: "#004d40",
    backgroundColor: "#e8f5e9",
    slideBackgroundColor: "#a5d6a7",
    accentColor: "#1b5e20",
    type: "light",
  },
  {
    name: "Copper",
    fontFamily: "'Futura', sans-serif",
    fontColor: "#4e342e",
    backgroundColor: "#fbe9e7",
    slideBackgroundColor: "#d7ccc8",
    accentColor: "#bf360c",
    type: "light",
  },
  {
    name: "Electric",
    fontFamily: "'Impact', sans-serif",
    fontColor: "#ffffff",
    backgroundColor: "#212121",
    slideBackgroundColor: "#424242",
    accentColor: "#00e676",
    type: "dark",
  },
  {
    name: "Pebble",
    fontFamily: "'Century Gothic', sans-serif",
    fontColor: "#37474f",
    backgroundColor: "#eceff1",
    slideBackgroundColor: "#b0bec5",
    accentColor: "#607d8b",
    type: "light",
  },
  {
    name: "Marina",
    fontFamily: "'Franklin Gothic', sans-serif",
    fontColor: "#ffffff",
    backgroundColor: "#01579b",
    slideBackgroundColor: "#0288d1",
    accentColor: "#0277bd",
    type: "dark",
  },
  {
    name: "Ivory",
    fontFamily: "'Garamond', serif",
    fontColor: "#212121",
    backgroundColor: "#ffffff",
    slideBackgroundColor: "#f5f5f5",
    accentColor: "#ff5722",
    type: "light",
  },
  {
    name: "Graphite",
    fontFamily: "'Consolas', monospace",
    fontColor: "#b0bec5",
    backgroundColor: "#263238",
    slideBackgroundColor: "#37474f",
    accentColor: "#607d8b",
    type: "dark",
  },
];

export const layouts = [
  {
    name: "Basic",
    layouts: [
      {
        name: "Blank card",
        icon: BlankCardIcon,
        type: "layout",
        layoutType: "blank-card",
        component: BlankCard,
      },
      {
        name: "Image and text",
        icon: ImageAndTextIcon,
        type: "layout",
        layoutType: "imageAndText",
        component: ImageAndText,
      },
      {
        name: "Text and image",
        icon: TextAndImageIcon,
        type: "layout",
        layoutType: "textAndImage",
        component: TextAndImage,
      },
    ],
  },
  {
    name: "Columns",
    layouts: [
      {
        name: "Two Columns",
        icon: TwoColumnsIcon,
        type: "layout",
        layoutType: "twoColumns",
        component: TwoColumns,
      },
      {
        name: "Three Columns",
        icon: ThreeColumnsIcon,
        type: "layout",
        layoutType: "threeColumns",
        component: ThreeColumns,
      },
      {
        name: "Four Columns",
        icon: FourColumnsIcon,
        type: "layout",
        layoutType: "fourColumns",
        component: FourColumns,
      },
      {
        name: "Two Columns with headings",
        icon: TwoColumnsWithHeadingsIcon,
        type: "layout",
        layoutType: "twoColumnsWithHeadings",
        component: TwoColumnsWithHeadings,
      },
      {
        name: "Three Columns with headings",
        icon: ThreeColumnsWithHeadingsIcon,
        type: "layout",
        layoutType: "threeColumnsWithHeadings",
        component: ThreeColumnsWithHeadings,
      },
    ],
  },
  {
    name: "Images",
    layouts: [
      {
        name: "2 images columns",
        icon: TwoImageColumnsIcon,
        type: "layout",
        layoutType: "twoImageColumns",
        component: TwoImageColumns,
      },
      {
        name: "3 images columns",
        icon: ThreeImageColumnsIcon,
        type: "layout",
        layoutType: "threeImageColumns",
        component: ThreeImageColumns,
      },
      {
        name: "4 images columns",
        icon: FourImageColumnsIcon,
        type: "layout",
        layoutType: "fourImageColumns",
        component: FourImageColumns,
      },
    ],
  },
  {
    name: "Card layouts",
    layouts: [
      {
        name: "Accent left",
        icon: ImageAndTextIcon,
        type: "layout",
        layoutType: "accentLeft",
        component: AccentLeft,
      },
      {
        name: "Accent right",
        icon: TextAndImageIcon,
        type: "layout",
        layoutType: "accentRight",
        component: AccentRight,
      },
    ],
  },
];

export const components = [
  {
    name: "Text",
    components: [
      {
        name: "Title",
        icon: "T",
        type: "component",
        component: Title,
        componentType: "title",
      },
      {
        componentType: "heading1",
        name: "Heading 1",
        type: "component",
        component: Heading1,
        icon: "H1",
      },
      {
        componentType: "heading2",
        name: "Heading 2",
        type: "component",
        component: Heading2,
        icon: "H2",
      },
      {
        componentType: "heading3",
        name: "Heading 3",
        type: "component",
        component: Heading3,
        icon: "H3",
      },
      {
        componentType: "heading4",
        name: "Heading 4",
        type: "component",
        component: Heading4,
        icon: "H4",
      },
      {
        componentType: "paragraph",
        name: "Paragraph",
        type: "component",
        component: Paragraph,
        icon: "Paragraph",
      },
      {
        componentType: "blockquote",
        name: "Blockquote",
        type: "component",
        component: Blockquote,
        icon: "❝",
      },
      {
        componentType: "calloutBox",
        name: "Callout Box",
        type: "component",
        component: CalloutBoxComponent,
        icon: "💬",
      },
      {
        componentType: "codeBlock",
        name: "Code Block",
        type: "component",
        component: CodeBlockComponent,
        icon: "</>",
      },
    ],
  },
  {
    name: "Tables",
    components: [
      {
        componentType: "table2x2",
        name: "2x2 table",
        type: "component",
        component: { ...Table, initialColumns: 2, initialRows: 2 },
        icon: "m",
      },
      {
        componentType: "table3x3",
        name: "3x3 table",
        type: "component",
        component: { ...Table, initialColumns: 3, initialRows: 3 },
        icon: "m",
      },
      {
        componentType: "table4x4",
        name: "4x4 table",
        type: "component",
        component: { ...Table, initialColumns: 4, initialRows: 4 },
        icon: "m",
      },
    ],
  },
  {
    name: "Lists",
    components: [
      {
        componentType: "bulletList",
        name: "Bulleted list",
        type: "component",
        component: BulletListComponent,
        icon: "•",
      },
      {
        componentType: "numberedList",
        name: "Numbered list",
        type: "component",
        component: NumberedListComponent,
        icon: "1.",
      },
      {
        componentType: "todolist",
        name: "Todo list",
        type: "component",
        component: TodolistComponent,
        icon: "✓",
      },
      {
        componentType: "tableOfContents",
        name: "Table of Contents",
        type: "component",
        component: TableOfContentsComponent,
        icon: "📑",
      },
    ],
  },
  {
    name: "Media",
    components: [
      {
        componentType: "image",
        name: "Image",
        type: "component",
        component: CustomImage,
        icon: "🖼️",
      },
    ],
  },
  {
    name: "Layout",
    components: [
      {
        componentType: "divider",
        name: "Divider",
        type: "component",
        component: DividerComponent,
        icon: "―",
      },
      {
        componentType: "resizable-column",
        name: "Columns",
        type: "component",
        component: ResizableColumn,
        icon: "⇶",
      },
    ],
  },
  {
    name: "Interactive",
    components: [
      {
        componentType: "customButton",
        name: "Button",
        type: "component",
        component: CustomButtonComponent,
        icon: "🖱️",
      },
    ],
  },
];
