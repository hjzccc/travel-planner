import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
} from "langchain/prompts";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {
  OutputFixingParser,
  StructuredOutputParser,
} from "langchain/output_parsers";
import { z } from "zod";
import logger from "./winstonLogger";
const pinecone = new PineconeClient();
type travelPlanDataType = {
  destination: string;
  features: string[];
  tripLevel: "luxury" | "normal" | "budget";
  days: number;
};
export type travelPlanOutputType = {
  day: number;
  time: string;
  activity: string;
}[];
const userData: travelPlanDataType = {
  destination: "Dallas",
  features: ["museum", "park", "restaurant"],
  tripLevel: "luxury",
  days: 3,
};
export const run = async ({
  destination,
  features,
  tripLevel,
  days,
}: travelPlanDataType = userData): Promise<travelPlanOutputType> => {
  const model = new OpenAI();
  await pinecone.init({
    environment: `${process.env.PINECONE_ENVIRONMENT}`,
    apiKey: `${process.env.PINECONE_API_KEY}`,
  });
  const pineconeIndex = pinecone.Index("travel-articles");
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );
  const results = await vectorStore.similaritySearch(destination, 3, {});

  const chat = new ChatOpenAI();

  const systemMessage = new SystemChatMessage(
    `Act as a travel itinerary planner, and you will plan the best trip ever! Provide a comprehensive and good trip plan in ${destination}.`
  );
  const parser = StructuredOutputParser.fromZodSchema(
    z.array(
      z.object({
        day: z.number().describe("day of the trip,this is a number"),
        time: z.string().describe("time of the day, morning, afternoon, night"),
        activity: z
          .string()
          .describe("activity of the day,this must be specific!!"),
      })
    )
  );
  const formatInstructions = parser.getFormatInstructions();
  let humanMessage = new HumanChatMessage(
    `
    Here I already have some blogs may help you make a travel itinerary:
    [
      ${results.map((result) => {
        return result.pageContent;
      })}
    ]
    I wish the trip is more ${features.map((feature, index) => {
      return index == features.length - 1 ? `and ${feature}` : feature;
    })}
    I with I have a ${tripLevel} trip in ${days} days.
    Take the geographical elements into account, do not travel so many attractions that too far away in one day
    ${formatInstructions}
    `
  );
  let humanMessageLog = {
    rawData: {
      destination: destination,
      features: features,
      tripLevel: tripLevel,
      days: days,
    },
    text: humanMessage.text,
  };
  logger.info(JSON.stringify(humanMessageLog));
  const response = await chat.call([systemMessage, humanMessage]);
  try {
    let parsedOutput = await parser.parse(response.text);
    logger.info(parsedOutput);
    return parsedOutput;
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(new ChatOpenAI(), parser);
    fixParser.getFormatInstructions();
    const fixedOutput = await fixParser.parse(response.text);
    logger.info(fixedOutput);
    return fixedOutput;
  }
};
