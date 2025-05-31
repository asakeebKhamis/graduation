import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "sonner";
import { useStore } from "../context/StoreContext";

const genAI = new GoogleGenerativeAI("AIzaSyCiKuxz8JBkJg_qrZCinrdz4xLeqZw_IBo");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: "text/plain",
};

export const generateCreativePrompt = async (userPrompt) => {
  const finalPrompt = `Create a coherent and relevant outline for the following prompt: ${userPrompt}.
The outline should consist of at least 6 points, with each point written as a single sentence.
Ensure the outline is well-structured and directly related to the topic.
Return the output in the following JSON format:

{
  "outlines": [
    "Point 1",
    "Point 2",
    "Point 3",
    "Point 4",
    "Point 5",
    "Point 6"
  ]
}

Ensure that the JSON is valid and properly formatted. Do not include any other text or explanations outside the JSON.`;

  try {
    const completion = [
      {
        role: "model",
        parts: [
          {
            text: "You are a helpful AI that generates outlines for presentations.",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: finalPrompt }],
      },
    ];

    const result = await model.generateContent({
      contents: completion,
      generationConfig,
    });
    let responseContent = result.response.text();

    responseContent = responseContent
      .replace(/```(json)?\n?/g, "")
      .replace(/```/g, "")
      .trim();

    if (responseContent) {
      try {
        const jsonResponse = JSON.parse(responseContent);
        return { status: 200, data: jsonResponse };
      } catch (error) {
        console.error("Invalid JSON received:", error);
        return { status: 500, error: "Invalid JSON format received from AI" };
      }
    }
    return { status: 400, error: "No content generated" };
  } catch (error) {
    console.error("ERROR", error);
    return { status: 500, error: "Internal server error" };
  }
};

// --------------------------Layout-------------------------- //
// const findImageComponents = (content) => {
//   const images = [];

//   // Handle array input
//   if (Array.isArray(content)) {
//     content.forEach((item) => {
//       images.push(...findImageComponents(item));
//     });
//     return images;
//   }

//   // Handle single content item
//   if (content.type === "image") {
//     images.push(content);
//   }

//   // Recursively search nested content
//   if (content.content) {
//     if (Array.isArray(content.content)) {
//       content.content.forEach((child) => {
//         images.push(...findImageComponents(child));
//       });
//     } else if (typeof content.content === "object") {
//       images.push(...findImageComponents(content.content));
//     }
//   }

//   return images;
// };

// const generateImageUrl = async (prompt) => {
//   try {
//     const improvedPrompt = `Create a highly realistic, professional image based on the following description. The image should look as if captured in real life, with attention to detail, lighting, and texture.

// Description: ${prompt}

// Important Notes:
// - The image must be in a photorealistic style and visually compelling.
// - Ensure all text, signs, or visible writing in the image are in English.
// - Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
// - Avoid elements that appear abstract, cartoonish, or overly artistic.
// - The image should be suitable for professional presentations.
// - Focus on accurately depicting the concept described.
// - Include specific objects, environment, mood, and context.
// - Maintain strict relevance to the description provided.

// Example Use Cases: Business presentations, educational slides, professional designs.`;

//     const dalleResponse = await openai.images.generate({
//       model: "dall-e-3",
//       prompt: improvedPrompt,
//       n: 1,
//       size: "1024x1024",
//       quality: "hd",
//       style: "natural",
//     });

//     const imageUrl = dalleResponse.data[0]?.url;
//     if (!imageUrl) throw new Error("No image URL returned from DALL-E");

//     console.log("Image generated successfully:", imageUrl);
//     return imageUrl;
//   } catch (error) {
//     console.error("Failed to generate image:", error);
//     return "https://via.placeholder.com/1024";
//   }
// };

// const replaceImagePlaceholders = async (layout) => {
//   try {
//     const imageComponents = findImageComponents(layout.content);

//     if (!imageComponents.length) {
//       console.log("No image components found in layout");
//       return layout;
//     }

//     console.log("Found image components:", imageComponents);

//     for (const component of imageComponents) {
//       try {
//         console.log(`Generating image for: ${component.alt || "Untitled"}`);
//         component.content = await generateImageUrl(
//           component.alt || "Presentation image about " + layout.slideName
//         );
//         console.log(`Successfully generated image for: ${component.alt}`);
//       } catch (error) {
//         console.error(`Failed to generate image for ${component.id}:`, error);
//         component.content = DEFAULT_PLACEHOLDER_IMAGE;
//       }
//     }

//     return layout;
//   } catch (error) {
//     console.error("Error in replaceImagePlaceholders:", error);
//     throw new Error("Failed to replace image placeholders");
//   }
// };

