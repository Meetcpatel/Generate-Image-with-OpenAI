import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.send("Hello from dall-e");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "256x256",
      response_format:'b64_json'
    });
    return res.status(200).json({ photo: aiResponse.data?.data[0].b64_json });
  } catch (err) {
    console.log(JSON.stringify(err.message));
    return res.status(500).send(err?.response.data.error.message);
  }
});

export default router;
