import { uuidv4 } from '@firebase/util';

export async function Sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function stringToNumber(uuid: string): number {
  uuid.replace(/\D/g, '');
  return parseInt(uuid, 10);
}

export function stringToBool(str: string): boolean {
  return stringToNumber(str) % 2 == 0;
}