const existingLayouts = [
  {
    id: Math.random().toString(36).substring(2),
    slideName: "Three column",
    type: "threeColumns",
    className: "p-4 mx-auto flex justify-center items-center",
    content: {
      id: Math.random().toString(36).substring(2),
      type: "column",
      name: "Column",
      content: [
        {
          id: Math.random().toString(36).substring(2),
          type: "title",
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
        {
          id: Math.random().toString(36).substring(2),
          type: "resizable-column",
          name: "Text and image",
          className: "border",
          content: [
            {
              id: Math.random().toString(36).substring(2),
              type: "column",
              name: "Column",
              content: [
                {
                  id: Math.random().toString(36).substring(2),
                  type: "heading3",
                  name: "Heading3",
                  content: "",
                  placeholder: "Heading 3",
                },
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
        },
      ],
    },
  },
  {
    id: Math.random().toString(36).substring(2),
    slideName: "Two columns with headings",
    type: "twoColumnswithHeadings",
    className: "p-4 mx-auto flex justify-center items-center",
    content: {
      id: Math.random().toString(36).substring(2),
      type: "column",
      name: "Column",
      content: [
        {
          id: Math.random().toString(36).substring(2),
          type: "title",
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
        {
          id: Math.random().toString(36).substring(2),
          type: "heading3",
          name: "Heading3",
          content: "",
          placeholder: "Heading 3",
        },
        {
          id: Math.random().toString(36).substring(2),
          type: "paragraph",
          name: "Paragraph",
          content: "",
          placeholder: "Start typing...",
        },
      ],
    },
  },
  {
    type: "resizable-column",
    name: "Text and image",
    className: "border",
    content: [
      {
        id: Math.random().toString(36).substring(2),
        type: "column",
        name: "Column",
        content: [
          {
            id: Math.random().toString(36).substring(2),
            type: "heading3",
            name: "Heading3",
            content: "",
            placeholder: "Heading 3",
          },
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
  },
];

const generateLayoutsJson = async (outlineArray) => {
  const prompt = `### Guidelines
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

### Examples
1. Basic blank card:
${JSON.stringify({
  id: "uuid-here",
  slideName: "Blank card",
  type: "blank-card",
  className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
  content: {
    id: "uuid-here",
    type: "column",
    name: "Column",
    content: {
      id: "uuid-here",
      type: "title",
      name: "Title",
      content: "",
      placeholder: "Untitled Card",
    },
  },
})}

2. Accent left layout:
${JSON.stringify({
  id: "uuid-here",
  slideName: "Accent left",
  type: "accentLeft",
  className: "min-h-[300px]",
  content: {
    id: "uuid-here",
    type: "column",
    name: "Column",
    restrictDropTo: true,
    content: [
      {
        id: "uuid-here",
        type: "resizable-column",
        name: "Resizable column",
        restrictToDrop: true,
        content: [
          {
            id: "uuid-here",
            type: "image",
            name: "Image",
            content: "https://example.com/image.jpg",
            alt: "Professional workspace with laptop and notebook",
          },
        ],
      },
      {
        id: "uuid-here",
        type: "column",
        name: "Column",
        content: [
          {
            id: "uuid-here",
            type: "heading1",
            name: "Heading1",
            content: "",
            placeholder: "Main Heading",
          },
          {
            id: "uuid-here",
            type: "paragraph",
            name: "Paragraph",
            content: "",
            placeholder: "Start typing here...",
          },
        ],
      },
    ],
  },
})}

### Image Guidelines
- Alt text should clearly describe the image
- Focus on main subjects, colors, and relevant details
- Match the presentation context (professional/business)
- Avoid "image of" - describe content directly

### Output Requirements
- Array of JSON layout objects
- No duplicate layouts
- Valid JSON schema
- Unique UUIDs for all elements
- Properly structured nested content`;

  try {
    console.log("Generating layouts...");

    const completion = [
      {
        role: "model",
        parts: [
          {
            text: "You generate perfect JSON layouts for professional presentations. Always return valid JSON format only.",
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
      return {
        status: 400,
        error: "No content generated",
      };
    }

    // Clean and parse JSON response
    responseContent = responseContent
      // strip code fences
      .replace(/```(?:json)?\n?/g, "")
      .replace(/```/g, "")
      .trim()
      // remove single-line comments
      .replace(/\/\/.*(?=\n)/g, "")
      // remove trailing commas in objects/arrays
      .replace(/,\s*([}\]])/g, "$1")
      .trim();

    try {
      const jsonResponse = JSON.parse(responseContent);

      // Process images in parallel if layouts exist
      // if (jsonResponse.layouts) {
      //   await Promise.all(
      //     jsonResponse.layouts.map((layout) => replaceImagePlaceholders(layout))
      //   );
      // }

      return {
        status: 200,
        data: jsonResponse,
      };
    } catch (error) {
      console.error(
        "JSON parsing error:",
        error,
        "\nResponse:",
        responseContent
      );
      return {
        status: 400,
        error: "Invalid JSON format received from AI",
      };
    }
  } catch (error) {
    console.error("API call failed:", error);
    return {
      status: 500,
      error: "Failed to generate layouts",
    };
  }
};

export const generateLayouts = async (projectId, project, theme) => {
  if (!projectId) {
    return { status: 404, error: "Project Id is required" };
  }

  if (!project) {
    return { status: 404, error: "Project not found" };
  }

  if (!project.outlines || project.outlines.length === 0) {
    return { status: 400, error: "Project does not have any outlines" };
  }

  try {
    const layouts = await generateLayoutsJson(project.outlines);

    if (layouts.status !== 200) {
      return layouts;
    }

    return {
      status: 200,
      data: {
        slides: layouts.data,
        message: "Layouts generated successfully",
      },
    };
  } catch (error) {
    console.error("Layout generation failed:", error);
    return {
      status: 500,
      error: "Failed to generate layouts",
    };
  }
};
