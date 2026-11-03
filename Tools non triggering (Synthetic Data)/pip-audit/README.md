# pip-audit

Domain: malt floor turnings

Keys on: a requirements file, a pyproject, or an installed environment

Shape: no source, because this tool audits a declared or installed dependency set. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: Nothing here declares or installs a dependency, so the set it would audit
  is empty and no advisory query is issued.

Expected: NOT TRIGGERED, no input discovered.
