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

  console.log(slides);

  // Initialize with a default slide if empty
  useEffect(() => {
    if (!isInitialized && slides.length === 0) {
      setSlides([
        {
          slideName: "Blank card",
          type: "blank-card",
          className:
            "p-8 mx-auto flex flex-col items-start min-h-[200px] bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg",
          content: {
            id: "content1",
            type: "column",
            name: "Column",
            content: [
              {
                id: "title1",
                type: "title",
                name: "Title",
                content: "EduBoost Marketing Plan",
                placeholder: "Untitled Card",
              },
              {
                id: "bullet1",
                type: "bulletList",
                name: "Bullet List",
                content: [
                  "Current Situation Analysis",
                  "Target Audience Definition",
                  "SMART Goals",
                  "Content & Ad Strategy",
                  "Channels & KPIs",
                  "Recommendations",
                ],
              },
              {
                id: "toc1",
                type: "tableOfContents",
                name: "Table of Contents",
                content: [
                  "Analysis",
                  "Audience",
                  "Goals",
                  "Strategy",
                  "Execution",
                  "Next Steps",
                ],
              },
            ],
          },
          id: "slide1",
          slideOrder: 0,
          elements: [],
        },
        {
          slideName: "Three columns with headings",
          type: "threeColumnsWithHeadings",
          className:
            "p-4 mx-auto flex justify-center items-start bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg",
          content: {
            id: "content2",
            type: "column",
            name: "Column",
            content: [
              {
                id: "title2",
                type: "title",
                name: "Title",
                content: "1. Current Situation Analysis",
                placeholder: "Untitled Card",
              },
              {
                id: "callout2",
                type: "calloutBox",
                name: "Callout Box",
                content: "SWOT Insights",
              },
              {
                id: "divider2",
                type: "divider",
                name: "Divider",
                content: "",
              },
              {
                id: "cols2",
                type: "resizable-column",
                name: "Columns",
                className: "border",
                content: [
                  {
                    id: "col2-1",
                    type: "column",
                    name: "Column 1",
                    content: [
                      {
                        id: "h3-2-1",
                        type: "heading3",
                        name: "Heading",
                        content: "Strengths",
                        placeholder: "Heading",
                      },
                      {
                        id: "num2-1",
                        type: "numberedList",
                        name: "Numbered List",
                        content: [
                          "AI-powered planning",
                          "Integration with handbooks",
                          "Real-time eligibility checks",
                        ],
                      },
                    ],
                  },
                  {
                    id: "col2-2",
                    type: "column",
                    name: "Column 2",
                    content: [
                      {
                        id: "h3-2-2",
                        type: "heading3",
                        name: "Heading",
                        content: "Weaknesses",
                        placeholder: "Heading",
                      },
                      {
                        id: "num2-2",
                        type: "numberedList",
                        name: "Numbered List",
                        content: [
                          "Low brand recognition",
                          "Limited initial budget",
                          "Underutilized feedback loops",
                        ],
                      },
                    ],
                  },
                  {
                    id: "col2-3",
                    type: "column",
                    name: "Column 3",
                    content: [
                      {
                        id: "h3-2-3",
                        type: "heading3",
                        name: "Heading",
                        content: "Opportunities",
                        placeholder: "Heading",
                      },
                      {
                        id: "bullet2-3",
                        type: "bulletList",
                        name: "Bullet List",
                        content: [
                          "Growing EdTech demand",
                          "University partnerships",
                          "Regional expansion",
                        ],
                      },
                    ],
                  },
                  {
                    id: "col2-4",
                    type: "column",
                    name: "Column 4",
                    content: [
                      {
                        id: "h3-2-4",
                        type: "heading3",
                        name: "Heading",
                        content: "Threats",
                        placeholder: "Heading",
                      },
                      {
                        id: "bullet2-4",
                        type: "bulletList",
                        name: "Bullet List",
                        content: [
                          "Competitors like Cialfo & Unibuddy",
                          "University cooperation challenges",
                          "Adaptation to diverse curricula",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          id: "slide2",
          slideOrder: 1,
        },
        {
          slideName: "Accent left",
          type: "accentLeft",
          className:
            "min-h-[300px] bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg p-8",
          content: {
            id: "content3",
            type: "column",
            name: "Column",
            restrictDropTo: true,
            content: [
              {
                id: "res3",
                type: "resizable-column",
                name: "Resizable column",
                restrictToDrop: true,
                content: [
                  {
                    id: "col3-1",
                    type: "column",
                    name: "Content",
                    content: [
                      {
                        id: "h3-3",
                        type: "heading3",
                        name: "Heading",
                        content: "SWOT Summary",
                        placeholder: "Heading",
                      },
                      {
                        id: "para3-1",
                        type: "paragraph",
                        name: "Paragraph",
                        content:
                          "EduBoost’s AI and UX strengths position it well, but brand awareness and budget require focused campaigns.",
                        placeholder: "Start typing...",
                      },
                      {
                        id: "para3-2",
                        type: "paragraph",
                        name: "Paragraph",
                        content:
                          "Market opportunities in MENA EdTech are high; competitor presence and adaptation complexities must be managed.",
                        placeholder: "Start typing...",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          id: "slide3",
          slideOrder: 2,
        },
        {
          slideName: "Blank card",
          type: "blank-card",
          className:
            "p-8 mx-auto flex flex-col items-start min-h-[200px] bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg",
          content: {
            id: "content4",
            type: "column",
            name: "Column",
            content: [
              {
                id: "title4",
                type: "title",
                name: "Title",
                content: "2. Ideal Target Audience",
                placeholder: "Untitled Card",
              },
              {
                id: "bullet4",
                type: "bulletList",
                name: "Bullet List",
                content: [
                  "Ahmed – The Planner (20 y/o IS student)",
                  "Sara – The Explorer (19 y/o Engineering student)",
                  "Primary: Undergrads in IS, Engineering, CS",
                  "Secondary: Other faculties & advisors",
                ],
              },
              {
                id: "toc4",
                type: "tableOfContents",
                name: "Table of Contents",
                content: [
                  "Ahmed – The Planner",
                  "Sara – The Explorer",
                  "Primary Segment",
                  "Secondary Segment",
                ],
              },
            ],
          },
          id: "slide4",
          slideOrder: 3,
          elements: [],
        },
        {
          slideName: "Three columns with headings",
          type: "threeColumnsWithHeadings",
          className:
            "p-4 mx-auto flex justify-center items-start bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg",
          content: {
            id: "content5",
            type: "column",
            name: "Column",
            content: [
              {
                id: "title5",
                type: "title",
                name: "Title",
                content: "Persona Details",
                placeholder: "Untitled Card",
              },
              {
                id: "divider5",
                type: "divider",
                name: "Divider",
                content: "",
              },
              {
                id: "cols5",
                type: "resizable-column",
                name: "Columns",
                className: "border",
                content: [
                  {
                    id: "col5-1",
                    type: "column",
                    name: "Column 1",
                    content: [
                      {
                        id: "h3-5-1",
                        type: "heading3",
                        name: "Heading",
                        content: "Ahmed – The Planner",
                        placeholder: "Heading",
                      },
                      {
                        id: "num5-1",
                        type: "numberedList",
                        name: "Numbered List",
                        content: [
                          "Age: 20",
                          "Department: Information Systems",
                          "Traits: Goal-oriented, Tech-savvy",
                        ],
                      },
                    ],
                  },
                  {
                    id: "col5-2",
                    type: "column",
                    name: "Column 2",
                    content: [
                      {
                        id: "h3-5-2",
                        type: "heading3",
                        name: "Heading",
                        content: "Sara – The Explorer",
                        placeholder: "Heading",
                      },
                      {
                        id: "num5-2",
                        type: "numberedList",
                        name: "Numbered List",
                        content: [
                          "Age: 19",
                          "Department: Engineering",
                          "Traits: Visual learner",
                        ],
                      },
                    ],
                  },
                  {
                    id: "col5-3",
                    type: "column",
                    name: "Column 3",
                    content: [
                      {
                        id: "h3-5-3",
                        type: "heading3",
                        name: "Heading",
                        content: "Segments",
                        placeholder: "Heading",
                      },
                      {
                        id: "bullet5-3",
                        type: "bulletList",
                        name: "Bullet List",
                        content: [
                          "Primary: Undergrads in IS, Engineering, CS",
                          "Secondary: Other faculties & advisors",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          id: "slide5",
          slideOrder: 4,
        },
        {
          slideName: "Accent left",
          type: "accentLeft",
          className:
            "min-h-[300px] bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg p-8",
          content: {
            id: "content6",
            type: "column",
            name: "Column",
            restrictDropTo: true,
            content: [
              {
                id: "res6",
                type: "resizable-column",
                name: "Resizable column",
                restrictToDrop: true,
                content: [
                  {
                    id: "col6-1",
                    type: "column",
                    name: "Content",
                    content: [
                      {
                        id: "h3-6",
                        type: "heading3",
                        name: "Heading",
                        content: "Audience Insights",
                        placeholder: "Heading",
                      },
                      {
                        id: "para6-1",
                        type: "paragraph",
                        name: "Paragraph",
                        content:
                          "Personalize messaging based on motivations: planning efficiency vs. exploration.",
                        placeholder: "Start typing...",
                      },
                      {
                        id: "para6-2",
                        type: "paragraph",
                        name: "Paragraph",
                        content:
                          "Leverage interactive polls and visuals to engage both personas effectively.",
                        placeholder: "Start typing...",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          id: "slide6",
          slideOrder: 5,
        },
        {
          slideName: "Blank card",
          type: "blank-card",
          className:
            "p-8 mx-auto flex flex-col items-start min-h-[200px] bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg",
          content: {
            id: "content7",
            type: "column",
            name: "Column",
            content: [
              {
                id: "title7",
                type: "title",
                name: "Title",
                content: "3. SMART Marketing Goals",
                placeholder: "Untitled Card",
              },
              {
                id: "bullet7",
                type: "bulletList",
                name: "Bullet List",
                content: [
                  "Specific: 10,000 sign‑ups by Sep 30 2025",
                  "Measurable: Track sign‑ups & engagement",
                  "Achievable: 4 key platforms",
                  "Relevant: Aligned with launch",
                  "Time-bound: Monthly reviews",
                ],
              },
              {
                id: "toc7",
                type: "tableOfContents",
                name: "Table of Contents",
                content: [
                  "Specific",
                  "Measurable",
                  "Achievable",
                  "Relevant",
                  "Time-bound",
                ],
              },
            ],
          },
          id: "slide7",
          slideOrder: 6,
          elements: [],
        },
        {
          slideName: "Three columns with headings",
          type: "threeColumnsWithHeadings",
          className:
            "p-4 mx-auto flex justify-center items-start bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg",
          content: {
            id: "content8",
            type: "column",
            name: "Column",
            content: [
              {
                id: "title8",
                type: "title",
                name: "Title",
                content: "4. Content Strategy",
                placeholder: "Untitled Card",
              },
              {
                id: "callout8",
                type: "calloutBox",
                name: "Callout Box",
                content: "Pillars & Formats",
              },
              {
                id: "divider8",
                type: "divider",
                name: "Divider",
                content: "",
              },
              {
                id: "cols8",
                type: "resizable-column",
                name: "Columns",
                className: "border",
                content: [
                  {
                    id: "col8-1",
                    type: "column",
                    name: "Column 1",
                    content: [
                      {
                        id: "h3-8-1",
                        type: "heading3",
                        name: "Heading",
                        content: "Pillars",
                        placeholder: "Heading",
                      },
                      {
                        id: "bullet8-1",
                        type: "bulletList",
                        name: "Bullet List",
                        content: [
                          "Academic Success Tips",
                          "Student Testimonials",
                          "Product Features",
                          "Campus Life Content",
                        ],
                      },
                    ],
                  },
                  {
                    id: "col8-2",
                    type: "column",
                    name: "Column 2",
                    content: [
                      {
                        id: "h3-8-2",
                        type: "heading3",
                        name: "Heading",
                        content: "Formats",
                        placeholder: "Heading",
                      },
                      {
                        id: "bullet8-2",
                        type: "bulletList",
                        name: "Bullet List",
                        content: [
                          "Instagram Reels",
                          "Carousels",
                          "Polls & Q&A",
                          "Photo Stories",
                        ],
                      },
                    ],
                  },
                  {
                    id: "col8-3",
                    type: "column",
                    name: "Column 3",
                    content: [
                      {
                        id: "h3-8-3",
                        type: "heading3",
                        name: "Heading",
                        content: "Ad Ideas",
                        placeholder: "Heading",
                      },
                      {
                        id: "bullet8-3",
                        type: "bulletList",
                        name: "Bullet List",
                        content: [
                          "Testimonial Videos",
                          "AI Explainer Animation",
                          "Deadline Countdown Promos",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          id: "slide8",
          slideOrder: 7,
        },
        {
          slideName: "Accent left",
          type: "accentLeft",
          className:
            "min-h-[300px] bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg p-8",
          content: {
            id: "content9",
            type: "column",
            name: "Column",
            restrictDropTo: true,
            content: [
              {
                id: "res9",
                type: "resizable-column",
                name: "Resizable column",
                restrictToDrop: true,
                content: [
                  {
                    id: "col9-1",
                    type: "column",
                    name: "Content",
                    content: [
                      {
                        id: "h3-9",
                        type: "heading3",
                        name: "Heading",
                        content: "5. Advertising Strategy",
                        placeholder: "Heading",
                      },
                      {
                        id: "para9-1",
                        type: "paragraph",
                        name: "Paragraph",
                        content:
                          "Budget: $6k social, $4k search, $3k influencers, $4k events, $3k tools.",
                        placeholder: "Start typing...",
                      },
                      {
                        id: "para9-2",
                        type: "paragraph",
                        name: "Paragraph",
                        content:
                          "Platforms: Instagram, YouTube, Google Ads, TikTok, LinkedIn. Target: 18–25 MENA students.",
                        placeholder: "Start typing...",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          id: "slide9",
          slideOrder: 8,
        },
        {
          slideName: "Blank card",
          type: "blank-card",
          className:
            "p-8 mx-auto flex flex-col items-start min-h-[200px] bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg",
          content: {
            id: "content10",
            type: "column",
            name: "Column",
            content: [
              {
                id: "title10",
                type: "title",
                name: "Title",
                content: "6. Channels & Partnerships",
                placeholder: "Untitled Card",
              },
              {
                id: "bullet10",
                type: "bulletList",
                name: "Bullet List",
                content: [
                  "Instagram Reels & Carousels",
                  "YouTube Explainers & Testimonials",
                  "Email Newsletters",
                  "Campus Booths & Workshops",
                  "Student Ambassadors & Influencers",
                  "University Clubs & Unions",
                ],
              },
            ],
          },
          id: "slide10",
          slideOrder: 9,
          elements: [],
        },
        {
          slideName: "Three columns with headings",
          type: "threeColumnsWithHeadings",
          className:
            "p-4 mx-auto flex justify-center items-start bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg",
          content: {
            id: "content11",
            type: "column",
            name: "Column",
            content: [
              {
                id: "title11",
                type: "title",
                name: "Title",
                content: "7. KPIs",
                placeholder: "Untitled Card",
              },
              {
                id: "divider11",
                type: "divider",
                name: "Divider",
                content: "",
              },
              {
                id: "cols11",
                type: "resizable-column",
                name: "Columns",
                className: "border",
                content: [
                  {
                    id: "col11-1",
                    type: "column",
                    name: "Column 1",
                    content: [
                      {
                        id: "h3-11-1",
                        type: "heading3",
                        name: "Heading",
                        content: "Growth Metrics",
                        placeholder: "Heading",
                      },
                      {
                        id: "bullet11-1",
                        type: "bulletList",
                        name: "Bullet List",
                        content: [
                          "10k users by Sep 30 2025",
                          "5 university partnerships by Q3",
                        ],
                      },
                    ],
                  },
                  {
                    id: "col11-2",
                    type: "column",
                    name: "Column 2",
                    content: [
                      {
                        id: "h3-11-2",
                        type: "heading3",
                        name: "Heading",
                        content: "Engagement Metrics",
                        placeholder: "Heading",
                      },
                      {
                        id: "bullet11-2",
                        type: "bulletList",
                        name: "Bullet List",
                        content: ["≥8% ad CTR", "≥20% email open rate"],
                      },
                    ],
                  },
                  {
                    id: "col11-3",
                    type: "column",
                    name: "Column 3",
                    content: [
                      {
                        id: "h3-11-3",
                        type: "heading3",
                        name: "Heading",
                        content: "Conversion Metrics",
                        placeholder: "Heading",
                      },
                      {
                        id: "bullet11-3",
                        type: "bulletList",
                        name: "Bullet List",
                        content: [
                          "30% ad‑to‑registration conversion",
                          "Monthly dashboard updates",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          id: "slide11",
          slideOrder: 10,
        },
        {
          slideName: "Accent left",
          type: "accentLeft",
          className:
            "min-h-[300px] bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg p-8",
          content: {
            id: "content12",
            type: "column",
            name: "Column",
            restrictDropTo: true,
            content: [
              {
                id: "res12",
                type: "resizable-column",
                name: "Resizable column",
                restrictToDrop: true,
                content: [
                  {
                    id: "col12-1",
                    type: "column",
                    name: "Content",
                    content: [
                      {
                        id: "h3-12",
                        type: "heading3",
                        name: "Heading",
                        content: "8. Recommendations",
                        placeholder: "Heading",
                      },
                      {
                        id: "para12-1",
                        type: "paragraph",
                        name: "Paragraph",
                        content:
                          "Boost visibility with ambassador programs and interactive campaigns.",
                        placeholder: "Start typing...",
                      },
                      {
                        id: "para12-2",
                        type: "paragraph",
                        name: "Paragraph",
                        content:
                          "Implement modular content for diverse majors and prepare MENA expansion playbook.",
                        placeholder: "Start typing...",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          id: "slide12",
          slideOrder: 11,
        },
        {
          slideName: "Blank card",
          type: "blank-card",
          className:
            "p-8 mx-auto flex flex-col items-start min-h-[200px] bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg",
          content: {
            id: "content13",
            type: "column",
            name: "Column",
            content: [
              {
                id: "title13",
                type: "title",
                name: "Title",
                content: "9. Next Steps",
                placeholder: "Untitled Card",
              },
              {
                id: "bullet13",
                type: "bulletList",
                name: "Bullet List",
                content: [
                  "Launch GPA Tracker Mini-Tool",
                  "Run Monthly Spotlight Campaigns",
                  "Gamify Planning Challenges",
                  "Scale Successful Ads Regionally",
                ],
              },
            ],
          },
          id: "slide13",
          slideOrder: 12,
          elements: [],
        },
        {
          slideName: "Three columns with headings",
          type: "threeColumnsWithHeadings",
          className:
            "p-4 mx-auto flex justify-center items-start bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg",
          content: {
            id: "content14",
            type: "column",
            name: "Column",
            content: [
              {
                id: "title14",
                type: "title",
                name: "Title",
                content: "10. Monitoring & Reporting",
                placeholder: "Untitled Card",
              },
              {
                id: "callout14",
                type: "calloutBox",
                name: "Callout Box",
                content: "Real-Time Insights",
              },
              {
                id: "divider14",
                type: "divider",
                name: "Divider",
                content: "",
              },
              {
                id: "cols14",
                type: "resizable-column",
                name: "Columns",
                className: "border",
                content: [
                  {
                    id: "col14-1",
                    type: "column",
                    name: "Column 1",
                    content: [
                      {
                        id: "h3-14-1",
                        type: "heading3",
                        name: "Heading",
                        content: "Dashboards",
                        placeholder: "Heading",
                      },
                      {
                        id: "bullet14-1",
                        type: "bulletList",
                        name: "Bullet List",
                        content: [
                          "Google Data Studio",
                          "Real-time KPI Tracking",
                        ],
                      },
                    ],
                  },
                  {
                    id: "col14-2",
                    type: "column",
                    name: "Column 2",
                    content: [
                      {
                        id: "h3-14-2",
                        type: "heading3",
                        name: "Heading",
                        content: "Reports",
                        placeholder: "Heading",
                      },
                      {
                        id: "bullet14-2",
                        type: "bulletList",
                        name: "Bullet List",
                        content: [
                          "Quarterly PDF Summaries",
                          "Stakeholder Reviews",
                        ],
                      },
                    ],
                  },
                  {
                    id: "col14-3",
                    type: "column",
                    name: "Column 3",
                    content: [
                      {
                        id: "h3-14-3",
                        type: "heading3",
                        name: "Heading",
                        content: "Adjustments",
                        placeholder: "Heading",
                      },
                      {
                        id: "bullet14-3",
                        type: "bulletList",
                        name: "Bullet List",
                        content: [
                          "Scale successful tactics",
                          "Optimize underperforming channels",
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          id: "slide14",
          slideOrder: 13,
        },
        {
          slideName: "Accent left",
          type: "accentLeft",
          className:
            "min-h-[300px] bg-gradient-to-br from-blue-50 to-white text-gray-900 rounded-2xl shadow-lg p-8",
          content: {
            id: "content15",
            type: "column",
            name: "Column",
            restrictDropTo: true,
            content: [
              {
                id: "res15",
                type: "resizable-column",
                name: "Resizable column",
                restrictToDrop: true,
                content: [
                  {
                    id: "col15-1",
                    type: "column",
                    name: "Content",
                    content: [
                      {
                        id: "h3-15",
                        type: "heading3",
                        name: "Heading",
                        content: "Thank You",
                        placeholder: "Heading",
                      },
                      {
                        id: "para15-1",
                        type: "paragraph",
                        name: "Paragraph",
                        content:
                          "Questions? Let's connect and make EduBoost a success!",
                        placeholder: "Start typing...",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          id: "slide15",
          slideOrder: 14,
        },
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
