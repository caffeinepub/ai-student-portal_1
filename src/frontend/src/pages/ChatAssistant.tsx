import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, MessageSquare, Send, Sparkles, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: Date;
}

const AI_RESPONSES: Array<{ keywords: string[]; response: string }> = [
  {
    keywords: ["java", "oop", "object"],
    response:
      "Java is a powerful OOP language! Key concepts:\n• Classes & Objects — blueprint and instances\n• Inheritance — extend parent class with `extends`\n• Polymorphism — same method, different behavior\n• Encapsulation — hide data using private fields + getters/setters\n\nStart with the Java course in the Courses section — it covers everything from basics to advanced!",
  },
  {
    keywords: ["python", "pip", "django", "flask"],
    response:
      "Python is great for beginners and professionals alike!\n\n🐍 Key strengths:\n• Clean, readable syntax\n• Huge ecosystem (Django, Flask, FastAPI, Pandas)\n• Great for data science and automation\n\nTip: Learn list comprehensions, generators, and decorators early — they'll make your code much more Pythonic. Check out the Python course in our Courses section!",
  },
  {
    keywords: [
      "dsa",
      "algorithm",
      "data structure",
      "leetcode",
      "array",
      "tree",
      "graph",
    ],
    response:
      "DSA is crucial for cracking tech interviews! Here's a roadmap:\n\n1. Arrays & Strings — the foundation\n2. Linked Lists, Stacks, Queues\n3. Trees & Binary Search Trees\n4. Graphs (BFS, DFS)\n5. Dynamic Programming\n\nPractice strategy: Solve 2-3 problems daily. Start Easy, then Medium. Our Coding Practice section has 10 curated problems to get you started!",
  },
  {
    keywords: ["sql", "database", "mysql", "query", "join"],
    response:
      "SQL is a must-know skill for any developer!\n\n📊 Key concepts:\n• SELECT, WHERE, GROUP BY, HAVING, ORDER BY\n• JOINs: INNER, LEFT, RIGHT, FULL OUTER\n• Aggregate functions: COUNT, SUM, AVG, MAX, MIN\n• Subqueries and CTEs\n\nPro tip: Practice on real datasets. Our SQL course covers everything from basics to advanced queries — check it out!",
  },
  {
    keywords: ["frontend", "html", "css", "react", "javascript", "js", "web"],
    response:
      "Frontend development is exciting! The roadmap:\n\n🌐 Fundamentals:\n1. HTML — structure\n2. CSS — styling (Flexbox, Grid, animations)\n3. JavaScript — interactivity\n\n⚛️ Then pick a framework:\n• React (most popular, great job market)\n• Vue (easier learning curve)\n• Angular (enterprise-focused)\n\nOur Frontend Technologies course covers HTML, CSS & JS comprehensively!",
  },
  {
    keywords: ["resume", "cv", "portfolio", "interview"],
    response:
      "Great resume tips for students:\n\n📄 Resume do's:\n• Keep it 1 page (for freshers)\n• Lead with a strong summary\n• Quantify achievements ('Improved performance by 40%')\n• List projects with tech stack and impact\n• Include GitHub profile and LinkedIn\n\n🎯 Use our Resume Builder to create a professional resume with live preview and PDF export!",
  },
  {
    keywords: [
      "job",
      "placement",
      "career",
      "internship",
      "hiring",
      "company",
      "interview prep",
    ],
    response:
      "Career advice for CS students:\n\n🎯 Placement preparation:\n1. Master DSA (LeetCode 150 problems minimum)\n2. Learn System Design basics\n3. Build 2-3 strong projects\n4. Contribute to open source\n5. Network on LinkedIn\n\n📋 Check our Job Listings section for live opportunities at Google, Flipkart, TCS, Infosys and more!",
  },
  {
    keywords: ["study", "learn", "tips", "productivity", "focus"],
    response:
      "Study tips that actually work:\n\n⏱️ Techniques:\n• Pomodoro: 25 min focus + 5 min break\n• Feynman technique: explain concepts simply\n• Spaced repetition for memorization\n• Active recall > passive reading\n\n📚 Daily routine for CS students:\n• Morning: Theory/concepts\n• Afternoon: Coding practice\n• Evening: Review and revision\n\nUse our MCQ Tests to test your knowledge regularly!",
  },
  {
    keywords: ["git", "github", "version control"],
    response:
      "Git is essential for every developer!\n\n🔧 Essential Git commands:\n```\ngit init       — start a repo\ngit add .      — stage changes\ngit commit -m  — save snapshot\ngit push       — upload to remote\ngit pull       — sync from remote\ngit branch     — create branches\ngit merge      — merge branches\n```\n\nAlways write meaningful commit messages. Use branches for features. Never push directly to main in team projects!",
  },
  {
    keywords: ["aptitude", "placement test", "quantitative", "logical"],
    response:
      "Aptitude preparation strategy:\n\n🧮 Topics to cover:\n• Number Systems, HCF/LCM\n• Percentages, Profit & Loss\n• Time & Work, Speed & Distance\n• Logical Reasoning (Series, Syllogisms)\n• Verbal Ability\n\n📈 Practice plan:\n• 30 min daily on aptitude problems\n• Take mock tests under time pressure\n• Review mistakes carefully\n\nOur Aptitude course is a comprehensive placement preparation resource!",
  },
  {
    keywords: ["hello", "hi", "hey", "help", "start"],
    response:
      "Hello! I'm your AI Study Assistant 👋\n\nI can help you with:\n• Programming concepts (Java, Python, C, DSA, SQL)\n• Career and placement advice\n• Study tips and productivity\n• Course recommendations\n• Resume building tips\n\nWhat would you like to learn today? Ask me anything!",
  },
];

