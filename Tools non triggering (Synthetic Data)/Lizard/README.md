# Lizard

Domain: sail loft panel cuts

Keys on: files whose extension maps to one of its seventeen tokenisers

Shape: real source, because this tool counts functions and complexity from its own tokeniser.

Nothing to report on it: Measured on the TypeScript folder and the same here: one function per
  file, cyclomatic complexity 1, length far under the threshold. It
  analyses and has nothing to warn about.

Contents: one minimal program per boundary family (py3.6, py3.7, py3.11, py3.13, py3.14). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
