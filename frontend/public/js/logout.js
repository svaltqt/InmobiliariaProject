export async function logoutUser() {
    try {
        const res = await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error('Error cerrando sesión');
        }

        const data = await res.json();
        console.log('Logout:', data.message);
        return true;
    } catch (error) {
        console.error('Error en logoutUser:', error);
        return false;
    }
}
