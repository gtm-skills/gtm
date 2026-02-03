#!/usr/bin/env python3
"""
GTM Skills Model Export

Export the fine-tuned model to Hugging Face Hub.

Usage:
    python scripts/export.py --model models/gtm-sales-lora
    python scripts/export.py --model models/gtm-sales-lora --push
    python scripts/export.py --model models/gtm-sales-lora --repo my-org/my-model --push
"""

import argparse
from pathlib import Path
from datetime import datetime

from huggingface_hub import HfApi, create_repo


MODEL_CARD_TEMPLATE = """---
license: mit
language:
- en
library_name: peft
base_model: {base_model}
tags:
- sales
- b2b
- gtm
- lora
- fine-tuned
datasets:
- gtm-skills/sales-conversations
---

# GTM Skills - {model_name}

> Fine-tuned for B2B sales tasks using GTM Skills prompts

## Model Description

This is a LoRA adapter fine-tuned on [GTM Skills](https://gtm-skills.com) prompts for B2B sales tasks. It excels at:

- **Cold email generation** - Personalized, high-converting outreach
- **Discovery questions** - MEDDPICC, SPIN, and Challenger frameworks
- **Objection handling** - Empathetic, effective responses
- **LinkedIn outreach** - Connection requests and InMails
- **Meeting preparation** - Agendas and talking points

## Usage

### With Transformers + PEFT

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel

# Load base model
base_model = AutoModelForCausalLM.from_pretrained("{base_model}")
tokenizer = AutoTokenizer.from_pretrained("{base_model}")

# Load LoRA adapter
model = PeftModel.from_pretrained(base_model, "{repo_id}")

# Generate
messages = [
    {{"role": "system", "content": "You are an expert B2B sales professional."}},
    {{"role": "user", "content": "Write a cold email to a VP of Sales at a SaaS company."}}
]

input_text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
inputs = tokenizer(input_text, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=256)
print(tokenizer.decode(outputs[0]))
```

### With Ollama (Coming Soon)

```bash
ollama pull gtm-skills/sales
ollama run gtm-skills/sales "Write a discovery question about budget"
```

## Training Details

- **Base Model**: {base_model}
- **Method**: LoRA (Low-Rank Adaptation)
- **Training Data**: GTM Skills prompt library + synthetic conversations
- **Parameters**: r=16, alpha=32, dropout=0.05

### Training Data

The model was trained on:
- 2,500+ curated GTM Skills prompts
- Synthetic sales conversations
- Multiple sales methodologies (MEDDPICC, SPIN, Challenger, etc.)

## Evaluation

| Task | Metric | Score |
|------|--------|-------|
| Cold Email Quality | Human eval (1-10) | TBD |
| Discovery Questions | Relevance | TBD |
| Objection Handling | Appropriateness | TBD |

## Limitations

- Optimized for B2B SaaS contexts
- Best results with specific, detailed prompts
- May require prompt engineering for best results

## Citation

```bibtex
@misc{{gtm-skills-model,
  title={{GTM Skills Fine-Tuned Model}},
  author={{Prospeda}},
  year={{2026}},
  url={{https://gtm-skills.com}}
}}
```

## Links

- [GTM Skills](https://gtm-skills.com) - The GTM Operating System
- [GitHub](https://github.com/gtm-skills/gtm) - Source code and training scripts
- [Training Guide](https://github.com/gtm-skills/gtm/tree/main/training) - Train your own

---

*Created with [GTM Skills](https://gtm-skills.com) - The GTM Operating System for Agentic Sales*
"""


def create_model_card(
    model_path: Path,
    repo_id: str,
    base_model: str,
) -> str:
    """Generate a model card for Hugging Face."""

    model_name = repo_id.split("/")[-1] if "/" in repo_id else repo_id

    return MODEL_CARD_TEMPLATE.format(
        model_name=model_name,
        base_model=base_model,
        repo_id=repo_id,
        date=datetime.now().strftime("%Y-%m-%d"),
    )


def export_model(
    model_path: str,
    repo_id: str = None,
    base_model: str = None,
    push: bool = False,
    private: bool = False,
):
    """Export model to Hugging Face Hub."""

    model_path = Path(model_path)

    # Determine base model
    if base_model is None:
        config_path = model_path / "training_config.yaml"
        if config_path.exists():
            import yaml
            with open(config_path) as f:
                config = yaml.safe_load(f)
            base_model = config.get("model", {}).get("name", "meta-llama/Llama-3.1-8B-Instruct")
        else:
            base_model = "meta-llama/Llama-3.1-8B-Instruct"

    # Determine repo ID
    if repo_id is None:
        repo_id = "gtm-skills/llama-3.1-gtm-sales"

    print(f"Model path: {model_path}")
    print(f"Repository: {repo_id}")
    print(f"Base model: {base_model}")

    # Create model card
    print("\nGenerating model card...")
    model_card = create_model_card(model_path, repo_id, base_model)
    readme_path = model_path / "README.md"
    readme_path.write_text(model_card)
    print(f"Saved model card to {readme_path}")

    if push:
        print("\nPushing to Hugging Face Hub...")

        api = HfApi()

        # Create repo if it doesn't exist
        try:
            create_repo(repo_id, private=private, exist_ok=True)
            print(f"Repository ready: https://huggingface.co/{repo_id}")
        except Exception as e:
            print(f"Note: {e}")

        # Upload all files
        api.upload_folder(
            folder_path=str(model_path),
            repo_id=repo_id,
            commit_message="Upload GTM Skills fine-tuned model",
        )

        print(f"\nModel uploaded to: https://huggingface.co/{repo_id}")
        print("\nUsage:")
        print(f'  model = PeftModel.from_pretrained(base_model, "{repo_id}")')
    else:
        print("\nModel card saved locally. Use --push to upload to Hugging Face.")
        print(f"\nTo upload manually:")
        print(f"  huggingface-cli upload {repo_id} {model_path}")


def main():
    parser = argparse.ArgumentParser(description="Export GTM Skills model to Hugging Face")
    parser.add_argument(
        "--model",
        type=str,
        default="models/gtm-sales-lora",
        help="Path to fine-tuned model",
    )
    parser.add_argument(
        "--repo",
        type=str,
        default=None,
        help="Hugging Face repository ID (default: gtm-skills/llama-3.1-gtm-sales)",
    )
    parser.add_argument(
        "--base-model",
        type=str,
        default=None,
        help="Base model name",
    )
    parser.add_argument(
        "--push",
        action="store_true",
        help="Push to Hugging Face Hub",
    )
    parser.add_argument(
        "--private",
        action="store_true",
        help="Create private repository",
    )
    args = parser.parse_args()

    export_model(
        model_path=args.model,
        repo_id=args.repo,
        base_model=args.base_model,
        push=args.push,
        private=args.private,
    )


if __name__ == "__main__":
    main()
