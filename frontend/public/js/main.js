import { loginUser } from './login.js';
import { logoutUser } from './logout.js';
import { checkSession } from './checkSession.js';
import { registerUser } from './register.js';

document.addEventListener('DOMContentLoaded', () => {
    checkSession();
    const profileBtn = document.getElementById('profileBtn');
    const loginBtn = document.getElementById('loginBtn');
    const modal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close-modal');
    const logoutBtn = document.getElementById('logoutBtn');
    let loginFormInitialized = false;
    loginBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';

        // solo agregar el eventListener una vez
        if (!loginFormInitialized) {
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', async (e) => {
                    e.preventDefault();

                    const username = document.getElementById('username').value;
                    const password = document.getElementById('password').value;

                    const userData = await loginUser(username, password);

                    if (userData) {
                        modal.style.display = 'none';
                        loginBtn.style.display = 'none';
                        registerBtn.style.display= 'none';
                        logoutBtn.style.display = 'inline';
                        profileBtn.style.display = 'inline';


                    } else {
                        alert("Credenciales incorrectas");
                    }
                });
                loginFormInitialized = true;
            }
        }
    });
    closeBtn?.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // --- Registro ---
    const registerBtn = document.getElementById('registerBtn');
    const registerModal = document.getElementById('registerModal');
    const cancelBtn = document.querySelector('.cancel-btn');

    registerBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.style.display = 'block';
        registerModal.classList.add('no-close');

        const registerForm = document.getElementById('registerForm');

        registerForm?.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fullName = document.getElementById('registerFullName').value;
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;

            const result = await registerUser(fullName, username, email, password, confirmPassword);

            if (result) {
                registerBtn.style.display= 'none';
                document.getElementById('registerModal').style.display = 'none';
                document.getElementById('loginBtn').style.display = 'none';
                document.getElementById('logoutBtn').style.display = 'inline';
                document.getElementById('profileBtn').style.display = 'inline';

            }
        });

    });

    cancelBtn?.addEventListener('click', () => {
        registerModal.style.display = 'none';
        registerModal.classList.remove('no-close');
    });

    // --- Logout ---
    logoutBtn?.addEventListener('click', async (e) => {
        e.preventDefault();
        const success = await logoutUser();
        if (success) {
            logoutBtn.style.display = 'none';
            loginBtn.style.display = 'inline';
            registerBtn.style.display= 'inline';
        }
    });

    //-- profile
    document.getElementById("profileBtn").addEventListener("click", () => {
        window.location.href = "/settings.html";
    });
});
