const inflightRequests = new Map<string, Promise<any>>();

export function deduplicatedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>
): Promise<T> {
  const existing = inflightRequests.get(key);
  if (existing) return existing;
  const promise = fetchFn().finally(() => {
    inflightRequests.delete(key);
  });
  inflightRequests.set(key, promise);
  return promise;
}
