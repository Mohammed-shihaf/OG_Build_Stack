"""flax retting ponds: minimal program, py3.11."""
from typing import Final

FLAX_RETTING_PONDS_CARRIED_311: Final[int] = 53


def describe_flax_retting_ponds_311() -> str:
    """Return the carried figure for the flax retting ponds."""
    return f"flax retting ponds carried at {FLAX_RETTING_PONDS_CARRIED_311}"


if __name__ == "__main__":
    print(describe_flax_retting_ponds_311())
