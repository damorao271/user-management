import { z } from 'zod';

/** Treat `""` / `null` from query strings as undefined. */
export function emptyToUndefined<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess((v) => (v === '' || v === null ? undefined : v), schema);
}
