# PyQuest Academy

A premium, gamified Python learning app for school students.

**PyQuest Academy** teaches beginner Python topics through short explanations, simple examples, and playful interactive exercises. The app is designed to make programming feel approachable, visual, and fun for students who are just starting to code.

## Live App

https://pyquestacademy.base44.app/

## About the Project

PyQuest Academy was built as a portfolio project to demonstrate how an educational web app can combine:

* simple learning content
* gamification
* interactive exercises
* animated feedback
* responsive design
* premium UI/UX

The goal is to create a learning experience that feels modern, playful, and easy to use, while still teaching real Python fundamentals.

## Target Audience

PyQuest Academy is designed for:

* school students
* beginner programmers
* students learning Python for the first time
* teachers looking for simple programming practice activities

## Learning Flow

Each topic follows a simple structure:

1. **Learn** — short explanation of the topic
2. **Example** — simple Python code example
3. **Practice** — playful exercise
4. **Feedback** — correct/wrong answer animation
5. **Reward** — XP, progress, and lesson completion

## Python Topics

The app introduces beginner Python topics such as:

* What is programming?
* `print()`
* Variables
* Strings and numbers
* `input()`
* `if / else`
* Loops
* Lists
* Functions
* Mini final challenge

## Exercise Types

PyQuest Academy includes interactive practice formats such as:

* Multiple choice
* Fill in the missing code
* Arrange code blocks
* Predict the output
* Find the bug
* Complete the code

For the current version, exercises use predefined validation logic instead of a real Python compiler. This keeps the app lightweight, safe, and simple for a beginner-friendly learning experience.

## Main Features

* Gamified lesson path
* Beginner-friendly Python lessons
* Interactive exercises
* XP and progress tracking
* Streak / hearts / rewards system
* Correct and wrong answer feedback
* Animated transitions and micro-interactions
* Lesson completion screen
* Responsive mobile-first design
* Premium dark tech-inspired UI
* Sound/motion settings where supported
* “Made by Sherer Web Studio” credit link

## Design Goals

The app was designed to feel:

* premium
* animated
* modern
* playful but not childish
* simple to understand
* quick to start using
* suitable for desktop, tablet, and mobile

## Tech Stack

* React
* JavaScript
* Tailwind CSS
* Base44
* Responsive Web Design
* Gamified UI/UX
* Educational App Design

## Local Development

This project was created with Base44 and can be run locally.

### Prerequisites

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:

```bash
npm install
```

4. Install the Base44 CLI if needed:

```bash
npm install -g base44@latest
```

## Run Locally

Run the full local Base44 development environment:

```bash
base44 dev
```

This starts the local Base44 development backend and, when configured, also starts the frontend dev server.

## Run Only the Frontend

To run only the frontend against the hosted Base44 backend:

```bash
npm run dev
```

Create or update `.env.local` if needed:

```env
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=https://your-app.base44.app
```

Important: do not commit real secrets, private keys, or sensitive environment variables.

## Deployment

The app is managed and published through Base44.

After pushing changes to GitHub, open the Base44 dashboard and publish the latest version.

```bash
base44 dashboard open
```

## Project Status

Active portfolio project.

Current focus:

* improving lesson content
* polishing animations
* improving mobile layout
* adding more beginner Python exercises
* enhancing the gamified learning experience

## Future Improvements

Possible future additions:

* real Python code execution sandbox
* student accounts and saved progress
* teacher dashboard
* more lesson modules
* daily challenges
* badges and achievements
* classroom mode
* multilingual support

## Author

**Yonatan Sherer**
Sherer Web Studio

GitHub: https://github.com/YonatanSherer
Website: https://shererwebstudio.base44.app

## License

All rights reserved.

This project is part of my personal portfolio and is not intended for unrestricted reuse without permission.
