"""charcoal burning stacks: minimal program, py3.11."""
from typing import Final

CHARCOAL_BURNING_STACKS_CARRIED_311: Final[int] = 50


def describe_charcoal_burning_stacks_311() -> str:
    """Return the carried figure for the charcoal burning stacks."""
    return f"charcoal burning stacks carried at {CHARCOAL_BURNING_STACKS_CARRIED_311}"


if __name__ == "__main__":
    print(describe_charcoal_burning_stacks_311())
