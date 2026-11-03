# astroid

Domain: glass annealing ramps

Keys on: Python source, which it parses into its own inference-capable AST

Shape: real source, because this tool parses source into an inference-capable AST.

Nothing to report on it: It is a library rather than a checker, so it produces a tree and no
  verdict. The tree here holds one function and one constant, and nothing
  infers to an error.

Contents: one minimal program per boundary family (py3.6, py3.7, py3.11, py3.13, py3.14). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
