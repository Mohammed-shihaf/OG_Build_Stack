"""candle dipping rounds: minimal program, py3.11."""
from typing import Final

CANDLE_DIPPING_ROUNDS_CARRIED_311: Final[int] = 107


def describe_candle_dipping_rounds_311() -> str:
    """Return the carried figure for the candle dipping rounds."""
    return f"candle dipping rounds carried at {CANDLE_DIPPING_ROUNDS_CARRIED_311}"


if __name__ == "__main__":
    print(describe_candle_dipping_rounds_311())
