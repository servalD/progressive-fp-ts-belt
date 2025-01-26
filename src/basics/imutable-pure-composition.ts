import { A, pipe } from "@mobily/ts-belt";
import { createLogCodeContext } from '../lib';

const { logSection, logData, promptToContinue } = createLogCodeContext(__filename);

export const step1 = async () => {
  logSection("Example of immutability");
  // Instead of modifying an existing list, create a new version.
  const originalArray = [1, 2, 3];
  // Functional method: Creates a new array with doubled elements
  const updatedArray = A.map(originalArray, x => x * 2);
  logData("Updated Array (doubled elements)", updatedArray);
  await promptToContinue();

  logSection("Example of a Pure Function");
  // Determinism and absence of side effects.
  const add = (a: number, b: number): number => a + b;
  let result = add(3, 5)
  logData("Addition of 3 + 5", result); 
  await promptToContinue();

  logSection("Example of Composition");
  // Combine multiple transformations into a readable pipeline.
  const double = (x: number): number => x * 2;
  const increment = (x: number): number => x + 1;

  // Using pipe to apply multiple transformations
  const numbers = [1, 2, 3, 4];
  const transformedNumbers = numbers.map(double).map(increment);
  logData("Transformed Numbers (doubled then incremented)", transformedNumbers);
  await promptToContinue();

  logSection("Example of Composition with ts-belt !");
  // Using the pipe function from ts-belt to compose functions
  const tsBeltTransformedNumbers = pipe(numbers, A.map(double), A.map(increment));
  logData("Transformed Numbers (doubled then incremented)", tsBeltTransformedNumbers);
  await promptToContinue();

};
