import { SERVER_URL } from './constants';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class HttpError extends Error {
  originalError: unknown;

  constructor(message: string, originalError: unknown) {
    super(message);
    this.originalError = originalError;
    this.name = 'HttpError';
  }
}

async function httpClient<T>(endpoint: string, method: HttpMethod = 'GET', body?: unknown): Promise<T> {
  try {
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${SERVER_URL}${endpoint}`, config);

    if (!response.ok) {
      let errorMessage = 'Network response was not ok';
      try {
        const errorBody = await response.json();
        // eslint-disable-next-line max-depth
        if (
          errorBody && typeof errorBody === 'object' && 'message' in errorBody && typeof errorBody.message === 'string'
        ) {
          errorMessage = errorBody.message;
        }
      } catch (e) {
        throw new HttpError('Request failed and error details are unavailable', e);
      }

      throw new HttpError(errorMessage, null);
    }

    const responseBody = await response.json() as T;
    return responseBody;
  } catch (error) {
    throw new HttpError(
      error instanceof Error ? error.message : 'An unknown error occurred',
      error
    );
  }
}

export default httpClient;
