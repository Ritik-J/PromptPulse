export class PromptClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  
  async getPrompt(promptId) {
    // TODO: implement fetch and local caching
    return `Placeholder prompt for ${promptId}`;
  }
}
