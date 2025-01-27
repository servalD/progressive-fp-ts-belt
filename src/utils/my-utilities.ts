import { A, D, S, pipe } from "@mobily/ts-belt";
import { createLogCodeContext } from '../lib';

const { logSection, logData, promptToContinue } = createLogCodeContext(__filename);

export const step4 = async () => {
  logSection("Example of Array Utilities");
  // Using ts-belt to filter even numbers and sort them
  const numbers = [7, 3, 1, 9, 4, 6, 2];
  const evenNumbers = pipe(
    numbers,
    A.filter((x) => x % 2 === 0), // Keep only even numbers
    A.sort((a, b) => a - b) // Sort in ascending order
  );
  logData("Filtered and Sorted Even Numbers", evenNumbers);
  await promptToContinue();

  logSection("Example of Dictionary Utilities");
  // Manipulate objects with ts-belt's dictionary functions
  const user = { id: 1, name: "Alice", age: 30 };
  const updatedUser = D.set(user, "age", 31); // Immutable update
  logData("Updated User", updatedUser);
  logData("Original User (Unchanged)", user);
  await promptToContinue();

  logSection("Example of String Utilities");
  // String manipulation using ts-belt
  const sentence = "   Hello Functional Programming!   ";
  const cleanedSentence = pipe(
    sentence,
    S.trim, // Remove whitespace
    S.toLowerCase, // Convert to lowercase
    S.replace("functional", "FP") // Replace a word
  );
  logData("Cleaned and Transformed Sentence", cleanedSentence);
  await promptToContinue();

  logSection("Example of Reduce Utility");
  // Summing up numbers in an array using ts-belt's reduce
  const numbersToSum = [1, 2, 3, 4, 5];
  const sum = A.reduce(numbersToSum, 0, (acc, value) => acc + value);
  logData("Sum of Numbers", sum);
  await promptToContinue();


};
