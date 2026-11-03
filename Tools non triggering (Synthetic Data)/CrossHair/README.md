# CrossHair

Domain: rope walk strand counts

Keys on: functions with type annotations, which it explores symbolically

Shape: real source, because this tool explores annotated functions symbolically.

Nothing to report on it: It looks for a path that violates a contract. The function here has one
  return statement, no branch and no precondition, so there is no
  counterexample to find.

Contents: one minimal program per boundary family (py3.6, py3.7, py3.11, py3.13, py3.14). One class or one function, no branching, no duplication, no dependency, no dead export, no magic number. No manifest and no tool configuration, so nothing here is discovered as a project.

Expected: the tool runs and reports nothing.
