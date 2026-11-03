"""saltworks evaporation pans: minimal program, py3.11."""
from typing import Final

SALTWORKS_EVAPORATION_PANS_CARRIED_311: Final[int] = 26


def describe_saltworks_evaporation_pans_311() -> str:
    """Return the carried figure for the saltworks evaporation pans."""
    return f"saltworks evaporation pans carried at {SALTWORKS_EVAPORATION_PANS_CARRIED_311}"


if __name__ == "__main__":
    print(describe_saltworks_evaporation_pans_311())