const QUICK_QUESTIONS = [
  "How do I start learning Java?",
  "What is DSA and why is it important?",
  "Give me resume tips",
  "How to prepare for placements?",
  "What are good study habits?",
  "Python vs Java for beginners?",
];

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const { keywords, response } of AI_RESPONSES) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return response;
    }
  }
  return "That's a great question! I specialize in programming concepts, DSA, career advice, and study tips.\n\nTry asking me about:\n• Java, Python, C, SQL, or Frontend development\n• Data Structures & Algorithms\n• Resume building and placement preparation\n• Study strategies and productivity tips\n\nHow can I help you learn today?";
}

function msgId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: msgId(),
      role: "ai",
      text: "Hello! I'm your AI Study Assistant 👋 I can help with programming concepts, career advice, DSA, and study tips. What would you like to learn today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  });

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: msgId(),
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      const aiMsg: Message = {
        id: msgId(),
        role: "ai",
        text: getAIResponse(trimmed),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, delay);
  }

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-cyan-500/15 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            AI Chat Assistant
          </h1>
          <p className="text-muted-foreground text-sm">
            Ask anything about programming, careers, and study tips
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-green-400 font-semibold">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Online
        </div>
      </div>

      {/* Chat Window */}
      <Card className="flex-1 flex flex-col min-h-[500px]">
        <CardHeader className="pb-3 border-b border-border">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            Study Assistant
            <span className="text-xs text-muted-foreground font-normal ml-1">
              Powered by AI
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4" data-ocid="chat.messages.panel">
            <div ref={scrollRef} className="space-y-4">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
                  >
                    {msg.role === "ai" && (
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm ${
                        msg.role === "user"
                          ? "chat-bubble-user"
                          : "chat-bubble-ai"
                      }`}
                    >
                      <pre className="whitespace-pre-wrap font-body leading-relaxed">
                        {msg.text}
                      </pre>
                      <p className="text-xs text-muted-foreground mt-1 opacity-70">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {msg.role === "user" && (
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5 text-primary" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                  data-ocid="chat.loading_state"
                >
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="chat-bubble-ai rounded-xl px-3.5 py-3 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          <div className="px-4 pb-2 border-t border-border pt-3">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Quick questions
            </p>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  className="text-xs px-2.5 py-1 rounded-full bg-muted hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/30 transition-colors cursor-pointer"
                  onClick={() => sendMessage(q)}
                  data-ocid="chat.quick-question.button"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
            >
              <Input
                placeholder="Ask about Java, DSA, career tips..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
                disabled={isTyping}
                data-ocid="chat.message.input"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isTyping}
                data-ocid="chat.send.button"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
