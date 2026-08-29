---
name: agentic-eval
description: Self-critique loops, evaluator-optimizer pipelines, LLM-as-judge patterns. Separates prototype-quality from production-quality agents
---

# Agentic Eval

Patterns and practices for evaluating and improving agent quality through structured evaluation loops.

## Core Patterns
- **Self-Critique Loops**: Agent reviews and refines its own outputs
- **Evaluator-Optimizer Pipelines**: Separate evaluation and optimization stages
- **LLM-as-Judge**: Use language models to score and compare outputs

## Quality Tiers
- **Prototype-quality**: Functional but not robust; suitable for exploration
- **Production-quality**: Validated, monitored, and reliably consistent

## Workflow
1. Define evaluation criteria and success metrics
2. Implement self-critique or evaluator-optimizer loops
3. Use LLM judges for subjective quality assessments
4. Benchmark against baseline performance
5. Iterate until production-quality standards are met
