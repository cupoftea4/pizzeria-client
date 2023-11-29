export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function hasProperty<T extends Record<string, unknown>, K extends string>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return key in obj;
}
export function isObjectWithProperty<T, K extends string>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return isObject(obj) && hasProperty(obj, key);
}

export function isObjectWithProperties<T, K extends string>(
  obj: T,
  ...keys: K[]
): obj is T & Record<K, unknown> {
  return keys.every(key => isObjectWithProperty(obj, key));
}

type StringOrNumberKeyOf<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never
}[keyof T];

export function arrayToObject<T extends Record<string, unknown>>(
  array: T[],
  key: StringOrNumberKeyOf<T>
): Record<string | number, T> {
  return array.reduce<Record<string | number, T>>((acc, item) => {
    // It must be safe to cast here because we know that key is a key of T and T[key] is a string or number
    const keyValue = item[key] as string | number;
    acc[keyValue] = item;
    return acc;
  }, {});
}
