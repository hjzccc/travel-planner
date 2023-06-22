import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const chatWithOpenAI = async (content: string) => {
  const chatCompletion = await openai.createChatCompletion({
    model: "gpu-3.5-turbo",
    messages: [{ role: "user", content: content }],
  });
  return chatCompletion.data.choices[0].message;
};
export default chatWithOpenAI;
