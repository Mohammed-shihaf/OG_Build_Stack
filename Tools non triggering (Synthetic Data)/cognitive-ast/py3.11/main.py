"""tin smelting charges: minimal program, py3.11."""
from typing import Final

TIN_SMELTING_CHARGES_CARRIED_311: Final[int] = 65


def describe_tin_smelting_charges_311() -> str:
    """Return the carried figure for the tin smelting charges."""
    return f"tin smelting charges carried at {TIN_SMELTING_CHARGES_CARRIED_311}"


if __name__ == "__main__":
    print(describe_tin_smelting_charges_311())
