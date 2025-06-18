export async function loginUser(username, password) {
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log('Login response:', data)

        if (response.ok) {
            alert(`Bienvenido, ${data.fullName}`);
            return data;
        } else {
            alert(data.error || 'Error al iniciar sesión');
            return null;
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al conectar con el servidor');
        return null;
    }
}
