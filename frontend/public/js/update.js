document.addEventListener("click", async (event) => {
    const btn = event.target.closest(".edit-btn, .save-btn");
    if (!btn) return;

    const container = btn.closest(".info-item");
    const field = container.dataset.field;
    const infoValue = container.querySelector(".info-value");

    // Si el botón es para "Modificar"
    if (!btn.classList.contains("save-btn")) {
        const span = container.querySelector("span");
        const originalValue = span ? span.textContent : infoValue.textContent.replace("Modificar", "").trim();

        btn.style.backgroundColor = "#e74c3c"; // rojo
        btn.textContent = "Guardar";
        btn.classList.remove("edit-btn");
        btn.classList.add("save-btn");

        // Crear input o select
        let input;
        if (field === "type") {
            input = document.createElement("select");
            input.innerHTML = `
                <option value="propietario">Propietario</option>
                <option value="cliente">Cliente</option>
            `;
            input.value = originalValue.toLowerCase();
        } else if (field === "password") {
            const current = document.createElement("input");
            current.type = "password";
            current.placeholder = "Contraseña actual";
            current.classList.add("password-current");

            const nueva = document.createElement("input");
            nueva.type = "password";
            nueva.placeholder = "Nueva contraseña";
            nueva.classList.add("password-new");

            infoValue.innerHTML = "";
            infoValue.append(current, nueva, btn);
            return;
        } else {
            input = document.createElement("input");
            input.value = originalValue !== "No definido" ? originalValue : "";
        }

        infoValue.innerHTML = "";
        infoValue.append(input, btn);
        return;
    }

    // Si el botón es para "Guardar"
    const payload = {};
    if (field === "password") {
        const current = container.querySelector(".password-current").value;
        const nueva = container.querySelector(".password-new").value;

        if (!current || !nueva) {
            alert("Ambas contraseñas son obligatorias");
            return;
        }

        payload.currentPassword = current;
        payload.newPassword = nueva;
    } else {
        const valueNode = container.querySelector("input, select");
        const value = valueNode.value.trim();

        if (field === "email") {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(value)) {
                alert("Correo inválido");
                return;
            }
        }

        payload[field] = value;
    }

    try {
        const res = await fetch("/api/users/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload)
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Error al actualizar");

        // Reemplaza visualmente con el valor actualizado
        const displayValue = field === "password" ? "***************" : result[field] || "No definido";
        infoValue.innerHTML = `${displayValue} <button class="edit-btn">Modificar</button>`;
    } catch (err) {
        alert("Error: " + err.message);
    }
});
