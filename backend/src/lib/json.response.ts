type JsonResponse<T> = {
  statusCode: number;
  body: T;
  headers?: Record<string, string>;
};

export function jsonResponse<T>(
  statusCode: number,
  body: T,
  headers: Record<string, string> = { "Content-Type": "application/json" }
): JsonResponse<T> {
  if (statusCode < 100 || statusCode > 599) {
    throw new Error("Invalid status code. It must be between 100 and 599.");
  }

  return {
    statusCode,
    body,
    headers,
  };
}
