# sys.settrace driver (stdlib)

Domain: reed cutting beds

Keys on: a running interpreter, traced line by line

Shape: no source, because this tool traces a running interpreter line by line. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: The driver traces execution. With nothing executing this folder, the trace
  callback is never invoked.

Expected: NOT TRIGGERED, no input discovered.
