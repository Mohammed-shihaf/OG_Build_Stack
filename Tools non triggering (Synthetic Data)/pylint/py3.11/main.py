"""slate splitting runs: minimal program, py3.11."""
from typing import Final

SLATE_SPLITTING_RUNS_CARRIED_311: Final[int] = 95


def describe_slate_splitting_runs_311() -> str:
    """Return the carried figure for the slate splitting runs."""
    return f"slate splitting runs carried at {SLATE_SPLITTING_RUNS_CARRIED_311}"


if __name__ == "__main__":
    print(describe_slate_splitting_runs_311())
