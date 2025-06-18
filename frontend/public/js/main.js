// Seleccionar elementos
const loginBtn = document.querySelector('header nav a[href="#"]:first-child');
const modal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close-modal');

// Abrir modal al hacer clic en "Iniciar sesión"
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
});

// Cerrar modal al hacer clic en la X
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Seleccionar elementos
const registerBtn = document.querySelector('header nav a[href="#"]:last-child');
const registerModal = document.getElementById('registerModal');
const cancelBtn = document.querySelector('.cancel-btn');

// Abrir modal de registro
registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.style.display = 'block';
    registerModal.classList.add('no-close'); // Agrega clase para evitar cierre
});

// Cerrar modal con botón Cancelar
cancelBtn.addEventListener('click', () => {
    registerModal.style.display = 'none';
    registerModal.classList.remove('no-close');
});

// Evitar que el formulario se envíe (solo para demostración)
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Registro exitoso (esto es una demo)');
    registerModal.style.display = 'none';
    registerModal.classList.remove('no-close');
});

// Deshabilitar cierre al hacer clic fuera (no necesario con la clase no-close)
registerModal.addEventListener('click', (e) => {
    e.stopPropagation(); // Detiene la propagación del evento
});