# Trivy

Domain: dye vat batches

Keys on: a lockfile, a manifest or an image, resolved into package coordinates

Shape: no source, because this tool resolves package coordinates from a lockfile or manifest. A minimal program would not change that, and shipping one would imply a verdict this folder cannot support.

Inert here because: No requirements file, no pyproject, no lockfile. The dependency set it
  would scan is empty, so no advisory lookup is made.

Expected: NOT TRIGGERED, no input discovered.
