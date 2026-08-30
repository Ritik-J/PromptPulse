export class PromptClient {
  private baseUrl: string;
  private apiKey: string;
  private cache: Map<string, string> = new Map();

  constructor(options: { baseUrl: string; apiKey: string }) {
    this.baseUrl = options.baseUrl;
    this.apiKey = options.apiKey;
  }

  async getPrompt(name: string): Promise<string> {
    if (this.cache.has(name)) return this.cache.get(name)!;

    const res = await fetch(`${this.baseUrl}/prompts/${name}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });
    const json = (await res.json()) as any;
    const template = json.data[0]?.template || "";

    this.cache.set(name, template);
    return template;
  }

  render(template: string, vars: Record<string, string>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] || "");
  }
}
