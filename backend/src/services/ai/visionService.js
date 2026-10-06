import groq from "./groqClient.js";

export const analyzeIngredients = async (imageBuffer, mimeType) => {
  const base64Image = imageBuffer.toString("base64");

  const response = await groq.chat.completions.create({
    model: "qwen/qwen3.8-27b",

    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
Analyze this image for Cooksy.

Identify the visible food ingredients that could be used for cooking.

Rules:
- Identify only actual food ingredients.
- Ignore plates, bowls, utensils, packaging and decorations.
- Use common ingredient names.
- Do not duplicate ingredients.
- Do not guess ingredients that are not reasonably visible.
- Give a confidence score between 0 and 1.
            `,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${base64Image}`,
            },
          },
        ],
      },
    ],

    response_format: {
      type: "json_schema",
      json_schema: {
        name: "ingredient_analysis",
        strict: true,
        schema: {
          type: "object",
          properties: {
            ingredients: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  confidence: {
                    type: "number",
                  },
                },
                required: ["name", "confidence"],
                additionalProperties: false,
              },
            },
          },
          required: ["ingredients"],
          additionalProperties: false,
        },
      },
    },
  });

  return JSON.parse(response.choices[0].message.content);
};