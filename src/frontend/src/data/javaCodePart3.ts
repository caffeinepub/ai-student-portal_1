import type { Problem } from "./codingData";

export const javaCodePart3: Problem[] = [
  // ===== Constructor =====
  {
    id: "j-co-e1",
    title: "Default Constructor",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Create class with default constructor that sets default values.\n\nInput: new Car()\nOutput: Color:Red Speed:0",
    hint: "No-arg constructor",
    starterCode: "",
  },
  {
    id: "j-co-e2",
    title: "Parameterized Constructor",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Create Person with constructor taking name and age.\n\nInput: Alice 25\nOutput: Name:Alice Age:25",
    hint: "public Person(String name, int age)",
    starterCode: "",
  },
  {
    id: "j-co-e3",
    title: "Constructor This Keyword",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Use 'this' to resolve naming conflict in constructor.\n\nInput: 10\nOutput: Value: 10",
    hint: "this.value = value;",
    starterCode: "",
  },
  {
    id: "j-co-e4",
    title: "Constructor Chaining",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Use this() to chain constructors.\n\nInput: None / Alice\nOutput: Default used / Alice created",
    hint: "this() must be first statement",
    starterCode: "",
  },
  {
    id: "j-co-e5",
    title: "Super Constructor",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Call parent class constructor using super().\n\nInput: Dog Buddy\nOutput: Animal: Buddy",
    hint: "super(name) in Dog constructor",
    starterCode: "",
  },
  {
    id: "j-co-e6",
    title: "Copy Constructor",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Create a copy constructor for a Point class.\n\nInput: p1=(3,4), copy to p2\nOutput: p2=(3,4)",
    hint: "public Point(Point p) { x=p.x; y=p.y; }",
    starterCode: "",
  },
  {
    id: "j-co-e7",
    title: "Constructor With Validation",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Constructor throws exception for negative age.\n\nInput: -5\nOutput: IllegalArgumentException",
    hint: "if(age<0) throw new IllegalArgumentException",
    starterCode: "",
  },
  {
    id: "j-co-e8",
    title: "Static Initializer",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Use static initializer block to set a static field.\n\nInput: None\nOutput: Static block ran, count=0",
    hint: "static { count = 0; }",
    starterCode: "",
  },
  {
    id: "j-co-e9",
    title: "Instance Initializer",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Use instance initializer block to log creation.\n\nInput: new Obj()\nOutput: Initializer ran, constructor ran",
    hint: "Instance block { } before constructor",
    starterCode: "",
  },
  {
    id: "j-co-e10",
    title: "Print Constructor Order",
    difficulty: "Easy",
    topic: "Constructor",
    description:
      "Show order: static block, instance block, constructor.\n\nInput: new MyClass()\nOutput: Static -> Instance -> Constructor",
    hint: "Three separate blocks",
    starterCode: "",
  },
  {
    id: "j-co-m1",
    title: "Constructor Overloading",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Provide 3 constructors: no-arg, one-arg, two-arg.\n\nInput: new Book() / new Book('Java') / new Book('Java','Oracle')\nOutput: Unknown Unknown / Java Unknown / Java Oracle",
    hint: "Three constructors",
    starterCode: "",
  },
  {
    id: "j-co-m2",
    title: "Immutable with Constructor",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Create immutable class using constructor only (no setters).\n\nInput: new ImmutablePoint(5,10)\nOutput: (5,10) stays fixed",
    hint: "final fields + no setters",
    starterCode: "",
  },
  {
    id: "j-co-m3",
    title: "Factory vs Constructor",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Show static factory method vs constructor.\n\nInput: None\nOutput: Factory creates same name object",
    hint: "static of() method vs new()",
    starterCode: "",
  },
  {
    id: "j-co-m4",
    title: "Constructor with ArrayList",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Constructor initializes a list and adds default items.\n\nInput: new Team('Dev')\nOutput: Team Dev with 3 default members",
    hint: "this.members = new ArrayList();",
    starterCode: "",
  },
  {
    id: "j-co-m5",
    title: "Singleton Constructor",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Private constructor enforces singleton pattern.\n\nInput: getInstance() twice\nOutput: Same object",
    hint: "private constructor, public getInstance()",
    starterCode: "",
  },
  {
    id: "j-co-m6",
    title: "Inheritance Constructor Chain",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Show constructor order in multi-level inheritance.\n\nInput: new C() where C extends B extends A\nOutput: A -> B -> C",
    hint: "super() called implicitly if not given",
    starterCode: "",
  },
  {
    id: "j-co-m7",
    title: "Object Count via Constructor",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Count total objects created using static counter in constructor.\n\nInput: new Obj() 3 times\nOutput: Total objects: 3",
    hint: "static int count; count++; in constructor",
    starterCode: "",
  },
  {
    id: "j-co-m8",
    title: "Constructor vs init Method",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Compare init-method approach vs constructor approach.\n\nInput: None\nOutput: Both initialize x=10",
    hint: "One uses constructor, other an init()",
    starterCode: "",
  },
  {
    id: "j-co-m9",
    title: "Copy and Modify",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Use copy constructor then modify the copy; original unchanged.\n\nInput: p1=(5,5), copy p2, move p2 to (1,1)\nOutput: p1=(5,5) p2=(1,1)",
    hint: "Defensive copy in constructor",
    starterCode: "",
  },
  {
    id: "j-co-m10",
    title: "Builder Pattern with Constructor",
    difficulty: "Medium",
    topic: "Constructor",
    description:
      "Private constructor called by inner Builder class.\n\nInput: Person.builder().name('Alice').age(30).build()\nOutput: Alice 30",
    hint: "Person(Builder b) { name=b.name; }",
    starterCode: "",
  },
  {
    id: "j-co-h1",
    title: "Prototype Pattern",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Implement prototype pattern using copy constructor.\n\nInput: clone Shape\nOutput: Cloned shape same values",
    hint: "Implement Cloneable or copy constructor",
    starterCode: "",
  },
  {
    id: "j-co-h2",
    title: "Dependency Injection Constructor",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Inject a service dependency via constructor.\n\nInput: new Service(new Logger())\nOutput: Service uses injected logger",
    hint: "Constructor accepts Logger interface",
    starterCode: "",
  },
  {
    id: "j-co-h3",
    title: "Lazy Singleton",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Thread-safe lazy-initialized singleton.\n\nInput: parallel getInstance()\nOutput: Same instance always",
    hint: "Double-checked locking pattern",
    starterCode: "",
  },
  {
    id: "j-co-h4",
    title: "Abstract Factory",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Use abstract factory to create different GUI components.\n\nInput: WindowsFactory / MacFactory\nOutput: Windows button / Mac button",
    hint: "Factory creates concrete objects",
    starterCode: "",
  },
  {
    id: "j-co-h5",
    title: "Reconstruct from String",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Constructor parses CSV string to create object.\n\nInput: 'Alice,25,3.8'\nOutput: Student{Alice,25,3.8}",
    hint: "Split by comma in constructor",
    starterCode: "",
  },
  {
    id: "j-co-h6",
    title: "Enum Constructor",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Enum with constructor that stores properties.\n\nInput: Planet.EARTH\nOutput: Mass:5.97e24 Radius:6.37e6",
    hint: "enum Planet { EARTH(mass,radius) }",
    starterCode: "",
  },
  {
    id: "j-co-h7",
    title: "Record Class",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Use Java record to auto-generate constructor and accessors.\n\nInput: record Point(int x, int y)\nOutput: Point[x=3, y=4]",
    hint: "record keyword",
    starterCode: "",
  },
  {
    id: "j-co-h8",
    title: "Constructor Reference Lambda",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Use constructor reference to create objects.\n\nInput: ['Alice','Bob']\nOutput: [Person(Alice), Person(Bob)]",
    hint: "Person::new in stream map",
    starterCode: "",
  },
  {
    id: "j-co-h9",
    title: "Deserialize Constructor",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Constructor reads from a map of key-value pairs.\n\nInput: {name:Alice, age:25}\nOutput: Person{Alice,25}",
    hint: "Map<String,String> in constructor",
    starterCode: "",
  },
  {
    id: "j-co-h10",
    title: "Multiton Pattern",
    difficulty: "Hard",
    topic: "Constructor",
    description:
      "Multiton: one instance per key (like Singleton per color).\n\nInput: get(RED) twice\nOutput: Same RED instance",
    hint: "Map<Key, Instance> instances",
    starterCode: "",
  },

  // ===== Static =====
  {
    id: "j-sta-e1",
    title: "Static Variable",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Static variable shared across all instances.\n\nInput: Two Counter objects increment\nOutput: count=2",
    hint: "static int count; count++;",
    starterCode: "",
  },
  {
    id: "j-sta-e2",
    title: "Static Method",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Call a static method without creating an object.\n\nInput: None\nOutput: Static method called",
    hint: "ClassName.method()",
    starterCode: "",
  },
  {
    id: "j-sta-e3",
    title: "Static Math Helper",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Use Math.sqrt() and Math.pow() static methods.\n\nInput: 16 / 2^8\nOutput: 4.0 256.0",
    hint: "Math.sqrt(), Math.pow()",
    starterCode: "",
  },
  {
    id: "j-sta-e4",
    title: "Static vs Instance",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Show static belongs to class, instance belongs to object.\n\nInput: None\nOutput: Static: 1 (same), Instance: 1, 2 (different)",
    hint: "One static, multiple instances",
    starterCode: "",
  },
  {
    id: "j-sta-e5",
    title: "Static Final Constant",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Define static final PI constant.\n\nInput: radius=5\nOutput: Area: 78.5",
    hint: "static final double PI = 3.14;",
    starterCode: "",
  },
  {
    id: "j-sta-e6",
    title: "Static Import",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Use static import for Math methods.\n\nInput: None\nOutput: 4.0 (sqrt of 16)",
    hint: "import static java.lang.Math.*;",
    starterCode: "",
  },
  {
    id: "j-sta-e7",
    title: "Static Factory Method",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Use Integer.valueOf() static factory method.\n\nInput: 42\nOutput: Integer: 42",
    hint: "Integer.valueOf(42)",
    starterCode: "",
  },
  {
    id: "j-sta-e8",
    title: "Static Block",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Use static block to initialize a complex static field.\n\nInput: None\nOutput: Config loaded",
    hint: "static { config = loadConfig(); }",
    starterCode: "",
  },
  {
    id: "j-sta-e9",
    title: "Count Instances",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Count how many objects created using static counter.\n\nInput: create 5 objects\nOutput: Count: 5",
    hint: "static int count; increment in constructor",
    starterCode: "",
  },
  {
    id: "j-sta-e10",
    title: "Static Utility Class",
    difficulty: "Easy",
    topic: "Static",
    description:
      "Create a utility class with all static methods.\n\nInput: MathUtils.add(3,4)\nOutput: 7",
    hint: "final class with private constructor",
    starterCode: "",
  },
  {
    id: "j-sta-m1",
    title: "Static Cache",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Cache computed values in a static HashMap.\n\nInput: fib(10) twice\nOutput: 55 (computed once)",
    hint: "static Map<Integer,Integer> cache",
    starterCode: "",
  },
  {
    id: "j-sta-m2",
    title: "Static Registry",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Registry of all created objects using static list.\n\nInput: new Product() 3 times\nOutput: Registry size: 3",
    hint: "static List<Product> registry",
    starterCode: "",
  },
  {
    id: "j-sta-m3",
    title: "Static Nested Class",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Use static nested class for helper logic.\n\nInput: new Outer.Inner()\nOutput: Inner class created without Outer",
    hint: "static class Inner inside Outer",
    starterCode: "",
  },
  {
    id: "j-sta-m4",
    title: "Static Polymorphism",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Show static method binding is compile-time only.\n\nInput: Animal a = new Dog()\nOutput: Animal static method (not Dog)",
    hint: "Static methods are not overridden",
    starterCode: "",
  },
  {
    id: "j-sta-m5",
    title: "Static Config Loader",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Simulate loading app config once at class load.\n\nInput: Config.get('theme')\nOutput: dark",
    hint: "static Map init in static block",
    starterCode: "",
  },
  {
    id: "j-sta-m6",
    title: "Class Level Counter",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Each subclass counts its own instances separately.\n\nInput: 2 Dogs, 3 Cats\nOutput: Dog:2 Cat:3",
    hint: "Each subclass has own static counter",
    starterCode: "",
  },
  {
    id: "j-sta-m7",
    title: "Static Comparator",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Define static Comparator to sort list of People by age.\n\nInput: [Bob:30, Alice:25, Carol:35]\nOutput: Alice Bob Carol",
    hint: "static Comparator<Person> BY_AGE",
    starterCode: "",
  },
  {
    id: "j-sta-m8",
    title: "Static String Pool",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Show string literals share pool; intern() forces it.\n\nInput: None\nOutput: Pooled:true Heaped:false",
    hint: "'hello' == 'hello' vs new String",
    starterCode: "",
  },
  {
    id: "j-sta-m9",
    title: "Thread ID Static",
    difficulty: "Medium",
    topic: "Static",
    description:
      "Assign sequential IDs to threads using static counter.\n\nInput: 3 threads\nOutput: Thread-1 Thread-2 Thread-3",
    hint: "static int nextId; id = nextId++;",
    starterCode: "",
  },
  {
    id: "j-sta-m10",
    title: "Static Map Lookup",
    difficulty: "Medium",
    topic: "Static",
    description:
      "HTTP status codes in static map; look up by code.\n\nInput: 404\nOutput: Not Found",
    hint: "static Map<Integer,String> STATUS",
    starterCode: "",
  },
  {
    id: "j-sta-h1",
    title: "Enum with Static Methods",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Enum with static fromString() factory.\n\nInput: 'NORTH'\nOutput: Direction.NORTH",
    hint: "static Direction fromString(String s)",
    starterCode: "",
  },
  {
    id: "j-sta-h2",
    title: "Static Context Problem",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Show issue: static method can't access instance field.\n\nInput: None\nOutput: Error: non-static field in static context",
    hint: "this not available in static",
    starterCode: "",
  },
  {
    id: "j-sta-h3",
    title: "Initialization Order",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Print order of static and instance initialization.\n\nInput: None\nOutput: Static > Instance > Constructor each time",
    hint: "Static only once, instance each new()",
    starterCode: "",
  },
  {
    id: "j-sta-h4",
    title: "Static Inner Builder",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Full builder pattern with static inner class.\n\nInput: User.builder().name('A').email('a@b.com').build()\nOutput: User{A,a@b.com}",
    hint: "public static class Builder",
    starterCode: "",
  },
  {
    id: "j-sta-h5",
    title: "JVM Memory Static",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Explain with code: static fields in Method Area.\n\nInput: None\nOutput: Static shared across JVM lifetime",
    hint: "Print explanation via static field",
    starterCode: "",
  },
  {
    id: "j-sta-h6",
    title: "Static Dependency",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Avoid static dependency: show before and after refactor.\n\nInput: None\nOutput: Injected service instead of static",
    hint: "Replace Static.get() with constructor injection",
    starterCode: "",
  },
  {
    id: "j-sta-h7",
    title: "Benchmarking Static",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Benchmark static vs instance method call performance.\n\nInput: 1000000 calls each\nOutput: Static: Xms, Instance: Yms",
    hint: "System.nanoTime() before/after",
    starterCode: "",
  },
  {
    id: "j-sta-h8",
    title: "Multiton with Static Map",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Manage multiple named singletons in static map.\n\nInput: Pool.get('A'), Pool.get('A')\nOutput: Same instance",
    hint: "static Map<String,Pool> instances",
    starterCode: "",
  },
  {
    id: "j-sta-h9",
    title: "Static Proxy",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Static wrapper intercepts all calls to a service.\n\nInput: StaticProxy.execute('greet')\nOutput: [LOG] greet called",
    hint: "Static method delegates with logging",
    starterCode: "",
  },
  {
    id: "j-sta-h10",
    title: "Class Loader Trick",
    difficulty: "Hard",
    topic: "Static",
    description:
      "Show that static fields are reset when class is reloaded.\n\nInput: Reload class simulation\nOutput: Count reset to 0",
    hint: "Explain with printout only",
    starterCode: "",
  },

  // ===== Inheritance =====
  {
    id: "j-in-e1",
    title: "Basic Inheritance",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Dog extends Animal. Dog uses eat() from Animal.\n\nInput: Dog dog = new Dog()\nOutput: Animal eats. Dog barks.",
    hint: "extends keyword",
    starterCode: "",
  },
  {
    id: "j-in-e2",
    title: "Method Inherited",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Child uses parent method without overriding.\n\nInput: child.parentMethod()\nOutput: Parent method called",
    hint: "Child inherits all public/protected methods",
    starterCode: "",
  },
  {
    id: "j-in-e3",
    title: "IS-A Relationship",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Show Dog IS-A Animal using instanceof.\n\nInput: Dog object\nOutput: Is Animal: true",
    hint: "dog instanceof Animal",
    starterCode: "",
  },
  {
    id: "j-in-e4",
    title: "Override toString",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Override Object's toString in Employee class.\n\nInput: new Employee('Bob',50000)\nOutput: Employee{Bob,50000}",
    hint: "@Override toString()",
    starterCode: "",
  },
  {
    id: "j-in-e5",
    title: "Super Method Call",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Call parent speak() from Dog's override.\n\nInput: None\nOutput: Animal speaks. Dog barks too.",
    hint: "super.speak()",
    starterCode: "",
  },
  {
    id: "j-in-e6",
    title: "Multi-level Inheritance",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "C extends B extends A. C uses A's method.\n\nInput: new C()\nOutput: A method called from C",
    hint: "3-level chain",
    starterCode: "",
  },
  {
    id: "j-in-e7",
    title: "Inherited Field",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Access parent class field from child object.\n\nInput: none\nOutput: Species: Mammal (from parent)",
    hint: "Protected field in parent",
    starterCode: "",
  },
  {
    id: "j-in-e8",
    title: "Object Class Methods",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Show equals(), hashCode(), toString() from Object class.\n\nInput: None\nOutput: hashCode and toString printed",
    hint: "All classes extend Object",
    starterCode: "",
  },
  {
    id: "j-in-e9",
    title: "Final Class",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Try to extend a final class and show error.\n\nInput: None\nOutput: Cannot extend final class String",
    hint: "String is final; explain why",
    starterCode: "",
  },
  {
    id: "j-in-e10",
    title: "Constructor in Inheritance",
    difficulty: "Easy",
    topic: "Inheritance",
    description:
      "Parent constructor is called when creating child object.\n\nInput: new Child()\nOutput: Parent constructor\nChild constructor",
    hint: "super() called implicitly",
    starterCode: "",
  },
  {
    id: "j-in-m1",
    title: "Shape Hierarchy Area",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Shape base class; Circle and Rectangle compute area.\n\nInput: r=7 / l=4 w=6\nOutput: Circle:153.94 Rect:24",
    hint: "Override area() in each subclass",
    starterCode: "",
  },
  {
    id: "j-in-m2",
    title: "Vehicle Hierarchy",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Vehicle > Car > ElectricCar chain with overrides.\n\nInput: new ElectricCar()\nOutput: Vehicle vehicle, Car drives, Electric charges",
    hint: "Each level adds/overrides",
    starterCode: "",
  },
  {
    id: "j-in-m3",
    title: "Upcasting",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Store Dog in Animal reference; call overridden method.\n\nInput: Animal a = new Dog()\nOutput: Dog barks",
    hint: "Upcasting is automatic",
    starterCode: "",
  },
  {
    id: "j-in-m4",
    title: "Downcasting",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Downcast Animal to Dog and call Dog-specific method.\n\nInput: Animal a = new Dog()\nOutput: Dog fetches stick",
    hint: "Dog d = (Dog)a;",
    starterCode: "",
  },
  {
    id: "j-in-m5",
    title: "ClassCastException",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Show ClassCastException when wrong downcast.\n\nInput: Animal a = new Cat(); (Dog)a\nOutput: ClassCastException caught",
    hint: "Check with instanceof first",
    starterCode: "",
  },
  {
    id: "j-in-m6",
    title: "Method Hiding Static",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Show static method hiding (not overriding).\n\nInput: Animal a = new Dog()\nOutput: Animal static (not Dog)",
    hint: "Static methods belong to class",
    starterCode: "",
  },
  {
    id: "j-in-m7",
    title: "Covariant Return Type",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Override with covariant (narrowed) return type.\n\nInput: Dog.clone()\nOutput: Dog object returned",
    hint: "Dog clone() overrides Object clone()",
    starterCode: "",
  },
  {
    id: "j-in-m8",
    title: "Protected Access",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Protected field accessible in subclass but not outside.\n\nInput: access from child\nOutput: Protected field: 100",
    hint: "protected int field;",
    starterCode: "",
  },
  {
    id: "j-in-m9",
    title: "Employee Hierarchy",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "Manager extends Employee. Manager gets bonus on top.\n\nInput: Manager Bob salary=60000 bonus=10000\nOutput: Total: 70000",
    hint: "Override getSalary() to add bonus",
    starterCode: "",
  },
  {
    id: "j-in-m10",
    title: "Chain Super Calls",
    difficulty: "Medium",
    topic: "Inheritance",
    description:
      "C.method() calls super (B.method) which calls super (A.method).\n\nInput: new C().method()\nOutput: A B C",
    hint: "super.method() in each override",
    starterCode: "",
  },
  {
    id: "j-in-h1",
    title: "Diamond Problem",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Show diamond problem with interfaces and default methods.\n\nInput: class D implements B,C\nOutput: D resolves diamond using override",
    hint: "Java uses interface default methods",
    starterCode: "",
  },
  {
    id: "j-in-h2",
    title: "Abstract Hierarchy",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Abstract Animal; concrete Dog, Cat, Bird with sound().\n\nInput: [Dog,Cat,Bird]\nOutput: Woof Meow Tweet",
    hint: "abstract void sound(); override in each",
    starterCode: "",
  },
  {
    id: "j-in-h3",
    title: "Template Method Pattern",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Abstract class defines algorithm; subclasses fill steps.\n\nInput: TeaRecipe.make()\nOutput: Boil > Steep > AddLemon",
    hint: "Final template method calls abstract steps",
    starterCode: "",
  },
  {
    id: "j-in-h4",
    title: "Composite Pattern",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Tree structure: Component, Leaf, Composite.\n\nInput: Add leaves to composite\nOutput: Total price: 50",
    hint: "getPrice() on composite sums children",
    starterCode: "",
  },
  {
    id: "j-in-h5",
    title: "Strategy Pattern",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Swap sort strategies at runtime using inheritance.\n\nInput: BubbleSort / QuickSort\nOutput: Sorted with different strategies",
    hint: "SortStrategy interface, concrete strategies",
    starterCode: "",
  },
  {
    id: "j-in-h6",
    title: "Visitor Pattern",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Visitor traverses and processes different shape types.\n\nInput: Shapes: Circle, Rect\nOutput: Area visitor computes each",
    hint: "accept(Visitor v) in each Shape",
    starterCode: "",
  },
  {
    id: "j-in-h7",
    title: "Decorator Pattern",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Wrap Coffee with Milk and Sugar decorators.\n\nInput: new Sugar(new Milk(new Coffee()))\nOutput: Coffee+Milk+Sugar cost:5.5",
    hint: "Decorator extends Component, wraps it",
    starterCode: "",
  },
  {
    id: "j-in-h8",
    title: "Chain of Responsibility",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Request passed along handler chain until handled.\n\nInput: level=3 request\nOutput: Handler3 handles request",
    hint: "Each handler has next reference",
    starterCode: "",
  },
  {
    id: "j-in-h9",
    title: "Extends Comparable",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Sort list of Products by price using Comparable.\n\nInput: [TV:500, Phone:300, Tablet:400]\nOutput: Phone Tablet TV",
    hint: "Product implements Comparable<Product>",
    starterCode: "",
  },
  {
    id: "j-in-h10",
    title: "Object Graph",
    difficulty: "Hard",
    topic: "Inheritance",
    description:
      "Build an object graph with inheritance and print all.\n\nInput: Department > Team > Employee\nOutput: Dept:IT Team:Dev Emp:Alice",
    hint: "Nested objects using inheritance",
    starterCode: "",
  },

  // ===== Polymorphism =====
  {
    id: "j-po-e1",
    title: "Runtime Polymorphism",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "Animal array holds Dog and Cat; call speak() on each.\n\nInput: [Dog, Cat]\nOutput: Woof Meow",
    hint: "Animal[] arr; arr[0].speak()",
    starterCode: "",
  },
  {
    id: "j-po-e2",
    title: "Compile Time Poly",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "Method overloading as compile-time polymorphism.\n\nInput: print(5) / print('hi')\nOutput: Int: 5 / String: hi",
    hint: "Overloaded print methods",
    starterCode: "",
  },
  {
    id: "j-po-e3",
    title: "Polymorphic Method",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "Single method processes different shapes.\n\nInput: new Circle() / new Square()\nOutput: Circle drawn / Square drawn",
    hint: "Shape.draw() called on each",
    starterCode: "",
  },
  {
    id: "j-po-e4",
    title: "Dynamic Dispatch",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "Assign different subclass to parent reference and call.\n\nInput: ref = new Cat()\nOutput: Cat sound",
    hint: "JVM selects method at runtime",
    starterCode: "",
  },
  {
    id: "j-po-e5",
    title: "List of Animals",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "List<Animal> contains Dog, Cat, Bird; iterate and call sound().\n\nInput: [Dog,Cat,Bird]\nOutput: Woof Meow Tweet",
    hint: "for(Animal a: list) a.sound();",
    starterCode: "",
  },
  {
    id: "j-po-e6",
    title: "Polymorphic Payment",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "Payment interface; Card and Cash implement pay().\n\nInput: Card / Cash\nOutput: Paid by Card / Paid by Cash",
    hint: "Polymorphic through interface",
    starterCode: "",
  },
  {
    id: "j-po-e7",
    title: "Method Resolved at Runtime",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "Show method binding happens at runtime with overriding.\n\nInput: Parent p = new Child()\nOutput: Child method",
    hint: "Virtual method dispatch",
    starterCode: "",
  },
  {
    id: "j-po-e8",
    title: "Polymorphism with ArrayList",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "ArrayList<Shape> stores circles and rectangles.\n\nInput: 2 circles, 1 rect\nOutput: Areas printed for all",
    hint: "getArea() on each element",
    starterCode: "",
  },
  {
    id: "j-po-e9",
    title: "Late Binding",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "Show late binding: method version chosen at runtime.\n\nInput: None\nOutput: Subclass method runs",
    hint: "Parent ref, child object",
    starterCode: "",
  },
  {
    id: "j-po-e10",
    title: "Polymorphic Tax",
    difficulty: "Easy",
    topic: "Polymorphism",
    description:
      "Product, Book, Food each have different tax rates.\n\nInput: price=100 each\nOutput: Product:10 Book:0 Food:5",
    hint: "Override getTax() in each",
    starterCode: "",
  },
  {
    id: "j-po-m1",
    title: "Abstract vs Interface Poly",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Show polymorphism via abstract class vs interface.\n\nInput: None\nOutput: Both work for dynamic dispatch",
    hint: "Two examples side by side",
    starterCode: "",
  },
  {
    id: "j-po-m2",
    title: "Heterogeneous Collection",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Store different Employees in List, compute total salary.\n\nInput: Dev:70k, Manager:90k, Intern:30k\nOutput: Total: 190000",
    hint: "for(Employee e: list) total += e.getSalary()",
    starterCode: "",
  },
  {
    id: "j-po-m3",
    title: "Pluggable Algorithm",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Swap sorting algorithm at runtime using interface.\n\nInput: 'bubble' / 'merge'\nOutput: Sorted with different strategy",
    hint: "Sorter sorter = 'bubble'? new Bubble: new Merge",
    starterCode: "",
  },
  {
    id: "j-po-m4",
    title: "Functional Interface Poly",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Polymorphism via functional interface and lambda.\n\nInput: square / double\nOutput: 25 / 10",
    hint: "Function<Integer,Integer> f = x -> x*x;",
    starterCode: "",
  },
  {
    id: "j-po-m5",
    title: "Type Narrowing",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Use pattern matching instanceof (Java 16+).\n\nInput: Object o = 'hello'\nOutput: String of length 5",
    hint: "if(o instanceof String s)",
    starterCode: "",
  },
  {
    id: "j-po-m6",
    title: "Sealed Classes Poly",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Sealed Shape with Circle and Rect; switch expression.\n\nInput: Shape s = new Circle(5)\nOutput: Circle area 78.5",
    hint: "sealed interface, switch(s)",
    starterCode: "",
  },
  {
    id: "j-po-m7",
    title: "Multiple Interface Poly",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Class implements Printable and Saveable; use both.\n\nInput: Document d\nOutput: Printed and Saved",
    hint: "Two interfaces, one class",
    starterCode: "",
  },
  {
    id: "j-po-m8",
    title: "Command Pattern Poly",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Command interface; different actions executed polymorphically.\n\nInput: [Print, Save, Send]\nOutput: Printed Saved Sent",
    hint: "Command[] cmds; for each cmd.execute()",
    starterCode: "",
  },
  {
    id: "j-po-m9",
    title: "Polymorphic Serialization",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Serialize() method works for JSON, XML, CSV subtypes.\n\nInput: JsonSerializer / XmlSerializer\nOutput: {data} or <data>",
    hint: "Override serialize() in each class",
    starterCode: "",
  },
  {
    id: "j-po-m10",
    title: "Event Handler Poly",
    difficulty: "Medium",
    topic: "Polymorphism",
    description:
      "Polymorphic event handling: onClick, onHover, onDrag.\n\nInput: trigger click\nOutput: Click handled",
    hint: "EventHandler interface, override handle()",
    starterCode: "",
  },
  {
    id: "j-po-h1",
    title: "Double Dispatch",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Implement double dispatch with Visitor pattern.\n\nInput: Shape + Visitor\nOutput: Correct combination handled",
    hint: "shape.accept(visitor) calls visitor.visit(this)",
    starterCode: "",
  },
  {
    id: "j-po-h2",
    title: "Dynamic Proxy",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Java dynamic proxy to intercept method calls.\n\nInput: proxy.greet()\nOutput: [Before] greet [After]",
    hint: "Proxy.newProxyInstance() with InvocationHandler",
    starterCode: "",
  },
  {
    id: "j-po-h3",
    title: "Covariance in Collections",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Show wildcard bounds with polymorphism.\n\nInput: List<Dog> to List<Animal>\nOutput: Explains covariance vs invariance",
    hint: "List<? extends Animal>",
    starterCode: "",
  },
  {
    id: "j-po-h4",
    title: "Reflection Polymorphism",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Call overridden method using reflection.\n\nInput: Class.forName('Dog').getMethod('speak')\nOutput: Dog speaks",
    hint: "Method.invoke(obj)",
    starterCode: "",
  },
  {
    id: "j-po-h5",
    title: "Plugin Architecture",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Load plugins at runtime, call via interface.\n\nInput: plugins=[Log,Audit]\nOutput: Log plugin ran, Audit plugin ran",
    hint: "Plugin[] plugins; for(Plugin p) p.run()",
    starterCode: "",
  },
  {
    id: "j-po-h6",
    title: "Type-Safe Heterogeneous Container",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Container stores typed values, retrieves without cast.\n\nInput: put(String.class,'hello'), get(String.class)\nOutput: hello",
    hint: "Map<Class<T>,T> container",
    starterCode: "",
  },
  {
    id: "j-po-h7",
    title: "Reduce with Polymorphism",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Reduce a list using polymorphic Reducer objects.\n\nInput: [Sum, Max, Min] reducers on [1,2,3,4,5]\nOutput: 15 5 1",
    hint: "Reducer interface with reduce(int[], int acc)",
    starterCode: "",
  },
  {
    id: "j-po-h8",
    title: "Interpreter Pattern",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Simple expression interpreter with polymorphism.\n\nInput: (3 + 4) * 2\nOutput: 14",
    hint: "Expression interface: evaluate()",
    starterCode: "",
  },
  {
    id: "j-po-h9",
    title: "Polymorphic Builder",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Subclassed builder returns correct type via covariant return.\n\nInput: DogBuilder extends AnimalBuilder\nOutput: Dog object built",
    hint: "Override build() returning Dog",
    starterCode: "",
  },
  {
    id: "j-po-h10",
    title: "Multi-Method Dispatch",
    difficulty: "Hard",
    topic: "Polymorphism",
    description:
      "Simulate multi-method dispatch using map of lambda pairs.\n\nInput: (Circle, Blue) -> draw blue circle\nOutput: Blue circle drawn",
    hint: "Map<Pair<Class,Class>,Runnable>",
    starterCode: "",
  },

  // ===== Abstraction =====
  {
    id: "j-ab-e1",
    title: "Abstract Class",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Abstract Vehicle with abstract start(). Car implements it.\n\nInput: new Car()\nOutput: Car engine started",
    hint: "abstract class Vehicle { abstract void start(); }",
    starterCode: "",
  },
  {
    id: "j-ab-e2",
    title: "Abstract Method",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Abstract Animal with abstract sound(). Dog, Cat implement.\n\nInput: Dog, Cat\nOutput: Woof Meow",
    hint: "abstract void sound();",
    starterCode: "",
  },
  {
    id: "j-ab-e3",
    title: "Cannot Instantiate Abstract",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Show compile error when instantiating abstract class.\n\nInput: new Shape()\nOutput: Cannot instantiate abstract class",
    hint: "Abstract classes cannot be instantiated",
    starterCode: "",
  },
  {
    id: "j-ab-e4",
    title: "Abstract with Concrete Methods",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Abstract class has both abstract and concrete methods.\n\nInput: new Dog()\nOutput: Concrete: eat(), Abstract: bark()",
    hint: "Mix of abstract and regular methods",
    starterCode: "",
  },
  {
    id: "j-ab-e5",
    title: "Abstract toString",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Abstract class forces toString() override in subclasses.\n\nInput: new Student('Alice')\nOutput: Student: Alice",
    hint: "abstract String toString(); in abstract class",
    starterCode: "",
  },
  {
    id: "j-ab-e6",
    title: "Abstract Constructor",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Abstract class with constructor called via super().\n\nInput: new Circle(5)\nOutput: Shape created with color=red, radius=5",
    hint: "super(color) in concrete subclass",
    starterCode: "",
  },
  {
    id: "j-ab-e7",
    title: "Partial Abstraction",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "One subclass implements abstract method; another remains abstract.\n\nInput: ConcreteB\nOutput: B implements method, A still abstract",
    hint: "B extends A, implements method",
    starterCode: "",
  },
  {
    id: "j-ab-e8",
    title: "Abstract Static Scenario",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Show that abstract static method is not allowed.\n\nInput: None\nOutput: Abstract methods cannot be static",
    hint: "Explain concept with comment",
    starterCode: "",
  },
  {
    id: "j-ab-e9",
    title: "Abstract Getter",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Abstract class enforces getName() in subclasses.\n\nInput: new Cat('Luna')\nOutput: Luna",
    hint: "abstract String getName();",
    starterCode: "",
  },
  {
    id: "j-ab-e10",
    title: "IS-A with Abstract",
    difficulty: "Easy",
    topic: "Abstraction",
    description:
      "Dog is an Animal (abstract); confirm via instanceof.\n\nInput: Dog dog\nOutput: Is Animal: true",
    hint: "Concrete extends Abstract",
    starterCode: "",
  },
  {
    id: "j-ab-m1",
    title: "Abstract Shape Hierarchy",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract Shape with perimeter() and area(). Implement for 3 shapes.\n\nInput: Circle r=3, Rect l=4 w=6, Triangle b=3 h=4\nOutput: Areas and perimeters for all",
    hint: "Override both methods in each class",
    starterCode: "",
  },
  {
    id: "j-ab-m2",
    title: "Template Method",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract class defines order of steps; subclasses fill details.\n\nInput: Pasta / Salad\nOutput: Boil > Cook Pasta or Chop > Toss",
    hint: "final prepareRecipe() calls abstract steps",
    starterCode: "",
  },
  {
    id: "j-ab-m3",
    title: "Abstract vs Interface",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Show when to use abstract class vs interface.\n\nInput: None\nOutput: Abstract: shared code, Interface: contract",
    hint: "Abstract has state, interface does not",
    starterCode: "",
  },
  {
    id: "j-ab-m4",
    title: "Abstract Collection",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract DataStore with abstract save() and load().\n\nInput: DatabaseStore / FileStore\nOutput: Saved to DB / Loaded from file",
    hint: "Abstract storage hierarchy",
    starterCode: "",
  },
  {
    id: "j-ab-m5",
    title: "Abstract + Interface Mix",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract class implements an interface partially.\n\nInput: ConcreteClass extends AbstractBase\nOutput: All interface methods handled",
    hint: "Abstract class can leave some methods abstract",
    starterCode: "",
  },
  {
    id: "j-ab-m6",
    title: "Game Character Abstract",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract GameCharacter with attack() and defend().\n\nInput: Warrior / Mage\nOutput: Warrior slashes, Mage casts spell",
    hint: "Override attack/defend in each class",
    starterCode: "",
  },
  {
    id: "j-ab-m7",
    title: "Report Generator",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract report with generateHeader(), generateBody(), generateFooter().\n\nInput: PDF / HTML\nOutput: PDF formatted / HTML formatted",
    hint: "Template method pattern with abstract parts",
    starterCode: "",
  },
  {
    id: "j-ab-m8",
    title: "Authentication Abstract",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract Auth with login(), logout(); OAuth and BasicAuth implement.\n\nInput: OAuth / Basic\nOutput: OAuth token / Basic credentials",
    hint: "Different auth strategies",
    starterCode: "",
  },
  {
    id: "j-ab-m9",
    title: "Abstract Data Structure",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract Stack with push(), pop(), peek() abstract.\n\nInput: ArrayStack / LinkedStack\nOutput: Both work correctly",
    hint: "Two concrete implementations",
    starterCode: "",
  },
  {
    id: "j-ab-m10",
    title: "Abstract Logger",
    difficulty: "Medium",
    topic: "Abstraction",
    description:
      "Abstract Logger with abstract log(String). File and Console versions.\n\nInput: log('Hello')\nOutput: [File] Hello / [Console] Hello",
    hint: "Override log() in each subclass",
    starterCode: "",
  },
  {
    id: "j-ab-h1",
    title: "Framework with Abstraction",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Mini test framework: abstract TestCase with abstract run().\n\nInput: MathTest extends TestCase\nOutput: Test passed/failed",
    hint: "Abstract framework, concrete test cases",
    starterCode: "",
  },
  {
    id: "j-ab-h2",
    title: "Abstract Factory Pattern",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract factory creates families of objects.\n\nInput: LightTheme / DarkTheme\nOutput: Light button/panel / Dark button/panel",
    hint: "createButton(), createPanel() in factory",
    starterCode: "",
  },
  {
    id: "j-ab-h3",
    title: "Abstract Visitor",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract visitor defines visit() for each element type.\n\nInput: [Circle, Rect, Triangle]\nOutput: Area, perimeter computed by visitor",
    hint: "Visitor with visitCircle(), visitRect()",
    starterCode: "",
  },
  {
    id: "j-ab-h4",
    title: "Plugin Base Class",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract Plugin base; concrete plugins override execute().\n\nInput: [LogPlugin, EmailPlugin]\nOutput: Logged and emailed",
    hint: "abstract void execute(); in Plugin",
    starterCode: "",
  },
  {
    id: "j-ab-h5",
    title: "Expression Tree",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract Expr with eval(). Num, Add, Mul nodes.\n\nInput: Add(Mul(2,3), Num(4))\nOutput: 10",
    hint: "abstract int eval(); recursive",
    starterCode: "",
  },
  {
    id: "j-ab-h6",
    title: "Abstract Iterator",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract iterator over custom collection.\n\nInput: iterate [A,B,C]\nOutput: A B C",
    hint: "abstract boolean hasNext(); abstract T next();",
    starterCode: "",
  },
  {
    id: "j-ab-h7",
    title: "Query Builder Abstract",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract QueryBuilder; SQL and NoSQL implementations.\n\nInput: builder.select('name').where('age>18')\nOutput: SQL: SELECT name WHERE age>18",
    hint: "Abstract build() method",
    starterCode: "",
  },
  {
    id: "j-ab-h8",
    title: "State Machine Abstract",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract State with enter(), exit(), handle(). Traffic light states.\n\nInput: RED -> GREEN -> YELLOW\nOutput: Each state's messages",
    hint: "Abstract state class, concrete states",
    starterCode: "",
  },
  {
    id: "j-ab-h9",
    title: "Pipeline Stage Abstract",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract PipelineStage; chain processes data.\n\nInput: [Validate, Transform, Output]\nOutput: Validated, Transformed, Outputted",
    hint: "abstract T process(T input); each stage chains",
    starterCode: "",
  },
  {
    id: "j-ab-h10",
    title: "Abstract ORM",
    difficulty: "Hard",
    topic: "Abstraction",
    description:
      "Abstract Repository with find, save, delete. InMemory impl.\n\nInput: save(User(1,'Alice')), find(1)\nOutput: Alice",
    hint: "Abstract T findById(int id); etc.",
    starterCode: "",
  },

  // ===== Interface =====
  {
    id: "j-if-e1",
    title: "Basic Interface",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Interface Greeting with sayHello(). Class implements it.\n\nInput: None\nOutput: Hello!",
    hint: "interface Greeting { void sayHello(); }",
    starterCode: "",
  },
  {
    id: "j-if-e2",
    title: "Interface Default Method",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Interface with default greet() implementation.\n\nInput: None\nOutput: Default greeting",
    hint: "default void greet() { ... }",
    starterCode: "",
  },
  {
    id: "j-if-e3",
    title: "Multiple Interfaces",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Class implements Flyable and Swimmable.\n\nInput: Duck d\nOutput: Flying and swimming",
    hint: "class Duck implements Flyable, Swimmable",
    starterCode: "",
  },
  {
    id: "j-if-e4",
    title: "Interface as Type",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Use interface type as method parameter.\n\nInput: Any Printable object\nOutput: Printed via interface",
    hint: "void print(Printable p) { p.print(); }",
    starterCode: "",
  },
  {
    id: "j-if-e5",
    title: "Interface Constants",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Interface with constant MAX_SIZE=100.\n\nInput: None\nOutput: 100",
    hint: "int MAX_SIZE = 100; (implicitly public static final)",
    starterCode: "",
  },
  {
    id: "j-if-e6",
    title: "Comparable Interface",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Implement Comparable in Product to sort by price.\n\nInput: [TV:500, Phone:300]\nOutput: Phone TV",
    hint: "compareTo(Product o) { return price - o.price; }",
    starterCode: "",
  },
  {
    id: "j-if-e7",
    title: "Runnable Interface",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Implement Runnable and run it in a Thread.\n\nInput: None\nOutput: Running in thread",
    hint: "new Thread(runnable).start()",
    starterCode: "",
  },
  {
    id: "j-if-e8",
    title: "Functional Interface",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Create @FunctionalInterface and use with lambda.\n\nInput: 5\nOutput: 25",
    hint: "@FunctionalInterface interface Square { int sq(int n); }",
    starterCode: "",
  },
  {
    id: "j-if-e9",
    title: "Interface Extension",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Interface B extends interface A; class implements B.\n\nInput: None\nOutput: A method and B method called",
    hint: "interface B extends A",
    starterCode: "",
  },
  {
    id: "j-if-e10",
    title: "Iterator Interface",
    difficulty: "Easy",
    topic: "Interface",
    description:
      "Implement Iterable interface to make custom class foreach-able.\n\nInput: for(int x : myRange(1,5))\nOutput: 1 2 3 4 5",
    hint: "Implement Iterable<Integer>",
    starterCode: "",
  },
  {
    id: "j-if-m1",
    title: "Dependency Injection",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Inject interface dependency to decouple classes.\n\nInput: new Service(new EmailNotifier())\nOutput: Email notification sent",
    hint: "Notifier interface; EmailNotifier, SMSNotifier",
    starterCode: "",
  },
  {
    id: "j-if-m2",
    title: "Interface Segregation",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Split fat interface into smaller ones.\n\nInput: Printer / Scanner / Fax\nOutput: Each interface separate, implemented where needed",
    hint: "ISP: don't force methods not needed",
    starterCode: "",
  },
  {
    id: "j-if-m3",
    title: "Strategy via Interface",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Swap discount strategy at runtime.\n\nInput: 10% / 20%\nOutput: 900 / 800",
    hint: "DiscountStrategy interface",
    starterCode: "",
  },
  {
    id: "j-if-m4",
    title: "Factory with Interface",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Factory returns interface type; client uses interface.\n\nInput: 'circle' / 'rect'\nOutput: Circle / Rectangle created",
    hint: "ShapeFactory.create(type)",
    starterCode: "",
  },
  {
    id: "j-if-m5",
    title: "Callback Interface",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Use interface as callback.\n\nInput: onComplete triggered\nOutput: Callback executed",
    hint: "void doWork(Callback cb); cb.onDone();",
    starterCode: "",
  },
  {
    id: "j-if-m6",
    title: "Default Method Override",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Override interface default method in class.\n\nInput: class overrides greet()\nOutput: Custom greeting",
    hint: "Override default method in implementing class",
    starterCode: "",
  },
  {
    id: "j-if-m7",
    title: "Static Interface Method",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Interface with static utility method.\n\nInput: MathOps.square(5)\nOutput: 25",
    hint: "static int square(int n) in interface",
    starterCode: "",
  },
  {
    id: "j-if-m8",
    title: "Interface Mocking Concept",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Create test double (mock) implementing an interface.\n\nInput: MockService.getData()\nOutput: Mock data returned",
    hint: "Testing via interface",
    starterCode: "",
  },
  {
    id: "j-if-m9",
    title: "Sealed Interface",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "sealed interface Shape permits Circle, Rect, Triangle.\n\nInput: switch pattern\nOutput: Exhaustive handling",
    hint: "sealed interface + switch expression",
    starterCode: "",
  },
  {
    id: "j-if-m10",
    title: "Interface with Generics",
    difficulty: "Medium",
    topic: "Interface",
    description:
      "Generic Transformer<T,R> interface with transform method.\n\nInput: String to Integer transformer\nOutput: '42' -> 42",
    hint: "interface Transformer<T,R> { R transform(T t); }",
    starterCode: "",
  },
  {
    id: "j-if-h1",
    title: "Marker Interface",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Implement marker interface to control behavior.\n\nInput: Serializable object\nOutput: Object serialized; non-serializable rejected",
    hint: "Marker interface has no methods",
    starterCode: "",
  },
  {
    id: "j-if-h2",
    title: "Observer via Interface",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Observer pattern using Observer interface.\n\nInput: subject.setState(5)\nOutput: Observer1: 5, Observer2: 5",
    hint: "List<Observer> observers; notifyAll()",
    starterCode: "",
  },
  {
    id: "j-if-h3",
    title: "Composite Interface",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Component, Leaf, Composite via interface for tree.\n\nInput: Folder > [File1, Folder2 > [File2]]\nOutput: Total size: 300",
    hint: "Component interface with getSize()",
    starterCode: "",
  },
  {
    id: "j-if-h4",
    title: "Fluent Interface Design",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Design a fluent query builder interface.\n\nInput: Query.from('users').where('age>18').limit(10)\nOutput: SELECT * FROM users WHERE age>18 LIMIT 10",
    hint: "Each method returns the interface type",
    starterCode: "",
  },
  {
    id: "j-if-h5",
    title: "Event Bus with Interface",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "EventListener interface; bus routes events to listeners.\n\nInput: publish LoginEvent\nOutput: AuthListener and LogListener handle it",
    hint: "Map<Class,List<Listener>> bus",
    starterCode: "",
  },
  {
    id: "j-if-h6",
    title: "Pipeline Interfaces",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Chain Filter<T> interfaces to process data.\n\nInput: [Validate, Trim, Uppercase] pipeline\nOutput: HELLO",
    hint: "Filter<T> { T apply(T input); }",
    starterCode: "",
  },
  {
    id: "j-if-h7",
    title: "Proxy via Interface",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Dynamic proxy logs all calls to a service interface.\n\nInput: service.getData()\nOutput: [LOG] getData called",
    hint: "Proxy.newProxyInstance() + InvocationHandler",
    starterCode: "",
  },
  {
    id: "j-if-h8",
    title: "Repository Pattern",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Repository interface for CRUD; InMemory implementation.\n\nInput: save, findById, delete\nOutput: CRUD operations work",
    hint: "Repository<T,ID> interface",
    starterCode: "",
  },
  {
    id: "j-if-h9",
    title: "Reactive Interface Concept",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Observable<T> interface with subscribe(). Emit values.\n\nInput: observable.subscribe(System.out::println)\nOutput: 1 2 3 4 5",
    hint: "Consumer<T> subscriber in subscribe()",
    starterCode: "",
  },
  {
    id: "j-if-h10",
    title: "Mediator with Interface",
    difficulty: "Hard",
    topic: "Interface",
    description:
      "Mediator interface decouples components.\n\nInput: ComponentA sends to ComponentB via Mediator\nOutput: Message delivered without direct reference",
    hint: "Mediator.send(from, msg)",
    starterCode: "",
  },

  // ===== Exception Handling =====
  {
    id: "j-ex-e1",
    title: "Try Catch",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Divide by zero and catch ArithmeticException.\n\nInput: 10 0\nOutput: Cannot divide by zero",
    hint: "try { 10/0 } catch(ArithmeticException e)",
    starterCode: "",
  },
  {
    id: "j-ex-e2",
    title: "NumberFormatException",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Parse invalid string and catch NumberFormatException.\n\nInput: abc\nOutput: Invalid number format",
    hint: "Integer.parseInt('abc')",
    starterCode: "",
  },
  {
    id: "j-ex-e3",
    title: "Finally Block",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Show finally block runs whether or not exception occurs.\n\nInput: None\nOutput: Try / Finally always runs",
    hint: "try {} catch {} finally {}",
    starterCode: "",
  },
  {
    id: "j-ex-e4",
    title: "ArrayIndexOutOfBounds",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Catch array out-of-bounds exception.\n\nInput: arr[10] on size-5 array\nOutput: Index out of bounds",
    hint: "catch(ArrayIndexOutOfBoundsException e)",
    starterCode: "",
  },
  {
    id: "j-ex-e5",
    title: "NullPointerException",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Catch NullPointerException.\n\nInput: null.length()\nOutput: Null pointer exception",
    hint: "String s = null; s.length()",
    starterCode: "",
  },
  {
    id: "j-ex-e6",
    title: "Multiple Catch",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Multiple catch blocks for different exceptions.\n\nInput: 10 0\nOutput: ArithmeticException caught",
    hint: "catch(ArithmeticException e) catch(Exception e)",
    starterCode: "",
  },
  {
    id: "j-ex-e7",
    title: "Throw Exception",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Throw IllegalArgumentException for negative input.\n\nInput: -5\nOutput: Negative not allowed",
    hint: "throw new IllegalArgumentException",
    starterCode: "",
  },
  {
    id: "j-ex-e8",
    title: "Throws Declaration",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Declare checked exception in method signature.\n\nInput: readFile('test.txt')\nOutput: IOException declared",
    hint: "void read() throws IOException",
    starterCode: "",
  },
  {
    id: "j-ex-e9",
    title: "Checked vs Unchecked",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Show checked (IOException) vs unchecked (RuntimeException).\n\nInput: None\nOutput: Checked must be handled; unchecked optional",
    hint: "Explain with two examples",
    starterCode: "",
  },
  {
    id: "j-ex-e10",
    title: "Exception Message",
    difficulty: "Easy",
    topic: "Exception Handling",
    description:
      "Print exception message using e.getMessage().\n\nInput: 5 0\nOutput: / by zero",
    hint: "e.getMessage()",
    starterCode: "",
  },
  {
    id: "j-ex-m1",
    title: "Custom Exception",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Create custom InsufficientFundsException.\n\nInput: withdraw 500 from 200 balance\nOutput: InsufficientFundsException: need 300 more",
    hint: "class InsufficientFundsException extends Exception",
    starterCode: "",
  },
  {
    id: "j-ex-m2",
    title: "Exception Chaining",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Wrap low-level exception in higher-level custom exception.\n\nInput: DB error\nOutput: ServiceException caused by DBException",
    hint: "new ServiceException('msg', e)",
    starterCode: "",
  },
  {
    id: "j-ex-m3",
    title: "Multi Catch Block",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Catch multiple exceptions in one catch block.\n\nInput: various errors\nOutput: Caught: Arithmetic or NullPointer",
    hint: "catch(ArithmeticException | NullPointerException e)",
    starterCode: "",
  },
  {
    id: "j-ex-m4",
    title: "Try With Resources",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Auto-close resource using try-with-resources.\n\nInput: file read\nOutput: File closed automatically",
    hint: "try(Resource r = new Resource())",
    starterCode: "",
  },
  {
    id: "j-ex-m5",
    title: "Re-throw Exception",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Catch exception, log it, then re-throw.\n\nInput: error occurs\nOutput: Logged then re-thrown",
    hint: "catch(Exception e) { log(e); throw e; }",
    starterCode: "",
  },
  {
    id: "j-ex-m6",
    title: "Stack Trace",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Print stack trace of exception.\n\nInput: exception thrown\nOutput: e.printStackTrace()",
    hint: "e.printStackTrace();",
    starterCode: "",
  },
  {
    id: "j-ex-m7",
    title: "Exception in Loop",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Parse strings to int; skip invalid and continue.\n\nInput: [1, 2, abc, 4]\nOutput: Sum: 7 (abc skipped)",
    hint: "try-catch inside loop",
    starterCode: "",
  },
  {
    id: "j-ex-m8",
    title: "Validate Input",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Validate user input and throw descriptive exceptions.\n\nInput: age=-1\nOutput: Age must be between 0 and 120",
    hint: "Custom validation exception",
    starterCode: "",
  },
  {
    id: "j-ex-m9",
    title: "Exception Hierarchy",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Show Throwable > Error > Exception > RuntimeException.\n\nInput: None\nOutput: Hierarchy printed",
    hint: "Explain and demonstrate hierarchy",
    starterCode: "",
  },
  {
    id: "j-ex-m10",
    title: "Optional vs Exception",
    difficulty: "Medium",
    topic: "Exception Handling",
    description:
      "Return Optional instead of throwing exception.\n\nInput: findUser(99)\nOutput: User not found (Optional.empty)",
    hint: "Optional<User> instead of exception",
    starterCode: "",
  },
  {
    id: "j-ex-h1",
    title: "Global Exception Handler",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Thread.setDefaultUncaughtExceptionHandler for global handling.\n\nInput: uncaught exception in thread\nOutput: Global handler caught: ...",
    hint: "Thread.setDefaultUncaughtExceptionHandler",
    starterCode: "",
  },
  {
    id: "j-ex-h2",
    title: "Exception in Streams",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Handle checked exceptions inside Java streams.\n\nInput: list of strings, some invalid\nOutput: Valid parsed, invalid logged",
    hint: "Wrap in unchecked or use helper method",
    starterCode: "",
  },
  {
    id: "j-ex-h3",
    title: "Transaction Rollback",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Simulate DB transaction: rollback on exception.\n\nInput: operations with one failure\nOutput: All rolled back",
    hint: "try-catch, rollback in catch",
    starterCode: "",
  },
  {
    id: "j-ex-h4",
    title: "Retry Logic",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Retry an operation up to 3 times on failure.\n\nInput: unstable operation\nOutput: Retry 1, Retry 2, Success on 3",
    hint: "Loop with try-catch, decrement retries",
    starterCode: "",
  },
  {
    id: "j-ex-h5",
    title: "Autocloseable Resource",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Custom resource implementing AutoCloseable.\n\nInput: try(MyResource r) used\nOutput: Resource auto-closed",
    hint: "Implement AutoCloseable, override close()",
    starterCode: "",
  },
  {
    id: "j-ex-h6",
    title: "CompletableFuture Exception",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Handle exception in CompletableFuture chain.\n\nInput: async operation fails\nOutput: Handled via exceptionally()",
    hint: "future.exceptionally(e -> fallback)",
    starterCode: "",
  },
  {
    id: "j-ex-h7",
    title: "Functional Exception Handling",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Wrap checked exceptions in unchecked for functional use.\n\nInput: list.stream().map(unchecked(this::parse))\nOutput: All parsed or wrapped exceptions",
    hint: "Helper that wraps checked in RuntimeException",
    starterCode: "",
  },
  {
    id: "j-ex-h8",
    title: "Exception Registry",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Register handlers for exception types; dispatch to correct handler.\n\nInput: different exception types\nOutput: Correct handler called each time",
    hint: "Map<Class, Handler> registry",
    starterCode: "",
  },
  {
    id: "j-ex-h9",
    title: "Result Type Pattern",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Return Result<T, Error> instead of exception.\n\nInput: parse('42') / parse('abc')\nOutput: Success(42) / Failure(invalid)",
    hint: "Generic Result class with isSuccess()",
    starterCode: "",
  },
  {
    id: "j-ex-h10",
    title: "Bulkhead Exception",
    difficulty: "Hard",
    topic: "Exception Handling",
    description:
      "Isolate failures: one service fails but others continue.\n\nInput: 3 services, one throws\nOutput: Other 2 succeed, failed one handled",
    hint: "Separate try-catch per service",
    starterCode: "",
  },

  // ===== Multi Threading =====
  {
    id: "j-mt-e1",
    title: "Create Thread Extends",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Create thread by extending Thread class.\n\nInput: None\nOutput: Thread running",
    hint: "class MyThread extends Thread { run() {} }",
    starterCode: "",
  },
  {
    id: "j-mt-e2",
    title: "Create Thread Runnable",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Create thread by implementing Runnable.\n\nInput: None\nOutput: Runnable thread running",
    hint: "new Thread(new MyRunnable()).start()",
    starterCode: "",
  },
  {
    id: "j-mt-e3",
    title: "Thread Sleep",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Thread sleeps for 1 second and prints.\n\nInput: None\nOutput: Before sleep ... After sleep",
    hint: "Thread.sleep(1000)",
    starterCode: "",
  },
  {
    id: "j-mt-e4",
    title: "Thread Name",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Set and get thread name.\n\nInput: None\nOutput: Thread name: Worker-1",
    hint: "thread.setName(); thread.getName()",
    starterCode: "",
  },
  {
    id: "j-mt-e5",
    title: "Thread Priority",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Set thread priority and print it.\n\nInput: None\nOutput: Priority: 8",
    hint: "thread.setPriority(8)",
    starterCode: "",
  },
  {
    id: "j-mt-e6",
    title: "Multiple Threads",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Start 3 threads and see interleaved output.\n\nInput: None\nOutput: T1 T2 T3 (in any order)",
    hint: "Create and start 3 threads",
    starterCode: "",
  },
  {
    id: "j-mt-e7",
    title: "Thread State",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Print thread state: NEW, RUNNABLE, TERMINATED.\n\nInput: None\nOutput: NEW -> RUNNABLE -> TERMINATED",
    hint: "thread.getState()",
    starterCode: "",
  },
  {
    id: "j-mt-e8",
    title: "Lambda Thread",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Create thread using lambda expression.\n\nInput: None\nOutput: Lambda thread running",
    hint: "new Thread(() -> System.out.println(...))",
    starterCode: "",
  },
  {
    id: "j-mt-e9",
    title: "Daemon Thread",
    difficulty: "Easy",
    topic: "Multi Threading",
    description: "Create a daemon thread.\n\nInput: None\nOutput: Daemon: true",
    hint: "thread.setDaemon(true)",
    starterCode: "",
  },
  {
    id: "j-mt-e10",
    title: "Thread Join",
    difficulty: "Easy",
    topic: "Multi Threading",
    description:
      "Main thread waits for child thread using join().\n\nInput: None\nOutput: Child done, then Main continues",
    hint: "thread.join()",
    starterCode: "",
  },
  {
    id: "j-mt-m1",
    title: "Synchronization",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Synchronize counter increment with synchronized method.\n\nInput: 3 threads increment 1000 times\nOutput: Final count: 3000",
    hint: "synchronized void increment()",
    starterCode: "",
  },
  {
    id: "j-mt-m2",
    title: "Wait and Notify",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Producer-consumer using wait() and notify().\n\nInput: None\nOutput: Produced: 5, Consumed: 5",
    hint: "synchronized + wait/notify",
    starterCode: "",
  },
  {
    id: "j-mt-m3",
    title: "Volatile Keyword",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Use volatile to ensure visibility across threads.\n\nInput: flag set by thread1\nOutput: Thread2 sees updated flag",
    hint: "volatile boolean flag;",
    starterCode: "",
  },
  {
    id: "j-mt-m4",
    title: "Atomic Integer",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Use AtomicInteger for thread-safe counter.\n\nInput: 10 threads increment 100 times\nOutput: 1000",
    hint: "AtomicInteger counter = new AtomicInteger(0);",
    starterCode: "",
  },
  {
    id: "j-mt-m5",
    title: "ReentrantLock",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Use ReentrantLock instead of synchronized.\n\nInput: 2 threads\nOutput: Thread-safe access",
    hint: "lock.lock(); try { } finally { lock.unlock(); }",
    starterCode: "",
  },
  {
    id: "j-mt-m6",
    title: "ExecutorService",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Submit tasks to ExecutorService thread pool.\n\nInput: 5 tasks\nOutput: All 5 executed",
    hint: "Executors.newFixedThreadPool(3)",
    starterCode: "",
  },
  {
    id: "j-mt-m7",
    title: "Callable and Future",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Submit Callable, get result via Future.get().\n\nInput: compute 10*10 in thread\nOutput: Result: 100",
    hint: "Future<Integer> f = executor.submit(callable)",
    starterCode: "",
  },
  {
    id: "j-mt-m8",
    title: "Thread Pool",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Create thread pool and reuse threads.\n\nInput: 10 tasks, pool size 3\nOutput: 10 tasks complete, 3 threads used",
    hint: "Executors.newFixedThreadPool(3)",
    starterCode: "",
  },
  {
    id: "j-mt-m9",
    title: "Deadlock Example",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Show deadlock scenario and how to avoid it.\n\nInput: Two threads, two locks\nOutput: Deadlock detected (explain prevention)",
    hint: "Always lock in same order",
    starterCode: "",
  },
  {
    id: "j-mt-m10",
    title: "CountDownLatch",
    difficulty: "Medium",
    topic: "Multi Threading",
    description:
      "Main waits for 3 threads to finish using CountDownLatch.\n\nInput: 3 tasks\nOutput: All done, main proceeds",
    hint: "new CountDownLatch(3); latch.await()",
    starterCode: "",
  },
  {
    id: "j-mt-h1",
    title: "CompletableFuture Chain",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Chain async operations with CompletableFuture.\n\nInput: fetch > process > display\nOutput: Async pipeline result",
    hint: "thenApply(), thenAccept()",
    starterCode: "",
  },
  {
    id: "j-mt-h2",
    title: "ForkJoinPool",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Parallel sum of large array using ForkJoin.\n\nInput: [1..1000000]\nOutput: 500000500000",
    hint: "RecursiveTask<Long>",
    starterCode: "",
  },
  {
    id: "j-mt-h3",
    title: "ConcurrentHashMap",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Multiple threads update ConcurrentHashMap safely.\n\nInput: 100 threads put key-values\nOutput: All entries present",
    hint: "ConcurrentHashMap<K,V>",
    starterCode: "",
  },
  {
    id: "j-mt-h4",
    title: "BlockingQueue",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Producer-consumer with ArrayBlockingQueue.\n\nInput: produce 5, consume 5\nOutput: All consumed in order",
    hint: "ArrayBlockingQueue(10)",
    starterCode: "",
  },
  {
    id: "j-mt-h5",
    title: "Semaphore",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Limit concurrent access using Semaphore.\n\nInput: 5 threads, semaphore=2\nOutput: Only 2 at a time",
    hint: "new Semaphore(2); acquire/release",
    starterCode: "",
  },
  {
    id: "j-mt-h6",
    title: "ReadWriteLock",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Multiple readers, exclusive writer with ReadWriteLock.\n\nInput: 3 readers, 1 writer\nOutput: Readers concurrent, writer exclusive",
    hint: "ReentrantReadWriteLock",
    starterCode: "",
  },
  {
    id: "j-mt-h7",
    title: "StampedLock",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Use StampedLock for optimistic read.\n\nInput: read data, validate stamp\nOutput: Optimistic read successful",
    hint: "lock.tryOptimisticRead(), lock.validate(stamp)",
    starterCode: "",
  },
  {
    id: "j-mt-h8",
    title: "Phaser",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Coordinate threads in phases using Phaser.\n\nInput: 3 threads, 3 phases\nOutput: Phase1 done, Phase2 done, Phase3 done",
    hint: "phaser.arriveAndAwaitAdvance()",
    starterCode: "",
  },
  {
    id: "j-mt-h9",
    title: "ScheduledExecutor",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Schedule task to run every 2 seconds.\n\nInput: 3 runs\nOutput: Task ran at T=0, 2, 4",
    hint: "ScheduledExecutorService, scheduleAtFixedRate",
    starterCode: "",
  },
  {
    id: "j-mt-h10",
    title: "ThreadLocal Variable",
    difficulty: "Hard",
    topic: "Multi Threading",
    description:
      "Each thread has its own ThreadLocal value.\n\nInput: Thread1 sets 1, Thread2 sets 2\nOutput: Each thread reads its own value",
    hint: "ThreadLocal<Integer> tl = new ThreadLocal<>();",
    starterCode: "",
  },
];
