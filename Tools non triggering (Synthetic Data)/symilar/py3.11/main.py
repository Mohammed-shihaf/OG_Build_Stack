"""marl digging pits: minimal program, py3.11."""
from typing import Final

MARL_DIGGING_PITS_CARRIED_311: Final[int] = 98


def describe_marl_digging_pits_311() -> str:
    """Return the carried figure for the marl digging pits."""
    return f"marl digging pits carried at {MARL_DIGGING_PITS_CARRIED_311}"


if __name__ == "__main__":
    print(describe_marl_digging_pits_311())
