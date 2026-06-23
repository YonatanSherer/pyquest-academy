export const LESSONS = [
  {
    id: "what-is-programming",
    title: "What is Programming?",
    icon: "💡",
    xpReward: 50,
    explanation: `Programming is giving instructions to a computer — like a recipe for a robot.\n\nYou write commands in a special language, and the computer follows them step by step.\n\nPython is one of the easiest and most popular programming languages in the world!`,
    codeExample: `# This is Python code!\n# The computer reads it line by line\nprint("Hello, World!")`,
    codeOutput: "Hello, World!",
    exercises: [
      {
        type: "multiple-choice",
        question: "What is programming?",
        options: [
          "Giving instructions to a computer",
          "Playing video games",
          "Drawing pictures",
          "Browsing the internet"
        ],
        correctIndex: 0,
        hint: "Think about what makes a computer do things."
      },
      {
        type: "multiple-choice",
        question: "Which of these is a programming language?",
        options: ["Python", "English", "Spanish", "Music"],
        correctIndex: 0,
        hint: "It's named after a snake 🐍"
      },
      {
        type: "predict-output",
        question: "What will this code display?",
        code: 'print("Hello, World!")',
        options: ["Hello, World!", "print Hello", "Error", "Nothing"],
        correctIndex: 0,
        hint: "print() shows whatever is inside the quotes."
      }
    ]
  },
  {
    id: "print",
    title: "print()",
    icon: "🖨️",
    xpReward: 60,
    explanation: `The print() function displays text on the screen.\n\nPut your message inside quotes and parentheses:\nprint("your message")\n\nYou can print words, numbers, or even emojis!`,
    codeExample: `print("Welcome to Python!")\nprint(42)\nprint("🐍 Python is awesome!")`,
    codeOutput: "Welcome to Python!\n42\n🐍 Python is awesome!",
    exercises: [
      {
        type: "fill-blank",
        question: "Complete the code to print \"Hello\":",
        codeTemplate: '___("Hello")',
        answer: "print",
        hint: "Which function displays text on screen?"
      },
      {
        type: "predict-output",
        question: "What does this code print?",
        code: 'print("I love coding")',
        options: ["I love coding", "print I love coding", '"I love coding"', "Error"],
        correctIndex: 0,
        hint: "print() shows what's inside the quotes — without the quotes."
      },
      {
        type: "find-bug",
        question: "Find the bug in this code:",
        code: 'print("Hello World"',
        options: [
          "Missing closing parenthesis )",
          "Missing a comma",
          "Wrong quotes used",
          "Nothing is wrong"
        ],
        correctIndex: 0,
        hint: "Count the parentheses — do they match?"
      },
      {
        type: "complete-code",
        question: "Complete the code to print your name on two lines:",
        codeTemplate: 'print("My name is")\n___("Alex")',
        answer: 'print',
        hint: "Use the same function on both lines."
      },
      {
        type: "multiple-choice",
        question: "Which prints the number 100?",
        options: ["print(100)", 'print("100")', "Both work!", "Neither works"],
        correctIndex: 2,
        hint: "Python can print both numbers and text."
      }
    ]
  },
  {
    id: "variables",
    title: "Variables",
    icon: "📦",
    xpReward: 70,
    explanation: `A variable stores information so you can use it later — like a labeled box.\n\nYou create a variable with a name, an equals sign, and a value:\nname = "Maya"\n\nYou can change what's inside anytime!`,
    codeExample: `name = "Maya"\nage = 14\nprint(name)\nprint(age)`,
    codeOutput: "Maya\n14",
    exercises: [
      {
        type: "predict-output",
        question: "What will this code print?",
        code: 'x = 5\nprint(x)',
        options: ["5", "x", '"x"', "Error"],
        correctIndex: 0,
        hint: "x stores the value 5, and print shows what's stored."
      },
      {
        type: "fill-blank",
        question: 'Complete the code to store "Hello" in a variable:',
        codeTemplate: 'greeting = ___',
        answer: '"Hello"',
        acceptableAnswers: ['"Hello"', "'Hello'"],
        hint: "Text values need quotes around them."
      },
      {
        type: "arrange-blocks",
        question: "Arrange the code to create a variable and print it:",
        blocks: ["print(color)", 'color = "blue"'],
        correctOrder: [1, 0],
        hint: "You need to create the variable before you can use it!"
      },
      {
        type: "find-bug",
        question: "Why will this code cause an error?",
        code: "print(message)\nmessage = \"Hi\"",
        options: [
          "Variable used before it was created",
          "Wrong quotes",
          "print is misspelled",
          "Nothing is wrong"
        ],
        correctIndex: 0,
        hint: "Order matters — can you use something before it exists?"
      },
      {
        type: "complete-code",
        question: "Complete the code to create a variable and change its value:",
        codeTemplate: 'score = 10\n___ = 20\nprint(score)',
        answer: "score",
        hint: "To change a variable, use its name again with a new value."
      }
    ]
  },
  {
    id: "strings-numbers",
    title: "Strings & Numbers",
    icon: "🔢",
    xpReward: 70,
    explanation: `In Python, there are different types of data:\n\n• Strings are text — always in quotes: "hello"\n• Integers are whole numbers: 42\n• Floats are decimal numbers: 3.14\n\nYou can do math with numbers and combine strings!`,
    codeExample: `name = "Alex"\nage = 15\npi = 3.14\n\nprint("Hi " + name)\nprint(age + 1)\nprint(pi * 2)`,
    codeOutput: "Hi Alex\n16\n6.28",
    exercises: [
      {
        type: "multiple-choice",
        question: "Which of these is a string?",
        options: ['"Hello"', "42", "3.14", "True"],
        correctIndex: 0,
        hint: "Strings are always wrapped in quotes."
      },
      {
        type: "predict-output",
        question: "What does this print?",
        code: 'print(10 + 5)',
        options: ["15", "10 + 5", '"105"', "Error"],
        correctIndex: 0,
        hint: "Python does math with numbers."
      },
      {
        type: "predict-output",
        question: 'What does this print?',
        code: 'print("3" + "4")',
        options: ['"34"', "7", "Error", '"3 + 4"'],
        correctIndex: 0,
        hint: "Adding strings sticks them together — it's called concatenation."
      },
      {
        type: "find-bug",
        question: "What's wrong with this code?",
        code: 'age = "15"\nprint(age + 1)',
        options: [
          "Can't add a string and a number",
          "print is wrong",
          "age should be lowercase",
          "Nothing is wrong"
        ],
        correctIndex: 0,
        hint: '"15" is a string, but 1 is a number.'
      },
      {
        type: "complete-code",
        question: "Complete the code to convert the string to a number and add 1:",
        codeTemplate: 'age = "15"\nprint(int(___) + 1)',
        answer: "age",
        hint: "Pass the variable name to int() to convert it."
      }
    ]
  },
  {
    id: "input",
    title: "input()",
    icon: "⌨️",
    xpReward: 75,
    explanation: `The input() function lets the user type something.\n\nIt always returns a string, so if you want a number, convert it with int().\n\nYou can put a prompt message inside the parentheses.`,
    codeExample: `name = input("What's your name? ")\nprint("Hello, " + name + "!")\n\nage = int(input("How old are you? "))\nprint("Next year you'll be", age + 1)`,
    codeOutput: "What's your name? Maya\nHello, Maya!\nHow old are you? 14\nNext year you'll be 15",
    exercises: [
      {
        type: "fill-blank",
        question: "Complete the code to ask for the user's name:",
        codeTemplate: 'name = ___("Enter your name: ")',
        answer: "input",
        hint: "Which function reads text from the user?"
      },
      {
        type: "multiple-choice",
        question: "What does input() always return?",
        options: ["A string", "A number", "A boolean", "Nothing"],
        correctIndex: 0,
        hint: "Even if you type a number, input gives you text."
      },
      {
        type: "predict-output",
        question: "If the user types '7', what does this code do?",
        code: 'x = input("Number: ")\nprint(x + x)',
        options: ['"77"', "14", "Error", "7"],
        correctIndex: 0,
        hint: "Remember: input() returns a string, and adding strings combines them."
      }
    ]
  },
  {
    id: "if-else",
    title: "if / else",
    icon: "🔀",
    xpReward: 80,
    explanation: `if / else lets your program make decisions!\n\nif checks a condition. If it's true, the indented code runs.\nelse runs when the condition is false.\n\nDon't forget the colon : and the indentation!`,
    codeExample: `age = 16\n\nif age >= 18:\n    print("You can vote!")\nelse:\n    print("Too young to vote.")\n\n# Output: Too young to vote.`,
    codeOutput: "Too young to vote.",
    exercises: [
      {
        type: "predict-output",
        question: "What will this print?",
        code: 'x = 10\nif x > 5:\n    print("Big")\nelse:\n    print("Small")',
        options: ["Big", "Small", "Error", "Both"],
        correctIndex: 0,
        hint: "Is 10 greater than 5?"
      },
      {
        type: "arrange-blocks",
        question: "Arrange the code to check if a number is positive:",
        blocks: [
          '    print("Positive!")',
          'if num > 0:',
          'num = 7',
          'else:',
          '    print("Not positive")'
        ],
        correctOrder: [2, 1, 0, 3, 4],
        hint: "First create the variable, then check it, then handle both cases."
      },
      {
        type: "fill-blank",
        question: "Complete the condition:",
        codeTemplate: 'if temperature ___ 30:\n    print("It\'s hot!")',
        answer: ">",
        acceptableAnswers: [">", ">="],
        hint: "Which symbol means 'greater than'?"
      },
      {
        type: "find-bug",
        question: "Find the bug:",
        code: 'score = 90\nif score > 80\n    print("Great job!")',
        options: [
          "Missing colon after the condition",
          "Wrong comparison",
          "print is wrong",
          "Nothing is wrong"
        ],
        correctIndex: 0,
        hint: "if statements need something at the end of the line..."
      },
      {
        type: "complete-code",
        question: "Complete the code to print \"Adult\" if age is 18 or older:",
        codeTemplate: 'age = 20\nif age ___ 18:\n    print("Adult")',
        answer: ">=",
        acceptableAnswers: [">=", ">"],
        hint: "Which operator means 'greater than or equal to'?"
      }
    ]
  },
  {
    id: "loops",
    title: "Loops",
    icon: "🔁",
    xpReward: 85,
    explanation: `Loops repeat code multiple times — so you don't have to!\n\nfor loop: runs a set number of times\nwhile loop: runs as long as a condition is true\n\nrange(5) gives you numbers 0, 1, 2, 3, 4.`,
    codeExample: `# for loop\nfor i in range(3):\n    print("Hello!", i)\n\n# while loop\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1`,
    codeOutput: "Hello! 0\nHello! 1\nHello! 2\n0\n1\n2",
    exercises: [
      {
        type: "predict-output",
        question: "How many times will this loop print?",
        code: 'for i in range(4):\n    print("Hi")',
        options: ["4 times", "3 times", "5 times", "Infinite times"],
        correctIndex: 0,
        hint: "range(4) gives 0, 1, 2, 3 — count them!"
      },
      {
        type: "fill-blank",
        question: "Complete the loop to print numbers 0 to 9:",
        codeTemplate: 'for i in range(___):\n    print(i)',
        answer: "10",
        hint: "range(n) goes from 0 up to n-1."
      },
      {
        type: "find-bug",
        question: "This loop runs forever! Why?",
        code: 'x = 1\nwhile x < 10:\n    print(x)',
        options: [
          "x never changes, so the condition is always true",
          "The condition is wrong",
          "print doesn't work in loops",
          "Nothing is wrong"
        ],
        correctIndex: 0,
        hint: "What needs to change for the loop to eventually stop?"
      },
      {
        type: "complete-code",
        question: "Complete the code to print each fruit in the list:",
        codeTemplate: 'fruits = ["apple", "banana"]\nfor fruit in ___:\n    print(fruit)',
        answer: "fruits",
        hint: "Loop through the list variable."
      }
    ]
  },
  {
    id: "lists",
    title: "Lists",
    icon: "📝",
    xpReward: 85,
    explanation: `A list stores multiple items in one variable.\n\nUse square brackets [] and commas between items.\n\nYou can access items by their index (starting from 0), add new items, or loop through them.`,
    codeExample: `fruits = ["apple", "banana", "cherry"]\nprint(fruits[0])\nprint(len(fruits))\n\nfruits.append("mango")\nprint(fruits)`,
    codeOutput: 'apple\n3\n["apple", "banana", "cherry", "mango"]',
    exercises: [
      {
        type: "predict-output",
        question: "What does this print?",
        code: 'colors = ["red", "blue", "green"]\nprint(colors[1])',
        options: ["blue", "red", "green", "Error"],
        correctIndex: 0,
        hint: "Lists start counting from 0!"
      },
      {
        type: "fill-blank",
        question: "Add \"grape\" to the list:",
        codeTemplate: 'fruits = ["apple", "banana"]\nfruits.___("grape")',
        answer: "append",
        hint: "Which method adds an item to the end of a list?"
      },
      {
        type: "predict-output",
        question: "What does len() return here?",
        code: 'items = [10, 20, 30, 40]\nprint(len(items))',
        options: ["4", "40", "10", "3"],
        correctIndex: 0,
        hint: "len() counts how many items are in the list."
      },
      {
        type: "multiple-choice",
        question: "How do you create an empty list?",
        options: ["my_list = []", 'my_list = ""', "my_list = ()", "my_list = {}"],
        correctIndex: 0,
        hint: "Lists use square brackets."
      },
      {
        type: "complete-code",
        question: "Complete the code to get the first item from the list:",
        codeTemplate: 'colors = ["red", "blue", "green"]\nfirst = colors[___]\nprint(first)',
        answer: "0",
        hint: "Lists start counting from 0."
      }
    ]
  },
  {
    id: "functions",
    title: "Functions",
    icon: "⚙️",
    xpReward: 90,
    explanation: `A function is a reusable block of code.\n\nDefine it with def, give it a name, and call it when needed.\n\nFunctions can take parameters (inputs) and return values (outputs).`,
    codeExample: `def greet(name):\n    return "Hello, " + name + "!"\n\nmessage = greet("Maya")\nprint(message)\n\ndef add(a, b):\n    return a + b\n\nprint(add(3, 7))`,
    codeOutput: "Hello, Maya!\n10",
    exercises: [
      {
        type: "fill-blank",
        question: "Complete the function definition:",
        codeTemplate: '___ say_hello():\n    print("Hello!")',
        answer: "def",
        hint: "Which keyword starts a function definition in Python?"
      },
      {
        type: "predict-output",
        question: "What does this print?",
        code: 'def double(x):\n    return x * 2\n\nprint(double(5))',
        options: ["10", "5", "25", "Error"],
        correctIndex: 0,
        hint: "The function multiplies by 2. What is 5 × 2?"
      },
      {
        type: "arrange-blocks",
        question: "Arrange the code to create and call a function:",
        blocks: [
          "print(square(4))",
          "    return n * n",
          "def square(n):"
        ],
        correctOrder: [2, 1, 0],
        hint: "Define first, then the body, then call it."
      },
      {
        type: "find-bug",
        question: "What's wrong with this function?",
        code: 'def multiply(a, b):\n    result = a * b\n\nprint(multiply(3, 4))',
        options: [
          "Missing return statement",
          "Wrong parameter names",
          "print is wrong",
          "Nothing is wrong"
        ],
        correctIndex: 0,
        hint: "The function calculates the result but never sends it back..."
      },
      {
        type: "complete-code",
        question: "Complete the function to return the square of a number:",
        codeTemplate: 'def square(n):\n    ___ n * n\n\nprint(square(5))',
        answer: "return",
        hint: "Which keyword sends a value back from a function?"
      }
    ]
  },
  {
    id: "final-challenge",
    title: "Final Challenge",
    icon: "🏆",
    xpReward: 150,
    explanation: `Congratulations! You've learned the basics of Python!\n\nNow let's test everything you know in one final challenge.\n\nThis challenge covers all topics: print, variables, strings, input, conditions, loops, lists, and functions.\n\nGood luck, future programmer! 🐍`,
    codeExample: `# You know all of this now!\ndef analyze_scores(scores):\n    total = 0\n    for score in scores:\n        total += score\n    average = total / len(scores)\n    if average >= 80:\n        return "Great job!"\n    else:\n        return "Keep practicing!"\n\nresult = analyze_scores([85, 92, 78, 95])\nprint(result)`,
    codeOutput: "Great job!",
    exercises: [
      {
        type: "predict-output",
        question: "What does this print?",
        code: 'x = "Python"\nprint(x[0])',
        options: ["P", "Python", "p", "Error"],
        correctIndex: 0,
        hint: "Strings work like lists — index 0 is the first character."
      },
      {
        type: "predict-output",
        question: "What's the output?",
        code: 'def mystery(n):\n    if n > 0:\n        return "Positive"\n    else:\n        return "Not positive"\n\nprint(mystery(-5))',
        options: ["Not positive", "Positive", "-5", "Error"],
        correctIndex: 0,
        hint: "Is -5 greater than 0?"
      },
      {
        type: "fill-blank",
        question: "Complete the loop to add all numbers in a list:",
        codeTemplate: 'total = 0\nfor num in [1, 2, 3]:\n    total ___ num\nprint(total)',
        answer: "+=",
        hint: "Which operator adds and assigns?"
      },
      {
        type: "arrange-blocks",
        question: "Build a complete program that greets the user:",
        blocks: [
          'print("Hello, " + name + "!")',
          'name = input("Your name: ")'
        ],
        correctOrder: [1, 0],
        hint: "First get the name, then print the greeting."
      },
      {
        type: "predict-output",
        question: "What does this function return?",
        code: 'def count_big(numbers):\n    count = 0\n    for n in numbers:\n        if n > 10:\n            count += 1\n    return count\n\nprint(count_big([5, 15, 8, 20, 3]))',
        options: ["2", "3", "5", "0"],
        correctIndex: 0,
        hint: "Count how many numbers are bigger than 10."
      }
    ]
  }
];

