import { step1, step2 } from './basics';
import { step3 } from './ts-belt';
import { step4 } from './utils';

async function main () {
  await step1();
  await step2();
  await step3();
  await step4();
}

main().catch(console.error);
