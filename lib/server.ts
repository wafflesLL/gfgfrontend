import { GFG_API_URL } from "@env";

export async function apiFetchJSON(path: string, options: RequestInit = {}) {

    if (!GFG_API_URL) {
        throw new Error("GFG_API_URL is not defined in environment variables");
    }

    const headers = {
        ...(options.headers || {}),
    };

    return fetch(
        `${GFG_API_URL}${path}`,
        {
            ...options,
            headers,
        }
    );
}