"""ice house packings: minimal program, py3.11."""
from typing import Final

ICE_HOUSE_PACKINGS_CARRIED_311: Final[int] = 89


def describe_ice_house_packings_311() -> str:
    """Return the carried figure for the ice house packings."""
    return f"ice house packings carried at {ICE_HOUSE_PACKINGS_CARRIED_311}"


if __name__ == "__main__":
    print(describe_ice_house_packings_311())
