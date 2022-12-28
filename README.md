# BabyMath Backend

This app aims at making maths easy for everyone by providing small challenges which builds confidence and comfort with mathematical expressions.

## Database structure

Functional Requirements for Bowler Banking are subdivided into two access levels: Customer Mode and Admin Mode:

### `User`

This is the user's table, also made of a joined table `study` which holds the user's activities. Also, a small table `profile` which holds user's profile pictures and how it is addressed in the database.

```sh
interface User {
	_id?: string;
	fullname?: string;
	username?: string;
	email?: string;
	password?: string;
	createdAt?: Date;
	updatedAt?: Date;
	profile?: {
		name?: string;
		photo?: string;
	};
	study: {
		dailyGoal: number;
		daysChallenged: number;
		lastDateChallenged: Date;
		lastDateXP: number;
		streakDays: number;
		streakLastDate: Date;
		xp: number;
		completedChallenges: string[];
	};
}
```

### `Unit`

This describes details regarding a unit. For instance, `Ratios, Rates and Proportions` to guide the user about the type of questions they are being challenged with. This will help them to know which units they are good at and which ones they need to practice more.

```sh
interface Unit {
	_id: string;
	level: number;
	name: string;
}
```

### `Questions and Answers`

As the main feature of the application, each challenge has a number of questions and their respective answers.

#### `Answer`

```sh
interface Answer {
	_id: string;
	picture: string;
	text: string;
}
```

#### `Question`

```sh
interface Question {
	_id?: string;
	text: string;
	picture: string;
	pictureDescription: string;
	hint: string;
	unit: Unit;
	difficulty: number;
	optionAnswers: Answer[];
	correctAnswer: Answer;
}
```

> Note: Each `Question has 4 options` that the user can choose from and among these 4, there is only one correct answer. That's why the `Question` has `optionAnswers` and `correctAnswer`

### `Challenge`

This is the main feature of the application -- `The Challlenge`. This is made of `10 Questions` with a difficulty derived from the difficulty of each question.

```sh
interface Challenge {
	_id: string;
	title: string;
	level: number;
	difficulty: number;
	cover: string;
	disabled: boolean;
	questions: Question[];
}
```

> Note: The user complete the `next challenge` only when they have completed the previous one. Which is why the challenge might be `disabled` until the user unlocks it to be able to perform it.

## Get Started

Clone the repo
`git clone <repo-link>`

Create a branch
`git checkout -b <branch-name>`
