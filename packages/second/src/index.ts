import { first } from '@acme/first';

export const second = () => {
  return 'second' + first();
}