export const checkSession = async () => {
    try {
        const res = await fetch('/api/auth/me', {
            method: 'GET',
            credentials: 'include'
        });

        if (!res.ok) throw new Error('No autenticado');

        const userData = await res.json();

        console.log('Sesión activa:', userData);

        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('registerBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'inline';
        document.getElementById("profileBtn").style.display = "inline";
    } catch (err) {
        console.log('No hay sesión activa');
        document.getElementById('loginBtn').style.display = 'inline';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById("profileBtn").style.display = "none";
    }
};
