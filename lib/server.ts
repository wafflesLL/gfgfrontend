import { GFG_API_KEY, GFG_API_URL } from "@env";

export async function apiFetchJSON(path: string, options: RequestInit = {}) {
    // Validate API key exists
    if (!GFG_API_KEY) {
        throw new Error("GFG_API_KEY is not defined in environment variables");
    }

    if (!GFG_API_URL) {
        throw new Error("GFG_API_URL is not defined in environment variables");
    }

    const headers = {
        ...(options.headers || {}),
        "x-api-key": GFG_API_KEY,
    };

    return fetch(
        `${GFG_API_URL}${path}`,
        {
            ...options,
            headers,
        }
    );
}