const { Groq } = require("groq-sdk");
const catchAsync = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

exports.generateFoodDescription = catchAsync(async (req, res, next) => {
  const { name, category, spiceLevel, price } = req.body;

  if (!name) {
    return next(new ErrorHandler("Food item name is required", 400));
  }

  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const prompt = `Generate a short, appetizing food description for a food delivery app. 
    
Food Name: ${name}
Category: ${category || "General"}
Spice Level: ${spiceLevel || "Medium"}
Price: ₹${price || 0}

Requirements:
- Keep it under 100 words
- Make it appetizing and descriptive
- Include main ingredients if possible
- Professional tone suitable for a food delivery app
- Do NOT include price in the description
- Start directly with the description, no labels like "Description:"

Generate only the description text, nothing else.`;

    const message = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      max_tokens: 200,
    });

    const description = message.choices[0]?.message?.content?.trim() 
      ? message.choices[0].message.content.trim()
      : "Delicious food item";

    res.status(200).json({
      success: true,
      data: {
        description,
      },
    });
  } catch (error) {
    console.error("Groq API Error:", error);
    return next(
      new ErrorHandler(
        error.message || "Failed to generate description",
        500
      )
    );
  }
});
