import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import OpenAI from "openai";
//import bodyParser from 'bodyParser';
//const bodyParser = require('body-parser');
//const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
//app.use(bodyParser.json());
app.use(express.json());
// Serve static files from the "public" folder
app.use(express.static('public'));

let chatHistory = []; // 存储对话历史

// Initialize the client with the API key from your .env file
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Create a POST endpoint for chat messages
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    // 将用户消息添加到聊天历史 
    chatHistory.push({ role: "user", content: userMessage });
    
    // 生成对话上下文，结构化为消息格式
    const messages = chatHistory; // 直接将历史消息传递

    try {
        const response = await client.chat.completions.create({ // 使用正确的 API 方法
            model: "gpt-4", // Ensure this is the correct model identifier
             messages: messages
            //temperature: 0.7,
            //max_tokens: 8192, // 根据需要调整
        });

        const botMessage = response.choices[0].message.content; // 获取 AI 的回复
       // chatHistory.push(`AI: ${botMessage}`); // 将 AI 消息加入历史
        chatHistory.push({ role: "assistant", content: botMessage });

        res.json({ output: botMessage });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Error generating response" });
    }
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
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

//main();
