# vulture

Domain: candle dipping rounds

Keys on: Python source, scanned for code that is defined and never used

Shape: real source, because this tool scans source for definitions that are never used.

Nothing to report on it: The one risk this folder runs for a dead-code detector, and the reason
  every program here calls what it defines from a main guard rather than
  leaving it for an importer.

Contents: one minimal program per boundary family (py3.6, py3.7, py3.11, py3.13, py3.14). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
