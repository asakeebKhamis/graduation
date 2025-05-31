"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "src/components/ui/button";
import { Card } from "src/components/ui/card";
import { containerVariants, itemVariants } from "../../utils/motionVariants";
import ProjectInfoStep from "./form-steps/ProjectInfoStep";
import TargetAudienceStep from "./form-steps/TargetAudienceStep";
import MarketingGoalsStep from "./form-steps/MarketingGoalsStep";
import CurrentSituationStep from "./form-steps/CurrentSituationStep";
import USPStep from "./form-steps/USPStep";
import BrandVoiceStep from "./form-steps/BrandVoiceStep";
import BudgetStep from "./form-steps/BudgetStep";
import MarketingChannelsStep from "./form-steps/MarketingChannelsStep";
import CompetitorsStep from "./form-steps/CompetitorsStep";
import TimelineStep from "./form-steps/TimelineStep";
import AdditionalQuestionsStep from "./form-steps/AdditionalQuestionsStep";
import FormProgress from "./form-components/FormProgress";
import { Loader2, Wand2, Download, Upload, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import FormComplete from "./form-steps/FormComplete";
import { presentationAPI } from "../../lib/api";
import FormEditAi from "./form-components/FormEditAi";

const steps = [
  { id: "project-info", title: "معلومات عن المشروع" },
  { id: "target-audience", title: "العملاء المستهدفين" },
  { id: "marketing-goals", title: "الأهداف التسويقية" },
  { id: "current-situation", title: "تحليل الوضع الحالي" },
  { id: "usp", title: "نقاط البيع الفريدة" },
  { id: "brand-voice", title: "صوت العلامة التجارية" },
  { id: "budget", title: "الميزانية المتاحة" },
  { id: "marketing-channels", title: "القنوات التسويقية" },
  { id: "competitors", title: "نظرة على المنافسين" },
  { id: "timeline", title: "الوقت المتاح للنتائج" },
  { id: "additional-questions", title: "أسئلة إضافية" },
];

const genAI = new GoogleGenerativeAI("AIzaSyCQ1sKE_D2B8agWv8Xnja7HSoacQszS-UE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: "text/plain",
};

export default function ProjectForm() {
  const { setSlides, setProject } = useStore();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState("");
  const [projectId, setProjectId] = useState("");

  const [formData, setFormData] = useState({
    // Project Info
    projectName: "EduBoost",
    businessField: "EdTech (Educational Technology)",
    projectDescription:
      "EduBoost is a smart academic advising platform designed to help university students plan and register for courses efficiently using AI-driven guidance.",
    visionMission:
      "To empower students through technology-driven academic planning tools that enhance success and reduce registration friction.",

    // Target Audience
    targetAudience: "University students aged 18–25",
    interestsBehaviors:
      "Tech-savvy, goal-oriented, time-conscious, prefers digital solutions",
    demographicGoals:
      "Focus on undergraduate students in information systems, engineering, and computer science departments",

    // Marketing Goals
    primaryGoal:
      "Increase platform sign-ups and user engagement during course registration periods",
    shortLongTermGoals:
      "Short-term: Reach 10,000 users in first year. Long-term: Partner with 15+ universities across MENA region",
    priorities:
      "Brand awareness, user acquisition, partnership with universities",

    // Current Situation
    digitalPresence:
      "Basic landing page and social media pages on Instagram and LinkedIn",
    previousMarketing:
      "Limited to word-of-mouth and university WhatsApp groups",
    strengthsWeaknesses:
      "Strengths: Unique value proposition and user-centric design. Weaknesses: Low brand recognition and limited initial budget",

    // USP
    competitiveAdvantages:
      "AI-powered academic planning, integration with student handbooks, visual course paths",
    uniqueTechnology:
      "Custom-built recommendation engine using prerequisite and GPA mapping logic",

    // Brand Voice
    generalDirection: "Friendly, supportive, and student-first",
    tonality: "Encouraging, knowledgeable, slightly informal but professional",

    // Budget
    financialAllocation:
      "Initial seed budget of $20,000 allocated across development, marketing, and hosting",
    budgetPriorities:
      "Digital advertising, influencer partnerships, campus ambassador program",

    // Marketing Channels
    channelSelection:
      "Instagram, YouTube, email newsletters, university events",
    mostEffectiveChannels:
      "Instagram Reels, peer-to-peer referrals, targeted Google Ads",

    // Competitors
    mainCompetitors: "Cialfo, Unibuddy, traditional academic advisors",
    competitorStrategies:
      "Content marketing, partnerships with schools, webinars and guides",

    // Timeline
    timeframe: "Soft launch in August 2025, full launch in September 2025",
    seasonalPeriods:
      "Peaks during course registration windows (Jan-Feb and Jul-Aug)",

    // Additional Questions
    productAdvantages:
      "Streamlined advising, real-time course eligibility checks, tailored suggestions",
    upcomingProducts:
      "Mobile app version, GPA tracker, peer study group finder",
    preferredCampaigns:
      "Success story spotlights, student ambassador content, giveaways",
    customerRelationship:
      "Active support on WhatsApp and email, in-app feedback prompts",
    contentPreferences: "Visual explainers, short videos, student testimonials",
    audienceInteractions: "Polls, Q&As, interactive planners",
    targetingStrategy:
      "Behavioral and interest-based targeting using social ads",
    audienceInterestsOutside: "Gaming, tech trends, career development",
    measurementPreferences:
      "Monthly performance dashboards, in-depth quarterly reviews",
    reportPreferences: "Google Data Studio + PDF executive summaries",
    previousChallenges: "Low visibility among students, limited feedback loops",
    expansionConcerns: "Adapting content and features for non-IS majors",
    customerSupport:
      "In-app chat, chatbot integration planned, email support within 24h",
    customerExperience:
      "Smooth onboarding, personalized dashboards, gamified planning",
    designPreferences:
      "Minimalist, youthful, modern UI with blue and green color palette",
    photographyStyle: "Candid student life photos, high-energy campus moments",
    peakPeriods: "Two weeks before and after registration opens",
    specificTimeframes:
      "Soft launch by August 15th, promotional blitz by September 1st",
    fiveYearVision:
      "To become the leading academic support platform in the MENA region",
    expansionPlans:
      "Integrate with 50+ universities, expand to include high school planning tools",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
      setIsComplete(false);
    }
  };

  const handleSubmit = async () => {
    setIsGenerating(true);

    try {
//       const prompt = `
//       > You now have full access to all available business data retrieved, which includes detailed information about the brand, products, services, target audiences, marketing goals, pricing, targeting locations, and competitors. Additionally, you have the following custom information:

// > Project Name: ${formData.projectName}  
// > Business Field: ${formData.businessField}  
// > Project Description: ${formData.projectDescription}  
// > Vision & Mission: ${formData.visionMission}  
// > Target Audience: ${formData.targetAudience}  
// > Interests & Behaviors: ${formData.interestsBehaviors}  
// > Demographic Goals: ${formData.demographicGoals}  
// > Primary Marketing Goal: ${formData.primaryGoal}  
// > Short & Long Term Goals: ${formData.shortLongTermGoals}  
// > Priorities: ${formData.priorities}  
// > Digital Presence: ${formData.digitalPresence}  
// > Previous Marketing: ${formData.previousMarketing}  
// > Strengths & Weaknesses: ${formData.strengthsWeaknesses}  
// > Competitive Advantages: ${formData.competitiveAdvantages}  
// > Unique Technology: ${formData.uniqueTechnology}  
// > Brand Voice Direction: ${formData.generalDirection}  
// > Brand Tonality: ${formData.tonality}  
// > Marketing Budget: ${formData.financialAllocation}  
// > Budget Priorities: ${formData.budgetPriorities}  
// > Marketing Channels: ${formData.channelSelection}  
// > Most Effective Channels: ${formData.mostEffectiveChannels}  
// > Main Competitors: ${formData.mainCompetitors}  
// > Competitor Strategies: ${formData.competitorStrategies}  
// > Timeframe: ${formData.timeframe}  
// > Seasonal Periods: ${formData.seasonalPeriods}  
// > Additional Information:
// > - Product Advantages: ${formData.productAdvantages}
// > - Upcoming Products: ${formData.upcomingProducts}
// > - Preferred Campaigns: ${formData.preferredCampaigns}
// > - Customer Relationship: ${formData.customerRelationship}
// > - Content Preferences: ${formData.contentPreferences}
// > - Audience Interactions: ${formData.audienceInteractions}
// > - Targeting Strategy: ${formData.targetingStrategy}
// > - Audience Interests Outside: ${formData.audienceInterestsOutside}
// > - Measurement Preferences: ${formData.measurementPreferences}
// > - Report Preferences: ${formData.reportPreferences}
// > - Previous Challenges: ${formData.previousChallenges}
// > - Expansion Concerns: ${formData.expansionConcerns}
// > - Customer Support: ${formData.customerSupport}
// > - Customer Experience: ${formData.customerExperience}
// > - Design Preferences: ${formData.designPreferences}
// > - Photography Style: ${formData.photographyStyle}
// > - Peak Periods: ${formData.peakPeriods}
// > - Specific Timeframes: ${formData.specificTimeframes}
// > - Five Year Vision: ${formData.fiveYearVision}
// > - Expansion Plans: ${formData.expansionPlans}
// >
// > **Your task is to:**  
// > Carefully analyze all the provided data, deeply understand the brand and its ecosystem, then develop a complete, professional marketing plan that includes:
// >
// > 1. **Current Situation Analysis**  
// > 2. **Define the Ideal Target Audience** (Create Buyer Personas + Segments)  
// > 3. **Set SMART Marketing Goals** (Specific, Measurable, Achievable, Relevant, Time-bound)  
// > 4. **Content Strategy**, including:
// >    - Content Pillars
// >    - Post Ideas and Ad Ideas  
// > 5. **Advertising Campaign Strategy**, covering:
// >    - Budget Allocation
// >    - Targeting (demographic, behavioral, interests)
// >    - Platforms Selection (e.g., Facebook, Instagram, TikTok, Google Ads)  
// > 6. **Full Marketing Channels Plan**:
// >    - Social Media Channels
// >    - Offline Marketing Opportunities
// >    - Influencer Collaborations
// >    - Potential Partnerships
// > 7. **Clear KPIs** for measuring each goal and tracking performance  
// > 8. **Solutions and Recommendations**:
// >    - Address any detected challenges or weaknesses
// >    - Provide proactive solutions and additional suggestions from your expertise to maximize success
// >
// > ✅ Make the marketing plan detailed, practical, and ready for real-world execution, with examples and action steps wherever possible.

// ${JSON.stringify([
//   {
//     slideName: "Blank card",
//     type: "blank-card",
//     className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
//     content: {
//       id: "7qnukx3rk9o",
//       type: "column",
//       name: "Column",
//       content: [
//         {
//           id: "wn5yynls75",
//           type: "title",
//           name: "Title",
//           content: "",
//           placeholder: "Untitled Card",
//         },
//         {
//           id: "ejkhcvjwgft",
//           type: "paragraph",
//           name: "Paragraph",
//           content: "",
//           placeholder: "Start typing...",
//         },
//       ],
//     },
//     id: "jxnaaw0y9lh",
//     slideOrder: 0,
//     elements: [],
//   },
//   {
//     slideName: "Blank card",
//     type: "blank-card",
//     className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
//     content: {
//       id: "7qnukx3rk9o",
//       type: "column",
//       name: "Column",
//       content: [
//         {
//           id: "wn5yynls75",
//           type: "title",
//           name: "Title",
//           content: "",
//           placeholder: "Untitled Card",
//         },
//         {
//           id: "loj4jol7x9",
//           type: "bulletList",
//           name: "Bullet List",
//           content: ["First item", "Second item", "Third item", "Four item"],
//         },
//         {
//           id: "uwy6sroraa",
//           type: "tableOfContents",
//           name: "Table of Contents",
//           content: ["Section 1", "Section 2", "Section 3"],
//         },
//       ],
//     },
//     id: "8hk50l5vjp3",
//     slideOrder: 1,
//     elements: [],
//   },
//   {
//     slideName: "Blank card",
//     type: "blank-card",
//     className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
//     content: {
//       id: "7qnukx3rk9o",
//       type: "column",
//       name: "Column",
//       content: [
//         {
//           id: "wn5yynls75",
//           type: "title",
//           name: "Title",
//           content: "",
//           placeholder: "Untitled Card",
//         },
//         {
//           id: "dxzu7ggiudi",
//           type: "table",
//           name: "Table",
//           initialRows: 4,
//           initialColumns: 4,
//           content: [],
//         },
//       ],
//     },
//     id: "lm1ljf2x9wo",
//     slideOrder: 2,
//   },
//   {
//     slideName: "Three columns with headings",
//     type: "threeColumnsWithHeadings",
//     className: "p-4 mx-auto flex justify-center items-center",
//     content: {
//       id: "68mmx72qc89",
//       type: "column",
//       name: "Column",
//       content: [
//         {
//           id: "lhs8udqfdj",
//           type: "title",
//           name: "Title",
//           content: "",
//           placeholder: "Untitled Card",
//         },
//         {
//           id: "dlzhak2tj",
//           type: "calloutBox",
//           name: "Callout Box",
//           content: "This is a callout box",
//         },
//         {
//           id: "c485istie6t",
//           type: "divider",
//           name: "Divider",
//           content: "",
//         },
//         {
//           id: "9v68k15rv8",
//           type: "resizable-column",
//           name: "Columns",
//           className: "border",
//           content: [
//             {
//               id: "9ul816wcojl",
//               type: "column",
//               name: "Column 1",
//               content: [
//                 {
//                   id: "jmdeu0rh3c",
//                   type: "heading3",
//                   name: "Heading",
//                   content: "",
//                   placeholder: "Heading",
//                 },
//                 {
//                   id: "ckpmnp0o83n",
//                   type: "paragraph",
//                   name: "Paragraph",
//                   content: "",
//                   placeholder: "Start typing...",
//                 },
//                 {
//                   id: "8tkmgw2z12q",
//                   type: "numberedList",
//                   name: "Numbered List",
//                   content: ["First item", "Second item", "Third item"],
//                 },
//               ],
//             },
//             {
//               id: "tg70ipgmsg",
//               type: "column",
//               name: "Column 2",
//               content: [
//                 {
//                   id: "8m4ogtsie8a",
//                   type: "heading3",
//                   name: "Heading",
//                   content: "",
//                   placeholder: "Heading",
//                 },
//                 {
//                   id: "zoz4hzd2e2h",
//                   type: "paragraph",
//                   name: "Paragraph",
//                   content: "",
//                   placeholder: "Start typing...",
//                 },
//                 {
//                   id: "mwt268aj89",
//                   type: "todolist",
//                   name: "Todo List",
//                   content: [
//                     {
//                       text: "Task 1",
//                       checked: false,
//                     },
//                     {
//                       text: "Task 2",
//                       checked: false,
//                     },
//                     {
//                       text: "Task 3",
//                       checked: false,
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               id: "end8ste7lor",
//               type: "column",
//               name: "Column 3",
//               content: [
//                 {
//                   id: "gcbv5k7ue3p",
//                   type: "heading3",
//                   name: "Heading",
//                   content: "",
//                   placeholder: "Heading",
//                 },
//                 {
//                   id: "3dfg3swiciq",
//                   type: "paragraph",
//                   name: "Paragraph",
//                   content: "",
//                   placeholder: "Start typing...",
//                 },
//                 {
//                   id: "mck5nenzwnc",
//                   type: "bulletList",
//                   name: "Bullet List",
//                   content: ["First item", "Second item", "Third item"],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           id: "828cup9xxkh",
//           type: "divider",
//           name: "Divider",
//           content: "",
//         },
//       ],
//     },
//     id: "c1x829deqho",
//     slideOrder: 3,
//   },
//   {
//     slideName: "Accent left",
//     type: "accentLeft",
//     className: "min-h-[300px]",
//     content: {
//       id: "9955jdwit1h",
//       type: "column",
//       name: "Column",
//       restrictDropTo: true,
//       content: [
//         {
//           id: "gisvuu7rspj",
//           type: "resizable-column",
//           name: "Resizable column",
//           restrictToDrop: true,
//           content: [
//             {
//               id: "4s6mi57d167",
//               type: "column",
//               name: "Content",
//               content: [
//                 {
//                   id: "b5en5zvvy17",
//                   type: "heading3",
//                   name: "Heading",
//                   content: "",
//                   placeholder: "Heading",
//                 },
//                 {
//                   id: "lbk25md4meo",
//                   type: "paragraph",
//                   name: "Paragraph",
//                   content: "",
//                   placeholder: "Start typing...",
//                 },
//                 {
//                   id: "8ae380i7qe8",
//                   type: "paragraph",
//                   name: "Paragraph",
//                   content: "",
//                   placeholder: "Start typing...",
//                 },
//                 {
//                   id: "6ctt9xtw7u8",
//                   type: "resizable-column",
//                   name: "Text and Image",
//                   className: "border",
//                   content: [
//                     {
//                       id: "lmql4tsyne",
//                       type: "column",
//                       name: "Column",
//                       content: [
//                         {
//                           id: "f7tzdhmx1ot",
//                           type: "paragraph",
//                           name: "Paragraph",
//                           content: "",
//                           placeholder: "Start typing...",
//                         },
//                       ],
//                     },
//                     {
//                       id: "cgooe3mck7i",
//                       type: "column",
//                       name: "Column",
//                       content: [
//                         {
//                           id: "6e1q35s3sd",
//                           type: "paragraph",
//                           name: "Paragraph",
//                           content: "",
//                           placeholder: "Start typing...",
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 {
//                   id: "qxan6fpy76",
//                   type: "heading2",
//                   name: "Heading 2",
//                   content: "",
//                   placeholder: "Heading 2",
//                 },
//                 {
//                   id: "vmvo0sxomx",
//                   type: "paragraph",
//                   name: "Paragraph",
//                   content: "",
//                   placeholder: "Start typing...",
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     id: "vwm3qhmdnw",
//     slideOrder: 4,
//   },
// ])}

// do the same strucure code i send it to you do not add any strucure from ur self use the code only and return only json using this strucure of slides return like this slides 15 slide and do not return with slide any hints or description only JSON and do not return any additional text with the response.`;


      const prompt = `You are a slide‑deck JSON generator.  
Generate exactly a JSON array of 15 slides, no extra text.

Below is the business data as a JavaScript object. Use its values verbatim when filling slide content.

  projectName: "EduBoost",
  businessField: "EdTech (Educational Technology)",
  projectDescription: "EduBoost is a smart academic advising platform designed to help university students plan and register for courses efficiently using AI-driven guidance.",
  visionMission: "To empower students through technology-driven academic planning tools that enhance success and reduce registration friction.",
  targetAudience: "University students aged 18–25",
  interestsBehaviors: "Tech-savvy, goal-oriented, time-conscious, prefers digital solutions",
  demographicGoals: "Focus on undergraduate students in information systems, engineering, and computer science departments",
  primaryGoal: "Increase platform sign-ups and user engagement during course registration periods",
  shortLongTermGoals: "Short-term: Reach 10,000 users in first year. Long-term: Partner with 15+ universities across MENA region",
  priorities: "Brand awareness, user acquisition, partnership with universities",
  digitalPresence: "Basic landing page and social media pages on Instagram and LinkedIn",
  previousMarketing: "Limited to word-of-mouth and university WhatsApp groups",
  strengthsWeaknesses: "Strengths: Unique value proposition and user-centric design. Weaknesses: Low brand recognition and limited initial budget",
  competitiveAdvantages: "AI-powered academic planning, integration with student handbooks, visual course paths",
  uniqueTechnology: "Custom-built recommendation engine using prerequisite and GPA mapping logic",
  generalDirection: "Friendly, supportive, and student-first",
  tonality: "Encouraging, knowledgeable, slightly informal but professional",
  financialAllocation: "Initial seed budget of $20,000 allocated across development, marketing, and hosting",
  budgetPriorities: "Digital advertising, influencer partnerships, campus ambassador program",
  channelSelection: "Instagram, YouTube, email newsletters, university events",
  mostEffectiveChannels: "Instagram Reels, peer-to-peer referrals, targeted Google Ads",
  mainCompetitors: "Cialfo, Unibuddy, traditional academic advisors",
  competitorStrategies: "Content marketing, partnerships with schools, webinars and guides",
  timeframe: "Soft launch in August 2025, full launch in September 2025",
  seasonalPeriods: "Peaks during course registration windows (Jan-Feb and Jul-Aug)",
  productAdvantages: "Streamlined advising, real-time course eligibility checks, tailored suggestions",
  upcomingProducts: "Mobile app version, GPA tracker, peer study group finder",
  preferredCampaigns: "Success story spotlights, student ambassador content, giveaways",
  customerRelationship: "Active support on WhatsApp and email, in-app feedback prompts",
  contentPreferences: "Visual explainers, short videos, student testimonials",
  audienceInteractions: "Polls, Q&As, interactive planners",
  targetingStrategy: "Behavioral and interest-based targeting using social ads",
  audienceInterestsOutside: "Gaming, tech trends, career development",
  measurementPreferences: "Monthly performance dashboards, in-depth quarterly reviews",
  reportPreferences: "Google Data Studio + PDF executive summaries",
  previousChallenges: "Low visibility among students, limited feedback loops",
  expansionConcerns: "Adapting content and features for non-IS majors",
  customerSupport: "In-app chat, chatbot integration planned, email support within 24h",
  customerExperience: "Smooth onboarding, personalized dashboards, gamified planning",
  designPreferences: "Minimalist, youthful, modern UI with blue and green color palette",
  photographyStyle: "Candid student life photos, high-energy campus moments",
  peakPeriods: "Two weeks before and after registration opens",
  specificTimeframes: "Soft launch by August 15th, promotional blitz by September 1st",
  fiveYearVision: "To become the leading academic support platform in the MENA region",
  expansionPlans: "Integrate with 50+ universities, expand to include high school planning tools"

${JSON.stringify([
  {
    "slideName": "Blank card",
    "type": "blank-card",
    "className": "p-8 mx-auto flex justify-center items-center min-h-[200px]",
    "content": {
      "id": "contentN",
      "type": "column",
      "name": "Column",
      "content": [
        { "id": "titleN", "type": "title",        "name": "Title",     "content": "", "placeholder": "Untitled Card" },
        { "id": "paragraphN", "type": "paragraph","name": "Paragraph", "content": "", "placeholder": "Start typing..." }
      ]
    },
    "id": "slideN",
    "slideOrder": "N-1",
    "elements": []
  },
  {
    "slideName": "Blank card",
    "type": "blank-card",
    "className": "p-8 mx-auto flex justify-center items-center min-h-[200px]",
    "content": {
      "id": "contentN",
      "type": "column","name": "Column","content": [
        { "id": "titleN",  "type": "title",      "name": "Title",        "content": "", "placeholder": "Untitled Card" },
        { "id": "loj4jol7x9","type":"bulletList","name":"Bullet List","content":[]},
        { "id": "uwy6sroraa","type":"tableOfContents","name":"Table of Contents","content":[]}
      ]
    },
    "id": "slideN",
    "slideOrder": "N-1",
    "elements": []
  },
  {
    "slideName": "Blank card",
    "type": "blank-card",
    "className":"p-8 mx-auto flex justify-center items-center min-h-[200px]",
    "content": {
      "id":"contentN","type":"column","name":"Column","content":[
        { "id":"titleN","type":"title","name":"Title","content":"","placeholder":"Untitled Card" },
        { "id":"dxzu7ggiudi","type":"table","name":"Table","initialRows":"X","initialColumns":"Y","content":[]}
      ]
    },
    "id":"slideN","slideOrder":"N-1"
  },
  {
    "slideName":"Three columns with headings","type":"threeColumnsWithHeadings",
    "className":"p-4 mx-auto flex justify-center items-center",
    "content": { /* same nested structure as your example, with calloutBox, divider, resizable-column, 3 subcolumns of numberedList or bulletList */ }
  },
  {
    "slideName":"Accent left","type":"accentLeft","className":"min-h-[300px]",
    "content": { /* same nested structure as your example, with heading3, paragraphs, resizable-column text/image, heading2, paragraph */ }
  }
]
)}
`


      const completion = [
        {
          role: "model",
          parts: [{ text: "You generate perfect presentaion..." }],
        },
        {
          role: "model",
          parts: [
            {
              text: `Guidelines
I will provide you with a pattern and a format to follow, and for each outline, you must generate unique layouts and contents in the specified JSON format.

### Layout Types
Available LAYOUTS TYPES: 
"accentLeft", "accentRight", "imageAndText", "textAndImage", "twoColumns", 
"twoColumnsWithHeadings", "threeColumns", "threeColumnsWithHeadings", 
"fourColumns", "twoImageColumns", "threeImageColumns", "fourImageColumns", "tableLayout"

### Content Types
Available CONTENT TYPES: 
"heading1", "heading2", "heading3", "heading4", "title", "paragraph", 
"table", "resizable-column", "image", "blockquote", "numberedList", 
"bulletList", "todolist", "calloutBox", "codeBlock", "tableOfContents", 
"divider", "column"

### Instructions
1. Ensure each layout is unique
2. Follow this structure exactly:
   - Top level: Layout object
   - content property starts with "column"
   - Nested content uses appropriate content types
   - Arrays for multi-element containers
   - Strings for static content
`,
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: "you add all slides return more slides and details in slide",
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ];
      const result = await model.generateContent({
        contents: completion,
        generationConfig,
      });

      let responseContent = result.response.text();

      if (!responseContent) {
        console.error("No content generated by AI");
        toast.error("Error", {
          description: "No content generated. Please try again.",
        });
        setIsGenerating(false);
        return;
      }

      setIsComplete(true);
      setGeneratedOutput(responseContent);

      // Clean and prepare the JSON response
      responseContent = responseContent
        // Strip code fences if present
        .replace(/```(?:json)?\n?/g, "")
        .replace(/```/g, "")
        .trim()
        // Remove single-line comments
        .replace(/\/\/.*(?=\n)/g, "")
        // Remove trailing commas in objects/arrays
        .replace(/,\s*([}\]])/g, "$1")
        // Remove any control characters in the range 0x00-0x1F and 0x7F-0x9F that might be causing JSON parsing errors
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
        .trim();

      const jsonResponse = JSON.parse(responseContent);
      setSlides(jsonResponse);

      try {
        // Create a project object
        const projectObj = {
          title: formData.projectName,
          description: formData.projectDescription,
          themeName: "Default",
          slides: jsonResponse,
        };

        const { data } = await presentationAPI.create(projectObj);
        setProjectId(data.data._id);
        toast.success("Success", {
          description: "Presentation generated successfully!",
        });
      } catch (error) {
        console.error("Final JSON parsing failed:", error);
        toast.error("Error", {
          description:
            "Failed to parse the generated content. Please try again.",
        });
      }
    } catch (error) {
      console.error("Stream error:", error);
      toast.error("Error", {
        description: "Failed to generate presentation. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Export project data as JSON file
  const handleExportProject = () => {
    try {
      // Create a project object with form data and slides if available
      const projectData = {
        formData,
        slides: localStorage.getItem("currentProject")
          ? JSON.parse(localStorage.getItem("currentProject")).slides
          : [],
      };

      // Convert to JSON string
      const jsonString = JSON.stringify(projectData, null, 2);

      // Create a blob and download link
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      // Create download link and trigger click
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formData.projectName.replace(/\s+/g, "-")}-project.json`;
      document.body.appendChild(a);
      a.click();

      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Success", {
        description: "Project exported successfully!",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Error", {
        description: "Failed to export project. Please try again.",
      });
    }
  };

  // Import project from JSON file
  const handleImportProject = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection for import
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        // Update form data if available
        if (importedData.formData) {
          setFormData(importedData.formData);
        }

        // Update slides if available
        if (importedData.slides && importedData.slides.length > 0) {
          // Create a project object
          const projectObj = {
            _id: Math.random().toString(36).substring(2),
            title: importedData.formData.projectName || "Imported Project",
            description: importedData.formData.projectDescription || "",
            themeName: "Default",
            slides: importedData.slides,
          };

          // Set the project and slides in the store
          setProject(projectObj);
          setSlides(importedData.slides);

          // Save to localStorage for persistence
          localStorage.setItem("currentProject", JSON.stringify(projectObj));

          toast.success("Success", {
            description: "Project imported successfully!",
          });

          // Navigate to the presentation page
          navigate(`/presentation/${projectObj._id}`);
        } else {
          toast.success("Success", {
            description: "Project form data imported successfully!",
          });
        }
      } catch (error) {
        console.error("Import error:", error);
        toast.error("Error", {
          description: "Failed to import project. Invalid file format.",
        });
      }
    };
    reader.readAsText(file);
  };

  const goBack = () => {
    navigate("/");
  };

  const renderStep = () => {
    if (isComplete)
      return <FormComplete output={generatedOutput} projectId={projectId} />;
    switch (currentStep) {
      case 0:
        return (
          <ProjectInfoStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 1:
        return (
          <TargetAudienceStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <MarketingGoalsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <CurrentSituationStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return <USPStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return (
          <BrandVoiceStep formData={formData} updateFormData={updateFormData} />
        );
      case 6:
        return (
          <BudgetStep formData={formData} updateFormData={updateFormData} />
        );
      case 7:
        return (
          <MarketingChannelsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 8:
        return (
          <CompetitorsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 9:
        return (
          <TimelineStep formData={formData} updateFormData={updateFormData} />
        );
      case 10:
        return (
          <AdditionalQuestionsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 11:
        return (
          <FormEditAi formData={formData} updateFormData={updateFormData} />
        );
      default:
        return (
          <ProjectInfoStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <Button onClick={goBack} variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={handleExportProject}
              variant="outline"
              className="mb-4"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Project
            </Button>

            <Button
              onClick={handleImportProject}
              variant="outline"
              className="mb-4"
            >
              <Upload className="mr-2 h-4 w-4" />
              Import Project
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        <motion.div variants={itemVariants} className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Project Form</h1>
          <p className="text-muted-foreground">
            Fill out the form to generate a comprehensive presentation
          </p>
        </motion.div>

        <FormProgress
          currentStep={currentStep}
          totalSteps={steps.length}
          steps={steps}
        />

        <Card className="p-6">
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button
              onClick={prevStep}
              variant="outline"
              disabled={currentStep === 0}
            >
              Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button onClick={nextStep} className="ml-auto">
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="ml-auto bg-gradient-to-b from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Plan
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
