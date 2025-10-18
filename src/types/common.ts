export type ArrayValue<T extends readonly unknown[]> = T[number];

export type RemoveBeforeSeparator<S extends string> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  S extends `${infer _}_${infer After}` ? After : S;

export type RemoveAfterSeparator<S extends string> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  S extends `${infer Before}_${infer _}` ? Before : S;

export type ToNumber<
  S extends string,
  T extends unknown[] = [],
> = S extends `${T['length']}` ? T['length'] : ToNumber<S, [...T, '']>;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;
