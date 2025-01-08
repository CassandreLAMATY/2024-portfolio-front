import qs from 'qs';

export class ApiHandler {
    private API_URL: string | null;
    private API_TOKEN: string | null;

    constructor(apiUrl: string | null, apiToken: string | null) {
        this.API_URL = apiUrl;
        this.API_TOKEN = apiToken;
    }

    public async request<T>(url: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(`${this.API_URL}${url}`, {
            ...options,
            headers: {
                ...options.headers,
                'Content-Type': 'application/json',
                'User-Agent': import.meta.env.VITE_USER_AGENT + import.meta.env.VITE_VERSION,
                Authorization: this.API_TOKEN ? `Bearer ${this.API_TOKEN}` : ''
            }
        });

        if (!response.ok) {
            throw new Error(`An error has occured: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    }

    public async get<T>(url: string, params: Record<string, string> = {}): Promise<T> {
        const queryParams = qs.stringify(params, { encode: false });
        const apiUrl = `${url}${queryParams ? `?${queryParams}` : ''}`;
        return await this.request<T>(apiUrl, {});
    }

    public async post<T>(url: string, data: any = {}): Promise<T> {
        return await this.request<T>(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    public async patch<T>(url: string, data: any = {}): Promise<T> {
        return await this.request<T>(url, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }

    public async delete<T>(url: string): Promise<T> {
        return await this.request<T>(url, {
            method: 'DELETE'
        });
    }

    public async put<T>(url: string, data: any = {}): Promise<T> {
        return await this.request<T>(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
}
