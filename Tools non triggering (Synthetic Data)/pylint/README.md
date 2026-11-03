# pylint

Domain: slate splitting runs

Keys on: Python modules, checked against its full message set

Shape: real source, because this tool checks modules against its message set.

Nothing to report on it: Written to clear pylint's defaults, which are stricter than most: module,
  class and function docstrings are present, names follow snake_case, and
  nothing is unused.

Contents: one minimal program per boundary family (py3.6, py3.7, py3.11, py3.13, py3.14). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
