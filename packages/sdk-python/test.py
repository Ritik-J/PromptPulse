from prompt_tool import PromptClient

client = PromptClient(base_url="http://localhost:4000/", api_key="test_key_123")

print("Fetching prompt from backend...")
template = client.get_prompt("product_summarizer")
print("Fetched Template:", template)

rendered = client.render(template, {"description": "A high-performance python runner."})
print("Rendered Output:", rendered)