# Python tools non-triggering corpus

28 tool-named folders, one per tool, matching the folder names in
`Tool Clean (Synthetic Data)` and `Tool Invalid (Synthetic Data)` so the three
data sets line up name-for-name.

Clean makes each tool run and report nothing wrong. Invalid makes it run and
report something. This folder holds data with nothing in it for any tool to
catch -- and, where the tool cannot be given a program at all, nothing for it
to start on.

## Why the folder is split two ways

A hello world, one class with one function, a `main` file -- that answers the
question for a tool that reads source. It answers nothing for a tool that reads
a lockfile, a coverage report, or the commit history: a dependency scanner
handed a program has no dependency set, so it does not run and find nothing,
it simply does not run. Shipping it a `main.py` would state a verdict
this folder cannot support.

So each tool gets whichever shape is true for it.

### 16 tools get a minimal program

`py3.6`, `py3.7`, `py3.11`, `py3.13` and `py3.14`, one program each, matching the family split in `Tool Clean`.
One class or one function, no branching, no duplication, no dependency, no
dead export, no magic number. No manifest, no tool config.

| Tool | Reads source because it |
| --- | --- |
| Bandit | matches security plugins against a parsed AST |
| Beniget | computes definitions and uses from an AST |
| CrossHair | explores annotated functions symbolically |
| Lizard | counts functions and complexity from its own tokeniser |
| Opengrep | matches rule patterns against parsed source |
| Radon | computes complexity and maintainability from source |
| Ruff | lints parsed source |
| Semgrep | matches rule patterns against parsed source |
| astroid | parses source into an inference-capable AST |
| cognitive-ast | scores cognitive complexity from an AST |
| complexipy | scores cognitive complexity from source |
| jscpd | tokenises files and compares token runs |
| pyan3 | builds a static call graph from source |
| pylint | checks modules against its message set |
| symilar | compares source files for similarity |
| vulture | scans source for definitions that are never used |

### 12 tools get an inert record instead

| Tool | No program would help because it |
| --- | --- |
| Coverage.py | records arcs while a program runs under its tracer |
| Pymcdc | records condition outcomes during execution |
| SlipCover | instruments bytecode at import and reports what ran |
| Trivy | resolves package coordinates from a lockfile or manifest |
| cosmic-ray | re-runs a test suite against each mutant |
| diff-cover | intersects a coverage report with a diff |
| dulwich | reads the repository's objects and refs |
| mutmut | re-runs a test suite against each mutant |
| pip-audit | audits a declared or installed dependency set |
| pydriller | iterates the repository's commits |
| sys.settrace driver (stdlib) | traces a running interpreter line by line |
| testmon | selects tests from a suite and a prior run database |

## What the code deliberately avoids, and why

Two choices here come from this corpus's own history rather than from style.

**Every program calls what it defines, from a `__main__` guard.** `vulture` is
on this roster and an uncalled function is exactly what it exists to report. A
module that merely defines something and stops would be a finding in the folder
built to produce none.

**No PEP 695 type parameters anywhere.** The corpus already established that
`beniget` runs on them, exits 0, and is wrong -- one false unbound identifier
per use of a type parameter. Writing modern generics here would plant a finding
that looks like a real one.

Beyond that the code is written to clear pylint's defaults, which are stricter
than most: module, class and function docstrings, snake_case throughout,
nothing unused, nothing shadowed.

### Measured

pylint, recursive, on defaults: **10.00/10**. ruff: all checks passed. bandit:
no issues. radon: nothing above rank A. complexipy: all functions within the
allowed complexity. lizard: 80 functions, average CCN 1.0, 0 warnings. semgrep
with a Python security ruleset: 0 findings over 80 files. vulture: nothing.
jscpd: 0 clones. detect-secrets: 0.

### One finding that is not about this folder

`vulture` **crashes** on this corpus, here and in `Tool Clean` alike:

```
IsADirectoryError: [Errno 21] Is a directory: '.../Coverage.py'
```

The tool folder is named `Coverage.py` to match Clean, vulture walks the tree,
sees a `.py` suffix and tries to tokenise a directory. The same directory name
is already present in the live `Tool Clean (Synthetic Data)`, so this is a
pre-existing property of the Python corpus rather than something this folder
introduced. `complexipy` hits it too but warns and continues. Passing
`--exclude Coverage.py` clears it. Worth raising with whoever runs the Python
evaluation: a crashed tool and a tool that found nothing look identical in a
results sheet.

## Invariants

| # | Invariant |
| --- | --- |
| G2 | No manifest and no lockfile anywhere, so the folder adds no discovered project and no task. |
| G3 | No tool configuration file. |
| G4 | No coverage report, SBOM or other consumed artifact. |
| G5 | Pure ASCII. |
| G6 | No secret-shaped strings. |
| G7 | Zero duplicate blocks at 5 lines / 30 tokens, across both shapes. |

`verify.py` checks all of them. G1 of the earlier draft -- no source extension
anywhere -- is gone by design: the CODE folders now carry real source.

## Layout

```text
Tools non triggering (Synthetic Data)/
  README.md
  <Tool Name>/              CODE
    README.md
    <first family>/main.py  ...  <last family>/main.py
  <Tool Name>/              INERT
    README.md
    record.txt
```

## Verifying

```bash
python3 verify.py "<path to this folder>"
python3 measure.py "<path to this folder>" --bin <node_modules/.bin>
```
