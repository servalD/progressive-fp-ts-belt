import { O, R, pipe } from "@mobily/ts-belt";
import { createLogCodeContext } from '../lib';

const { logSection, logData, logAtTheEnd, promptToContinue } = createLogCodeContext(__filename);

export const step3 = async () => {
  logSection("Example of Functional Error Handling");
  // Simulating a function that may fail
  const divide = (a: number, b: number): R.Result<number, string> => {
    if (b === 0) {
      return R.Error("Division by zero is not allowed.");
    }
    return R.Ok(a / b);
  };

  // Example with successful division
  const result1 = divide(10, 2);
  R.match(result1,
    (value) => logAtTheEnd("Successful Division Result", value),
    (error) => logAtTheEnd("Error Message", error),
  );

  // Example with division by zero
  const result2 = divide(10, 0);
  R.match(result2,
    (value) => logAtTheEnd("Successful Division Result", value),
    (error) => logAtTheEnd("Error Message", error),
  );
  await promptToContinue();

  logSection("Composing Error Handling");
  // Combining multiple steps with error handling
  const parseNumber = (input: string): O.Option<number> => {
    const num = Number(input);
    return isNaN(num) ? O.None : O.Some(num);
  };

  const safeDivide = (a: string, b: string): R.Result<number, string> => {
    return pipe(
      parseNumber(a),
      O.toResult("Invalid number format for the first input."),
      R.flatMap((numA) =>
        pipe(
          parseNumber(b),
          O.toResult("Invalid number format for the second input."),
          R.flatMap((numB) => divide(numA, numB))
        )
      )
    );
  };

  const composedResult = safeDivide("10", "2");
  R.match(composedResult,
    (value) => logAtTheEnd("Composed Successful Result", value),
    (error) => logAtTheEnd("Composed Error Message", error),
  );
  await promptToContinue();
};
