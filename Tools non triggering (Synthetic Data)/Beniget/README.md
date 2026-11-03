# Beniget

Domain: peat cutting allocations

Keys on: an AST, from which it computes definitions and their uses

Shape: real source, because this tool computes definitions and uses from an AST.

Nothing to report on it: Every name bound here is read exactly once in the same scope, so there is
  no unbound identifier and no definition without a use for it to report.

Contents: one minimal program per boundary family (py3.6, py3.7, py3.11, py3.13, py3.14). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