export const BADGES = [
  { id: "first-lesson", title: "First Steps", icon: "🌟", description: "Complete your first lesson", condition: (progress) => (progress.completed_lessons?.length || 0) >= 1 },
  { id: "three-lessons", title: "Getting Started", icon: "🚀", description: "Complete 3 lessons", condition: (progress) => (progress.completed_lessons?.length || 0) >= 3 },
  { id: "five-lessons", title: "Halfway Hero", icon: "⚡", description: "Complete 5 lessons", condition: (progress) => (progress.completed_lessons?.length || 0) >= 5 },
  { id: "all-lessons", title: "Python Master", icon: "🏆", description: "Complete all lessons", condition: (progress) => (progress.completed_lessons?.length || 0) >= 10 },
  { id: "streak-3", title: "On Fire!", icon: "🔥", description: "Get a 3-day streak", condition: (progress) => (progress.best_streak || 0) >= 3 },
  { id: "streak-7", title: "Unstoppable", icon: "💎", description: "Get a 7-day streak", condition: (progress) => (progress.best_streak || 0) >= 7 },
  { id: "xp-500", title: "XP Hunter", icon: "💰", description: "Earn 500 XP", condition: (progress) => (progress.xp || 0) >= 500 },
  { id: "xp-1000", title: "XP Legend", icon: "👑", description: "Earn 1000 XP", condition: (progress) => (progress.xp || 0) >= 1000 },
  { id: "perfect-score", title: "Perfectionist", icon: "✨", description: "Get a perfect score on any lesson", condition: (progress) => Object.values(progress.lesson_scores || {}).some(s => s.perfect) },
  { id: "exercises-50", title: "Practice Pro", icon: "🎯", description: "Complete 50 exercises", condition: (progress) => (progress.total_exercises_completed || 0) >= 50 }
];

export function getLevelFromXP(xp) {
  if (xp < 100) return 1;
  if (xp < 250) return 2;
  if (xp < 500) return 3;
  if (xp < 800) return 4;
  if (xp < 1200) return 5;
  if (xp < 1700) return 6;
  if (xp < 2300) return 7;
  return 8;
}

export function getXPForLevel(level) {
  const thresholds = [0, 100, 250, 500, 800, 1200, 1700, 2300];
  return thresholds[level - 1] || 0;
}

export function getNextLevelXP(level) {
  const thresholds = [100, 250, 500, 800, 1200, 1700, 2300, 9999];
  return thresholds[level - 1] || 9999;
}

export function isLessonUnlocked(lessonId, completedLessons) {
  const idx = LESSONS.findIndex(l => l.id === lessonId);
  if (idx === 0) return true;
  const prevLesson = LESSONS[idx - 1];
  return (completedLessons || []).includes(prevLesson.id);
}