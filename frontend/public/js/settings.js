document.addEventListener('DOMContentLoaded', function() {
    // Función para manejar los botones de modificación
    const editButtons = document.querySelectorAll('.edit-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const infoItem = this.closest('.info-item');
            const label = infoItem.querySelector('label').textContent;
            const currentValue = infoItem.querySelector('.info-value').firstChild.textContent.trim();

            // Solo para demostración - en una implementación real, esto abriría un formulario de edición
            const newValue = prompt(`Editar ${label}`, currentValue);

            if (newValue && newValue !== currentValue) {
                infoItem.querySelector('.info-value').firstChild.textContent = newValue;
                // Aquí iría una llamada a la API para actualizar el dato en el backend
                console.log(`Actualizando ${label} a:`, newValue);
            }
        });
    });

    // Simular datos del usuario (en un caso real esto vendría de una API)
    const userData = {
        fullName: "Pepito Pérez",
        email: "Protelab@corros.com.co",
        contactEmail: "Protelab@corros.com.co",
        phone: "+57 123 456 7890",
        whatsapp: "+57 987 654 3210",
        userType: "Propietario"
    };

    // Actualizar UI con datos del usuario
    function loadUserData() {
        document.querySelectorAll('.info-item')[0].querySelector('.info-value').firstChild.textContent = userData.fullName;
        document.querySelectorAll('.info-item')[1].querySelector('.info-value').firstChild.textContent = userData.email;
        document.querySelectorAll('.info-item')[3].querySelector('.info-value').firstChild.textContent = userData.contactEmail;
        document.querySelectorAll('.info-item')[4].querySelector('.info-value').firstChild.textContent = userData.phone;
        document.querySelectorAll('.info-item')[5].querySelector('.info-value').firstChild.textContent = userData.whatsapp;
        document.querySelectorAll('.info-item')[6].querySelector('.info-value').firstChild.textContent = userData.userType;
    }

    loadUserData();
});