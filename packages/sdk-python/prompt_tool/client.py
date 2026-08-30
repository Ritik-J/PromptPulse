import urllib.request
import json
import re

class PromptClient:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url.rstrip('/')
        self.api_key = api_key
        self._cache = {}

    def get_prompt(self, name: str) -> str:
        if name in self._cache:
            return self._cache[name]

        url = f"{self.base_url}/api/v1/prompts/{name}"
        req = urllib.request.Request(url, headers={
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        })

        try:
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
                prompts = data.get("data", [])
                template = prompts[0].get("template", "") if prompts else ""
                self._cache[name] = template
                return template
        except Exception as e:
            print(f"Error fetching prompt: {e}")
            return ""

    def render(self, template: str, variables: dict) -> str:
        def replace_var(match):
            key = match.group(1)
            return str(variables.get(key, ""))
        return re.sub(r'\{\{(\w+)\}\}', replace_var, template)