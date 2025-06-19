document.addEventListener('DOMContentLoaded', () => {
    const deleteBtn = document.getElementById('deleteAccountBtn');

    if (deleteBtn) {
        deleteBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            if (!confirm('⚠️ ¿Estás SEGURO que deseas ELIMINAR PERMANENTEMENTE tu cuenta? Todos tus datos serán borrados irreversiblemente.')) {
                return;
            }

            const password = prompt('Por seguridad, ingresa tu contraseña:');
            if (!password) return;

            try {
                deleteBtn.disabled = true;
                deleteBtn.textContent = 'Eliminando...';

                const response = await fetch('/api/users/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ password }) // Envía la contraseña para validación
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Error al eliminar la cuenta');
                }

                // Limpiar todo y redirigir
                localStorage.clear();
                sessionStorage.clear();
                document.cookie.split(";").forEach(c => {
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
                });

                alert('✅ Tu cuenta ha sido eliminada permanentemente');
                window.location.href = '/';

            } catch (error) {
                console.error('Delete Error:', error);
                alert(`❌ Error: ${error.message}`);
            } finally {
                if (deleteBtn) {
                    deleteBtn.disabled = false;
                    deleteBtn.textContent = 'Eliminar cuenta permanentemente';
                }
            }
        });
    }
});