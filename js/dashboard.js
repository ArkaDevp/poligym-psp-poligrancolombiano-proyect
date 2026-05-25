document.addEventListener("DOMContentLoaded", () => {
    
    // Validacion de sesion
    const sessionData = localStorage.getItem("poligym_session");
    if (!sessionData) {
        // Si no hay sesión, expulsar al login
        window.location.href = "login.html";
        return;
    }

    const currentUser = JSON.parse(sessionData);
    document.getElementById("userNameGreeting").textContent = `Hola, ${currentUser.name.split(' ')[0]}`;

    //Base de datos simulada para las clases disponibles
    const clasesDisponibles = [
        { id: 1, nombre: "Crossfit Extremo", instructor: "Carlos Ramos", horario: "06:00 AM - 07:30 AM", dias: "Lun - Mie - Vie", cupos: 15 },
        { id: 2, nombre: "Spinning Pro", instructor: "Laura Martínez", horario: "08:00 AM - 09:00 AM", dias: "Mar - Jue", cupos: 20 },
        { id: 3, nombre: "Yoga y Movilidad", instructor: "Sofía Castro", horario: "06:00 PM - 07:00 PM", dias: "Lun - Mie", cupos: 12 },
        { id: 4, nombre: "Musculación Guiada", instructor: "Andrés Silva", horario: "07:30 PM - 09:00 PM", dias: "Lunes a Viernes", cupos: 10 },
        { id: 5, nombre: "Boxeo y Cardio", instructor: "Diego Torres", horario: "05:00 PM - 06:30 PM", dias: "Mar - Jue - Sab", cupos: 18 },
        { id: 6, nombre: "Zumba Energy", instructor: "María José", horario: "09:00 AM - 10:00 AM", dias: "Sábados y Domingos", cupos: 25 }
    ];

    // DOM
    const classesGrid = document.getElementById("classesGrid");
    const modalOverlay = document.getElementById("ticketModal");
    const modalContent = document.getElementById("modalContent");
    const btnCloseModal = document.getElementById("btnCloseModal");
    const btnLogout = document.getElementById("btnLogout");

    // Renderizado de las clases
    const renderClasses = () => {
        classesGrid.innerHTML = ""; // Limpiar grilla
        
        clasesDisponibles.forEach(clase => {
            const card = document.createElement("div");
            card.className = "class-card";
            card.innerHTML = `
                <div class="class-header">
                    <h3>${clase.nombre}</h3>
                    <div class="class-instructor">Instructor: ${clase.instructor}</div>
                </div>
                <div class="class-body">
                    <div class="class-info-row">
                        <span>Días:</span>
                        <strong>${clase.dias}</strong>
                    </div>
                    <div class="class-info-row">
                        <span>Horario:</span>
                        <strong>${clase.horario}</strong>
                    </div>
                    <div class="class-info-row">
                        <span>Cupos disp:</span>
                        <strong>${clase.cupos}</strong>
                    </div>
                    <button class="btn-enroll" onclick="iniciarInscripcion(${clase.id})">Inscribirse</button>
                </div>
            `;
            classesGrid.appendChild(card);
        });
    };

    // Logica de inscripcion y generacion de un codigo aleatorio
    window.iniciarInscripcion = (claseId) => {
        const claseSeleccionada = clasesDisponibles.find(c => c.id === claseId);
        
        // Generador de código aleatorio
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let codigoRandom = '';
        for (let i = 0; i < 5; i++) {
            codigoRandom += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        const codigoFinal = `GYM-${codigoRandom}`;


        modalContent.innerHTML = `
            <div class="ticket-success">
                <div class="ticket-icon">✅</div>
                <h2 class="ticket-title">¡Inscripción Exitosa!</h2>
                <p>Presenta este ticket en la recepción de POLIGYM.</p>
                
                <div class="ticket-details">
                    <p><strong>Deportista:</strong> ${currentUser.name}</p>
                    <p><strong>Clase:</strong> ${claseSeleccionada.nombre}</p>
                    <p><strong>Horario:</strong> ${claseSeleccionada.horario}</p>
                    <p><strong>Instructor:</strong> ${claseSeleccionada.instructor}</p>
                </div>

                <p style="color: var(--dark-gray); font-size: 0.85rem;">Código de acceso único:</p>
                <div class="ticket-code-box">${codigoFinal}</div>
            </div>
        `;

        // Mostrar Modal
        modalOverlay.classList.remove("hidden");
    };

    // Logica del modal
    btnCloseModal.addEventListener("click", () => {
        modalOverlay.classList.add("hidden");
    });

    // Cerrar el modal
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.add("hidden");
        }
    });

    // Cerrar sesion
    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("poligym_session");
        window.location.href = "login.html";
    });

    // Inicializar la vista
    renderClasses();
});