import {AuthProvider} from "react-admin";

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    login: async ({username, password}) => {
        const request = new Request( `${import.meta.env.VITE_ADMIN_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: new Headers({'Content-Type': 'application/json'}),
        });
        const response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }
        const auth = await response.json();
        localStorage.setItem('auth', auth.token);
    },
    // called when the user clicks on the logout button
    logout: () => {
        const request = new Request( `${import.meta.env.VITE_ADMIN_URL}/logout`, {
            method: 'POST',
            headers: new Headers({'Authorization': `Bearer ${localStorage.getItem('auth')}`}),
        });
        fetch(request);
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location
    checkAuth: () => {
        return localStorage.getItem('auth') ? Promise.resolve() : Promise.reject();
    },
    // called when the user navigates to a new location
    getPermissions: () => {
        // const role = JSON.parse(localStorage.getItem('auth') || '{"role": "guest"}').role;
        // return role ? Promise.resolve(role) : Promise.reject();
        return Promise.resolve();
    }
}