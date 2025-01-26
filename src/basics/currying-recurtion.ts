import { A } from "@mobily/ts-belt";
import { createLogCodeContext } from '../lib';

const { logSection, logData, promptToContinue } = createLogCodeContext(__filename);

export const step2 = async () => {
  logSection("Example of Currying");
  // Currying transforms a function with multiple arguments into a sequence of functions.
  const add = (a: number) => (b: number): number => a + b;
  const addFive = add(5);
  const result = addFive(3); // Equivalent to add(5)(3)
  logData("Result of adding 5 and 3 using currying", result);
  await promptToContinue();

  logSection("Example of Recursion");
  // Recursion allows a function to call itself to solve smaller instances of a problem.
  const factorial = (n: number): number => {
    if (n <= 1) return 1; // Base case
    return n * factorial(n - 1); // Recursive case
  };
  const factorialOfFive = factorial(5);
  logData("Factorial of 5", factorialOfFive);
  await promptToContinue();

  logSection("Recursion Example: Sum of Array");
  // Summing elements in an array using recursion
  const sumArray = (arr: readonly number[]): number => {
    if (A.isEmpty(arr)) return 0; // Base case: empty array
    return A.head(arr)! + sumArray(A.drop(arr, 1)); // Head + Recursive call on tail
  };
  const numbers = [1, 2, 3, 4];
  const sumOfNumbers = sumArray(numbers);
  logData("Sum of [1, 2, 3, 4]", sumOfNumbers);
  await promptToContinue();
};
