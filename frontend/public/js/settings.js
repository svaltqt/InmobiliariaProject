import './update.js';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("/api/auth/me", {
            credentials: "include"
        });

        if (!res.ok) {
            throw new Error("No se pudo obtener la información del usuario");
        }

        const user = await res.json();
        const infoValues = document.querySelectorAll(".info-value");

        infoValues[0].innerHTML = `${user.fullName || "No definido"} <button class="edit-btn">Modificar</button>`;
        infoValues[1].innerHTML = `${user.username || "No definido"} <button class="edit-btn">Modificar</button>`;
        infoValues[2].innerHTML = `${user.email || "No definido"} <button class="edit-btn">Modificar</button>`;
        infoValues[3].innerHTML = `*************** <button class="edit-btn">Modificar</button>`;
        infoValues[4].innerHTML = `${user.tel || "No definido"} <button class="edit-btn">Modificar</button>`;
        infoValues[5].innerHTML = `${user.address || "No definido"} <button class="edit-btn">Modificar</button>`;
        infoValues[6].innerHTML = `${user.type || "No definido"} <button class="edit-btn">Modificar</button>`;

    } catch (error) {
        console.error("Error cargando datos del usuario:", error.message);
    }
});
