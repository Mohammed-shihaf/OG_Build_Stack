"""eel trap placements: minimal program, py3.11."""
from typing import Final

EEL_TRAP_PLACEMENTS_CARRIED_311: Final[int] = 47


def describe_eel_trap_placements_311() -> str:
    """Return the carried figure for the eel trap placements."""
    return f"eel trap placements carried at {EEL_TRAP_PLACEMENTS_CARRIED_311}"


if __name__ == "__main__":
    print(describe_eel_trap_placements_311())
