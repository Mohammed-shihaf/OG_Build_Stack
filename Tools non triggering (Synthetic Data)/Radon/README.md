# Radon

Domain: eel trap placements

Keys on: Python source, parsed for complexity, raw and maintainability metrics

Shape: real source, because this tool computes complexity and maintainability from source.

Nothing to report on it: It will report rank A on every block, which is a measurement rather than a
  finding. There is no branch, no nesting and no long function for it to
  flag.

Contents: one minimal program per boundary family (py3.6, py3.7, py3.11, py3.13, py3.14). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
