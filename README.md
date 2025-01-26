# Functional Programming Masterclass

This repository serves as an interactive tutorial to learn the core concepts of functional programming, enhanced with examples using the **TS Belt** library.

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the tutorial:
   ```bash
   npm run dev
   ```

The tutorial will guide you step-by-step through different sections. When you stop the program, your progress will be saved automatically. Upon restarting, you will resume from where you left off.

---

## Table of Contents

### Examples

1. [Immutability](#immutability)
2. [Pure Functions](#pure-functions)
3. [Composition](#composition)
4. [Composition with TS Belt](#composition-with-ts-belt)
5. [Currying](#currying)
6. [Recursion](#recursion)
7. [Recursion: Sum of an Array](#recursion-sum-of-an-array)
8. [Functional Error Handling](#functional-error-handling)

---

## Detailed Explanations

### 1. Immutability
Learn how to work with immutable data structures by creating new versions of data rather than modifying the original. This approach reduces bugs and enhances predictability in your programs. The example uses `A.map` from TS Belt to transform arrays effectively.

### 2. Pure Functions
Discover how to write deterministic functions that always produce the same output for the same input, without side effects. This ensures predictability and makes your code easier to debug and test.

### 3. Composition
Understand how to combine simple transformations into a readable pipeline, enabling you to write reusable functions and process data in stages for clearer and more maintainable code.

### 4. Composition with TS Belt
Explore how the `pipe` function from TS Belt simplifies functional composition, allowing for cleaner and more readable function chaining. This method highlights the advantages of TS Belt's utility methods.

### 5. Currying
Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument. This enhances reusability and enables easier composition of functions. the majority of TS-Belt functions use this concept. This is why, in the previous section, there was no need to pass the result of the previous function on each subsequent call. The `pipe` function took care of this, thanks to the fact that the `A.map` function is curried.

### 6. Recursion
Explore recursion, a foundational programming concept where a function solves complex problems by calling itself to tackle smaller, more manageable instances. This section focuses on mastering the art of writing effective recursive functions by clearly defining the base case (to terminate the recursion) and the recursive case (to break down the problem step by step).

### 7. Recursion: Sum of an Array
See recursion applied in a practical example: summing elements in an array. The example leverages TS Belt methods like `A.head` and `A.drop` to implement functional recursion elegantly.

### 8. Functional Error Handling
This section explores how to handle errors functionally using `Option` and `Result` from TS Belt. It includes three parts:

- **Basic Error Handling**: Demonstrates how to represent success and failure using `Result`. For instance, dividing numbers safely by checking for division by zero.
- **Composing Error Handling**: Combines multiple functions with error handling, such as parsing strings into numbers and safely dividing them, using `pipe` and `Result` utilities.
- **Practical Use Cases**: Explains how to leverage `Option` to handle missing or invalid values gracefully and convert them into `Result` for detailed error messages.

---

## Resuming Progress

The repository tracks your progress by saving the last completed section in a file called `lastSection.txt`. When you restart the tutorial, it will automatically resume from where you left off. You can reset progress by deleting the `lastSection.txt` file.

---

## Requirements

- Node.js (v14 or higher recommended)
- npm

---

## Feedback

If you encounter any issues or have suggestions, please open an issue on the repository or contact the maintainer directly.
