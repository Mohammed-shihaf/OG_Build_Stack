"""rope walk strand counts: minimal program, py3.11."""
from typing import Final

ROPE_WALK_STRAND_COUNTS_CARRIED_311: Final[int] = 35


def describe_rope_walk_strand_counts_311() -> str:
    """Return the carried figure for the rope walk strand counts."""
    return f"rope walk strand counts carried at {ROPE_WALK_STRAND_COUNTS_CARRIED_311}"


if __name__ == "__main__":
    print(describe_rope_walk_strand_counts_311())
