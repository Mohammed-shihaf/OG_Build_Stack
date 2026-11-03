"""glass annealing ramps: minimal program, py3.11."""
from typing import Final

GLASS_ANNEALING_RAMPS_CARRIED_311: Final[int] = 62


def describe_glass_annealing_ramps_311() -> str:
    """Return the carried figure for the glass annealing ramps."""
    return f"glass annealing ramps carried at {GLASS_ANNEALING_RAMPS_CARRIED_311}"


if __name__ == "__main__":
    print(describe_glass_annealing_ramps_311())
