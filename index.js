import dotenv from 'dotenv';
dotenv.config();

import OpenAI from "openai";

// Initialize the client with the API key from your .env file
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });


async function main() {
  try {
    const response = await client.responses.create({
      model: "gpt-4", // Ensure this is the correct model identifier
      input: "Write a one-sentence bedtime story about a unicorn."
    });
    
    console.log(response.output_text);
  } catch (error) {
    console.error("Error generating response:", error);
  }
}

main();
