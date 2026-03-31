# AI Student Portal

## Current State
Coding Practice section has 3 courses: Java, Python, Patterns — all with empty problems arrays.
codingData.ts defines the Course/Problem interface and exports COURSES with empty problem arrays.

## Requested Changes (Diff)

### Add
- Java coding problems: 18 topics × 30 questions (10 Easy/10 Medium/10 Hard) = 540 problems with input data and example output, split across 3 files
- Python coding problems: same 18 topics × 30 questions = 540 problems, split across 2 files
- Pattern coding problems: 30 modern interview pattern programs (star/number patterns + algorithm patterns)

### Modify
- codingData.ts: import from new data files and populate COURSES[].problems

### Remove
- Nothing removed

## Implementation Plan
1. javaCodePart1.ts — topics 1-6 (Evolution of HLL, OOP, Main Method, Data Types, Operators, Methods)
2. javaCodePart2.ts — topics 7-12 (Arrays, Strings, Method Overloading, Encapsulation, Constructor, Static)
3. javaCodePart3.ts — topics 13-18 (Inheritance, Polymorphism, Abstraction, Interface, Exception Handling, Multi Threading)
4. pythonCodePart1.ts — topics 1-9 same as Java
5. pythonCodePart2.ts — topics 10-18 same as Java
6. patternCode.ts — 30 modern interview pattern programs
7. Update codingData.ts to spread all problems into COURSES
