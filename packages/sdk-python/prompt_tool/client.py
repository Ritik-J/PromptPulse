class PromptClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        
    def get_prompt(self, prompt_id: str) -> str:
        # TODO: implement fetch and local caching
        return f"Placeholder prompt for {prompt_id}"
