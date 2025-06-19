document.addEventListener('DOMContentLoaded', function() {
    // Usamos event delegation para manejar el clic
    document.body.addEventListener('click', function(e) {
        // Verificamos si el clic fue en el enlace de recuperación
        if (e.target && e.target.id === 'forgotPasswordLink') {
            e.preventDefault();
            showRecoverModal();
        }
    });

    function showRecoverModal() {
        const modal = document.createElement('div');
        modal.id = 'recoverModal'; // Añadimos un ID único
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
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
        modal.querySelector('#recoverForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = modal.querySelector('#recoverEmail').value;

            fetch('/api/auth/recover-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
                .then(response => response.json())
                .then(data => {
                    const resultDiv = modal.querySelector('#recoverResult');
                    if (data.success) {
                        resultDiv.innerHTML = `
                        <div class="recover-info">
                            <p><strong>Email:</strong> ${data.email}</p>
                            <p><strong>Contraseña hasheada:</strong> ${data.passwordHash}</p>
                            <p class="note">${data.note}</p>
                        </div>
                    `;
                    } else {
                        resultDiv.innerHTML = `<div class="error">${data.error}</div>`;
                    }
                })
                .catch(error => {
                    const resultDiv = modal.querySelector('#recoverResult');
                    resultDiv.innerHTML = `<div class="error">Error al conectar con el servidor</div>`;
                });
        });
    }
});