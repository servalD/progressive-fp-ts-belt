import { step1, step2 } from './basics';
import { step3 } from './ts-belt';
import { stepUtils } from './utils';

async function main () {
  await step1();
  await step2();
  await step3();
  await stepUtils();
}

main().catch(console.error);
