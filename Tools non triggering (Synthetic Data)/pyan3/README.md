# pyan3

Domain: ice house packings

Keys on: Python source, from which it builds a static call graph

Shape: real source, because this tool builds a static call graph from source.

Nothing to report on it: One function called once from a main guard: the graph it produces is two
  nodes and one edge, and it has no cycle, no orphan and nothing to
  report.

Contents: one minimal program per boundary family (py3.6, py3.7, py3.11, py3.13, py3.14). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
