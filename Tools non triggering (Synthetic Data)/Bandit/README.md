# Bandit

Domain: saltworks evaporation pans

Keys on: Python source, parsed to an AST and matched against its security plugins

Shape: real source, because this tool matches security plugins against a parsed AST.

Nothing to report on it: Every plugin looks for a specific risky construct - a subprocess call, a
  weak hash, an assert used as a guard. The program here performs one
  arithmetic formatting step and calls nothing.

Contents: one minimal program per boundary family (py3.6, py3.7, py3.11, py3.13, py3.14). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
