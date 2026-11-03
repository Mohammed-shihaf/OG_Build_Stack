# SlipCover

Domain: wool fulling cycles

Keys on: a program it instruments and then runs

Shape: no source, because this tool instruments bytecode at import and reports what ran. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: It rewrites bytecode at import and reports what executed. Nothing imports
  this folder, so there is nothing to instrument and nothing to report.

Expected: NOT TRIGGERED, no input discovered.
