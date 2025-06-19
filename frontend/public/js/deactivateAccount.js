document.getElementById('deactivateAccountBtn')?.addEventListener('click', async () => {
    if (!confirm("¿Estás seguro de desactivar tu cuenta temporalmente?")) return;

    try {
        const response = await fetch('/api/users/deactivate', {
            method: 'POST',
            credentials: 'include' // Para enviar cookies
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Error al desactivar cuenta");
        }

        // Manejo especial si viene el flag de desactivación
        if (data.deactivated) {
            // Forzar verificación de estado
            await checkAuthStatus();
            window.location.href = '/?account=deactivated';
        }

    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error("Deactivation error:", error);
    }
});

// Función para verificar estado de autenticación
async function checkAuthStatus() {
    try {
        const response = await fetch('/api/auth/me', {
            credentials: 'include'
        });

        if (!response.ok) {
            updateUIForLoggedOutState();
            return;
        }

        const user = await response.json();
        if (user.deactivated) {
            updateUIForDeactivatedState();
        }

    } catch (error) {
        console.error("Auth check failed:", error);
    }
}

function updateUIForDeactivatedState() {
    // Ocultar elementos de sesión activa
    document.querySelectorAll('.auth-element').forEach(el => {
        el.style.display = 'none';
    });

    // Mostrar mensaje
    const authContainer = document.getElementById('auth-container');
    if (authContainer) {
        authContainer.innerHTML = `
            <div class="deactivated-warning">
                <p>Tu cuenta está desactivada</p>
                <a href="/reactivate" class="reactivate-link">Reactivar cuenta</a>
            </div>
        `;
    }
}