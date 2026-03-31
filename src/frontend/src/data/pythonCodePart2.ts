import type { Problem } from "./codingData";

export const pythonCodePart2: Problem[] = [
  // ===== Method Overloading =====
  {
    id: "py-ol-e1",
    title: "Default Args Overload",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Simulate overloading with default params.\n\nInput: 2 3 / 1.5 2.5\nOutput: 5 4.0",
    hint: "def add(a, b=0):",
    starterCode: "",
  },
  {
    id: "py-ol-e2",
    title: "*args Overload",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Function accepts 1,2,3 args using *args.\n\nInput: 5 / 3 4 / 1 2 3\nOutput: 5 7 6",
    hint: "def total(*args): return sum(args)",
    starterCode: "",
  },
  {
    id: "py-ol-e3",
    title: "Type Check Dispatch",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Dispatch based on type of argument.\n\nInput: 42 / 'hi'\nOutput: Int: 42 / Str: hi",
    hint: "if isinstance(x, int): ...",
    starterCode: "",
  },
  {
    id: "py-ol-e4",
    title: "Singledispatch",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Use singledispatch for type-based dispatch.\n\nInput: 5 / 3.14 / 'hello'\nOutput: Int / Float / Str",
    hint: "from functools import singledispatch",
    starterCode: "",
  },
  {
    id: "py-ol-e5",
    title: "Optional Kwarg",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Function with optional keyword arg.\n\nInput: 'Alice' / 'Alice' 'Dr'\nOutput: Alice / Dr. Alice",
    hint: "def greet(name, title=None):",
    starterCode: "",
  },
  {
    id: "py-ol-e6",
    title: "Overload Area",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "area(r) for circle, area(l,w) for rectangle.\n\nInput: 5 / 4 3\nOutput: 78.5 12",
    hint: "def area(a, b=None):",
    starterCode: "",
  },
  {
    id: "py-ol-e7",
    title: "Overload Max",
    difficulty: "Easy",
    topic: "Method Overloading",
    description: "max of 2 or 3 numbers.\n\nInput: 5 8 / 3 7 2\nOutput: 8 7",
    hint: "def max_val(*args): return max(args)",
    starterCode: "",
  },
  {
    id: "py-ol-e8",
    title: "Overload Distance",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "1D and 2D distance simulation.\n\nInput: 3 4 / 0 0 3 4\nOutput: 7 5.0",
    hint: "if len == 2 vs 4",
    starterCode: "",
  },
  {
    id: "py-ol-e9",
    title: "Overload Power",
    difficulty: "Easy",
    topic: "Method Overloading",
    description: "pow with optional mod.\n\nInput: 2 8 / 2 8 10\nOutput: 256 6",
    hint: "def power(base, exp, mod=None):",
    starterCode: "",
  },
  {
    id: "py-ol-e10",
    title: "Print Overload",
    difficulty: "Easy",
    topic: "Method Overloading",
    description:
      "Print different types differently.\n\nInput: 42 / 3.14 / 'hi'\nOutput: Int:42 Float:3.14 Str:hi",
    hint: "isinstance checks",
    starterCode: "",
  },
  {
    id: "py-ol-m1",
    title: "Singledispatch Method",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Singledispatch on list, dict, and str.\n\nInput: [1,2] / {'a':1} / 'hello'\nOutput: List:2 Dict:1 Str:5",
    hint: "@process.register(list) etc.",
    starterCode: "",
  },
  {
    id: "py-ol-m2",
    title: "Numeric Type Dispatch",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Function handles int, float, complex differently.\n\nInput: 5 / 3.14 / 2+3j\nOutput: Integer Float Complex",
    hint: "isinstance checks in order",
    starterCode: "",
  },
  {
    id: "py-ol-m3",
    title: "Overload Comparison",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "compare(s1,s2) for str and compare(n1,n2) for int.\n\nInput: 'b' 'a' / 5 3\nOutput: 1 1",
    hint: "Type check and compare",
    starterCode: "",
  },
  {
    id: "py-ol-m4",
    title: "Overload Serialize",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Serialize int, list, dict to string.\n\nInput: 42 / [1,2] / {'a':1}\nOutput: '42' '[1, 2]' '{a: 1}'",
    hint: "Type-based formatting",
    starterCode: "",
  },
  {
    id: "py-ol-m5",
    title: "Overload Sort",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Sort int list vs str list differently.\n\nInput: [3,1,2] / ['c','a','b']\nOutput: [1,2,3] ['a','b','c']",
    hint: "Type check then sort",
    starterCode: "",
  },
  {
    id: "py-ol-m6",
    title: "Multipledispatch",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Use multipledispatch library simulation.\n\nInput: int,int / str,str\nOutput: 15 HelloWorld",
    hint: "isinstance on both params",
    starterCode: "",
  },
  {
    id: "py-ol-m7",
    title: "Overload Logger",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Log with optional level param.\n\nInput: 'Error' / 'Warn' 2\nOutput: [LOG] Error / [LOG-2] Warn",
    hint: "def log(msg, level=1):",
    starterCode: "",
  },
  {
    id: "py-ol-m8",
    title: "Overload Container Add",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "add(item) works for int, str, list.\n\nInput: 5 / 'hello' / [1,2]\nOutput: Added int / str / list",
    hint: "Type check in add method",
    starterCode: "",
  },
  {
    id: "py-ol-m9",
    title: "Chainable Overload",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Builder with chainable typed methods.\n\nInput: .set_int(5).set_str('hi').build()\nOutput: (5, hi)",
    hint: "Return self in each method",
    starterCode: "",
  },
  {
    id: "py-ol-m10",
    title: "Overload Flatten",
    difficulty: "Medium",
    topic: "Method Overloading",
    description:
      "Flatten list or string or int to list.\n\nInput: [1,[2,3]] / 'abc' / 5\nOutput: [1,2,3] ['a','b','c'] [5]",
    hint: "isinstance checks for each type",
    starterCode: "",
  },
  {
    id: "py-ol-h1",
    title: "Generic Dispatch Table",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Dict mapping types to handlers.\n\nInput: int / str / list\nOutput: Correct handler for each",
    hint: "dispatch = {int: handle_int, str: handle_str}",
    starterCode: "",
  },
  {
    id: "py-ol-h2",
    title: "Overload via Metaclass",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Metaclass that allows overloaded methods by type.\n\nInput: process(5) / process('hi')\nOutput: Integer / String",
    hint: "Store methods keyed by type",
    starterCode: "",
  },
  {
    id: "py-ol-h3",
    title: "Operator Overload Add",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Overload __add__ for Vector class.\n\nInput: (1,2) + (3,4)\nOutput: (4,6)",
    hint: "def __add__(self, other)",
    starterCode: "",
  },
  {
    id: "py-ol-h4",
    title: "Coerce Types Overload",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Handle mixed int+float in operation.\n\nInput: 5 + 3.0\nOutput: 8.0 (float result)",
    hint: "Check types and promote",
    starterCode: "",
  },
  {
    id: "py-ol-h5",
    title: "Overload with Validation",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "add(a,b) validates types, raises if wrong.\n\nInput: 5 '3'\nOutput: TypeError: both must be same type",
    hint: "if type(a) != type(b): raise TypeError",
    starterCode: "",
  },
  {
    id: "py-ol-h6",
    title: "Overload Persistence",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "save(dict) saves as JSON, save(str) as text.\n\nInput: {'key':'val'} / 'plain text'\nOutput: Saved as JSON / Saved as text",
    hint: "isinstance check determines format",
    starterCode: "",
  },
  {
    id: "py-ol-h7",
    title: "Overload Reduce",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "reduce_to_str for list, int, dict.\n\nInput: [1,2,3] / 42 / {a:1}\nOutput: '1,2,3' '42' 'a:1'",
    hint: "Type-based string conversion",
    starterCode: "",
  },
  {
    id: "py-ol-h8",
    title: "Overload Binary Op",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Implement __add__ __sub__ __mul__ for Money.\n\nInput: Money(100) + Money(50)\nOutput: Money(150)",
    hint: "Operator dunder methods",
    starterCode: "",
  },
  {
    id: "py-ol-h9",
    title: "Class Based Dispatch",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "Process returns different based on subclass.\n\nInput: Circle / Rect / Triangle\nOutput: Each processed differently",
    hint: "isinstance chain or visitor",
    starterCode: "",
  },
  {
    id: "py-ol-h10",
    title: "Overload Constructor",
    difficulty: "Hard",
    topic: "Method Overloading",
    description:
      "from_string(), from_dict() classmethods.\n\nInput: 'Alice,25' / {name:Alice,age:25}\nOutput: Same Person object",
    hint: "@classmethod factory methods",
    starterCode: "",
  },

  // ===== Encapsulation =====
  {
    id: "py-en-e1",
    title: "Private Attribute",
    difficulty: "Easy",
    topic: "Encapsulation",
    description: "Private attribute with getter.\n\nInput: 42\nOutput: 42",
    hint: "self.__x with get_x()",
    starterCode: "",
  },
  {
    id: "py-en-e2",
    title: "Property Getter Setter",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "@property and @setter.\n\nInput: obj.name = 'Alice'\nOutput: Alice",
    hint: "@property def name; @name.setter",
    starterCode: "",
  },
  {
    id: "py-en-e3",
    title: "Validate Setter",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Setter rejects negative age.\n\nInput: -5\nOutput: ValueError: Age must be positive",
    hint: "if value < 0: raise ValueError",
    starterCode: "",
  },
  {
    id: "py-en-e4",
    title: "Read Only Property",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Read-only property (no setter).\n\nInput: obj.area\nOutput: 78.5",
    hint: "@property without setter",
    starterCode: "",
  },
  {
    id: "py-en-e5",
    title: "Counter Encapsulation",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Private count, increment(), get_count().\n\nInput: increment 3 times\nOutput: 3",
    hint: "self.__count = 0",
    starterCode: "",
  },
  {
    id: "py-en-e6",
    title: "Name Mangling",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Show Python name mangling with __.\n\nInput: Direct access\nOutput: AttributeError",
    hint: "self.__x becomes _ClassName__x",
    starterCode: "",
  },
  {
    id: "py-en-e7",
    title: "Multiple Private Fields",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Student with private name, age, GPA.\n\nInput: Bob 20 3.8\nOutput: Bob 20 3.8",
    hint: "@property for each field",
    starterCode: "",
  },
  {
    id: "py-en-e8",
    title: "Encapsulate List",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Return copy of private list.\n\nInput: [1,2,3]\nOutput: External copy, original safe",
    hint: "return self.__data[:]",
    starterCode: "",
  },
  {
    id: "py-en-e9",
    title: "Boolean Property",
    difficulty: "Easy",
    topic: "Encapsulation",
    description: "is_active property.\n\nInput: activate()\nOutput: True",
    hint: "@property def is_active",
    starterCode: "",
  },
  {
    id: "py-en-e10",
    title: "__repr__ and __str__",
    difficulty: "Easy",
    topic: "Encapsulation",
    description:
      "Override __repr__ and __str__ using getters.\n\nInput: Person Alice 25\nOutput: Person(Alice, 25)",
    hint: "def __repr__(self): use self.name etc.",
    starterCode: "",
  },
  {
    id: "py-en-m1",
    title: "BankAccount",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "deposit/withdraw with validation.\n\nInput: deposit 1000, withdraw 300\nOutput: Balance: 700",
    hint: "Validate amount > 0 and <= balance",
    starterCode: "",
  },
  {
    id: "py-en-m2",
    title: "Immutable Point",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Immutable Point using __setattr__.\n\nInput: p.x = 10 (after init)\nOutput: AttributeError",
    hint: "Raise in __setattr__ after init",
    starterCode: "",
  },
  {
    id: "py-en-m3",
    title: "Temperature Class",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Store Celsius; Fahrenheit property.\n\nInput: celsius=100\nOutput: Fahrenheit: 212.0",
    hint: "@property def fahrenheit: return c*9/5+32",
    starterCode: "",
  },
  {
    id: "py-en-m4",
    title: "Lazy Property",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Compute expensive value on first access only.\n\nInput: obj.result accessed twice\nOutput: Computed once",
    hint: "Cache in self.__result = None",
    starterCode: "",
  },
  {
    id: "py-en-m5",
    title: "Student Grade",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Grade auto-computed from marks setter.\n\nInput: marks=85\nOutput: Grade: A",
    hint: "Compute grade in marks setter",
    starterCode: "",
  },
  {
    id: "py-en-m6",
    title: "Config Encapsulation",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Private settings dict with get/set.\n\nInput: set('theme','dark'); get('theme')\nOutput: dark",
    hint: "self.__settings = {}",
    starterCode: "",
  },
  {
    id: "py-en-m7",
    title: "Password Encapsulation",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Store hashed password.\n\nInput: mypassword\nOutput: Hashed: *****",
    hint: "Hash in setter, never return plain",
    starterCode: "",
  },
  {
    id: "py-en-m8",
    title: "Rectangle Validation",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Width/height reject negative.\n\nInput: width=-5\nOutput: Invalid; set to 1",
    hint: "if value > 0: self.__width = value else 1",
    starterCode: "",
  },
  {
    id: "py-en-m9",
    title: "Thread Safe Counter",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Thread-safe counter with Lock.\n\nInput: 5 threads increment 100 times\nOutput: 500",
    hint: "import threading; self._lock = Lock()",
    starterCode: "",
  },
  {
    id: "py-en-m10",
    title: "Observable Property",
    difficulty: "Medium",
    topic: "Encapsulation",
    description:
      "Property fires callback on change.\n\nInput: set_value(10)\nOutput: Changed: 0 -> 10",
    hint: "In setter, call self._on_change(old, new)",
    starterCode: "",
  },
  {
    id: "py-en-h1",
    title: "Deep Copy Encapsulation",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Return deep copy to prevent mutation.\n\nInput: modify external list copy\nOutput: Internal list unchanged",
    hint: "import copy; return copy.deepcopy(self.__data)",
    starterCode: "",
  },
  {
    id: "py-en-h2",
    title: "Value Object",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Immutable Money value object.\n\nInput: Money(100,'USD') + Money(50,'USD')\nOutput: Money(150, USD)",
    hint: "__add__ returns new Money",
    starterCode: "",
  },
  {
    id: "py-en-h3",
    title: "Descriptor Encapsulation",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Descriptor enforces positive value.\n\nInput: obj.salary = -1\nOutput: ValueError",
    hint: "class Positive: def __set__ validates",
    starterCode: "",
  },
  {
    id: "py-en-h4",
    title: "Versioned State",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Track and rollback to previous value.\n\nInput: set 1,2,3 then rollback\nOutput: Current: 2",
    hint: "Stack for history",
    starterCode: "",
  },
  {
    id: "py-en-h5",
    title: "Proxy Encapsulation",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Proxy logs all attribute access.\n\nInput: proxy.name\nOutput: [LOG] name accessed -> Alice",
    hint: "Override __getattr__",
    starterCode: "",
  },
  {
    id: "py-en-h6",
    title: "Cache Encapsulation",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "LRU cache via private dict with max size.\n\nInput: put(1,'a') ... put(3,'c') get(2)\nOutput: None (evicted)",
    hint: "OrderedDict, limit size in put",
    starterCode: "",
  },
  {
    id: "py-en-h7",
    title: "Event Property",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "List of subscribers notified on property change.\n\nInput: subscribe, then change value\nOutput: All subscribers called",
    hint: "self._subscribers = []; call each in setter",
    starterCode: "",
  },
  {
    id: "py-en-h8",
    title: "Frozen Dataclass",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Use frozen=True dataclass for immutability.\n\nInput: @dataclass(frozen=True) Point\nOutput: FrozenInstanceError on change",
    hint: "@dataclass(frozen=True)",
    starterCode: "",
  },
  {
    id: "py-en-h9",
    title: "Type Enforced Property",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Property enforces type via descriptor.\n\nInput: Set int field to 'hello'\nOutput: TypeError",
    hint: "Descriptor checks isinstance in __set__",
    starterCode: "",
  },
  {
    id: "py-en-h10",
    title: "DTO and Model",
    difficulty: "Hard",
    topic: "Encapsulation",
    description:
      "Map between internal model and public DTO.\n\nInput: Employee model\nOutput: EmployeeDTO (no salary)",
    hint: "to_dto() creates separate DTO object",
    starterCode: "",
  },

  // ===== Constructor =====
  {
    id: "py-co-e1",
    title: "__init__ Method",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Define __init__ with name and age.\n\nInput: Alice 25\nOutput: Alice 25",
    hint: "def __init__(self, name, age):",
    starterCode: "",
  },
  {
    id: "py-co-e2",
    title: "Default Init Values",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Default values in constructor.\n\nInput: Car() / Car('Red')\nOutput: Color:Black / Color:Red",
    hint: "def __init__(self, color='Black'):",
    starterCode: "",
  },
  {
    id: "py-co-e3",
    title: "Super __init__",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Call parent __init__ using super().\n\nInput: Dog Buddy\nOutput: Animal: Buddy",
    hint: "super().__init__(name)",
    starterCode: "",
  },
  {
    id: "py-co-e4",
    title: "Init with Validation",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Raise ValueError for negative age.\n\nInput: -5\nOutput: ValueError",
    hint: "if age < 0: raise ValueError",
    starterCode: "",
  },
  {
    id: "py-co-e5",
    title: "Classmethod Constructor",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "from_string() classmethod.\n\nInput: 'Alice-25'\nOutput: Alice 25",
    hint: "@classmethod def from_string(cls, s)",
    starterCode: "",
  },
  {
    id: "py-co-e6",
    title: "Count Instances",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Count objects via class variable in __init__.\n\nInput: 3 objects\nOutput: Count: 3",
    hint: "ClassName.count += 1 in __init__",
    starterCode: "",
  },
  {
    id: "py-co-e7",
    title: "Copy Constructor",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "from_instance() classmethod copies attributes.\n\nInput: p2 = Point.from_instance(p1)\nOutput: Same x and y",
    hint: "@classmethod from_instance(cls, other)",
    starterCode: "",
  },
  {
    id: "py-co-e8",
    title: "Init List",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Init sets up empty list attribute.\n\nInput: add 3 items\nOutput: [item1, item2, item3]",
    hint: "self.items = []",
    starterCode: "",
  },
  {
    id: "py-co-e9",
    title: "Init with Dict",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Init from dict of kwargs.\n\nInput: {'name':'Alice','age':25}\nOutput: Alice 25",
    hint: "def __init__(self, **kwargs): self.name = kwargs.get",
    starterCode: "",
  },
  {
    id: "py-co-e10",
    title: "__new__ vs __init__",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Show __new__ creates, __init__ initializes.\n\nInput: MyClass()\nOutput: __new__ then __init__ called",
    hint: "Override both and print messages",
    starterCode: "",
  },
  {
    id: "py-co-m1",
    title: "Singleton with __new__",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Override __new__ for singleton.\n\nInput: Two instances\nOutput: Same instance: True",
    hint: "if not cls._instance: cls._instance = super().__new__(cls)",
    starterCode: "",
  },
  {
    id: "py-co-m2",
    title: "Multiple Classmethods",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Three factory methods: from_string, from_dict, from_tuple.\n\nInput: 'Alice,25' / {'name':'Alice'} / ('Alice',25)\nOutput: Same Person",
    hint: "Three @classmethod factories",
    starterCode: "",
  },
  {
    id: "py-co-m3",
    title: "Immutable Constructor",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Constructor sets all fields then freezes.\n\nInput: ImmutablePoint(3,4)\nOutput: Cannot change after creation",
    hint: "Use __setattr__ to block after init",
    starterCode: "",
  },
  {
    id: "py-co-m4",
    title: "Constructor Inheritance Chain",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "3-level inheritance, all __init__ called.\n\nInput: new C()\nOutput: A B C initialized",
    hint: "super().__init__() in each level",
    starterCode: "",
  },
  {
    id: "py-co-m5",
    title: "Builder Pattern",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Builder class for constructing objects.\n\nInput: PersonBuilder().name('Alice').age(25).build()\nOutput: Alice 25",
    hint: "Builder with chained methods",
    starterCode: "",
  },
  {
    id: "py-co-m6",
    title: "Init from CSV",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Constructor parses CSV row.\n\nInput: 'Alice,25,3.8'\nOutput: Student(Alice, 25, 3.8)",
    hint: "parts = s.split(',') in __init__",
    starterCode: "",
  },
  {
    id: "py-co-m7",
    title: "Dependency Injection",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Inject service via constructor.\n\nInput: Service(Logger())\nOutput: Logged output",
    hint: "def __init__(self, logger): self.logger = logger",
    starterCode: "",
  },
  {
    id: "py-co-m8",
    title: "Object Pool",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Pool of reusable objects.\n\nInput: get() get() release() get()\nOutput: Reused object",
    hint: "Class-level pool list",
    starterCode: "",
  },
  {
    id: "py-co-m9",
    title: "Prototype Pattern",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Clone object with copy.\n\nInput: p2 = p1.clone()\nOutput: Same values, different object",
    hint: "import copy; return copy.deepcopy(self)",
    starterCode: "",
  },
  {
    id: "py-co-m10",
    title: "Init with Type Validation",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Validate types in __init__.\n\nInput: age='hello'\nOutput: TypeError",
    hint: "if not isinstance(age, int): raise TypeError",
    starterCode: "",
  },
  {
    id: "py-co-h1",
    title: "Abstract Factory",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Abstract factory for platform-specific widgets.\n\nInput: WindowsFactory / MacFactory\nOutput: Windows button / Mac button",
    hint: "Abstract base + concrete factories",
    starterCode: "",
  },
  {
    id: "py-co-h2",
    title: "Enum Constructor",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Enum with value and description.\n\nInput: Planet.EARTH\nOutput: mass:5.97e24 radius:6371",
    hint: "class Planet(Enum): EARTH = (mass, radius)",
    starterCode: "",
  },
  {
    id: "py-co-h3",
    title: "Constructor Reference",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Use class reference to create objects from list.\n\nInput: ['Alice','Bob']\nOutput: [Person(Alice), Person(Bob)]",
    hint: "[Person(name) for name in names]",
    starterCode: "",
  },
  {
    id: "py-co-h4",
    title: "Lazy Singleton",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Thread-safe lazy singleton.\n\nInput: Parallel access\nOutput: Same instance always",
    hint: "threading.Lock() around creation",
    starterCode: "",
  },
  {
    id: "py-co-h5",
    title: "Registry Pattern",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "All created objects tracked in class registry.\n\nInput: Create 3 Products\nOutput: Registry: 3 products",
    hint: "cls._registry = [] appended in __init__",
    starterCode: "",
  },
  {
    id: "py-co-h6",
    title: "Reconstruct from JSON",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Constructor accepts JSON string.\n\nInput: name=Alice age=25 (JSON)\nOutput: Alice 25",
    hint: "json.loads in __init__",
    starterCode: "",
  },
  {
    id: "py-co-h7",
    title: "Dataclass Post Init",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Use __post_init__ in dataclass for validation.\n\nInput: Person(age=-1)\nOutput: ValueError",
    hint: "def __post_init__(self): validate here",
    starterCode: "",
  },
  {
    id: "py-co-h8",
    title: "Constructor Mixin",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Mixin adds logging to any class __init__.\n\nInput: MyClass with LogMixin\nOutput: Creating MyClass logged",
    hint: "Override __init__ in mixin, call super",
    starterCode: "",
  },
  {
    id: "py-co-h9",
    title: "Slots Constructor",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Use __slots__ to restrict and optimize memory.\n\nInput: 1M objects with slots\nOutput: Less memory than without",
    hint: "__slots__ = ['x','y'] + sys.getsizeof comparison",
    starterCode: "",
  },
  {
    id: "py-co-h10",
    title: "Multiton",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "One instance per key using classmethod.\n\nInput: get('red') get('red')\nOutput: Same instance",
    hint: "cls._instances = {}; check before creating",
    starterCode: "",
  },

  // ===== Static =====
  {
    id: "py-sta-e1",
    title: "Static Method",
    difficulty: "Easy",
    topic: "Static",
    description: "@staticmethod that doubles a number.\n\nInput: 5\nOutput: 10",
    hint: "@staticmethod def double(n): return n*2",
    starterCode: "",
  },
  {
    id: "py-sta-e2",
    title: "Class Method",
    difficulty: "Easy",
    topic: "Static",
    description:
      "@classmethod that creates instance.\n\nInput: Person.create('Alice')\nOutput: Alice",
    hint: "@classmethod def create(cls, name)",
    starterCode: "",
  },
  {
    id: "py-sta-e3",
    title: "Class Variable Shared",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Class variable shared across instances.\n\nInput: 3 objects\nOutput: count=3",
    hint: "ClassName.count, not self.count",
    starterCode: "",
  },
  {
    id: "py-sta-e4",
    title: "Math Static Methods",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Static methods for sqrt and power.\n\nInput: 16 / 2 8\nOutput: 4.0 256",
    hint: "import math; @staticmethod",
    starterCode: "",
  },
  {
    id: "py-sta-e5",
    title: "Static Constant",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Class-level constant PI.\n\nInput: radius=5\nOutput: Area: 78.5",
    hint: "PI = 3.14 at class level",
    starterCode: "",
  },
  {
    id: "py-sta-e6",
    title: "Static vs Instance",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Show static belongs to class, instance to object.\n\nInput: None\nOutput: Static same; Instance different",
    hint: "ClassName.static vs self.instance",
    starterCode: "",
  },
  {
    id: "py-sta-e7",
    title: "Static Validator",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Static method validates email format.\n\nInput: test@email.com\nOutput: Valid",
    hint: "@staticmethod def is_valid_email(s)",
    starterCode: "",
  },
  {
    id: "py-sta-e8",
    title: "Class Method Counter",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Class method to get instance count.\n\nInput: 5 objects\nOutput: 5",
    hint: "@classmethod def get_count(cls)",
    starterCode: "",
  },
  {
    id: "py-sta-e9",
    title: "Static Utility",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Utility class with all static methods.\n\nInput: MathUtils.add(3,4)\nOutput: 7",
    hint: "@staticmethod in a utility class",
    starterCode: "",
  },
  {
    id: "py-sta-e10",
    title: "Static from Another",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Static method calls another static.\n\nInput: 7\nOutput: 49 (square called from process)",
    hint: "ClassName.square() in static method",
    starterCode: "",
  },
  {
    id: "py-sta-m1",
    title: "Static Cache",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Class-level cache dict for memoization.\n\nInput: fib(10) twice\nOutput: 55 (computed once)",
    hint: "_cache = {} at class level",
    starterCode: "",
  },
  {
    id: "py-sta-m2",
    title: "Registry Class Var",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Class-level registry of all instances.\n\nInput: 3 Products\nOutput: 3 in registry",
    hint: "_registry = [] at class level",
    starterCode: "",
  },
  {
    id: "py-sta-m3",
    title: "Class Method Polymorphism",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Subclass classmethod returns correct subclass.\n\nInput: Dog.create('Buddy')\nOutput: Dog object",
    hint: "@classmethod uses cls not parent class",
    starterCode: "",
  },
  {
    id: "py-sta-m4",
    title: "Static HTTP Status Map",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Class variable maps status codes.\n\nInput: 404\nOutput: Not Found",
    hint: "STATUS = {404:'Not Found',...}",
    starterCode: "",
  },
  {
    id: "py-sta-m5",
    title: "Class vs Instance Method",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Show when to use each type.\n\nInput: None\nOutput: Static: no self/cls, Class: cls, Instance: self",
    hint: "Three method types side by side",
    starterCode: "",
  },
  {
    id: "py-sta-m6",
    title: "Enum with Classmethod",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Enum with classmethod from_string factory.\n\nInput: 'NORTH'\nOutput: Direction.NORTH",
    hint: "@classmethod in Enum",
    starterCode: "",
  },
  {
    id: "py-sta-m7",
    title: "Comparator Class Method",
    difficulty: "Medium",
    topic: "Static",
    description:
      "classmethod creates sort comparator.\n\nInput: [Bob:30, Alice:25]\nOutput: Alice Bob",
    hint: "@classmethod key for sorted",
    starterCode: "",
  },
  {
    id: "py-sta-m8",
    title: "Static Config Loader",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Simulate static config loaded once.\n\nInput: Config.get('theme')\nOutput: dark",
    hint: "_config class var, loaded on first access",
    starterCode: "",
  },
  {
    id: "py-sta-m9",
    title: "Thread ID Static",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Assign sequential IDs using class counter.\n\nInput: 3 threads\nOutput: Thread-1 Thread-2 Thread-3",
    hint: "ClassName._next_id += 1",
    starterCode: "",
  },
  {
    id: "py-sta-m10",
    title: "Inherit Class Variable",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Each subclass has own class variable.\n\nInput: 2 Dogs, 3 Cats\nOutput: Dog:2 Cat:3",
    hint: "Each subclass defines count = 0",
    starterCode: "",
  },
  {
    id: "py-sta-h1",
    title: "Thread-Safe Class Var",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Thread-safe class-level counter.\n\nInput: 100 threads increment\nOutput: 100",
    hint: "threading.Lock() around increment",
    starterCode: "",
  },
  {
    id: "py-sta-h2",
    title: "Static Inner Pattern",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Inner class used as namespace.\n\nInput: Outer.Inner()\nOutput: Inner without outer instance",
    hint: "class Inner defined at class level",
    starterCode: "",
  },
  {
    id: "py-sta-h3",
    title: "Initialization Order",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Show class var init order.\n\nInput: None\nOutput: Class vars initialized once",
    hint: "Print at class body vs __init__",
    starterCode: "",
  },
  {
    id: "py-sta-h4",
    title: "Benchmark Static vs Instance",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Benchmark static vs instance method speed.\n\nInput: 1M calls\nOutput: Static: Xs, Instance: Ys",
    hint: "time.time() before/after",
    starterCode: "",
  },
  {
    id: "py-sta-h5",
    title: "Multiton with Class Dict",
    difficulty: "Hard",
    topic: "Static",
    description:
      "One instance per key.\n\nInput: Pool.get('A') twice\nOutput: Same instance",
    hint: "_instances = {} at class level",
    starterCode: "",
  },
  {
    id: "py-sta-h6",
    title: "Static Builder",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Static builder creates validated objects.\n\nInput: User.build(name='Alice',email='a@b.com')\nOutput: User{Alice,a@b.com}",
    hint: "@staticmethod def build(**kwargs)",
    starterCode: "",
  },
  {
    id: "py-sta-h7",
    title: "class __init_subclass__",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Log subclass creation with __init_subclass__.\n\nInput: class Sub(Base)\nOutput: Sub registered",
    hint: "def __init_subclass__(cls, **kwargs)",
    starterCode: "",
  },
  {
    id: "py-sta-h8",
    title: "Plugin Registry",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Plugins register themselves in class-level dict.\n\nInput: @register('log') class LogPlugin\nOutput: All plugins callable",
    hint: "_plugins = {} class variable",
    starterCode: "",
  },
  {
    id: "py-sta-h9",
    title: "Static Proxy",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Static method wraps call with logging.\n\nInput: StaticProxy.execute('greet')\nOutput: [LOG] greet",
    hint: "@staticmethod with logging",
    starterCode: "",
  },
  {
    id: "py-sta-h10",
    title: "Singleton Metaclass",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Singleton enforced via metaclass.\n\nInput: Two instances\nOutput: Same object",
    hint: "class SingletonMeta(type): track instances",
    starterCode: "",
  },

  // ===== Inheritance =====
  {
    id: "py-in-e1",
    title: "Basic Inheritance",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Dog inherits from Animal.\n\nInput: Dog()\nOutput: Animal eats. Dog barks.",
    hint: "class Dog(Animal):",
    starterCode: "",
  },
  {
    id: "py-in-e2",
    title: "Super Call",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Call parent speak() from Dog override.\n\nInput: None\nOutput: Animal speaks. Dog barks too.",
    hint: "super().speak()",
    starterCode: "",
  },
  {
    id: "py-in-e3",
    title: "isinstance Check",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Dog is an Animal.\n\nInput: Dog object\nOutput: Is Animal: True",
    hint: "isinstance(dog, Animal)",
    starterCode: "",
  },
  {
    id: "py-in-e4",
    title: "Multilevel Inheritance",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "C extends B extends A. C uses A's method.\n\nInput: C()\nOutput: A B C",
    hint: "class C(B): class B(A):",
    starterCode: "",
  },
  {
    id: "py-in-e5",
    title: "Multiple Inheritance",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Duck inherits from Bird and Fish.\n\nInput: Duck()\nOutput: Flies and swims",
    hint: "class Duck(Bird, Fish):",
    starterCode: "",
  },
  {
    id: "py-in-e6",
    title: "Method Resolution Order",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Print MRO of a class.\n\nInput: Dog.__mro__\nOutput: [Dog, Animal, object]",
    hint: "print(Dog.__mro__)",
    starterCode: "",
  },
  {
    id: "py-in-e7",
    title: "Override __str__",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Subclass overrides __str__.\n\nInput: Employee('Bob',50000)\nOutput: Employee{Bob,50000}",
    hint: "Override __str__ in subclass",
    starterCode: "",
  },
  {
    id: "py-in-e8",
    title: "issubclass Check",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Check if class is subclass.\n\nInput: issubclass(Dog, Animal)\nOutput: True",
    hint: "issubclass(Dog, Animal)",
    starterCode: "",
  },
  {
    id: "py-in-e9",
    title: "Inherited Method",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Use parent method without overriding.\n\nInput: child.parent_method()\nOutput: Parent method called",
    hint: "No override needed",
    starterCode: "",
  },
  {
    id: "py-in-e10",
    title: "Constructor Order",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Parent __init__ called first.\n\nInput: Child()\nOutput: Parent init. Child init.",
    hint: "super().__init__()",
    starterCode: "",
  },
  {
    id: "py-in-m1",
    title: "Shape Hierarchy",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Shape > Circle, Rect. Each has area().\n\nInput: r=7, l=4 w=6\nOutput: 153.94 24",
    hint: "Override area() in each",
    starterCode: "",
  },
  {
    id: "py-in-m2",
    title: "Abstract Inheritance",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "ABC with abstract sound(). Dog, Cat, Bird implement.\n\nInput: [Dog,Cat,Bird]\nOutput: Woof Meow Tweet",
    hint: "from abc import ABC, abstractmethod",
    starterCode: "",
  },
  {
    id: "py-in-m3",
    title: "Diamond Problem MRO",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Show MRO solves diamond problem.\n\nInput: class D(B,C); B and C extend A\nOutput: D->B->C->A (C3 linearization)",
    hint: "print(D.__mro__)",
    starterCode: "",
  },
  {
    id: "py-in-m4",
    title: "Mixin Logging",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "LogMixin adds logging to any class.\n\nInput: class MyService(LogMixin)\nOutput: Methods logged",
    hint: "Mixin overrides methods with logging",
    starterCode: "",
  },
  {
    id: "py-in-m5",
    title: "Template Method",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Abstract method defines algorithm skeleton.\n\nInput: Pasta / Salad recipe\nOutput: Steps printed",
    hint: "Abstract steps in template method",
    starterCode: "",
  },
  {
    id: "py-in-m6",
    title: "Covariant Override",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Override returns more specific type.\n\nInput: Dog.create() returns Dog\nOutput: Dog object from Animal factory",
    hint: "Override factory method",
    starterCode: "",
  },
  {
    id: "py-in-m7",
    title: "Employee Hierarchy",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Manager adds bonus to salary.\n\nInput: Manager Bob 60000 bonus=10000\nOutput: 70000",
    hint: "Override get_salary() to add bonus",
    starterCode: "",
  },
  {
    id: "py-in-m8",
    title: "Vehicle Chain",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Vehicle > Car > ElectricCar chain.\n\nInput: ElectricCar()\nOutput: Vehicle Car Electric messages",
    hint: "3-level inheritance",
    starterCode: "",
  },
  {
    id: "py-in-m9",
    title: "Protected Access",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Protected (single _) attribute in subclass.\n\nInput: Child accesses parent._value\nOutput: 100",
    hint: "self._value = 100 in parent",
    starterCode: "",
  },
  {
    id: "py-in-m10",
    title: "Chain Super Calls",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "C.method() -> B -> A via super().\n\nInput: C().method()\nOutput: A B C",
    hint: "super().method() in each level",
    starterCode: "",
  },
  {
    id: "py-in-h1",
    title: "Composite Pattern",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Component, Leaf, Composite tree.\n\nInput: File and Folder tree\nOutput: Total size computed",
    hint: "get_size() on composite",
    starterCode: "",
  },
  {
    id: "py-in-h2",
    title: "Decorator Pattern",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Wrap Coffee with Milk and Sugar.\n\nInput: Sugar(Milk(Coffee()))\nOutput: Coffee+Milk+Sugar cost:5.5",
    hint: "Decorator inherits from base",
    starterCode: "",
  },
  {
    id: "py-in-h3",
    title: "Strategy Pattern",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Swap sort strategy at runtime.\n\nInput: BubbleSort / QuickSort\nOutput: Sorted with strategy",
    hint: "Abstract Sorter, concrete strategies",
    starterCode: "",
  },
  {
    id: "py-in-h4",
    title: "Observer Pattern",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Subject notifies observers.\n\nInput: subject.notify(5)\nOutput: Obs1:5 Obs2:5",
    hint: "Abstract Observer.update()",
    starterCode: "",
  },
  {
    id: "py-in-h5",
    title: "Chain of Responsibility",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Request passed along handler chain.\n\nInput: level=3 request\nOutput: Handler3 handles",
    hint: "Handler has next_handler reference",
    starterCode: "",
  },
  {
    id: "py-in-h6",
    title: "Abstract ORM Hierarchy",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Abstract Repository; InMemory implementation.\n\nInput: save, find, delete\nOutput: CRUD works",
    hint: "@abstractmethod find, save, delete",
    starterCode: "",
  },
  {
    id: "py-in-h7",
    title: "Visitor Pattern",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Visitor traverses shape hierarchy.\n\nInput: [Circle, Rect]\nOutput: Areas computed by visitor",
    hint: "accept(visitor) in each shape",
    starterCode: "",
  },
  {
    id: "py-in-h8",
    title: "Comparable Inheritance",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Override __lt__ for sorting.\n\nInput: [Alice:3.5, Bob:3.8, Carol:3.2]\nOutput: Carol Alice Bob",
    hint: "__lt__ in Student",
    starterCode: "",
  },
  {
    id: "py-in-h9",
    title: "ABC with Properties",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Abstract property enforced in subclasses.\n\nInput: Subclass must have name property\nOutput: Enforced by ABC",
    hint: "@abstractproperty or @property + @abstractmethod",
    starterCode: "",
  },
  {
    id: "py-in-h10",
    title: "Mixins Stack",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Stack multiple mixins: Log + Cache + Validate.\n\nInput: class MyClass(Log,Cache,Validate,Base)\nOutput: All mixin behaviors active",
    hint: "MRO ensures correct call order",
    starterCode: "",
  },

  // ===== Polymorphism =====
  {
    id: "py-po-e1",
    title: "Duck Typing",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "Call speak() on Dog and Cat without type checks.\n\nInput: [Dog(),Cat()]\nOutput: Woof Meow",
    hint: "Python duck typing: if it quacks...",
    starterCode: "",
  },
  {
    id: "py-po-e2",
    title: "Same Method Different Classes",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "area() on Circle, Square, Triangle.\n\nInput: [Circle(5), Square(4), Triangle(3,4)]\nOutput: 78.5 16 6.0",
    hint: "Each class defines area()",
    starterCode: "",
  },
  {
    id: "py-po-e3",
    title: "Polymorphic Tax",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "Different tax rates per product type.\n\nInput: price=100\nOutput: Product:10 Book:0 Food:5",
    hint: "Override get_tax() in each",
    starterCode: "",
  },
  {
    id: "py-po-e4",
    title: "Polymorphic Draw",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "draw() on Circle and Square.\n\nInput: shapes list\nOutput: Drawing circle / square",
    hint: "Polymorphic call via loop",
    starterCode: "",
  },
  {
    id: "py-po-e5",
    title: "Method Overriding",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "Subclass overrides parent method.\n\nInput: Parent / Child\nOutput: Child method called",
    hint: "Override same method name",
    starterCode: "",
  },
  {
    id: "py-po-e6",
    title: "List of Animals",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "List of animals; call sound().\n\nInput: [Dog,Cat,Bird]\nOutput: Woof Meow Tweet",
    hint: "for a in animals: a.sound()",
    starterCode: "",
  },
  {
    id: "py-po-e7",
    title: "Operator Polymorphism",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "+ works on int, str, list.\n\nInput: 1+2 / 'a'+'b' / [1]+[2]\nOutput: 3 ab [1,2]",
    hint: "Same operator, different behavior",
    starterCode: "",
  },
  {
    id: "py-po-e8",
    title: "len Polymorphism",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "len() works on str, list, dict.\n\nInput: 'hello' / [1,2,3] / {a:1,b:2}\nOutput: 5 3 2",
    hint: "len calls __len__",
    starterCode: "",
  },
  {
    id: "py-po-e9",
    title: "str() Polymorphism",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "str() calls __str__ on any object.\n\nInput: Custom class\nOutput: Custom string representation",
    hint: "Implement __str__",
    starterCode: "",
  },
  {
    id: "py-po-e10",
    title: "Polymorphic Payment",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "Card and Cash implement pay().\n\nInput: Card / Cash\nOutput: Paid by Card / Cash",
    hint: "Interface via duck typing",
    starterCode: "",
  },
  {
    id: "py-po-m1",
    title: "Abstract Polymorphism",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "ABC enforces abstract method; subclasses override.\n\nInput: [Circle, Rect]\nOutput: Areas",
    hint: "@abstractmethod area()",
    starterCode: "",
  },
  {
    id: "py-po-m2",
    title: "Heterogeneous Collection",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "List of employees; total salary.\n\nInput: Dev:70k, Manager:90k, Intern:30k\nOutput: 190000",
    hint: "sum(e.get_salary() for e in employees)",
    starterCode: "",
  },
  {
    id: "py-po-m3",
    title: "Protocol Polymorphism",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Use typing.Protocol for structural subtyping.\n\nInput: Any class with speak()\nOutput: Works without explicit inheritance",
    hint: "from typing import Protocol; class Speaker(Protocol)",
    starterCode: "",
  },
  {
    id: "py-po-m4",
    title: "Callable Polymorphism",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Both function and class with __call__ used same way.\n\nInput: func(5) / obj(5)\nOutput: 25 25",
    hint: "def __call__(self, n): return n**2",
    starterCode: "",
  },
  {
    id: "py-po-m5",
    title: "Context Manager Poly",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Different context managers used the same way.\n\nInput: with DBContext() / with FileContext()\nOutput: Each managed correctly",
    hint: "Both have __enter__ and __exit__",
    starterCode: "",
  },
  {
    id: "py-po-m6",
    title: "Iterator Poly",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Custom iterables used in for loops.\n\nInput: for x in MyList / MyRange\nOutput: Elements",
    hint: "Both implement __iter__ and __next__",
    starterCode: "",
  },
  {
    id: "py-po-m7",
    title: "Comparison Polymorphism",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "__lt__ on different classes for sorting.\n\nInput: Mixed list sorted\nOutput: Sorted by custom key",
    hint: "Implement __lt__ in each class",
    starterCode: "",
  },
  {
    id: "py-po-m8",
    title: "Serializer Poly",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "JSON, XML, CSV serializers via same interface.\n\nInput: JsonSerializer / CsvSerializer\nOutput: Different formats",
    hint: "All implement serialize(data)",
    starterCode: "",
  },
  {
    id: "py-po-m9",
    title: "Command Pattern Poly",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Commands executed polymorphically.\n\nInput: [Print, Save, Send]\nOutput: Each executed",
    hint: "for cmd in commands: cmd.execute()",
    starterCode: "",
  },
  {
    id: "py-po-m10",
    title: "Visitor Pattern",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Visitor processes different element types.\n\nInput: [Circle, Rect, Triangle]\nOutput: Each area by visitor",
    hint: "accept(visitor) delegates to visit_circle etc.",
    starterCode: "",
  },
  {
    id: "py-po-h1",
    title: "Multidispatch",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Dispatch based on two argument types.\n\nInput: (int,int) / (str,str)\nOutput: Different handling",
    hint: "Dict of (type,type) to handler",
    starterCode: "",
  },
  {
    id: "py-po-h2",
    title: "Expression Interpreter",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Polymorphic expression tree evaluator.\n\nInput: Add(Mul(2,3),Num(4))\nOutput: 10",
    hint: "eval() on each node type",
    starterCode: "",
  },
  {
    id: "py-po-h3",
    title: "Plugin System",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Load and run plugins via common interface.\n\nInput: [LogPlugin, AuditPlugin]\nOutput: Both ran",
    hint: "All plugins implement run()",
    starterCode: "",
  },
  {
    id: "py-po-h4",
    title: "Type-Safe Container",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Generic container with type checking.\n\nInput: Container[int]\nOutput: Only ints allowed",
    hint: "Generic TypeVar + isinstance check",
    starterCode: "",
  },
  {
    id: "py-po-h5",
    title: "Polymorphic Reducer",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Reducer objects process list differently.\n\nInput: [Sum, Max, Min] on [1,2,3,4,5]\nOutput: 15 5 1",
    hint: "Abstract Reducer with reduce()",
    starterCode: "",
  },
  {
    id: "py-po-h6",
    title: "Pattern Matching Poly",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Use match-case for polymorphic dispatch.\n\nInput: Circle(5) / Rect(4,6)\nOutput: Circle area / Rect area",
    hint: "match shape: case Circle(r): ...",
    starterCode: "",
  },
  {
    id: "py-po-h7",
    title: "Covariant Return",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Method returns more specific type in subclass.\n\nInput: Dog.create() returns Dog\nOutput: Dog instance",
    hint: "@classmethod in subclass returns cls()",
    starterCode: "",
  },
  {
    id: "py-po-h8",
    title: "Dynamic Method Dispatch",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Use getattr for dynamic method dispatch.\n\nInput: obj, 'greet'\nOutput: Method called dynamically",
    hint: "getattr(obj, method_name)()",
    starterCode: "",
  },
  {
    id: "py-po-h9",
    title: "Composition vs Inheritance",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Show polymorphism via composition.\n\nInput: Car with Engine strategy\nOutput: Different engine behaviors",
    hint: "car.engine.start() instead of overriding",
    starterCode: "",
  },
  {
    id: "py-po-h10",
    title: "Abstract Event Handler",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Abstract handler processes different event types.\n\nInput: ClickEvent / KeyEvent\nOutput: Each handled correctly",
    hint: "Abstract handle(event), subclass per type",
    starterCode: "",
  },

  // ===== Abstraction =====
  {
    id: "py-ab-e1",
    title: "Abstract Class",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "ABC with abstract start(). Car implements.\n\nInput: Car()\nOutput: Car started",
    hint: "from abc import ABC, abstractmethod",
    starterCode: "",
  },
  {
    id: "py-ab-e2",
    title: "Abstract Method",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Abstract sound(). Dog, Cat implement.\n\nInput: Dog, Cat\nOutput: Woof Meow",
    hint: "@abstractmethod def sound(self):",
    starterCode: "",
  },
  {
    id: "py-ab-e3",
    title: "Cannot Instantiate ABC",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Show TypeError when instantiating ABC.\n\nInput: Shape()\nOutput: TypeError",
    hint: "ABC cannot be instantiated",
    starterCode: "",
  },
  {
    id: "py-ab-e4",
    title: "ABC with Concrete",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "ABC has abstract and concrete methods.\n\nInput: Dog()\nOutput: eat() concrete, bark() abstract",
    hint: "Mix abstract and regular methods",
    starterCode: "",
  },
  {
    id: "py-ab-e5",
    title: "Abstract Property",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Abstract property name in ABC.\n\nInput: Cat('Luna').name\nOutput: Luna",
    hint: "@property @abstractmethod def name",
    starterCode: "",
  },
  {
    id: "py-ab-e6",
    title: "ABC Hierarchy",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Animal(ABC) > Mammal > Dog chain.\n\nInput: Dog()\nOutput: All levels",
    hint: "Multi-level with ABC at top",
    starterCode: "",
  },
  {
    id: "py-ab-e7",
    title: "ABCMeta",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Use ABCMeta directly.\n\nInput: class Shape(metaclass=ABCMeta)\nOutput: Abstract class",
    hint: "from abc import ABCMeta",
    starterCode: "",
  },
  {
    id: "py-ab-e8",
    title: "Abstract classmethod",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Abstract classmethod in ABC.\n\nInput: Subclass.create()\nOutput: Subclass factory",
    hint: "@classmethod @abstractmethod",
    starterCode: "",
  },
  {
    id: "py-ab-e9",
    title: "Abstract staticmethod",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Abstract staticmethod enforced.\n\nInput: Subclass.validate('hello')\nOutput: Valid",
    hint: "@staticmethod @abstractmethod",
    starterCode: "",
  },
  {
    id: "py-ab-e10",
    title: "ABC IS-A Check",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "isinstance with ABC.\n\nInput: Dog object\nOutput: Is Animal: True",
    hint: "isinstance(dog, Animal)",
    starterCode: "",
  },
  {
    id: "py-ab-m1",
    title: "Shape Hierarchy",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract area() and perimeter(). Implement in 3 shapes.\n\nInput: Circle, Rect, Triangle\nOutput: Areas and perimeters",
    hint: "@abstractmethod in Shape ABC",
    starterCode: "",
  },
  {
    id: "py-ab-m2",
    title: "Template Method",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract steps; template controls flow.\n\nInput: Pasta / Salad\nOutput: Step-by-step output",
    hint: "Non-abstract template calls abstract steps",
    starterCode: "",
  },
  {
    id: "py-ab-m3",
    title: "Abstract Data Store",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract save/load. DB and File implement.\n\nInput: DBStore / FileStore\nOutput: Saved to DB / File",
    hint: "@abstractmethod save, load",
    starterCode: "",
  },
  {
    id: "py-ab-m4",
    title: "Game Character",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract attack() and defend(). Warrior, Mage.\n\nInput: Warrior, Mage\nOutput: Slashes, Casts spell",
    hint: "@abstractmethod in GameCharacter",
    starterCode: "",
  },
  {
    id: "py-ab-m5",
    title: "Report Generator",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract generate_header, body, footer.\n\nInput: PDF / HTML\nOutput: Formatted report",
    hint: "Template method calls abstract parts",
    starterCode: "",
  },
  {
    id: "py-ab-m6",
    title: "Authentication Abstract",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract login/logout. OAuth and Basic.\n\nInput: OAuth / Basic\nOutput: Token / Credentials",
    hint: "Different auth strategies via ABC",
    starterCode: "",
  },
  {
    id: "py-ab-m7",
    title: "Abstract Logger",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract log(). FileLog and ConsoleLog.\n\nInput: log('Hello')\nOutput: [File] / [Console] Hello",
    hint: "@abstractmethod def log(self, msg)",
    starterCode: "",
  },
  {
    id: "py-ab-m8",
    title: "Abstract Iterator",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract has_next() and next_item().\n\nInput: iterate [A,B,C]\nOutput: A B C",
    hint: "@abstractmethod has_next, next_item",
    starterCode: "",
  },
  {
    id: "py-ab-m9",
    title: "Abstract + Protocol",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Use Protocol for structural ABC alternative.\n\nInput: Any class with required methods\nOutput: Works without explicit inheritance",
    hint: "from typing import Protocol",
    starterCode: "",
  },
  {
    id: "py-ab-m10",
    title: "Abstract Compressor",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract compress/decompress. Zip and Gzip.\n\nInput: ZipCompressor / GzipCompressor\nOutput: Compressed differently",
    hint: "@abstractmethod in Compressor",
    starterCode: "",
  },
  {
    id: "py-ab-h1",
    title: "Framework Test Case",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract TestCase with abstract run().\n\nInput: MathTest extends TestCase\nOutput: Test passed/failed",
    hint: "Abstract framework, concrete tests",
    starterCode: "",
  },
  {
    id: "py-ab-h2",
    title: "Expression Tree ABC",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract Expr with eval(). Num, Add, Mul.\n\nInput: Add(Mul(2,3), Num(4))\nOutput: 10",
    hint: "@abstractmethod eval() recursive",
    starterCode: "",
  },
  {
    id: "py-ab-h3",
    title: "Pipeline Stage ABC",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract pipeline stages chained.\n\nInput: [Validate, Transform, Output]\nOutput: Processed data",
    hint: "@abstractmethod process(data)",
    starterCode: "",
  },
  {
    id: "py-ab-h4",
    title: "State Machine ABC",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract State. Traffic light states.\n\nInput: RED -> GREEN -> YELLOW\nOutput: State transitions",
    hint: "Abstract enter, exit, handle",
    starterCode: "",
  },
  {
    id: "py-ab-h5",
    title: "Abstract ORM",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract Repository with CRUD. InMemory impl.\n\nInput: save, find, delete\nOutput: Works",
    hint: "@abstractmethod find_by_id, save, delete",
    starterCode: "",
  },
  {
    id: "py-ab-h6",
    title: "Plugin ABC",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract Plugin with execute(). Log and Email plugins.\n\nInput: [LogPlugin, EmailPlugin]\nOutput: Logged and emailed",
    hint: "@abstractmethod execute(self)",
    starterCode: "",
  },
  {
    id: "py-ab-h7",
    title: "Query Builder ABC",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract QueryBuilder. SQL and NoSQL.\n\nInput: select('name').where('age>18')\nOutput: SQL / NoSQL query",
    hint: "@abstractmethod build()",
    starterCode: "",
  },
  {
    id: "py-ab-h8",
    title: "Abstract Observer",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract update() in observer.\n\nInput: subject.notify(5)\nOutput: All observers updated",
    hint: "@abstractmethod update(value)",
    starterCode: "",
  },
  {
    id: "py-ab-h9",
    title: "Abstract Strategy Benchmark",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract sort strategy; benchmark each.\n\nInput: Bubble vs Merge on 1000 items\nOutput: Times compared",
    hint: "@abstractmethod sort(); time each",
    starterCode: "",
  },
  {
    id: "py-ab-h10",
    title: "ABC with __init_subclass__",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Use __init_subclass__ to register subclasses.\n\nInput: class Sub(Base)\nOutput: Sub auto-registered",
    hint: "def __init_subclass__(cls) in base",
    starterCode: "",
  },

  // ===== Interface =====
  {
    id: "py-if-e1",
    title: "Protocol Interface",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Protocol for Greeting with say_hello().\n\nInput: Any class with say_hello\nOutput: Hello!",
    hint: "from typing import Protocol",
    starterCode: "",
  },
  {
    id: "py-if-e2",
    title: "ABC as Interface",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "ABC with abstract methods as interface.\n\nInput: Dog implements Animal ABC\nOutput: Dog behavior",
    hint: "ABC with all @abstractmethod",
    starterCode: "",
  },
  {
    id: "py-if-e3",
    title: "Multiple ABCs",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Duck implements Flyable and Swimmable ABCs.\n\nInput: Duck()\nOutput: Flying and swimming",
    hint: "class Duck(Flyable, Swimmable):",
    starterCode: "",
  },
  {
    id: "py-if-e4",
    title: "runtime_checkable",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "@runtime_checkable Protocol supports isinstance.\n\nInput: isinstance(obj, Speakable)\nOutput: True",
    hint: "@runtime_checkable class Speakable(Protocol)",
    starterCode: "",
  },
  {
    id: "py-if-e5",
    title: "Iterable Interface",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Implement __iter__ to make class iterable.\n\nInput: for x in MyRange(1,5)\nOutput: 1 2 3 4",
    hint: "def __iter__: yield",
    starterCode: "",
  },
  {
    id: "py-if-e6",
    title: "Comparable Interface",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Implement __lt__ for sorting.\n\nInput: sorted([Phone:300, TV:500, Tablet:400])\nOutput: Phone Tablet TV",
    hint: "__lt__ in Product",
    starterCode: "",
  },
  {
    id: "py-if-e7",
    title: "Callable Interface",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Implement __call__ to make object callable.\n\nInput: obj(5)\nOutput: 25",
    hint: "def __call__(self, n): return n**2",
    starterCode: "",
  },
  {
    id: "py-if-e8",
    title: "Context Manager Interface",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Implement __enter__ __exit__.\n\nInput: with MyResource()\nOutput: Open / Closed",
    hint: "def __enter__ and __exit__",
    starterCode: "",
  },
  {
    id: "py-if-e9",
    title: "Sized Interface",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Implement __len__ for len() support.\n\nInput: len(MyCollection)\nOutput: 5",
    hint: "def __len__(self): return len(self._data)",
    starterCode: "",
  },
  {
    id: "py-if-e10",
    title: "Hashable Interface",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Implement __hash__ for dict key use.\n\nInput: Point(1,2) as key\nOutput: Value retrieved",
    hint: "def __hash__(self): return hash((self.x, self.y))",
    starterCode: "",
  },
  {
    id: "py-if-m1",
    title: "Dependency Injection",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Inject interface dependency.\n\nInput: Service(EmailNotifier())\nOutput: Email sent",
    hint: "Notifier Protocol; EmailNotifier, SMSNotifier",
    starterCode: "",
  },
  {
    id: "py-if-m2",
    title: "Strategy via Protocol",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Swap discount strategy at runtime.\n\nInput: 10% / 20%\nOutput: 900 / 800",
    hint: "DiscountStrategy Protocol",
    starterCode: "",
  },
  {
    id: "py-if-m3",
    title: "Iterator Interface Full",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Implement full Iterator protocol.\n\nInput: Iterate [1,2,3,4,5]\nOutput: 1 2 3 4 5",
    hint: "__iter__ returns self; __next__ advances",
    starterCode: "",
  },
  {
    id: "py-if-m4",
    title: "Numeric Tower",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "numbers.Number interface hierarchy.\n\nInput: int is Complex: True\nOutput: isinstance(5, numbers.Complex)",
    hint: "import numbers",
    starterCode: "",
  },
  {
    id: "py-if-m5",
    title: "Callback Protocol",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Protocol for callback; pass as arg.\n\nInput: on_done triggered\nOutput: Callback ran",
    hint: "Protocol with __call__ method",
    starterCode: "",
  },
  {
    id: "py-if-m6",
    title: "Comparable Full",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Implement all comparison dunders.\n\nInput: p1 < p2, p1 == p2\nOutput: True / False",
    hint: "__lt__ __le__ __eq__ __ge__ __gt__",
    starterCode: "",
  },
  {
    id: "py-if-m7",
    title: "Container Interface",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Implement __contains__ for 'in' operator.\n\nInput: 3 in MyRange(1,5)\nOutput: True",
    hint: "def __contains__(self, item)",
    starterCode: "",
  },
  {
    id: "py-if-m8",
    title: "Sequence Interface",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Implement Sequence ABC methods.\n\nInput: MySeq[2], len, reversed\nOutput: All work",
    hint: "collections.abc.Sequence",
    starterCode: "",
  },
  {
    id: "py-if-m9",
    title: "Mapping Interface",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Implement Mapping interface for dict-like class.\n\nInput: obj['key']\nOutput: Value",
    hint: "collections.abc.Mapping",
    starterCode: "",
  },
  {
    id: "py-if-m10",
    title: "Generator Protocol",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Generator implements iterator protocol.\n\nInput: for x in gen()\nOutput: 1 2 3",
    hint: "Generator is iterator via yield",
    starterCode: "",
  },
  {
    id: "py-if-h1",
    title: "Repository Pattern",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Abstract repo via Protocol; InMemory impl.\n\nInput: save, find, delete\nOutput: All work",
    hint: "Protocol with save, find, delete",
    starterCode: "",
  },
  {
    id: "py-if-h2",
    title: "Observer via Protocol",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Observer pattern with Protocol.\n\nInput: subject.notify(5)\nOutput: All observers receive 5",
    hint: "Protocol with update method",
    starterCode: "",
  },
  {
    id: "py-if-h3",
    title: "Fluent Interface",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Fluent query builder.\n\nInput: Query.from_('users').where('age>18').limit(10)\nOutput: Query built",
    hint: "Each method returns self",
    starterCode: "",
  },
  {
    id: "py-if-h4",
    title: "Event Bus Protocol",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "EventListener Protocol; bus routes events.\n\nInput: publish LoginEvent\nOutput: Auth and Log listeners handle",
    hint: "Dict[type, List[Listener]] bus",
    starterCode: "",
  },
  {
    id: "py-if-h5",
    title: "Pipeline Protocol",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Chain Filter Protocol objects.\n\nInput: [Validate, Trim, Upper]\nOutput: HELLO",
    hint: "Protocol apply(data); chain returns data",
    starterCode: "",
  },
  {
    id: "py-if-h6",
    title: "Composite Protocol",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Component Protocol; Leaf and Composite.\n\nInput: Folder tree\nOutput: Total size",
    hint: "get_size() in Protocol",
    starterCode: "",
  },
  {
    id: "py-if-h7",
    title: "Generic Protocol",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Generic Protocol Transformer[T,R].\n\nInput: str->int transformer\nOutput: '42' -> 42",
    hint: "class Transformer(Protocol[T,R])",
    starterCode: "",
  },
  {
    id: "py-if-h8",
    title: "Mediator Protocol",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Mediator decouples components.\n\nInput: A sends to B via Mediator\nOutput: Message delivered",
    hint: "Protocol with send(from, msg, to)",
    starterCode: "",
  },
  {
    id: "py-if-h9",
    title: "Lazy Protocol",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Lazy evaluation via generator Protocol.\n\nInput: Consume first 5 of infinite\nOutput: 1 2 3 4 5",
    hint: "Protocol with __iter__ returning generator",
    starterCode: "",
  },
  {
    id: "py-if-h10",
    title: "Plugin Registry Protocol",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Register and run plugins via Protocol.\n\nInput: [LogPlugin, AuditPlugin]\nOutput: Both ran in order",
    hint: "Plugin Protocol with run(); registry list",
    starterCode: "",
  },

  // ===== Exception Handling =====
  {
    id: "py-ex-e1",
    title: "Try Except",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Divide by zero and catch.\n\nInput: 10 0\nOutput: Cannot divide by zero",
    hint: "try: 10/0 except ZeroDivisionError:",
    starterCode: "",
  },
  {
    id: "py-ex-e2",
    title: "ValueError",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Parse invalid string and catch ValueError.\n\nInput: abc\nOutput: Invalid number",
    hint: "int('abc') raises ValueError",
    starterCode: "",
  },
  {
    id: "py-ex-e3",
    title: "Finally Block",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Finally runs always.\n\nInput: None\nOutput: Try / Finally always runs",
    hint: "try: ... except: ... finally:",
    starterCode: "",
  },
  {
    id: "py-ex-e4",
    title: "Index Error",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Catch index out of range.\n\nInput: [1,2,3][10]\nOutput: Index out of range",
    hint: "except IndexError:",
    starterCode: "",
  },
  {
    id: "py-ex-e5",
    title: "Key Error",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Catch missing dict key.\n\nInput: d['missing']\nOutput: Key not found",
    hint: "except KeyError:",
    starterCode: "",
  },
  {
    id: "py-ex-e6",
    title: "Multiple Except",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Multiple except blocks.\n\nInput: various\nOutput: Correct exception caught",
    hint: "except ZeroDivisionError: except ValueError:",
    starterCode: "",
  },
  {
    id: "py-ex-e7",
    title: "Raise Exception",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Raise ValueError for negative input.\n\nInput: -5\nOutput: ValueError: Negative not allowed",
    hint: "raise ValueError('...')",
    starterCode: "",
  },
  {
    id: "py-ex-e8",
    title: "Exception Message",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Print exception message.\n\nInput: 5/0\nOutput: division by zero",
    hint: "str(e) or e.args[0]",
    starterCode: "",
  },
  {
    id: "py-ex-e9",
    title: "Except Exception",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Catch all exceptions with base Exception.\n\nInput: Any error\nOutput: Caught: ...",
    hint: "except Exception as e:",
    starterCode: "",
  },
  {
    id: "py-ex-e10",
    title: "Else in Try",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "else block runs when no exception.\n\nInput: 10 2\nOutput: Result: 5 (else runs)",
    hint: "try: ... except: ... else: ...",
    starterCode: "",
  },
  {
    id: "py-ex-m1",
    title: "Custom Exception",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Custom InsufficientFundsError.\n\nInput: withdraw 500 from 200\nOutput: InsufficientFundsError: need 300 more",
    hint: "class InsufficientFundsError(Exception)",
    starterCode: "",
  },
  {
    id: "py-ex-m2",
    title: "Exception Chaining",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "raise from for exception chaining.\n\nInput: DB error\nOutput: ServiceError caused by DBError",
    hint: "raise ServiceError from e",
    starterCode: "",
  },
  {
    id: "py-ex-m3",
    title: "Try With Open",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Handle file not found.\n\nInput: open('notexist.txt')\nOutput: File not found",
    hint: "except FileNotFoundError:",
    starterCode: "",
  },
  {
    id: "py-ex-m4",
    title: "Context Manager Exception",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "contextlib.suppress to ignore specific error.\n\nInput: KeyError happens\nOutput: Silently suppressed",
    hint: "with suppress(KeyError):",
    starterCode: "",
  },
  {
    id: "py-ex-m5",
    title: "Exception in Loop",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Parse list; skip invalid and continue.\n\nInput: [1,2,abc,4]\nOutput: Sum: 7",
    hint: "try-except inside loop, continue on error",
    starterCode: "",
  },
  {
    id: "py-ex-m6",
    title: "Validate Input",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Validate age and raise descriptive error.\n\nInput: age=-1\nOutput: Age must be 0-120",
    hint: "if not 0 <= age <= 120: raise ValueError",
    starterCode: "",
  },
  {
    id: "py-ex-m7",
    title: "Re-raise Exception",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Log then re-raise.\n\nInput: error\nOutput: Logged then re-raised",
    hint: "except Exception: log; raise",
    starterCode: "",
  },
  {
    id: "py-ex-m8",
    title: "Exception Hierarchy",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Custom exception hierarchy.\n\nInput: AppError > NetworkError > TimeoutError\nOutput: catch parent catches all",
    hint: "class NetworkError(AppError):",
    starterCode: "",
  },
  {
    id: "py-ex-m9",
    title: "Optional vs Exception",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Return None instead of raising.\n\nInput: find_user(99)\nOutput: None (not found)",
    hint: "Return None instead of raise",
    starterCode: "",
  },
  {
    id: "py-ex-m10",
    title: "Traceback Module",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Print traceback with traceback module.\n\nInput: exception occurs\nOutput: Full traceback string",
    hint: "import traceback; traceback.format_exc()",
    starterCode: "",
  },
  {
    id: "py-ex-h1",
    title: "Retry Decorator",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Retry decorator up to 3 times.\n\nInput: Unstable function\nOutput: Retry 1, 2, Success on 3",
    hint: "@retry(max_attempts=3) decorator",
    starterCode: "",
  },
  {
    id: "py-ex-h2",
    title: "Exception Registry",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Register handlers per exception type.\n\nInput: Different errors\nOutput: Correct handler called",
    hint: "Dict[type, Callable] registry",
    starterCode: "",
  },
  {
    id: "py-ex-h3",
    title: "Result Type",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Return Result(ok/err) instead of exception.\n\nInput: parse('42') / parse('abc')\nOutput: Success(42) / Failure(invalid)",
    hint: "class Result with is_ok()",
    starterCode: "",
  },
  {
    id: "py-ex-h4",
    title: "Exception in Generator",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Handle exceptions thrown into generator.\n\nInput: gen.throw(StopIteration)\nOutput: Generator handles it",
    hint: "try-except inside generator",
    starterCode: "",
  },
  {
    id: "py-ex-h5",
    title: "Async Exception",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Handle exception in async function.\n\nInput: await unstable_op()\nOutput: Handled async error",
    hint: "try-except in async def",
    starterCode: "",
  },
  {
    id: "py-ex-h6",
    title: "Transaction Pattern",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Rollback on exception.\n\nInput: Multi-step with one fail\nOutput: All rolled back",
    hint: "try-except, rollback in except",
    starterCode: "",
  },
  {
    id: "py-ex-h7",
    title: "Exception Groups",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Python 3.11+ ExceptionGroup handling.\n\nInput: Multiple parallel errors\nOutput: Each handled separately",
    hint: "except* ValueError as eg:",
    starterCode: "",
  },
  {
    id: "py-ex-h8",
    title: "Bulkhead Pattern",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Isolate failures; others continue.\n\nInput: 3 services, one fails\nOutput: Others succeed",
    hint: "Separate try-except per service",
    starterCode: "",
  },
  {
    id: "py-ex-h9",
    title: "Functional Error Handling",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Either monad: Right(value) or Left(error).\n\nInput: parse success / fail\nOutput: Right(42) / Left(error)",
    hint: "Either class with map and flat_map",
    starterCode: "",
  },
  {
    id: "py-ex-h10",
    title: "Custom Warning",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Custom DeprecationWarning subclass.\n\nInput: old_function()\nOutput: DeprecationWarning raised",
    hint: "class OldAPIWarning(DeprecationWarning); warnings.warn",
    starterCode: "",
  },

  // ===== Multi Threading =====
  {
    id: "py-mt-e1",
    title: "Create Thread",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Create and start a thread.\n\nInput: None\nOutput: Thread running",
    hint: "import threading; threading.Thread(target=...)",
    starterCode: "",
  },
  {
    id: "py-mt-e2",
    title: "Thread with Args",
    difficulty: "Easy",
    topic: "Multi Threading",
    description: "Pass args to thread function.\n\nInput: 5\nOutput: 25",
    hint: "Thread(target=square, args=(5,))",
    starterCode: "",
  },
  {
    id: "py-mt-e3",
    title: "Thread Join",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Main waits for thread with join().\n\nInput: None\nOutput: Thread done, then Main",
    hint: "t.join()",
    starterCode: "",
  },
  {
    id: "py-mt-e4",
    title: "Thread Name",
    difficulty: "Easy",
    topic: "Multi Threading",
    description: "Set and get thread name.\n\nInput: None\nOutput: Worker-1",
    hint: "Thread(name='Worker-1')",
    starterCode: "",
  },
  {
    id: "py-mt-e5",
    title: "Multiple Threads",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Start 3 threads.\n\nInput: None\nOutput: T1 T2 T3 (any order)",
    hint: "Create and start 3 threads",
    starterCode: "",
  },
  {
    id: "py-mt-e6",
    title: "Daemon Thread",
    difficulty: "Easy",
    topic: "Multi Threading",
    description: "Create daemon thread.\n\nInput: None\nOutput: isDaemon: True",
    hint: "Thread(daemon=True)",
    starterCode: "",
  },
  {
    id: "py-mt-e7",
    title: "Thread Sleep",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Thread sleeps 1 second.\n\nInput: None\nOutput: Before... After",
    hint: "time.sleep(1)",
    starterCode: "",
  },
  {
    id: "py-mt-e8",
    title: "Lambda Thread",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Thread using lambda target.\n\nInput: None\nOutput: Lambda running",
    hint: "Thread(target=lambda: print(...))",
    starterCode: "",
  },
  {
    id: "py-mt-e9",
    title: "Current Thread",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Print current thread name.\n\nInput: None\nOutput: MainThread or Thread-1",
    hint: "threading.current_thread().name",
    starterCode: "",
  },
  {
    id: "py-mt-e10",
    title: "Active Threads",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Count active threads.\n\nInput: 3 threads running\nOutput: Active: 4 (including main)",
    hint: "threading.active_count()",
    starterCode: "",
  },
  {
    id: "py-mt-m1",
    title: "Lock Synchronization",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Lock to synchronize counter.\n\nInput: 5 threads increment 100 times\nOutput: 500",
    hint: "lock = threading.Lock(); with lock:",
    starterCode: "",
  },
  {
    id: "py-mt-m2",
    title: "RLock",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "RLock allows re-entrant locking.\n\nInput: Recursive locked function\nOutput: Works without deadlock",
    hint: "threading.RLock()",
    starterCode: "",
  },
  {
    id: "py-mt-m3",
    title: "Thread Event",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Event for thread signaling.\n\nInput: Thread waits for event\nOutput: Signal received, thread proceeds",
    hint: "event = threading.Event(); event.wait(); event.set()",
    starterCode: "",
  },
  {
    id: "py-mt-m4",
    title: "Semaphore",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Semaphore limits concurrent access.\n\nInput: 5 threads, semaphore=2\nOutput: Only 2 at a time",
    hint: "threading.Semaphore(2)",
    starterCode: "",
  },
  {
    id: "py-mt-m5",
    title: "Queue Thread Safe",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Producer-consumer with Queue.\n\nInput: Produce 5, consume 5\nOutput: All consumed",
    hint: "queue.Queue(); put and get",
    starterCode: "",
  },
  {
    id: "py-mt-m6",
    title: "ThreadPoolExecutor",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Thread pool to run tasks.\n\nInput: 5 tasks, pool=3\nOutput: All completed",
    hint: "concurrent.futures.ThreadPoolExecutor",
    starterCode: "",
  },
  {
    id: "py-mt-m7",
    title: "Future Result",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Submit task, get result via Future.\n\nInput: compute 10*10\nOutput: Result: 100",
    hint: "future = executor.submit(fn); future.result()",
    starterCode: "",
  },
  {
    id: "py-mt-m8",
    title: "Condition Variable",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Condition for producer-consumer sync.\n\nInput: Producer, Consumer\nOutput: Produced 5, Consumed 5",
    hint: "threading.Condition(); wait(), notify()",
    starterCode: "",
  },
  {
    id: "py-mt-m9",
    title: "Barrier",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "All threads meet at barrier.\n\nInput: 3 threads\nOutput: All reached barrier, proceed",
    hint: "threading.Barrier(3)",
    starterCode: "",
  },
  {
    id: "py-mt-m10",
    title: "ThreadLocal",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Thread-local storage.\n\nInput: Thread1 x=1, Thread2 x=2\nOutput: Each reads own x",
    hint: "threading.local()",
    starterCode: "",
  },
  {
    id: "py-mt-h1",
    title: "ProcessPoolExecutor",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "CPU-bound task with ProcessPool.\n\nInput: large computation\nOutput: Faster with multiprocessing",
    hint: "concurrent.futures.ProcessPoolExecutor",
    starterCode: "",
  },
  {
    id: "py-mt-h2",
    title: "Asyncio Basics",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Async function with asyncio.\n\nInput: async fetch\nOutput: Fetched concurrently",
    hint: "async def; await; asyncio.run()",
    starterCode: "",
  },
  {
    id: "py-mt-h3",
    title: "Asyncio Gather",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Run coroutines concurrently with gather.\n\nInput: 3 async tasks\nOutput: All results",
    hint: "await asyncio.gather(*coros)",
    starterCode: "",
  },
  {
    id: "py-mt-h4",
    title: "Thread Pool Worker",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Custom thread pool implementation.\n\nInput: 10 tasks, pool=3\nOutput: All done, 3 workers",
    hint: "Queue + worker threads",
    starterCode: "",
  },
  {
    id: "py-mt-h5",
    title: "GIL Demonstration",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Show GIL limits CPU-bound threading.\n\nInput: CPU task with 1 vs 4 threads\nOutput: Similar time (GIL)",
    hint: "time.time() comparison",
    starterCode: "",
  },
  {
    id: "py-mt-h6",
    title: "Deadlock Example",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Show deadlock and prevention.\n\nInput: Two threads, two locks\nOutput: Deadlock detected/avoided",
    hint: "Always lock in same order",
    starterCode: "",
  },
  {
    id: "py-mt-h7",
    title: "ReadWriteLock",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Multiple readers, exclusive writer.\n\nInput: 3 readers, 1 writer\nOutput: Readers concurrent, writer exclusive",
    hint: "Custom RWLock with Condition",
    starterCode: "",
  },
  {
    id: "py-mt-h8",
    title: "Rate Limiter",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Limit calls per second using Semaphore.\n\nInput: 10 calls, limit=3/sec\nOutput: Rate limited output",
    hint: "Semaphore + sleep for rate control",
    starterCode: "",
  },
  {
    id: "py-mt-h9",
    title: "Scheduler Thread",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Schedule task every 2 seconds.\n\nInput: 3 runs\nOutput: Ran at T=0, 2, 4",
    hint: "Timer(2, func).start() recursively",
    starterCode: "",
  },
  {
    id: "py-mt-h10",
    title: "Concurrent Counter",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Compare Lock, RLock, Semaphore for counter.\n\nInput: 100 threads increment\nOutput: All give correct 100",
    hint: "Three implementations side by side",
    starterCode: "",
  },
];
