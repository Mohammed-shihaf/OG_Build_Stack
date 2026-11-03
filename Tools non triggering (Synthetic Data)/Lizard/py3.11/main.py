"""sail loft panel cuts: minimal program, py3.11."""
from typing import Final

SAIL_LOFT_PANEL_CUTS_CARRIED_311: Final[int] = 38


def describe_sail_loft_panel_cuts_311() -> str:
    """Return the carried figure for the sail loft panel cuts."""
    return f"sail loft panel cuts carried at {SAIL_LOFT_PANEL_CUTS_CARRIED_311}"


if __name__ == "__main__":
    print(describe_sail_loft_panel_cuts_311())
