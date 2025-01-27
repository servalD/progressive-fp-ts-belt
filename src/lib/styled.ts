import fs from "fs";
import highlight from "cli-highlight";
import chalk from 'chalk';
import { A, pipe, S } from "@mobily/ts-belt";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Retrieve the last section number from the file
const getLastSection = () => {
  try {
    return parseInt(fs.readFileSync("lastSection.txt", "utf-8"), 10);
  } catch {
    return 1;
  }
}

// Initialize the current section number (global because it's shared between all files)
let currentSection = 0;
let lastSection = getLastSection();

// Save the last section number in a file to be able to retrieve it later
const saveLastSection = () => {
  lastSection++;
  fs.writeFileSync("lastSection.txt", lastSection.toString());
}

const dedentCode = (code: string): string => {
  // Remove leading/trailing empty lines
  
  const trimmedLines = pipe(code, S.split('\n'), A.filter(line => line.trim().length > 0));
  // Calculate the minimum indentation
  
  const minIndent = Math.min(
    ...pipe(trimmedLines, A.map(line => line.match(/^(\s*)/)?.[1]?.length || 0))
  );
  // Remove the minimum indentation from all lines
  return pipe(trimmedLines, A.map(S.slice(minIndent, -1)), A.join("\n"));
};

// Create a context for logging code (using closure method !!!)
export const createLogCodeContext = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf-8").split("\n");
  let sectionStartLine = 0;
  let logs: any[] = [];

  function consumeLogs() {
    logs.forEach(log => console.log(...log));
    logs = [];
  }

  // Get the current line number of the call stack (kind of introspection)
  const getCurrentLine = (stack: number = 0) => {
    const error = new Error();
    const stackLine = error.stack?.split("\n")[2 + stack];
    const match = stackLine?.match(/\((.*):([0-9]+):([0-9]+)\)/);
    return match ? parseInt(match[2], 10) : 0;
  }

  // Log the code context between the current line of the call and back to lineCount lines or the start of the section (sectionStartLine) if lineCount=0
  const logCodeContext = (lineCount: number = 0, stack: number = 0) => {
    const line = getCurrentLine(stack + 1);
    
    if (line > 0) {
      lineCount = lineCount > 0 ? lineCount : line - sectionStartLine
      const startLine = Math.max(0, line - lineCount - 1);
      const context = fileContent.slice(startLine, line - 1).join("\n");
      console.log(highlight(dedentCode(context).replace(/([()[\]{}])/g, chalk.magenta("$1")), {
        language: "typescript",
        theme: {
          keyword: chalk.blueBright,
          string: chalk.hex('#9c663c'),
          number: chalk.hex('#c5eaad'),
          params: chalk.hex('#9cc7df'),
          class: chalk.hex('#9cc7df'),
          default: chalk.hex('#d8d8a6'),
          function: chalk.blue,
        }
      }));
      if (context.includes("logAtTheEnd")) {
        delay(100);// Wait for the logAtTheEnd to be printed (never too long but just in case)
        console.log(chalk.bold.blue("\n=== Logs ==="));
        consumeLogs();
      }
      
    }
  };

  // Log a section title and reset the section start line (to log the code between this call and the next logData or promptToContinue). Increment the current section number.
  const logSection = (title: string) => {
    currentSection++;
    if (currentSection < lastSection) return;
    sectionStartLine = getCurrentLine(1) + 1;
    console.log(chalk.bold.blue(`\n=== Section ${currentSection}: ${title} ===\n`));
  };

  // Push logs to be printed at the end of the section
  const logAtTheEnd = (...message: any) => {
    if (currentSection < lastSection) return;
    logs.push(message);
  }

  // Log a data label and value. Log the code context between the current line of the call and back to lineCount lines (or the start of the section if lineCount=0).
  const logData = (label: string, value: unknown, codeContext: number = 0) => {
    if (currentSection < lastSection) return;
    codeContext >= 0 && sectionStartLine > 0 && logCodeContext(codeContext, 1);
    sectionStartLine = 0;
    console.log(chalk.hex("#96fffd")(label+':'), value);
  };

  // Prompt to continue and log the code context between the current line of the call and back to lineCount lines (or the start of the section if lineCount=0).
  const promptToContinue = async (codeContext: number = 0): Promise<void> => {
    if (currentSection < lastSection) return;
    codeContext >= 0 && sectionStartLine > 0 && logCodeContext(codeContext, 1);
    sectionStartLine = 0;
    console.log("Press Enter to continue...");
    return new Promise(resolve => {
      process.stdin.resume();
      process.stdin.once("data", () => {
        process.stdin.pause();
        saveLastSection();
        resolve();
      });
    });
  };

  return { logSection, logAtTheEnd, logData, promptToContinue };

};
