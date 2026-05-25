document.addEventListener("DOMContentLoaded", () => {
    // Referencias de Registro
    const registerForm = document.getElementById("registerForm");
    const regName = document.getElementById("regName");
    const regEmail = document.getElementById("regEmail");
    const regPassword = document.getElementById("regPassword");
    const regPasswordConfirm = document.getElementById("regPasswordConfirm");
    const registerError = document.getElementById("registerError");
    const registerSuccess = document.getElementById("registerSuccess");

    // Referencias de Login
    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const loginError = document.getElementById("loginError");

    // Obtener usuarios de localStorage
    const getUsers = () => {
        const users = localStorage.getItem("gym_users");
        return users ? JSON.parse(users) : [];
    };

    // Guardar usuarios en localStorage
    const saveUsers = (users) => {
        localStorage.setItem("gym_users", JSON.stringify(users));
    };

    /*LOGICA DE REGISTRO*/

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Limpiar mensajes previos
            registerError.classList.add("hidden");
            registerSuccess.classList.add("hidden");

            // Validar que las contraseñas coincidan
            if (regPassword.value !== regPasswordConfirm.value) {
                registerError.textContent = "Las contraseñas no coinciden.";
                registerError.classList.remove("hidden");
                return;
            }

            const users = getUsers();

            // Validar si el correo ya está registrado
            const emailExists = users.some(user => user.email === regEmail.value.trim().toLowerCase());
            if (emailExists) {
                registerError.textContent = "Este correo electrónico ya está registrado.";
                registerError.classList.remove("hidden");
                return;
            }

            // Crear nuevo usuario y añadirlo a la lista
            const newUser = {
                id: Date.now(),
                name: regName.value.trim(),
                email: regEmail.value.trim().toLowerCase(),
                password: regPassword.value
            };

            users.push(newUser);
            saveUsers(users);

            // Mostrar mensaje de éxito y limpiar formulario
            registerSuccess.textContent = "¡Cuenta creada con éxito! Redirigiendo al ingreso...";
            registerSuccess.classList.remove("hidden");
            registerForm.reset();

            // Redirigir a login después de 2 segundos
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        });
    }

    /* LOGICA DE INICIO DE SESIÓN */
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Limpiar mensajes previos
            loginError.classList.add("hidden");

            const emailInput = loginEmail.value.trim().toLowerCase();
            const passwordInput = loginPassword.value;

            const users = getUsers();

            // Buscar coincidencia de credenciales
            const validUser = users.find(user => user.email === emailInput && user.password === passwordInput);

            if (!validUser) {
                loginError.textContent = "Correo electrónico o contraseña incorrectos.";
                loginError.classList.remove("hidden");
                return;
            }

            // Guardar sesión activa
            const sessionData = {
                id: validUser.id,
                name: validUser.name,
                email: validUser.email
            };
            localStorage.setItem("poligym_session", JSON.stringify(sessionData));

            // Redirigir al Dashboard del gimnasio
            window.location.href = "dashboard.html";
        });
    }
});