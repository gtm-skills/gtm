# GTM Skills Fine-Tuned Model

> Train your own sales-focused LLM using GTM Skills prompts

## Overview

This directory contains everything needed to fine-tune an open-source LLM on GTM Skills data using LoRA (Low-Rank Adaptation). The resulting model excels at:

- Cold email generation
- Discovery question creation
- Objection handling
- Meeting summaries
- Competitive positioning

## Pre-Trained Model

Don't want to train yourself? Use our pre-trained adapter:

```bash
# With Hugging Face Transformers
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel

base_model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.1-8B-Instruct")
model = PeftModel.from_pretrained(base_model, "gtm-skills/llama-3.1-gtm-sales")

# With Ollama (coming soon)
ollama pull gtm-skills/sales
```

## Training Your Own

### Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| GPU VRAM | 16GB (8-bit) | 24GB+ (16-bit) |
| RAM | 32GB | 64GB |
| Disk | 50GB | 100GB |
| Python | 3.10+ | 3.11 |

**Supported GPUs**: RTX 3090, RTX 4090, A10, A100, H100

### Quick Start

```bash
# 1. Install dependencies
cd training
pip install -r requirements.txt

# 2. Prepare training data
python scripts/prepare_data.py

# 3. Train the model
python scripts/train.py --config configs/llama-3.1-8b.yaml

# 4. Test the model
python scripts/inference.py --prompt "Write a cold email to a VP of Sales"
```

### Cloud Training

If you don't have a local GPU:

| Provider | GPU | Cost | Command |
|----------|-----|------|---------|
| Lambda Labs | A10 | ~$0.60/hr | `lambda launch --gpu a10` |
| RunPod | A100 | ~$1.50/hr | `runpod create --gpu a100` |
| Vast.ai | 3090 | ~$0.30/hr | `vastai create --gpu 3090` |

Typical training time: 2-4 hours = $1-6 total.

## Directory Structure

```
training/
├── README.md              # This file
├── requirements.txt       # Python dependencies
├── configs/
│   ├── llama-3.1-8b.yaml  # Default config (recommended)
│   ├── mistral-7b.yaml    # Mistral variant
│   └── base.yaml          # Shared settings
├── scripts/
│   ├── prepare_data.py    # Convert prompts to training format
│   ├── train.py           # Main training script
│   ├── inference.py       # Test the model
│   ├── export.py          # Export to Hugging Face
│   └── evaluate.py        # Run benchmarks
├── data/
│   ├── raw/               # Source prompts (generated)
│   ├── processed/         # Training-ready JSONL
│   └── sample/            # Small sample for testing
└── models/
    └── .gitkeep           # Trained models (not committed)
```

## Training Data Format

The training data uses a conversation format:

```json
{
  "conversations": [
    {"role": "system", "content": "You are an expert B2B sales professional..."},
    {"role": "user", "content": "Write a cold email to Sarah Chen, VP Sales at Acme..."},
    {"role": "assistant", "content": "Subject: Quick question about Acme's pipeline...\n\nHi Sarah,..."}
  ],
  "metadata": {
    "category": "cold_email",
    "industry": "saas",
    "effectiveness_score": 8.5
  }
}
```

## Customization

### Train on Your Own Data

Add your conversations to `data/custom/` in the format above, then:

```bash
python scripts/prepare_data.py --include-custom
python scripts/train.py --config configs/llama-3.1-8b.yaml
```

### Adjust Training Parameters

Edit `configs/llama-3.1-8b.yaml`:

```yaml
# Increase for better quality (slower)
lora_r: 32          # Default: 16
num_epochs: 5       # Default: 3

# Decrease for faster training (lower quality)
lora_r: 8
num_epochs: 2
```

## Evaluation

We benchmark against standard sales tasks:

| Task | Metric | Target |
|------|--------|--------|
| Cold Email Quality | Human eval (1-10) | 8.0+ |
| Discovery Questions | Relevance score | 0.85+ |
| Objection Handling | Appropriateness | 0.90+ |
| Tone Consistency | Automated | 0.95+ |

Run benchmarks:

```bash
python scripts/evaluate.py --model ./models/gtm-sales-lora
```

## Publishing to Hugging Face

```bash
# Login to Hugging Face
huggingface-cli login

# Export and upload
python scripts/export.py \
  --model ./models/gtm-sales-lora \
  --repo your-username/gtm-sales-custom \
  --push
```

## License

- Training code: MIT License
- Training data: MIT License
- Base models: See respective licenses (Llama, Mistral)

## Support

- Issues: [github.com/gtm-skills/gtm/issues](https://github.com/gtm-skills/gtm/issues)
- Discussions: [github.com/gtm-skills/gtm/discussions](https://github.com/gtm-skills/gtm/discussions)

---

*Part of [GTM Skills](https://gtm-skills.com) - The GTM Operating System for Agentic Sales*
