export async function registerUser(fullName, username, email, password, confirmPassword) {
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return null;
    }

    try {
        const response = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                fullName,
                username,
                email,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Registro exitoso, bienvenido ${data.fullName}`);
            return data;
        } else {
            alert(data.error || "Error al registrarse");
            return null;
        }

    } catch (error) {
        console.error("Error al registrarse:", error);
        alert("Error al conectar con el servidor");
        return null;
    }
}
