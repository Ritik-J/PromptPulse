import { PromptClient } from "./index";

async function runTest() {
  const client = new PromptClient({
    baseUrl: "http://localhost:4000/api/v1",
    apiKey: "test_key_123",
  });

  console.log("Fetching prompt from backend...");
  const template = await client.getPrompt("product_summarizer");
  console.log("Fetched Template:", template);

  const rendered = client.render(template, {
    description: "A lightweight edge runtime device.",
  });
  console.log("Rendered Output:", rendered);
}

runTest();
