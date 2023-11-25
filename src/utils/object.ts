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
