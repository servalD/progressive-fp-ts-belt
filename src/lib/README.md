# `styled.ts`: Enhanced Logging for TypeScript

`styled.ts` is a powerful utility designed to improve logging a course in TypeScript. It offers advanced features like logging code context, managing execution flow with sections, and producing visually appealing, styled console outputs.

---

## Key Features

- **Section Management**: Organize and track execution flow with clear section demarcations.
- **Code Context Logging**: Display relevant code snippets directly from the current file.
- **Syntax Highlighting**: Enhance readability with color-coded, highlighted console outputs.
- **Session Persistence**: Save and retrieve the last executed section across sessions.

---

## Getting Started

### Initialization
Import and initialize the logging context:
```typescript
import { createLogCodeContext } from './styled';

const { logSection, logData, logAtTheEnd, promptToContinue } = createLogCodeContext(__filename);
```

### Available Methods

#### `logSection(title: string)`
Logs a new section title and resets the code context tracking:
```typescript
logContext.logSection("Initializing Variables");// Out: === Section 1: Initializing Variables ===
```

#### `logData(label: string, value: unknown, codeContext: number = 0)`
Logs a labeled value, optionally displaying above code context:
```typescript
logContext.logData("Variable x", x);// Out: Variable x: [ 2, 4, 6 ]
```

#### `logAtTheEnd(...message: any)`
Queues messages to be displayed at the end of the current section:
```typescript
logContext.logAtTheEnd("Final value of x:", x);
```

#### `promptToContinue(codeContext: number = 0)`
Pauses execution and waits for user input to proceed, optionally logging above code context:
```typescript
await logContext.promptToContinue();// Press Enter to continue...
```

---

## Example Usage

Here’s a complete example demonstrating `styled.ts`:
```typescript
import { createLogCodeContext } from './styled';

const { logSection, logData, logAtTheEnd, promptToContinue } = createLogCodeContext(__filename);
logSection("Start Program");

const x = 42;
logData("Variable x", x);

await promptToContinue();

logSection("Next Section");
message = "End of section 1";
asyncFunc().then(() => logAtTheEnd(message))
await promptToContinue();
```
```
=== Section 1: Start Program ===

const x = 42;
Variable x: 42
Press Enter to continue...

=== Section 2: Next Section ===

message = "End of section 1";
asyncFunc().then(() => logAtTheEnd(message))

=== Logs ===
End of section 1
Press Enter to continue...
```

---

## Configuration Options

- **Last Section Tracking**: The last executed section is stored in `lastSection.txt`, enabling session persistence.
- **Syntax Highlighting**: Customize the highlighting theme by modifying the `logCodeContext` function.
