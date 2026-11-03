"""peat cutting allocations: minimal program, py3.11."""
from typing import Final

PEAT_CUTTING_ALLOCATIONS_CARRIED_311: Final[int] = 29


def describe_peat_cutting_allocations_311() -> str:
    """Return the carried figure for the peat cutting allocations."""
    return f"peat cutting allocations carried at {PEAT_CUTTING_ALLOCATIONS_CARRIED_311}"


if __name__ == "__main__":
    print(describe_peat_cutting_allocations_311())
