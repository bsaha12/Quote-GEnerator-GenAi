const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();
const OpenAI = require("openai");

const app = express();
const port = 3000;
const YOUR_CHATGPT_API_KEY = process.env.api_key;

app.use(express.static("public"));

//intializing openAi object with api_key
const openai = new OpenAI({
  apiKey: YOUR_CHATGPT_API_KEY,
});

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get quote route
app.get("/quote", async (req, res) => {
  const theme = req.query.theme || "love";

  try {
    // Call ChatGPT API to get a quote based on the selected theme
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Generate an inspirational quote about ${theme}.`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    // console.log(completion.choices[0]);
    const quote = completion.choices[0].message.content;
    // console.log(quote);
    res.json({ quote });
  } catch (error) {
    console.error("Error fetching quote from ChatGPT:", error);
    res.status(500).json({ error: "Failed to generate quote" });
  }
});

// starting the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
