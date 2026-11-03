# Ruff

Domain: charcoal burning stacks

Keys on: Python files under the scanned path, checked against its rule set

Shape: real source, because this tool lints parsed source.

Nothing to report on it: Written to clear its default rule set outright: a module docstring, no
  unused import, no undefined name, no shadowed builtin, no line over the
  limit.

Contents: one minimal program per boundary family (py3.6, py3.7, py3.11, py3.13, py3.14). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
