import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  Loader2,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { MCQQuestion } from "../backend.d";
import { useGetAllTestTopics, useRecordQuizAttempt } from "../hooks/useQueries";

// ─── Static question bank ─────────────────────────────────────────────────────

const STATIC_TOPICS = [
  {
    id: "java",
    title: "Java",
    emoji: "☕",
    desc: "Core Java: OOP, JVM, Collections, Exception Handling",
  },
  {
    id: "python",
    title: "Python",
    emoji: "🐍",
    desc: "Python: Syntax, Data Types, Functions, Modules",
  },
  {
    id: "c",
    title: "C Programming",
    emoji: "⚙️",
    desc: "Pointers, Memory, Strings, Arrays in C",
  },
  {
    id: "dsa",
    title: "DSA",
    emoji: "🌲",
    desc: "Data Structures & Algorithms",
  },
  {
    id: "frontend",
    title: "Frontend Technologies",
    emoji: "🌐",
    desc: "HTML, CSS, JavaScript, React",
  },
  {
    id: "sql",
    title: "SQL",
    emoji: "🗄️",
    desc: "SQL queries, joins, aggregations, transactions",
  },
  {
    id: "patterns",
    title: "Pattern Programs",
    emoji: "⭐",
    desc: "Logic building with pattern printing",
  },
  {
    id: "aptitude",
    title: "Aptitude",
    emoji: "🧮",
    desc: "Quantitative aptitude for competitive exams",
  },
  {
    id: "advjava",
    title: "Advanced Java",
    emoji: "🚀",
    desc: "Streams, Lambdas, Concurrency, Design Patterns",
  },
];

interface StaticQuestion {
  id: string;
  topic_id: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question_text: string;
  options: string[];
  correct_option_index: bigint;
}

