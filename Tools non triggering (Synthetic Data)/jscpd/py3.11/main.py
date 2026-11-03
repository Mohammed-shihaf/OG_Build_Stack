"""hop kiln loads: minimal program, py3.11."""
from typing import Final

HOP_KILN_LOADS_CARRIED_311: Final[int] = 80


def describe_hop_kiln_loads_311() -> str:
    """Return the carried figure for the hop kiln loads."""
    return f"hop kiln loads carried at {HOP_KILN_LOADS_CARRIED_311}"


if __name__ == "__main__":
    print(describe_hop_kiln_loads_311())
