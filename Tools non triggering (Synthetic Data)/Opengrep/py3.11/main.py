"""net mending gauges: minimal program, py3.11."""
from typing import Final

NET_MENDING_GAUGES_CARRIED_311: Final[int] = 41


def describe_net_mending_gauges_311() -> str:
    """Return the carried figure for the net mending gauges."""
    return f"net mending gauges carried at {NET_MENDING_GAUGES_CARRIED_311}"


if __name__ == "__main__":
    print(describe_net_mending_gauges_311())