const Q: Record<string, StaticQuestion[]> = {
  java: [
    // Easy
    {
      id: "j-e1",
      topic_id: "java",
      difficulty: "Easy",
      question_text: "Which keyword defines a class in Java?",
      options: ["class", "define", "struct", "object"],
      correct_option_index: BigInt(0),
    },
    {
      id: "j-e2",
      topic_id: "java",
      difficulty: "Easy",
      question_text: "Default value of an int in Java?",
      options: ["null", "undefined", "0", "1"],
      correct_option_index: BigInt(2),
    },
    {
      id: "j-e3",
      topic_id: "java",
      difficulty: "Easy",
      question_text: "Which is NOT a Java primitive type?",
      options: ["int", "String", "boolean", "char"],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-e4",
      topic_id: "java",
      difficulty: "Easy",
      question_text: "What does JVM stand for?",
      options: [
        "Java Virtual Machine",
        "Java Variable Manager",
        "Java Visual Module",
        "Java Void Method",
      ],
      correct_option_index: BigInt(0),
    },
    {
      id: "j-e5",
      topic_id: "java",
      difficulty: "Easy",
      question_text: "Entry point of a Java application?",
      options: ["start()", "run()", "main()", "init()"],
      correct_option_index: BigInt(2),
    },
    {
      id: "j-e6",
      topic_id: "java",
      difficulty: "Easy",
      question_text:
        "Which access modifier makes a field visible only within its class?",
      options: ["public", "protected", "private", "default"],
      correct_option_index: BigInt(2),
    },
    {
      id: "j-e7",
      topic_id: "java",
      difficulty: "Easy",
      question_text: "Which keyword prevents a variable from being reassigned?",
      options: ["static", "final", "abstract", "const"],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-e8",
      topic_id: "java",
      difficulty: "Easy",
      question_text: "Which operator is used for string concatenation in Java?",
      options: ["&", "+", ".", "*"],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-e9",
      topic_id: "java",
      difficulty: "Easy",
      question_text: "What does 'System.out.println()' do?",
      options: [
        "Reads input",
        "Prints output with newline",
        "Creates a file",
        "Exits program",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-e10",
      topic_id: "java",
      difficulty: "Easy",
      question_text: "Which loop is guaranteed to execute at least once?",
      options: ["for", "while", "do-while", "foreach"],
      correct_option_index: BigInt(2),
    },
    // Medium
    {
      id: "j-m1",
      topic_id: "java",
      difficulty: "Medium",
      question_text: "What is the output of Integer.parseInt('42')?",
      options: ["'42'", "42 (int)", "42.0", "NumberFormatException"],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-m2",
      topic_id: "java",
      difficulty: "Medium",
      question_text: "Which collection allows duplicate elements?",
      options: ["Set", "Map", "List", "TreeSet"],
      correct_option_index: BigInt(2),
    },
    {
      id: "j-m3",
      topic_id: "java",
      difficulty: "Medium",
      question_text: "What is the difference between == and .equals() in Java?",
      options: [
        "No difference",
        "== compares references; .equals() compares values",
        "== compares values; .equals() compares references",
        "Both compare values",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-m4",
      topic_id: "java",
      difficulty: "Medium",
      question_text: "Which keyword is used to call parent class constructor?",
      options: ["this()", "super()", "parent()", "base()"],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-m5",
      topic_id: "java",
      difficulty: "Medium",
      question_text: "What is method overloading?",
      options: [
        "Same name, different return types",
        "Same name, different parameters",
        "Different names, same logic",
        "Overriding parent methods",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-m6",
      topic_id: "java",
      difficulty: "Medium",
      question_text: "What does 'static' keyword mean for a method?",
      options: [
        "It can be overridden",
        "It belongs to the class, not an instance",
        "It is private",
        "It is final",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-m7",
      topic_id: "java",
      difficulty: "Medium",
      question_text: "Which exception is thrown for null reference access?",
      options: [
        "IllegalArgumentException",
        "NullPointerException",
        "IndexOutOfBoundsException",
        "ClassCastException",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-m8",
      topic_id: "java",
      difficulty: "Medium",
      question_text: "Which interface does HashMap implement?",
      options: ["List", "Set", "Map", "Queue"],
      correct_option_index: BigInt(2),
    },
    {
      id: "j-m9",
      topic_id: "java",
      difficulty: "Medium",
      question_text: "What is autoboxing in Java?",
      options: [
        "Converting int[] to int",
        "Auto converting primitives to wrapper objects",
        "Auto casting types",
        "Compressing data automatically",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-m10",
      topic_id: "java",
      difficulty: "Medium",
      question_text: "Which keyword is used to implement an interface?",
      options: ["extends", "implements", "inherits", "uses"],
      correct_option_index: BigInt(1),
    },
    // Hard
    {
      id: "j-h1",
      topic_id: "java",
      difficulty: "Hard",
      question_text: "What is the output: System.out.println(1 + 2 + '3')?",
      options: ["123", "33", "6", "Compile error"],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-h2",
      topic_id: "java",
      difficulty: "Hard",
      question_text: "What is covariant return type?",
      options: [
        "Returning supertype",
        "Overriding method can return subtype",
        "Multiple return values",
        "Generic return type",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-h3",
      topic_id: "java",
      difficulty: "Hard",
      question_text: "What is the diamond problem in Java?",
      options: [
        "Memory issue",
        "Ambiguity with multiple interface default methods",
        "Stack overflow",
        "Circular imports",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-h4",
      topic_id: "java",
      difficulty: "Hard",
      question_text: "What does volatile keyword guarantee?",
      options: [
        "Thread safety for compound ops",
        "Visibility of changes across threads",
        "Prevents garbage collection",
        "Atomic operations",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-h5",
      topic_id: "java",
      difficulty: "Hard",
      question_text:
        "What is the difference between Comparable and Comparator?",
      options: [
        "Same thing",
        "Comparable modifies the class; Comparator is external",
        "Comparator modifies the class; Comparable is external",
        "Comparable is for numbers only",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-h6",
      topic_id: "java",
      difficulty: "Hard",
      question_text: "What is a checked exception?",
      options: [
        "Exception at runtime",
        "Exception that must be declared or caught at compile time",
        "Exception from JVM",
        "ArithmeticException",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-h7",
      topic_id: "java",
      difficulty: "Hard",
      question_text: "What does the transient keyword do?",
      options: [
        "Marks class as abstract",
        "Prevents field serialization",
        "Marks method as synchronized",
        "Creates immutable field",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-h8",
      topic_id: "java",
      difficulty: "Hard",
      question_text: "What is the output of: new Integer(1) == new Integer(1)?",
      options: ["true", "false", "Compile error", "Depends on JVM"],
      correct_option_index: BigInt(1),
    },
    {
      id: "j-h9",
      topic_id: "java",
      difficulty: "Hard",
      question_text: "Which Java GC algorithm is default in Java 11+?",
      options: ["Serial GC", "Parallel GC", "G1 GC", "CMS GC"],
      correct_option_index: BigInt(2),
    },
    {
      id: "j-h10",
      topic_id: "java",
      difficulty: "Hard",
      question_text: "What is method hiding vs overriding?",
      options: [
        "Same concept",
        "Hiding is for static methods; overriding for instance methods",
        "Hiding is for private methods",
        "Overriding requires @Override",
      ],
      correct_option_index: BigInt(1),
    },
  ],
  python: [
    // Easy
    {
      id: "py-e1",
      topic_id: "python",
      difficulty: "Easy",
      question_text: "Comment symbol in Python?",
      options: ["//", "/*", "#", "--"],
      correct_option_index: BigInt(2),
    },
    {
      id: "py-e2",
      topic_id: "python",
      difficulty: "Easy",
      question_text: "Python's key-value data structure?",
      options: ["list", "tuple", "set", "dict"],
      correct_option_index: BigInt(3),
    },
    {
      id: "py-e3",
      topic_id: "python",
      difficulty: "Easy",
      question_text: "Keyword to define a function in Python?",
      options: ["function", "def", "func", "define"],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-e4",
      topic_id: "python",
      difficulty: "Easy",
      question_text: "What is the output of print(type([]))?",
      options: [
        "<class 'array'>",
        "<class 'list'>",
        "<class 'tuple'>",
        "<class 'dict'>",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-e5",
      topic_id: "python",
      difficulty: "Easy",
      question_text: "Built-in function to return length of an object?",
      options: ["size()", "count()", "len()", "length()"],
      correct_option_index: BigInt(2),
    },
    {
      id: "py-e6",
      topic_id: "python",
      difficulty: "Easy",
      question_text: "Which of these is an immutable sequence type?",
      options: ["list", "dict", "tuple", "set"],
      correct_option_index: BigInt(2),
    },
    {
      id: "py-e7",
      topic_id: "python",
      difficulty: "Easy",
      question_text: "What does 'pass' do in Python?",
      options: [
        "Exits loop",
        "Does nothing (placeholder)",
        "Skips iteration",
        "Returns None",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-e8",
      topic_id: "python",
      difficulty: "Easy",
      question_text: "Which operator is used for exponentiation?",
      options: ["^", "**", "^^", "exp"],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-e9",
      topic_id: "python",
      difficulty: "Easy",
      question_text: "What is the output of bool(0)?",
      options: ["True", "False", "0", "Error"],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-e10",
      topic_id: "python",
      difficulty: "Easy",
      question_text: "Python is ____ typed.",
      options: ["statically", "dynamically", "weakly", "strongly only"],
      correct_option_index: BigInt(1),
    },
    // Medium
    {
      id: "py-m1",
      topic_id: "python",
      difficulty: "Medium",
      question_text: "What is a list comprehension?",
      options: [
        "A type of loop",
        "A way to create lists using a single expression",
        "A data structure",
        "A sorting algorithm",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-m2",
      topic_id: "python",
      difficulty: "Medium",
      question_text: "What does *args do in Python?",
      options: [
        "Keyword arguments",
        "Variable positional arguments",
        "Default values",
        "None of the above",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-m3",
      topic_id: "python",
      difficulty: "Medium",
      question_text: "What is a lambda function?",
      options: [
        "Multi-line function",
        "Anonymous single-expression function",
        "Class method",
        "Module-level function",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-m4",
      topic_id: "python",
      difficulty: "Medium",
      question_text: "What does 'yield' do in Python?",
      options: [
        "Returns value and exits",
        "Produces a generator value",
        "Calls a function",
        "Imports a module",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-m5",
      topic_id: "python",
      difficulty: "Medium",
      question_text: "What is the output of [1,2,3][::-1]?",
      options: ["[1,2,3]", "[3,2,1]", "[2,3]", "Error"],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-m6",
      topic_id: "python",
      difficulty: "Medium",
      question_text: "What is __init__ in Python?",
      options: [
        "Module initializer",
        "Constructor method",
        "Destructor",
        "Class attribute",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-m7",
      topic_id: "python",
      difficulty: "Medium",
      question_text: "What does map() do?",
      options: [
        "Finds keys in dict",
        "Applies function to all items in iterable",
        "Sorts a list",
        "Filters a list",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-m8",
      topic_id: "python",
      difficulty: "Medium",
      question_text: "What is a decorator in Python?",
      options: [
        "CSS-like styling",
        "Function that wraps another function",
        "Class attribute",
        "Module import",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-m9",
      topic_id: "python",
      difficulty: "Medium",
      question_text: "Difference between 'is' and '==' in Python?",
      options: [
        "No difference",
        "'is' checks identity; '==' checks equality",
        "'is' checks equality; '==' checks identity",
        "Both check identity",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-m10",
      topic_id: "python",
      difficulty: "Medium",
      question_text: "What does the 'global' keyword do?",
      options: [
        "Creates a global class",
        "Accesses global scope variable inside function",
        "Makes variable immutable",
        "Exports variable",
      ],
      correct_option_index: BigInt(1),
    },
    // Hard
    {
      id: "py-h1",
      topic_id: "python",
      difficulty: "Hard",
      question_text: "What is the GIL in Python?",
      options: [
        "Global Import Library",
        "Global Interpreter Lock preventing true multi-threading",
        "Graphics Interface Layer",
        "General Iteration Logic",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-h2",
      topic_id: "python",
      difficulty: "Hard",
      question_text: "What is a metaclass?",
      options: [
        "A class inside a class",
        "Class whose instances are classes",
        "An abstract class",
        "A singleton pattern",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-h3",
      topic_id: "python",
      difficulty: "Hard",
      question_text: "What is the output of: (lambda x: x*2)(5)?",
      options: ["5", "10", "lambda5", "Error"],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-h4",
      topic_id: "python",
      difficulty: "Hard",
      question_text: "What does functools.lru_cache do?",
      options: [
        "Limits recursion",
        "Caches function results for same inputs",
        "Logs function calls",
        "Limits function arguments",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-h5",
      topic_id: "python",
      difficulty: "Hard",
      question_text: "What is a context manager?",
      options: [
        "Manages threads",
        "Object managing resource setup/teardown via with statement",
        "Memory optimizer",
        "Import handler",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-h6",
      topic_id: "python",
      difficulty: "Hard",
      question_text: "What is multiple inheritance?",
      options: [
        "Inheriting from multiple methods",
        "A class inheriting from more than one parent class",
        "Calling parent methods multiple times",
        "Abstract base classes",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-h7",
      topic_id: "python",
      difficulty: "Hard",
      question_text: "What does __slots__ do in Python?",
      options: [
        "Limits class to specific attributes, reducing memory",
        "Creates time slots for execution",
        "Defines abstract methods",
        "Manages imports",
      ],
      correct_option_index: BigInt(0),
    },
    {
      id: "py-h8",
      topic_id: "python",
      difficulty: "Hard",
      question_text: "What is asyncio used for?",
      options: [
        "Multi-threading",
        "Asynchronous I/O using coroutines",
        "GPU computation",
        "Database access",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-h9",
      topic_id: "python",
      difficulty: "Hard",
      question_text:
        "What is the output of: list(filter(lambda x: x>2, [1,2,3,4]))?",
      options: ["[1,2]", "[3,4]", "[2,3,4]", "[1,2,3,4]"],
      correct_option_index: BigInt(1),
    },
    {
      id: "py-h10",
      topic_id: "python",
      difficulty: "Hard",
      question_text: "What does 'nonlocal' do?",
      options: [
        "Creates global variable",
        "Refers to variable in enclosing (non-global) scope",
        "Deletes variable",
        "Makes variable constant",
      ],
      correct_option_index: BigInt(1),
    },
  ],
  sql: [
    // Easy
    {
      id: "sq-e1",
      topic_id: "sql",
      difficulty: "Easy",
      question_text: "SQL command to retrieve data?",
      options: ["GET", "FETCH", "SELECT", "PULL"],
      correct_option_index: BigInt(2),
    },
    {
      id: "sq-e2",
      topic_id: "sql",
      difficulty: "Easy",
      question_text: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Standard Query Logic",
        "System Query List",
      ],
      correct_option_index: BigInt(0),
    },
    {
      id: "sq-e3",
      topic_id: "sql",
      difficulty: "Easy",
      question_text: "Which clause filters rows?",
      options: ["HAVING", "WHERE", "FILTER", "LIMIT"],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-e4",
      topic_id: "sql",
      difficulty: "Easy",
      question_text: "Which JOIN returns all rows from both tables?",
      options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
      correct_option_index: BigInt(3),
    },
    {
      id: "sq-e5",
      topic_id: "sql",
      difficulty: "Easy",
      question_text: "Aggregate function to count rows?",
      options: ["SUM()", "AVG()", "COUNT()", "MAX()"],
      correct_option_index: BigInt(2),
    },
    {
      id: "sq-e6",
      topic_id: "sql",
      difficulty: "Easy",
      question_text: "Which keyword removes duplicate rows?",
      options: ["UNIQUE", "DISTINCT", "DIFFERENT", "FILTER"],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-e7",
      topic_id: "sql",
      difficulty: "Easy",
      question_text: "Command to add a new record?",
      options: ["ADD", "INSERT INTO", "APPEND", "CREATE ROW"],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-e8",
      topic_id: "sql",
      difficulty: "Easy",
      question_text: "Command to modify existing data?",
      options: ["MODIFY", "CHANGE", "UPDATE", "ALTER DATA"],
      correct_option_index: BigInt(2),
    },
    {
      id: "sq-e9",
      topic_id: "sql",
      difficulty: "Easy",
      question_text: "Which clause is used to sort results?",
      options: ["SORT BY", "ORDER BY", "ARRANGE BY", "GROUP BY"],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-e10",
      topic_id: "sql",
      difficulty: "Easy",
      question_text: "Which keyword checks for NULL values?",
      options: ["= NULL", "== NULL", "IS NULL", "EQUALS NULL"],
      correct_option_index: BigInt(2),
    },
    // Medium
    {
      id: "sq-m1",
      topic_id: "sql",
      difficulty: "Medium",
      question_text: "What is a primary key?",
      options: [
        "First column",
        "Uniquely identifies each row",
        "Foreign reference",
        "Auto-increment",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-m2",
      topic_id: "sql",
      difficulty: "Medium",
      question_text: "What does GROUP BY do?",
      options: [
        "Sorts groups alphabetically",
        "Groups rows with same values for aggregation",
        "Joins multiple tables",
        "Creates a new table",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-m3",
      topic_id: "sql",
      difficulty: "Medium",
      question_text: "Difference between WHERE and HAVING?",
      options: [
        "No difference",
        "WHERE filters rows; HAVING filters groups",
        "HAVING filters rows; WHERE filters groups",
        "Both filter groups",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-m4",
      topic_id: "sql",
      difficulty: "Medium",
      question_text: "What is a subquery?",
      options: [
        "A query within a query",
        "A simple SELECT statement",
        "A stored procedure",
        "An index query",
      ],
      correct_option_index: BigInt(0),
    },
    {
      id: "sq-m5",
      topic_id: "sql",
      difficulty: "Medium",
      question_text: "What does INNER JOIN return?",
      options: [
        "All rows from left table",
        "All rows from both tables",
        "Only matching rows from both tables",
        "Non-matching rows",
      ],
      correct_option_index: BigInt(2),
    },
    {
      id: "sq-m6",
      topic_id: "sql",
      difficulty: "Medium",
      question_text: "What is normalization in databases?",
      options: [
        "Sorting data",
        "Reducing redundancy by organizing tables",
        "Encrypting data",
        "Backing up data",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-m7",
      topic_id: "sql",
      difficulty: "Medium",
      question_text: "What does LIKE operator do?",
      options: [
        "Exact match",
        "Pattern matching with wildcards",
        "Range comparison",
        "NULL check",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-m8",
      topic_id: "sql",
      difficulty: "Medium",
      question_text: "What is a foreign key?",
      options: [
        "Primary key from another table",
        "Key from outside the database",
        "Encrypted key",
        "Auto-generated key",
      ],
      correct_option_index: BigInt(0),
    },
    {
      id: "sq-m9",
      topic_id: "sql",
      difficulty: "Medium",
      question_text: "What is a view in SQL?",
      options: [
        "Temporary table",
        "Virtual table from a query",
        "Backup of table",
        "Index structure",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-m10",
      topic_id: "sql",
      difficulty: "Medium",
      question_text: "What does UNION do?",
      options: [
        "Joins tables horizontally",
        "Combines results of two SELECTs vertically removing duplicates",
        "Creates a new table",
        "Merges columns",
      ],
      correct_option_index: BigInt(1),
    },
    // Hard
    {
      id: "sq-h1",
      topic_id: "sql",
      difficulty: "Hard",
      question_text: "What is a window function in SQL?",
      options: [
        "Popup window query",
        "Function operating over a set of rows related to the current row",
        "Time-based query",
        "Index function",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-h2",
      topic_id: "sql",
      difficulty: "Hard",
      question_text: "What is a CTE (Common Table Expression)?",
      options: [
        "Temporary stored procedure",
        "Named temporary result set with WITH keyword",
        "Cached query result",
        "Cross-table expression",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-h3",
      topic_id: "sql",
      difficulty: "Hard",
      question_text: "What does ACID stand for in transactions?",
      options: [
        "Auto Commit Isolation Durability",
        "Atomicity Consistency Isolation Durability",
        "Async Cached Index Data",
        "Advanced Concurrency In Databases",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-h4",
      topic_id: "sql",
      difficulty: "Hard",
      question_text: "What is query optimization?",
      options: [
        "Writing shorter queries",
        "Process to find most efficient execution plan",
        "Caching query results",
        "Indexing all columns",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-h5",
      topic_id: "sql",
      difficulty: "Hard",
      question_text: "What is a deadlock in databases?",
      options: [
        "Database crash",
        "Two transactions blocking each other indefinitely",
        "Slow query",
        "Memory overflow",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-h6",
      topic_id: "sql",
      difficulty: "Hard",
      question_text: "What does EXPLAIN/EXPLAIN PLAN do?",
      options: [
        "Explains SQL syntax",
        "Shows query execution plan",
        "Lists all tables",
        "Validates SQL",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-h7",
      topic_id: "sql",
      difficulty: "Hard",
      question_text: "What is the difference between TRUNCATE and DELETE?",
      options: [
        "No difference",
        "TRUNCATE removes all rows faster (no WHERE/rollback); DELETE is DML",
        "DELETE is faster",
        "TRUNCATE supports WHERE",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-h8",
      topic_id: "sql",
      difficulty: "Hard",
      question_text: "What is a composite index?",
      options: [
        "Index on computed columns",
        "Index on multiple columns",
        "Unique index",
        "Clustered index",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-h9",
      topic_id: "sql",
      difficulty: "Hard",
      question_text: "What is the difference between OLTP and OLAP?",
      options: [
        "Same concept",
        "OLTP is transactional operations; OLAP is analytical queries on large data",
        "OLAP is faster for inserts",
        "OLTP is for analytics",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "sq-h10",
      topic_id: "sql",
      difficulty: "Hard",
      question_text: "What is database sharding?",
      options: [
        "Encrypting a database",
        "Horizontally partitioning data across multiple servers",
        "Vertically splitting columns",
        "Creating backups",
      ],
      correct_option_index: BigInt(1),
    },
  ],
  dsa: [
    // Easy
    {
      id: "ds-e1",
      topic_id: "dsa",
      difficulty: "Easy",
      question_text: "Time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-e2",
      topic_id: "dsa",
      difficulty: "Easy",
      question_text: "Which data structure uses LIFO?",
      options: ["Queue", "Stack", "Tree", "Graph"],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-e3",
      topic_id: "dsa",
      difficulty: "Easy",
      question_text: "Which data structure uses FIFO?",
      options: ["Stack", "Queue", "Tree", "Heap"],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-e4",
      topic_id: "dsa",
      difficulty: "Easy",
      question_text: "What is a linked list?",
      options: [
        "Array with pointers",
        "Contiguous memory structure",
        "Nodes with data and pointer to next",
        "A type of queue",
      ],
      correct_option_index: BigInt(2),
    },
    {
      id: "ds-e5",
      topic_id: "dsa",
      difficulty: "Easy",
      question_text: "What does O(1) mean?",
      options: ["Linear time", "Constant time", "Log time", "Quadratic time"],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-e6",
      topic_id: "dsa",
      difficulty: "Easy",
      question_text: "Which sorting algorithm is simplest but O(n²)?",
      options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Heap Sort"],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-e7",
      topic_id: "dsa",
      difficulty: "Easy",
      question_text: "What is the root of a binary tree?",
      options: ["Last node", "Top-most node", "Left-most node", "Any leaf"],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-e8",
      topic_id: "dsa",
      difficulty: "Easy",
      question_text: "Fibonacci uses which technique efficiently?",
      options: [
        "Greedy",
        "Divide and Conquer",
        "Dynamic Programming",
        "Backtracking",
      ],
      correct_option_index: BigInt(2),
    },
    {
      id: "ds-e9",
      topic_id: "dsa",
      difficulty: "Easy",
      question_text: "Hash table average search time?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
      correct_option_index: BigInt(2),
    },
    {
      id: "ds-e10",
      topic_id: "dsa",
      difficulty: "Easy",
      question_text: "What is recursion?",
      options: [
        "Loop construct",
        "Function calling itself",
        "Array iteration",
        "Pointer arithmetic",
      ],
      correct_option_index: BigInt(1),
    },
    // Medium
    {
      id: "ds-m1",
      topic_id: "dsa",
      difficulty: "Medium",
      question_text: "Average time complexity of quicksort?",
      options: ["O(n²)", "O(n log n)", "O(log n)", "O(n)"],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-m2",
      topic_id: "dsa",
      difficulty: "Medium",
      question_text: "In a BST, where is the minimum element?",
      options: ["Root", "Left-most node", "Right-most node", "Any leaf"],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-m3",
      topic_id: "dsa",
      difficulty: "Medium",
      question_text: "What is BFS traversal?",
      options: [
        "Depth-first",
        "Level by level traversal",
        "Random traversal",
        "Reverse traversal",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-m4",
      topic_id: "dsa",
      difficulty: "Medium",
      question_text: "What is memoization?",
      options: [
        "Memory allocation",
        "Caching results to avoid recomputation",
        "Recursion limit",
        "Array optimization",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-m5",
      topic_id: "dsa",
      difficulty: "Medium",
      question_text: "Which algorithm finds shortest path in unweighted graph?",
      options: ["DFS", "BFS", "Dijkstra", "Bellman-Ford"],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-m6",
      topic_id: "dsa",
      difficulty: "Medium",
      question_text: "What is a min-heap?",
      options: [
        "All children >= parent",
        "All children <= parent",
        "Sorted array",
        "Balanced tree",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-m7",
      topic_id: "dsa",
      difficulty: "Medium",
      question_text: "Merge sort time complexity?",
      options: ["O(n²)", "O(n log n)", "O(log n)", "O(n)"],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-m8",
      topic_id: "dsa",
      difficulty: "Medium",
      question_text: "What is topological sort used for?",
      options: [
        "Sorting numbers",
        "Ordering dependent tasks in a DAG",
        "Sorting strings",
        "Graph coloring",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-m9",
      topic_id: "dsa",
      difficulty: "Medium",
      question_text: "What is a circular linked list?",
      options: [
        "Doubly linked list",
        "Last node points back to first node",
        "Array-based list",
        "Sorted linked list",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-m10",
      topic_id: "dsa",
      difficulty: "Medium",
      question_text: "What does Kadane's algorithm solve?",
      options: [
        "Shortest path",
        "Maximum subarray sum",
        "Minimum spanning tree",
        "Fibonacci",
      ],
      correct_option_index: BigInt(1),
    },
    // Hard
    {
      id: "ds-h1",
      topic_id: "dsa",
      difficulty: "Hard",
      question_text: "Dijkstra's algorithm time complexity with min-heap?",
      options: ["O(V²)", "O((V+E) log V)", "O(V log E)", "O(E²)"],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-h2",
      topic_id: "dsa",
      difficulty: "Hard",
      question_text: "What is a Red-Black Tree?",
      options: [
        "AVL tree",
        "Self-balancing BST with color properties",
        "Hash tree",
        "Segment tree",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-h3",
      topic_id: "dsa",
      difficulty: "Hard",
      question_text: "What is the NP-hard class?",
      options: [
        "Problems solvable in polynomial time",
        "Problems at least as hard as NP-complete problems",
        "Easy problems",
        "Undecidable problems",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-h4",
      topic_id: "dsa",
      difficulty: "Hard",
      question_text: "What does Floyd-Warshall algorithm compute?",
      options: [
        "Minimum spanning tree",
        "All-pairs shortest paths",
        "Single source shortest path",
        "Topological sort",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-h5",
      topic_id: "dsa",
      difficulty: "Hard",
      question_text: "What is amortized analysis?",
      options: [
        "Worst-case analysis",
        "Average cost per operation over a sequence",
        "Best-case analysis",
        "Memory analysis",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-h6",
      topic_id: "dsa",
      difficulty: "Hard",
      question_text: "What is a Trie data structure?",
      options: [
        "Balanced BST",
        "Tree for string prefix lookups",
        "Hash table",
        "Priority queue",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-h7",
      topic_id: "dsa",
      difficulty: "Hard",
      question_text: "What does Union-Find (Disjoint Set Union) solve?",
      options: [
        "Sorting",
        "Graph connectivity and cycle detection",
        "Shortest path",
        "String matching",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-h8",
      topic_id: "dsa",
      difficulty: "Hard",
      question_text: "What is the best sorting algorithm for linked lists?",
      options: ["Quicksort", "Heapsort", "Merge Sort", "Counting Sort"],
      correct_option_index: BigInt(2),
    },
    {
      id: "ds-h9",
      topic_id: "dsa",
      difficulty: "Hard",
      question_text: "Time complexity of building a heap?",
      options: ["O(n log n)", "O(n)", "O(log n)", "O(n²)"],
      correct_option_index: BigInt(1),
    },
    {
      id: "ds-h10",
      topic_id: "dsa",
      difficulty: "Hard",
      question_text: "What is the Longest Common Subsequence (LCS) complexity?",
      options: ["O(n)", "O(n log n)", "O(m*n)", "O(2^n)"],
      correct_option_index: BigInt(2),
    },
  ],
  frontend: [
    // Easy
    {
      id: "fe-e1",
      topic_id: "frontend",
      difficulty: "Easy",
      question_text: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "High Transfer Meta Language",
        "HyperTool Markup Logic",
        "HyperText Machine Language",
      ],
      correct_option_index: BigInt(0),
    },
    {
      id: "fe-e2",
      topic_id: "frontend",
      difficulty: "Easy",
      question_text: "Which HTML tag is used for the largest heading?",
      options: ["<h6>", "<h3>", "<h1>", "<head>"],
      correct_option_index: BigInt(2),
    },
    {
      id: "fe-e3",
      topic_id: "frontend",
      difficulty: "Easy",
      question_text: "CSS property to change text color?",
      options: ["font-color", "text-color", "color", "foreground"],
      correct_option_index: BigInt(2),
    },
    {
      id: "fe-e4",
      topic_id: "frontend",
      difficulty: "Easy",
      question_text: "What does DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Manager",
        "Display Object Method",
        "Document Order Map",
      ],
      correct_option_index: BigInt(0),
    },
    {
      id: "fe-e5",
      topic_id: "frontend",
      difficulty: "Easy",
      question_text: "JavaScript is a _____ language.",
      options: [
        "Compiled",
        "Interpreted/JIT-compiled",
        "Assembly",
        "Machine-level",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-e6",
      topic_id: "frontend",
      difficulty: "Easy",
      question_text: "Which CSS property controls spacing between elements?",
      options: ["padding", "margin", "border", "spacing"],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-e7",
      topic_id: "frontend",
      difficulty: "Easy",
      question_text: "What is the correct JavaScript to change text?",
      options: [
        "document.getText()",
        "document.getElementById('id').innerHTML",
        "document.changeText()",
        "element.value()",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-e8",
      topic_id: "frontend",
      difficulty: "Easy",
      question_text: "What does flexbox primarily control?",
      options: [
        "Grid layout",
        "One-dimensional layout",
        "Animations",
        "Typography",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-e9",
      topic_id: "frontend",
      difficulty: "Easy",
      question_text: "Which HTML attribute links CSS?",
      options: ["<script>", "<style>", "<link rel='stylesheet'>", "<css>"],
      correct_option_index: BigInt(2),
    },
    {
      id: "fe-e10",
      topic_id: "frontend",
      difficulty: "Easy",
      question_text: "What is JSON?",
      options: [
        "Java Script Object Notation",
        "Just Some Object Names",
        "JavaScript Organized Notation",
        "JSON Source Object Notation",
      ],
      correct_option_index: BigInt(0),
    },
    // Medium
    {
      id: "fe-m1",
      topic_id: "frontend",
      difficulty: "Medium",
      question_text: "What is the virtual DOM in React?",
      options: [
        "Real DOM copy",
        "Lightweight in-memory DOM copy for efficient updates",
        "Server-side DOM",
        "CSS model",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-m2",
      topic_id: "frontend",
      difficulty: "Medium",
      question_text: "What is event bubbling?",
      options: [
        "Event stops at target element",
        "Event propagates from child to parent",
        "Event from parent to child",
        "Event cancellation",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-m3",
      topic_id: "frontend",
      difficulty: "Medium",
      question_text: "What is the box model in CSS?",
      options: [
        "Model for input boxes",
        "Content + padding + border + margin",
        "Flexbox model",
        "Grid model",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-m4",
      topic_id: "frontend",
      difficulty: "Medium",
      question_text: "What is a closure in JavaScript?",
      options: [
        "Closed bracket",
        "Function remembering its outer scope variables",
        "Private class",
        "Module pattern",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-m5",
      topic_id: "frontend",
      difficulty: "Medium",
      question_text: "What does async/await do in JavaScript?",
      options: [
        "Runs code synchronously",
        "Simplifies Promise-based asynchronous code",
        "Blocks execution",
        "Creates threads",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-m6",
      topic_id: "frontend",
      difficulty: "Medium",
      question_text: "What is the purpose of useState in React?",
      options: [
        "Define CSS",
        "Manage component state",
        "Fetch data",
        "Create routes",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-m7",
      topic_id: "frontend",
      difficulty: "Medium",
      question_text: "What is CSS specificity?",
      options: [
        "Order of CSS rules",
        "How browsers determine which CSS rule applies",
        "Color rendering",
        "Font priority",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-m8",
      topic_id: "frontend",
      difficulty: "Medium",
      question_text: "What is localStorage?",
      options: [
        "Server storage",
        "Browser-based key-value storage persisting after tab close",
        "Temporary session storage",
        "Cookie storage",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-m9",
      topic_id: "frontend",
      difficulty: "Medium",
      question_text: "What is the purpose of useEffect in React?",
      options: [
        "State management",
        "Handling side effects like data fetching",
        "Routing",
        "Styling",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-m10",
      topic_id: "frontend",
      difficulty: "Medium",
      question_text: "What is RESTful API?",
      options: [
        "Real-time API",
        "Architectural style using HTTP methods for web services",
        "Database query language",
        "CSS framework",
      ],
      correct_option_index: BigInt(1),
    },
    // Hard
    {
      id: "fe-h1",
      topic_id: "frontend",
      difficulty: "Hard",
      question_text: "What is code splitting in React?",
      options: [
        "Breaking CSS into files",
        "Lazy loading JavaScript bundles to improve performance",
        "Splitting components into files",
        "Breaking API calls",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-h2",
      topic_id: "frontend",
      difficulty: "Hard",
      question_text: "What is the difference between SSR and CSR?",
      options: [
        "No difference",
        "SSR renders on server; CSR renders in browser",
        "CSR renders on server; SSR in browser",
        "Both render on server",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-h3",
      topic_id: "frontend",
      difficulty: "Hard",
      question_text: "What is memoization in React?",
      options: [
        "Saving to memory",
        "React.memo/useMemo skip re-renders if props unchanged",
        "Caching API calls",
        "Local storage optimization",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-h4",
      topic_id: "frontend",
      difficulty: "Hard",
      question_text: "What is the purpose of Web Workers?",
      options: [
        "Manage CSS workers",
        "Run scripts in background threads",
        "Handle network requests",
        "Manage DOM updates",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-h5",
      topic_id: "frontend",
      difficulty: "Hard",
      question_text: "What is Content Security Policy (CSP)?",
      options: [
        "CSS naming policy",
        "HTTP header preventing XSS by restricting resource origins",
        "Cookie policy",
        "CORS policy",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-h6",
      topic_id: "frontend",
      difficulty: "Hard",
      question_text: "What is tree shaking in bundlers?",
      options: [
        "Removing CSS",
        "Removing unused JavaScript code from bundle",
        "Splitting components",
        "Compressing images",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-h7",
      topic_id: "frontend",
      difficulty: "Hard",
      question_text: "What is the Render Props pattern in React?",
      options: [
        "Rendering HTML strings",
        "Sharing state logic by passing a render function as a prop",
        "Conditional rendering",
        "Server-side rendering",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-h8",
      topic_id: "frontend",
      difficulty: "Hard",
      question_text: "What is CORS?",
      options: [
        "CSS framework",
        "Security mechanism controlling cross-origin resource sharing",
        "HTML attribute",
        "JavaScript API",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-h9",
      topic_id: "frontend",
      difficulty: "Hard",
      question_text: "What is the Critical Rendering Path?",
      options: [
        "Main component tree",
        "Sequence of steps browser takes to render initial page",
        "API call sequence",
        "CSS priority system",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "fe-h10",
      topic_id: "frontend",
      difficulty: "Hard",
      question_text: "What is Hydration in React?",
      options: [
        "Refreshing the page",
        "Attaching React event handlers to server-rendered HTML",
        "Loading data",
        "CSS animation",
      ],
      correct_option_index: BigInt(1),
    },
  ],
  c: [
    // Easy
    {
      id: "c-e1",
      topic_id: "c",
      difficulty: "Easy",
      question_text: "Header file for printf in C?",
      options: ["<stdlib.h>", "<stdio.h>", "<string.h>", "<math.h>"],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-e2",
      topic_id: "c",
      difficulty: "Easy",
      question_text: "Which is used to declare a pointer in C?",
      options: ["&", "*", "->", "#"],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-e3",
      topic_id: "c",
      difficulty: "Easy",
      question_text: "What is the size of int in C (typically)?",
      options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
      correct_option_index: BigInt(2),
    },
    {
      id: "c-e4",
      topic_id: "c",
      difficulty: "Easy",
      question_text: "Which operator gives address of a variable?",
      options: ["*", "&", "->", "."],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-e5",
      topic_id: "c",
      difficulty: "Easy",
      question_text: "What does '\n' represent in C?",
      options: ["Tab", "Null", "Newline", "Backslash"],
      correct_option_index: BigInt(2),
    },
    {
      id: "c-e6",
      topic_id: "c",
      difficulty: "Easy",
      question_text: "C string ends with which character?",
      options: ["'\\n'", "'\\t'", "'\\0'", "'.'"],
      correct_option_index: BigInt(2),
    },
    {
      id: "c-e7",
      topic_id: "c",
      difficulty: "Easy",
      question_text: "Which loop checks condition after executing body?",
      options: ["for", "while", "do-while", "foreach"],
      correct_option_index: BigInt(2),
    },
    {
      id: "c-e8",
      topic_id: "c",
      difficulty: "Easy",
      question_text: "Which function allocates memory in C?",
      options: ["alloc()", "malloc()", "new()", "create()"],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-e9",
      topic_id: "c",
      difficulty: "Easy",
      question_text: "Format specifier for integer in printf?",
      options: ["%f", "%c", "%d", "%s"],
      correct_option_index: BigInt(2),
    },
    {
      id: "c-e10",
      topic_id: "c",
      difficulty: "Easy",
      question_text: "What is a struct in C?",
      options: [
        "A function",
        "User-defined data type grouping variables",
        "A pointer",
        "A library",
      ],
      correct_option_index: BigInt(1),
    },
    // Medium
    {
      id: "c-m1",
      topic_id: "c",
      difficulty: "Medium",
      question_text: "What is a dangling pointer?",
      options: [
        "NULL pointer",
        "Pointer to freed memory",
        "Pointer to array",
        "Wild pointer",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-m2",
      topic_id: "c",
      difficulty: "Medium",
      question_text: "Difference between calloc() and malloc()?",
      options: [
        "No difference",
        "calloc initializes to 0 and takes count+size; malloc does not init",
        "malloc is faster always",
        "calloc is for arrays only",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-m3",
      topic_id: "c",
      difficulty: "Medium",
      question_text: "What is a function pointer?",
      options: [
        "Pointer to array",
        "Pointer that holds address of a function",
        "Return value pointer",
        "Struct pointer",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-m4",
      topic_id: "c",
      difficulty: "Medium",
      question_text: "What is the use of typedef?",
      options: [
        "Type casting",
        "Creating alias for data types",
        "Memory allocation",
        "Function declaration",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-m5",
      topic_id: "c",
      difficulty: "Medium",
      question_text: "What is a segmentation fault?",
      options: [
        "Syntax error",
        "Illegal memory access",
        "Infinite loop",
        "Stack overflow",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-m6",
      topic_id: "c",
      difficulty: "Medium",
      question_text: "What is a union in C?",
      options: [
        "Multiple structs",
        "User type where members share memory",
        "Multiple pointers",
        "Linked structures",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-m7",
      topic_id: "c",
      difficulty: "Medium",
      question_text: "What is the scope of a local variable?",
      options: [
        "Entire program",
        "Within its enclosing block/function",
        "Entire file",
        "All files",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-m8",
      topic_id: "c",
      difficulty: "Medium",
      question_text: "What does the static keyword do for a local variable?",
      options: [
        "Makes it global",
        "Preserves value between function calls",
        "Makes it constant",
        "Allocates on heap",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-m9",
      topic_id: "c",
      difficulty: "Medium",
      question_text: "Difference between array name and pointer?",
      options: [
        "No difference",
        "Array name is const pointer to first element; pointer is variable",
        "Pointer cannot be used as array",
        "Arrays cannot decay to pointers",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-m10",
      topic_id: "c",
      difficulty: "Medium",
      question_text: "What is the use of #define?",
      options: [
        "Variable declaration",
        "Macro/constant substitution at compile time",
        "Function definition",
        "Loop control",
      ],
      correct_option_index: BigInt(1),
    },
    // Hard
    {
      id: "c-h1",
      topic_id: "c",
      difficulty: "Hard",
      question_text: "What is memory padding in structs?",
      options: [
        "Adding extra fields",
        "Compiler adds bytes for alignment",
        "NULL initialization",
        "Pointer alignment",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-h2",
      topic_id: "c",
      difficulty: "Hard",
      question_text: "What is volatile in C?",
      options: [
        "Constant variable",
        "Tells compiler value may change externally; don't optimize",
        "Dynamic memory",
        "Thread variable",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-h3",
      topic_id: "c",
      difficulty: "Hard",
      question_text: "What is a memory leak?",
      options: [
        "Stack overflow",
        "Allocated memory never freed",
        "Array overflow",
        "Null pointer",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-h4",
      topic_id: "c",
      difficulty: "Hard",
      question_text: "What does realloc() do?",
      options: [
        "Reallocates new memory",
        "Resizes previously allocated memory",
        "Re-initializes memory",
        "Releases memory",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-h5",
      topic_id: "c",
      difficulty: "Hard",
      question_text: "What is endianness?",
      options: [
        "Byte order in memory",
        "Bit packing",
        "Pointer direction",
        "Data alignment",
      ],
      correct_option_index: BigInt(0),
    },
    {
      id: "c-h6",
      topic_id: "c",
      difficulty: "Hard",
      question_text: "What is an inline function?",
      options: [
        "Recursive function",
        "Hint to compiler to substitute function body at call site",
        "Anonymous function",
        "Static function",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-h7",
      topic_id: "c",
      difficulty: "Hard",
      question_text: "What is the difference between stack and heap?",
      options: [
        "No difference",
        "Stack: automatic, fast, limited; Heap: manual, flexible, larger",
        "Stack is larger",
        "Heap is automatic",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-h8",
      topic_id: "c",
      difficulty: "Hard",
      question_text: "What is a bit field in C?",
      options: [
        "Array of bits",
        "Struct member with specified number of bits",
        "Bitwise operation result",
        "Binary pointer",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-h9",
      topic_id: "c",
      difficulty: "Hard",
      question_text: "What is the restrict keyword?",
      options: [
        "Limits loop iterations",
        "Tells compiler pointer is the only way to access that memory",
        "Prevents modification",
        "Locks memory",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "c-h10",
      topic_id: "c",
      difficulty: "Hard",
      question_text: "What is tail call optimization?",
      options: [
        "Loop unrolling",
        "Compiler optimizes tail recursion into iteration",
        "Inline expansion",
        "Register allocation",
      ],
      correct_option_index: BigInt(1),
    },
  ],
  patterns: [
    // Easy
    {
      id: "pt-e1",
      topic_id: "patterns",
      difficulty: "Easy",
      question_text: "How many loops are needed to print a triangle of stars?",
      options: ["1", "2", "3", "4"],
      correct_option_index: BigInt(1),
    },
    {
      id: "pt-e2",
      topic_id: "patterns",
      difficulty: "Easy",
      question_text: "For a 5-row right triangle, row 3 has how many stars?",
      options: ["1", "2", "3", "4"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-e3",
      topic_id: "patterns",
      difficulty: "Easy",
      question_text: "Which loop is most natural for row-column patterns?",
      options: ["while", "do-while", "nested for", "recursion"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-e4",
      topic_id: "patterns",
      difficulty: "Easy",
      question_text:
        "For an inverted triangle with n=4, how many stars on row 1?",
      options: ["1", "2", "4", "3"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-e5",
      topic_id: "patterns",
      difficulty: "Easy",
      question_text: "How do you print 'A' in Java using charCode?",
      options: ["char(65)", "(char)65", "String(65)", "char[65]"],
      correct_option_index: BigInt(1),
    },
    {
      id: "pt-e6",
      topic_id: "patterns",
      difficulty: "Easy",
      question_text: "What prints a number triangle row by row from 1?",
      options: [
        "Single for loop",
        "Outer for (rows) + inner for (cols 1 to i)",
        "While loop only",
        "Recursion",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "pt-e7",
      topic_id: "patterns",
      difficulty: "Easy",
      question_text:
        "In a square pattern of stars (n=4), how many total stars?",
      options: ["8", "12", "16", "4"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-e8",
      topic_id: "patterns",
      difficulty: "Easy",
      question_text: "What is the row count for a right triangle with n=5?",
      options: ["3", "4", "5", "6"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-e9",
      topic_id: "patterns",
      difficulty: "Easy",
      question_text: "Which character is typically used in star patterns?",
      options: ["#", "@", "*", "+"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-e10",
      topic_id: "patterns",
      difficulty: "Easy",
      question_text: "For 'Same number rows' pattern row 3 prints?",
      options: ["123", "333", "111", "3"],
      correct_option_index: BigInt(1),
    },
    // Medium
    {
      id: "pt-m1",
      topic_id: "patterns",
      difficulty: "Medium",
      question_text: "For a centered pyramid of n=5, how many spaces on row 1?",
      options: ["5", "4", "3", "2"],
      correct_option_index: BigInt(1),
    },
    {
      id: "pt-m2",
      topic_id: "patterns",
      difficulty: "Medium",
      question_text: "A diamond pattern for n=4 has how many rows total?",
      options: ["4", "6", "7", "8"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-m3",
      topic_id: "patterns",
      difficulty: "Medium",
      question_text: "Pascal's Triangle row 3 (0-indexed) contains?",
      options: ["1 2 1", "1 3 3 1", "1 1 1", "1 4 6 4 1"],
      correct_option_index: BigInt(1),
    },
    {
      id: "pt-m4",
      topic_id: "patterns",
      difficulty: "Medium",
      question_text: "Hollow square pattern: which rows/cols print stars?",
      options: [
        "Only first row",
        "All rows",
        "Border (first/last row and col)",
        "Middle only",
      ],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-m5",
      topic_id: "patterns",
      difficulty: "Medium",
      question_text:
        "Zigzag pattern requires knowing which mathematical concept?",
      options: [
        "Fibonacci",
        "Modulo arithmetic",
        "Prime numbers",
        "Logarithms",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "pt-m6",
      topic_id: "patterns",
      difficulty: "Medium",
      question_text: "Floyd's Triangle: what is the 4th row?",
      options: ["1 2 3", "4 5 6 7", "7 8 9 10", "10 11 12 13"],
      correct_option_index: BigInt(1),
    },
    {
      id: "pt-m7",
      topic_id: "patterns",
      difficulty: "Medium",
      question_text:
        "How many stars are on the widest row of a diamond pattern (n=4)?",
      options: ["4", "5", "7", "9"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-m8",
      topic_id: "patterns",
      difficulty: "Medium",
      question_text: "What is the sum of a row in Pascal's triangle row n?",
      options: ["n", "n²", "2^n", "n!"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-m9",
      topic_id: "patterns",
      difficulty: "Medium",
      question_text: "Centered pyramid row i has how many stars?",
      options: ["i", "2i", "2i-1", "i+1"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-m10",
      topic_id: "patterns",
      difficulty: "Medium",
      question_text: "Total elements in Floyd's Triangle with n=4?",
      options: ["4", "8", "10", "16"],
      correct_option_index: BigInt(2),
    },
    // Hard
    {
      id: "pt-h1",
      topic_id: "patterns",
      difficulty: "Hard",
      question_text: "Spiral matrix of n=3: what is the center value?",
      options: ["4", "5", "9", "6"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-h2",
      topic_id: "patterns",
      difficulty: "Hard",
      question_text: "How many boundaries track the spiral matrix filling?",
      options: ["2", "3", "4", "5"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-h3",
      topic_id: "patterns",
      difficulty: "Hard",
      question_text:
        "Butterfly pattern for n=4: the widest row has how many characters?",
      options: ["8", "7", "9", "6"],
      correct_option_index: BigInt(0),
    },
    {
      id: "pt-h4",
      topic_id: "patterns",
      difficulty: "Hard",
      question_text: "In a number butterfly, which row is the mirror line?",
      options: ["First row", "Last row", "Middle row (row n)", "Row n/2"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-h5",
      topic_id: "patterns",
      difficulty: "Hard",
      question_text: "Pascal's triangle nCr formula?",
      options: ["n!/(r!)", "n!/(r!(n-r)!)", "n*(n-1)/2", "(n+r)!"],
      correct_option_index: BigInt(1),
    },
    {
      id: "pt-h6",
      topic_id: "patterns",
      difficulty: "Hard",
      question_text: "Time complexity of generating an n×n spiral matrix?",
      options: ["O(log n)", "O(n)", "O(n²)", "O(n³)"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-h7",
      topic_id: "patterns",
      difficulty: "Hard",
      question_text: "What technique efficiently generates Pascal's triangle?",
      options: [
        "Binary search",
        "Dynamic Programming (each element = sum of two above)",
        "Recursion only",
        "Bitwise operations",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "pt-h8",
      topic_id: "patterns",
      difficulty: "Hard",
      question_text: "For a 3D hollow cube, how many faces does it have?",
      options: ["4", "5", "6", "8"],
      correct_option_index: BigInt(2),
    },
    {
      id: "pt-h9",
      topic_id: "patterns",
      difficulty: "Hard",
      question_text: "Zigzag conversion: what is the key algorithm insight?",
      options: [
        "Sorting",
        "Multiple rows filled diagonally like a wave",
        "Recursive splitting",
        "BFS traversal",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "pt-h10",
      topic_id: "patterns",
      difficulty: "Hard",
      question_text:
        "Number of total elements in Pascal's triangle up to row n?",
      options: ["n", "n²", "n(n+1)/2", "2^n"],
      correct_option_index: BigInt(2),
    },
  ],
  aptitude: [
    // Easy
    {
      id: "aq-e1",
      topic_id: "aptitude",
      difficulty: "Easy",
      question_text: "Simple Interest formula?",
      options: ["P*R*T/100", "P*(1+R/100)^T", "P*R/T", "T*R/P"],
      correct_option_index: BigInt(0),
    },
    {
      id: "aq-e2",
      topic_id: "aptitude",
      difficulty: "Easy",
      question_text: "HCF of 12 and 18?",
      options: ["3", "4", "6", "9"],
      correct_option_index: BigInt(2),
    },
    {
      id: "aq-e3",
      topic_id: "aptitude",
      difficulty: "Easy",
      question_text: "LCM of 4 and 6?",
      options: ["8", "12", "24", "6"],
      correct_option_index: BigInt(1),
    },
    {
      id: "aq-e4",
      topic_id: "aptitude",
      difficulty: "Easy",
      question_text: "Is 29 prime?",
      options: ["Yes", "No", "Depends", "It is composite"],
      correct_option_index: BigInt(0),
    },
    {
      id: "aq-e5",
      topic_id: "aptitude",
      difficulty: "Easy",
      question_text: "Sum of first 10 natural numbers?",
      options: ["45", "50", "55", "60"],
      correct_option_index: BigInt(2),
    },
    {
      id: "aq-e6",
      topic_id: "aptitude",
      difficulty: "Easy",
      question_text: "Speed = Distance / ___?",
      options: ["Acceleration", "Time", "Mass", "Force"],
      correct_option_index: BigInt(1),
    },
    {
      id: "aq-e7",
      topic_id: "aptitude",
      difficulty: "Easy",
      question_text: "What is 15% of 200?",
      options: ["25", "30", "20", "35"],
      correct_option_index: BigInt(1),
    },
    {
      id: "aq-e8",
      topic_id: "aptitude",
      difficulty: "Easy",
      question_text: "Digit sum of 945?",
      options: ["16", "17", "18", "19"],
      correct_option_index: BigInt(2),
    },
    {
      id: "aq-e9",
      topic_id: "aptitude",
      difficulty: "Easy",
      question_text: "A train runs 60 km/h for 2 hours. Distance?",
      options: ["100 km", "110 km", "120 km", "130 km"],
      correct_option_index: BigInt(2),
    },
    {
      id: "aq-e10",
      topic_id: "aptitude",
      difficulty: "Easy",
      question_text: "5! (5 factorial) = ?",
      options: ["60", "100", "120", "24"],
      correct_option_index: BigInt(2),
    },
    // Medium
    {
      id: "aq-m1",
      topic_id: "aptitude",
      difficulty: "Medium",
      question_text: "CI formula for principal P, rate R, time T?",
      options: [
        "P*R*T/100",
        "P*(1+R/100)^T - P",
        "P*(1+R*T)",
        "P/((1+R/100)^T)",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aq-m2",
      topic_id: "aptitude",
      difficulty: "Medium",
      question_text: "Cost Price 500, Selling Price 600. Profit %?",
      options: ["10%", "15%", "20%", "25%"],
      correct_option_index: BigInt(2),
    },
    {
      id: "aq-m3",
      topic_id: "aptitude",
      difficulty: "Medium",
      question_text: "Pipes A fills in 10h, B in 15h. Together?",
      options: ["4h", "5h", "6h", "8h"],
      correct_option_index: BigInt(2),
    },
    {
      id: "aq-m4",
      topic_id: "aptitude",
      difficulty: "Medium",
      question_text: "nP2 = n*(n-1). What is 5P2?",
      options: ["10", "15", "20", "25"],
      correct_option_index: BigInt(2),
    },
    {
      id: "aq-m5",
      topic_id: "aptitude",
      difficulty: "Medium",
      question_text: "5C2 (combinations) = ?",
      options: ["5", "8", "10", "12"],
      correct_option_index: BigInt(2),
    },
    {
      id: "aq-m6",
      topic_id: "aptitude",
      difficulty: "Medium",
      question_text: "Average of 3,7,9,11,20 = ?",
      options: ["8", "9", "10", "12"],
      correct_option_index: BigInt(2),
    },
    {
      id: "aq-m7",
      topic_id: "aptitude",
      difficulty: "Medium",
      question_text: "Ratio A:B = 3:5. If total is 40, B = ?",
      options: ["15", "20", "25", "30"],
      correct_option_index: BigInt(2),
    },
    {
      id: "aq-m8",
      topic_id: "aptitude",
      difficulty: "Medium",
      question_text: "A man covers 20km at 4km/h and 30km at 6km/h. Avg speed?",
      options: ["4 km/h", "5 km/h", "6 km/h", "4.5 km/h"],
      correct_option_index: BigInt(1),
    },
    {
      id: "aq-m9",
      topic_id: "aptitude",
      difficulty: "Medium",
      question_text: "Dice probability of getting a 6?",
      options: ["1/3", "1/4", "1/6", "1/2"],
      correct_option_index: BigInt(2),
    },
    {
      id: "aq-m10",
      topic_id: "aptitude",
      difficulty: "Medium",
      question_text: "If 2x + 3 = 11, x = ?",
      options: ["3", "4", "5", "6"],
      correct_option_index: BigInt(1),
    },
    // Hard
    {
      id: "aq-h1",
      topic_id: "aptitude",
      difficulty: "Hard",
      question_text:
        "Two trains 150m and 100m, speeds 60 and 40 km/h same direction. Time to pass?",
      options: ["36s", "45s", "54s", "60s"],
      correct_option_index: BigInt(0),
    },
    {
      id: "aq-h2",
      topic_id: "aptitude",
      difficulty: "Hard",
      question_text: "Tank fill: A=6h, B=9h, C drain=12h. Time to fill?",
      options: ["6.5h", "7.2h", "8h", "9h"],
      correct_option_index: BigInt(1),
    },
    {
      id: "aq-h3",
      topic_id: "aptitude",
      difficulty: "Hard",
      question_text:
        "Age ratio A:B = 3:5. After 10 years, ratio = 5:7. A's age now?",
      options: ["10", "12", "15", "18"],
      correct_option_index: BigInt(2),
    },
    {
      id: "aq-h4",
      topic_id: "aptitude",
      difficulty: "Hard",
      question_text: "Sum of 1+2+3+...+100 = ?",
      options: ["4950", "5000", "5050", "5100"],
      correct_option_index: BigInt(2),
    },
    {
      id: "aq-h5",
      topic_id: "aptitude",
      difficulty: "Hard",
      question_text: "Probability of 2 heads in 3 fair coin tosses?",
      options: ["1/4", "3/8", "1/2", "1/8"],
      correct_option_index: BigInt(1),
    },
    {
      id: "aq-h6",
      topic_id: "aptitude",
      difficulty: "Hard",
      question_text:
        "A merchant marks 40% above CP, gives 20% discount. Profit %?",
      options: ["8%", "10%", "12%", "16%"],
      correct_option_index: BigInt(2),
    },
    {
      id: "aq-h7",
      topic_id: "aptitude",
      difficulty: "Hard",
      question_text:
        "10 people, each shakes hands with every other once. Total handshakes?",
      options: ["40", "45", "50", "90"],
      correct_option_index: BigInt(1),
    },
    {
      id: "aq-h8",
      topic_id: "aptitude",
      difficulty: "Hard",
      question_text:
        "A and B can complete work in 12 and 18 days. Working together then A leaves. B finishes in 6 more days. How many days did A work?",
      options: ["4", "6", "8", "9"],
      correct_option_index: BigInt(1),
    },
    {
      id: "aq-h9",
      topic_id: "aptitude",
      difficulty: "Hard",
      question_text: "Arithmetic series sum formula: S = ?",
      options: ["n/2 * (a+l)", "n*(a+l)", "n/2 * a * l", "n * a"],
      correct_option_index: BigInt(0),
    },
    {
      id: "aq-h10",
      topic_id: "aptitude",
      difficulty: "Hard",
      question_text: "Geometric series sum (finite, ratio r≠1): S = ?",
      options: ["a*(r^n-1)/(r-1)", "a*r^n", "a/(1-r)", "n*a*r"],
      correct_option_index: BigInt(0),
    },
  ],
  advjava: [
    // Easy
    {
      id: "aj-e1",
      topic_id: "advjava",
      difficulty: "Easy",
      question_text: "Which Java version introduced lambdas?",
      options: ["Java 7", "Java 8", "Java 9", "Java 11"],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-e2",
      topic_id: "advjava",
      difficulty: "Easy",
      question_text: "What is a Stream in Java 8?",
      options: [
        "InputStream",
        "Sequence of elements for processing",
        "Network stream",
        "File stream",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-e3",
      topic_id: "advjava",
      difficulty: "Easy",
      question_text:
        "Which functional interface takes no input and returns value?",
      options: ["Consumer", "Supplier", "Function", "Predicate"],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-e4",
      topic_id: "advjava",
      difficulty: "Easy",
      question_text: "What does Optional.empty() return?",
      options: ["null", "Empty Optional", "0", "Exception"],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-e5",
      topic_id: "advjava",
      difficulty: "Easy",
      question_text: "Syntax for a method reference (static method)?",
      options: [
        "Class#method",
        "Class::method",
        "Class.method()",
        "method@Class",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-e6",
      topic_id: "advjava",
      difficulty: "Easy",
      question_text: "Which annotation marks a functional interface?",
      options: ["@Override", "@FunctionalInterface", "@Lambda", "@Interface"],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-e7",
      topic_id: "advjava",
      difficulty: "Easy",
      question_text: "stream().filter() returns?",
      options: ["void", "Stream with filtered elements", "boolean", "List"],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-e8",
      topic_id: "advjava",
      difficulty: "Easy",
      question_text: "What does Predicate<T> test?",
      options: [
        "Returns T",
        "Boolean condition on T",
        "Transforms T",
        "Consumes T",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-e9",
      topic_id: "advjava",
      difficulty: "Easy",
      question_text: "How do you collect a Stream to a List?",
      options: [
        "stream.toList()",
        "stream.collect(Collectors.toList())",
        "stream.asList()",
        "List.from(stream)",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-e10",
      topic_id: "advjava",
      difficulty: "Easy",
      question_text: "What is a default method in an interface?",
      options: [
        "Abstract method",
        "Method with implementation in interface",
        "Static method",
        "Private method",
      ],
      correct_option_index: BigInt(1),
    },
    // Medium
    {
      id: "aj-m1",
      topic_id: "advjava",
      difficulty: "Medium",
      question_text: "What does flatMap() do in streams?",
      options: [
        "Filters elements",
        "Flattens nested streams into one",
        "Maps and groups",
        "Sorts elements",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-m2",
      topic_id: "advjava",
      difficulty: "Medium",
      question_text: "What is CompletableFuture?",
      options: [
        "Thread pool",
        "Non-blocking asynchronous computation",
        "Blocking queue",
        "Callable wrapper",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-m3",
      topic_id: "advjava",
      difficulty: "Medium",
      question_text: "What does synchronized keyword guarantee?",
      options: [
        "Performance boost",
        "Only one thread executes block at a time",
        "Thread creation",
        "Immutability",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-m4",
      topic_id: "advjava",
      difficulty: "Medium",
      question_text: "What is Collectors.groupingBy()?",
      options: [
        "Sorts a stream",
        "Groups stream elements by classifier function",
        "Filters groups",
        "Counts elements",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-m5",
      topic_id: "advjava",
      difficulty: "Medium",
      question_text: "What is a generic type in Java?",
      options: [
        "Dynamic typing",
        "Type parameter for class/method for type safety",
        "Any-type cast",
        "Object subtype",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-m6",
      topic_id: "advjava",
      difficulty: "Medium",
      question_text: "What is the Builder design pattern?",
      options: [
        "Builds objects step by step with a builder object",
        "Creates copies of objects",
        "Manages object pools",
        "Wraps objects",
      ],
      correct_option_index: BigInt(0),
    },
    {
      id: "aj-m7",
      topic_id: "advjava",
      difficulty: "Medium",
      question_text: "What does ExecutorService do?",
      options: [
        "Manages memory",
        "Manages thread pool and task execution",
        "Handles exceptions",
        "Manages I/O",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-m8",
      topic_id: "advjava",
      difficulty: "Medium",
      question_text: "What is the Singleton design pattern?",
      options: [
        "One method per class",
        "Ensures only one instance of class",
        "Single thread pattern",
        "One module pattern",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-m9",
      topic_id: "advjava",
      difficulty: "Medium",
      question_text: "Difference between map() and flatMap() in streams?",
      options: [
        "Same",
        "map wraps in stream; flatMap flattens",
        "flatMap transforms; map flattens",
        "No practical difference",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-m10",
      topic_id: "advjava",
      difficulty: "Medium",
      question_text: "What is a ReentrantLock?",
      options: [
        "One-time lock",
        "Lock a thread can acquire multiple times without deadlock",
        "Database lock",
        "File lock",
      ],
      correct_option_index: BigInt(1),
    },
    // Hard
    {
      id: "aj-h1",
      topic_id: "advjava",
      difficulty: "Hard",
      question_text: "What is the Fork/Join framework?",
      options: [
        "Thread creation utility",
        "Parallel task splitting framework using work-stealing",
        "Message passing system",
        "Actor framework",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-h2",
      topic_id: "advjava",
      difficulty: "Hard",
      question_text: "What does thenCompose() do vs thenApply()?",
      options: [
        "Same",
        "thenCompose chains CompletableFutures; thenApply maps values",
        "thenApply chains futures",
        "Both chain futures",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-h3",
      topic_id: "advjava",
      difficulty: "Hard",
      question_text:
        "What is a happens-before relationship in Java concurrency?",
      options: [
        "Thread scheduling",
        "Guarantee that one action's result is visible to another",
        "Lock ordering",
        "Memory cleanup",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-h4",
      topic_id: "advjava",
      difficulty: "Hard",
      question_text: "What is Java reflection?",
      options: [
        "Mirror design pattern",
        "Inspecting/modifying classes at runtime",
        "Debug output",
        "Code generation",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-h5",
      topic_id: "advjava",
      difficulty: "Hard",
      question_text: "What is the Proxy design pattern?",
      options: [
        "Network proxy",
        "Surrogate object controlling access to another object",
        "Data transfer object",
        "Adapter pattern",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-h6",
      topic_id: "advjava",
      difficulty: "Hard",
      question_text: "What is a phaser in Java?",
      options: [
        "Phase-based scheduler",
        "Flexible synchronization barrier for multiple threads/phases",
        "Timer utility",
        "Thread pool phase",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-h7",
      topic_id: "advjava",
      difficulty: "Hard",
      question_text: "What is a weak reference in Java?",
      options: [
        "Null pointer",
        "Reference that doesn't prevent garbage collection",
        "Thread-safe reference",
        "Immutable reference",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-h8",
      topic_id: "advjava",
      difficulty: "Hard",
      question_text: "What is Java's Project Loom (virtual threads)?",
      options: [
        "New GC algorithm",
        "Lightweight threads managed by JVM not OS",
        "New compilation model",
        "Web framework",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-h9",
      topic_id: "advjava",
      difficulty: "Hard",
      question_text: "What is the Decorator design pattern?",
      options: [
        "UI decoration",
        "Adds behavior to objects dynamically by wrapping",
        "Compresses objects",
        "Encrypts objects",
      ],
      correct_option_index: BigInt(1),
    },
    {
      id: "aj-h10",
      topic_id: "advjava",
      difficulty: "Hard",
      question_text: "What does @SuppressWarnings('unchecked') do?",
      options: [
        "Removes warnings from build output",
        "Suppresses specific compiler warnings",
        "Disables type checking",
        "Ignores null checks",
      ],
      correct_option_index: BigInt(1),
    },
  ],
};

// ─── Difficulty levels ────────────────────────────────────────────────────────

type DifficultyFilter = "All" | "Easy" | "Medium" | "Hard";
type QuizState = "topics" | "quiz" | "results";

// ─── Component ────────────────────────────────────────────────────────────────

export default function MCQTests() {
  const { isLoading } = useGetAllTestTopics();
  const [selectedStaticTopic, setSelectedStaticTopic] = useState<
    (typeof STATIC_TOPICS)[0] | null
  >(null);
  const [diffFilter, setDiffFilter] = useState<DifficultyFilter>("All");
  const [quizState, setQuizState] = useState<QuizState>("topics");
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string>("");
  const { mutate: recordAttempt } = useRecordQuizAttempt();

  // Derive topic questions
  const activeStaticQuestions: StaticQuestion[] = selectedStaticTopic
    ? (Q[selectedStaticTopic.id] ?? []).filter(
        (q) => diffFilter === "All" || q.difficulty === diffFilter,
      )
    : [];

  const questions: MCQQuestion[] = activeStaticQuestions.map((q) => ({
    id: q.id,
    topic_id: q.topic_id,
    question_text: q.question_text,
    options: q.options,
    correct_option_index: q.correct_option_index,
  }));

  const question = questions[currentQ];
  const totalQuestions = questions.length;
  const score = selectedAnswers.reduce((acc, ans, i) => {
    return acc + (ans === Number(questions[i]?.correct_option_index) ? 1 : 0);
  }, 0);

  function startQuiz(topic: (typeof STATIC_TOPICS)[0]) {
    setSelectedStaticTopic(topic);
    setQuizState("quiz");
    setCurrentQ(0);
    setSelectedAnswers([]);
    setCurrentSelection("");
  }

  function handleNext() {
    if (!currentSelection) {
      toast.error("Please select an answer first");
      return;
    }
    const updated = [...selectedAnswers, Number.parseInt(currentSelection)];
    setSelectedAnswers(updated);
    setCurrentSelection("");
    if (currentQ + 1 >= totalQuestions) {
      const finalScore = updated.reduce((acc, ans, i) => {
        return (
          acc + (ans === Number(questions[i]?.correct_option_index) ? 1 : 0)
        );
      }, 0);
      setQuizState("results");
      recordAttempt(
        {
          topicId: selectedStaticTopic?.id ?? "java",
          score: BigInt(finalScore),
        },
        {
          onSuccess: () =>
            toast.success(`Quiz done! +${finalScore * 10} XP 🏆`),
        },
      );
    } else {
      setCurrentQ((prev) => prev + 1);
    }
  }

  function resetQuiz() {
    setQuizState("topics");
    setSelectedStaticTopic(null);
    setDiffFilter("All");
    setCurrentQ(0);
    setSelectedAnswers([]);
  }

  const percentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const getTopicStats = (id: string) => {
    const all = Q[id] ?? [];
    return {
      easy: all.filter((q) => q.difficulty === "Easy").length,
      medium: all.filter((q) => q.difficulty === "Medium").length,
      hard: all.filter((q) => q.difficulty === "Hard").length,
      total: all.length,
    };
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        {quizState !== "topics" && (
          <Button
            variant="ghost"
            size="icon"
            onClick={resetQuiz}
            data-ocid="mcq.back.button"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-green-500/15 flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              {quizState === "topics"
                ? "MCQ Tests"
                : selectedStaticTopic
                  ? `${selectedStaticTopic.emoji} ${selectedStaticTopic.title}`
                  : "Quiz"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {quizState === "topics"
                ? "Choose a course and difficulty to start"
                : `Question ${Math.min(currentQ + 1, totalQuestions)} of ${totalQuestions}`}
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Topic Selection */}
        {quizState === "topics" && (
          <motion.div
            key="topics"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-4"
            data-ocid="mcq.topics.list"
          >
            {/* Difficulty filter */}
            <div
              className="flex gap-2 flex-wrap"
              data-ocid="mcq.difficulty.tab"
            >
              {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
                <Button
                  key={d}
                  size="sm"
                  variant={diffFilter === d ? "default" : "outline"}
                  onClick={() => setDiffFilter(d)}
                  data-ocid={`mcq.diff-${d.toLowerCase()}.button`}
                >
                  {d}
                  {d !== "All" && selectedStaticTopic && (
                    <span className="ml-1 text-xs opacity-70">
                      (
                      {
                        (Q[selectedStaticTopic.id] ?? []).filter(
                          (q) => q.difficulty === d,
                        ).length
                      }
                      )
                    </span>
                  )}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STATIC_TOPICS.map((topic, i) => {
                const stats = getTopicStats(topic.id);
                const filtered =
                  diffFilter === "All"
                    ? stats.total
                    : (Q[topic.id] ?? []).filter(
                        (q) => q.difficulty === diffFilter,
                      ).length;
                return (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    data-ocid={`mcq.topics.item.${i + 1}`}
                  >
                    <Card
                      className="card-glow cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => startQuiz(topic)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{topic.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <CardTitle className="text-sm font-display truncate">
                                {topic.title}
                              </CardTitle>
                              <Badge
                                variant="secondary"
                                className="text-xs flex-shrink-0"
                              >
                                {filtered} Q
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                              {topic.desc}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        <div className="flex gap-1.5 text-xs">
                          <span className="px-1.5 py-0.5 rounded bg-green-500/15 text-green-400 border border-green-500/20">
                            E {stats.easy}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">
                            M {stats.medium}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/20">
                            H {stats.hard}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            startQuiz(topic);
                          }}
                          data-ocid={`mcq.start.button.${i + 1}`}
                        >
                          Start Quiz
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {isLoading && (
              <div
                className="flex items-center gap-2 text-muted-foreground"
                data-ocid="mcq.loading_state"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Syncing topics...</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Quiz */}
        {quizState === "quiz" && question && (
          <motion.div
            key={`quiz-${currentQ}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
            data-ocid="mcq.quiz.panel"
          >
            <div className="flex items-center justify-between gap-3">
              <Progress
                value={(currentQ / totalQuestions) * 100}
                className="h-2 flex-1"
              />
              {activeStaticQuestions[currentQ]?.difficulty && (
                <span
                  className={`text-xs px-2 py-0.5 rounded font-semibold border flex-shrink-0 ${
                    activeStaticQuestions[currentQ].difficulty === "Easy"
                      ? "bg-green-500/15 text-green-400 border-green-500/30"
                      : activeStaticQuestions[currentQ].difficulty === "Medium"
                        ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                        : "bg-red-500/15 text-red-400 border-red-500/30"
                  }`}
                >
                  {activeStaticQuestions[currentQ].difficulty}
                </span>
              )}
            </div>

            <Card>
              <CardHeader>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                  Question {currentQ + 1} of {totalQuestions}
                </p>
                <CardTitle className="text-lg font-display leading-snug">
                  {question.question_text}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <RadioGroup
                  value={currentSelection}
                  onValueChange={setCurrentSelection}
                  data-ocid="mcq.options.radio"
                >
                  {question.options.map((opt, i) => (
                    <button
                      key={`${question.id}-${i}`}
                      type="button"
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors w-full text-left ${
                        currentSelection === String(i)
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                      onClick={() => setCurrentSelection(String(i))}
                    >
                      <RadioGroupItem value={String(i)} id={`opt-${i}`} />
                      <Label
                        htmlFor={`opt-${i}`}
                        className="cursor-pointer flex-1 text-sm"
                      >
                        {opt}
                      </Label>
                    </button>
                  ))}
                </RadioGroup>

                <Button
                  className="w-full mt-2"
                  onClick={handleNext}
                  disabled={!currentSelection}
                  data-ocid="mcq.next.button"
                >
                  {currentQ + 1 >= totalQuestions
                    ? "Submit Quiz"
                    : "Next Question"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Results */}
        {quizState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            data-ocid="mcq.results.panel"
          >
            <Card className="text-center">
              <CardHeader className="pb-4">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background:
                      percentage >= 60
                        ? "oklch(0.65 0.2 145 / 0.15)"
                        : "oklch(0.65 0.22 25 / 0.15)",
                  }}
                >
                  {percentage >= 60 ? (
                    <Trophy className="w-8 h-8 text-green-400" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-400" />
                  )}
                </div>
                <CardTitle className="font-display text-2xl">
                  {percentage >= 80
                    ? "Excellent! 🎉"
                    : percentage >= 60
                      ? "Good Job! 👍"
                      : "Keep Practicing 💪"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="inline-flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-primary">
                    {score}
                  </span>
                  <span className="text-xl text-muted-foreground">
                    / {totalQuestions}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  You scored {percentage}% on {selectedStaticTopic?.title} (
                  {diffFilter} level)
                </p>
                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-yellow-400">
                  <Zap className="w-4 h-4" />
                  <span>+{score * 10} XP Earned!</span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-left max-h-64 overflow-y-auto">
                  {questions.map((q, i) => {
                    const userAns = selectedAnswers[i];
                    const correct = Number(q.correct_option_index);
                    const isCorrect = userAns === correct;
                    return (
                      <div
                        key={q.id}
                        className={`flex items-start gap-2 p-2.5 rounded-lg text-xs ${
                          isCorrect
                            ? "bg-green-500/10 border border-green-500/20"
                            : "bg-red-500/10 border border-red-500/20"
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-foreground">
                            {q.question_text}
                          </p>
                          {!isCorrect && (
                            <p className="text-muted-foreground mt-0.5">
                              Correct:{" "}
                              <span className="text-green-400">
                                {q.options[correct]}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      selectedStaticTopic && startQuiz(selectedStaticTopic)
                    }
                    data-ocid="mcq.retry.button"
                  >
                    Retry Quiz
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={resetQuiz}
                    data-ocid="mcq.back-topics.button"
                  >
                    Back to Topics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
