# Fit engine contract

`judgeFit()` is a pure function. Circumference fields accept either a full circumference or a flat measurement; only the latter is multiplied by two. Length fields are never doubled. Stretch factors and softness factors are conservative constants in the engine.

Each registered garment supplies its required and critical fields through `garmentRegistry`. Missing plush measurements become `unknown` parts and are never estimated. A blocked critical part wins over tight, then length warnings; missing comparisons remain `unknown` when no blocking or tight warning exists. Scores are rounded to five-point increments and are capped for blocked and tight outcomes.

The Vitest suite covers circumference boundaries, flat conversion, missing comparisons, length warnings, blocked priority, score rounding, and all pouch orientation modes.
