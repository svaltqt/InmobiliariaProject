document.addEventListener('DOMContentLoaded', function() {
    // Mostrar modal de recuperación
    document.getElementById('forgotPasswordLink').addEventListener('click', function(e) {
        e.preventDefault();
        showRecoverModal();
    });

    function showRecoverModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-recover';
        modal.innerHTML = `
            <div class="modal-recover-content">
                <span class="close-modal">&times;</span>
                <h2>Recuperar Contraseña</h2>
                <form id="recoverForm">
                    <input type="email" id="recoverEmail" placeholder="Ingresa tu email" required>
                    <button type="submit">Buscar</button>
                </form>
                <div id="recoverResult"></div>
            </div>
        `;

        document.body.appendChild(modal);

        // Cerrar modal
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });

        // Enviar formulario
        document.getElementById('recoverForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('recoverEmail').value;

            fetch('/api/auth/recover-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
                .then(response => response.json())
                .then(data => {
                    const resultDiv = document.getElementById('recoverResult');
                    if (data.success) {
                        resultDiv.innerHTML = `
                        <div class="recover-info">
                            <p><strong>Email:</strong> ${data.email}</p>
                            <p><strong>Contraseña:</strong> ${data.password}</p>
                            <p><strong>Hash almacenado:</strong> ${data.passwordHash}</p>
                            <p class="note">${data.note}</p>
                        </div>
                    `;
                    } else {
                        resultDiv.innerHTML = `<div class="error">${data.error}</div>`;
                    }
                })
                .catch(error => {
                    document.getElementById('recoverResult').innerHTML =
                        `<div class="error">Error al conectar con el servidor</div>`;
                });
        });
    }
});