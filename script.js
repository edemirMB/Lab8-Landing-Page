/**
 * ==============================================================================
 * PROYECTO: TechNews USFX - Portal de Noticias Tecnológicas
 * AUTOR: Edemir Mayta Baltazar
 * MATERIA: SIS256 - Desarrollo Web
 * UNIVERSIDAD: Universidad San Francisco Xavier de Chuquisaca
 * DESCRIPCIÓN: Lógica interactiva en JavaScript Vanilla (puro)
 * ==============================================================================
 */

// Esperamos a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------------------------
     1. MENÚ DE NAVEGACIÓN RESPONSIVE (HAMBURGUESA)
     ---------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Alternar apertura y cierre del menú en móviles
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('active');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar el menú automáticamente al hacer clic en cualquier enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Cerrar menú si el usuario hace clic fuera del encabezado
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.header') && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  });


  /* ----------------------------------------------------------------------------
     2. CAMBIO DE APARIENCIA DEL HEADER Y BOTÓN "VOLVER ARRIBA" AL HACER SCROLL
     ---------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Sombra en el header al hacer scroll
    if (scrollPosition > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Mostrar u ocultar el botón flotante "Volver arriba"
    if (scrollPosition > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Acción de clic para volver al inicio suavemente
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  /* ----------------------------------------------------------------------------
     3. ILUMINACIÓN DEL ENLACE ACTIVO EN EL MENÚ SEGÚN LA SECCIÓN VISIBLE (SCROLLSPY)
     ---------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (activeLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll);


  /* ----------------------------------------------------------------------------
     4. FILTRADO INTERACTIVO DE NOTICIAS POR CATEGORÍA
     ---------------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const newsCards = document.querySelectorAll('.news-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover clase 'active' de todos los botones y asignarla al clickeado
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedCategory = button.getAttribute('data-category');

      // Mostrar u ocultar tarjetas con transición suave
      newsCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (selectedCategory === 'todas' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* ----------------------------------------------------------------------------
     5. VENTANA MODAL PARA LEER NOTICIA COMPLETA
     ---------------------------------------------------------------------------- */
  // Base de datos simulada en JavaScript con el contenido ampliado de las noticias
  const newsArticlesData = {
    1: {
      title: "La evolución de los modelos de IA generativa y su rol en la programación",
      category: "Inteligencia Artificial",
      date: "12 Octubre, 2026",
      readingTime: "4 min lectura",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
      content: `
        <p>Los modelos de lenguaje y visión artificial han alcanzado un nuevo hito en 2026. Para los estudiantes universitarios de carreras como Ingeniería de Sistemas e Informática de la USFX, comprender estos avances es fundamental para liderar el cambio profesional.</p>
        <br>
        <p>Hoy en día, las herramientas de asistencia al desarrollo no buscan reemplazar al programador, sino potenciar su productividad resolviendo tareas rutinarias, detectando errores de sintaxis y sugiriendo estructuras de algoritmos eficientes.</p>
        <br>
        <p>El desafío académico actual consiste en aprender a formular preguntas precisas (prompt engineering), validar rigurosamente el código generado y mantener un pensamiento crítico sobre la seguridad y ética de las soluciones de software.</p>
      `
    },
    2: {
      title: "Fundamentos sólidos: La importancia de dominar HTML, CSS y JS Vanilla",
      category: "Desarrollo Web",
      date: "10 Octubre, 2026",
      readingTime: "5 min lectura",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
      content: `
        <p>En materias como <strong>SIS256 - Desarrollo Web</strong>, el aprendizaje de los estándares web fundamentales representa la columna vertebral de cualquier futuro ingeniero de software.</p>
        <br>
        <p>A menudo, los desarrolladores novatos se apresuran a utilizar librerías y marcos de trabajo complejos sin antes entender cómo funciona el DOM (Document Object Model), la cascada y especificidad en CSS, o el bucle de eventos (Event Loop) en JavaScript.</p>
        <br>
        <p>Dominar los fundamentos permite crear sitios ultrarrápidos, accesibles y fáciles de depurar, asegurando que cualquier framework posterior (React, Vue, Angular) sea comprendido a profundidad.</p>
      `
    },
    3: {
      title: "Ciberseguridad en redes universitarias: Amenazas emergentes y defensa",
      category: "Ciberseguridad",
      date: "08 Octubre, 2026",
      readingTime: "3 min lectura",
      img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
      content: `
        <p>Las instituciones académicas albergan una enorme cantidad de información valiosa, desde investigaciones y proyectos hasta registros confidenciales de estudiantes y docentes.</p>
        <br>
        <p>Durante los últimos meses, los ataques de ingeniería social y ransomware han evolucionado. Por este motivo, la concientización sobre contraseñas seguras, autenticación de dos factores (2FA) y auditoría constante de vulnerabilidades es prioritaria para la comunidad universitaria.</p>
        <br>
        <p>En TechNews USFX recomendamos a los estudiantes mantener sus dispositivos actualizados y aplicar buenas prácticas de seguridad tanto en redes públicas como privadas.</p>
      `
    },
    4: {
      title: "Nuevas arquitecturas de procesadores con aceleración de IA dedicada",
      category: "Hardware & Innovación",
      date: "05 Octubre, 2026",
      readingTime: "6 min lectura",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
      content: `
        <p>La industria del silicio está viviendo una transformación radical con la inclusión de Unidades de Procesamiento Neuronal (NPUs) integradas directamente en microprocesadores de computadoras portátiles y de escritorio.</p>
        <br>
        <p>Esta innovación permite ejecutar modelos de IA localmente con un consumo de batería mínimo, permitiendo procesamiento de audio en tiempo real, análisis de imágenes y asistentes offline.</p>
        <br>
        <p>Para los estudiantes de ingeniería de la USFX, esto abre posibilidades inmensas para experimentar con inferencia local sin depender de costosas APIs en la nube.</p>
      `
    },
    5: {
      title: "Diseño Responsive y Accesibilidad Web: Estándares que todo futuro ingeniero debe dominar",
      category: "Desarrollo Web",
      date: "03 Octubre, 2026",
      readingTime: "4 min lectura",
      img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
      content: `
        <p>Más del 65% de las visitas a sitios web mundiales provienen de dispositivos móviles. Por ello, el concepto de <em>Mobile-First</em> ha dejado de ser una sugerencia para convertirse en una regla obligatoria.</p>
        <br>
        <p>El uso de unidades relativas (rem, %, vh/vw), CSS Grid, Flexbox y media queries fluidas garantiza una experiencia de navegación coherente en cualquier tamaño de pantalla.</p>
        <br>
        <p>Asimismo, considerar el contraste cromático, etiquetas semánticas y lectores de pantalla hace que la web sea inclusiva para todas las personas.</p>
      `
    },
    6: {
      title: "Robótica autónoma e investigación en universidades latinoamericanas",
      category: "Inteligencia Artificial",
      date: "01 Octubre, 2026",
      readingTime: "5 min lectura",
      img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
      content: `
        <p>Universidades de toda la región impulsan centros de investigación tecnológica donde estudiantes aplican algoritmos de navegación autónoma, visión computacional y brazos mecánicos automatizados.</p>
        <br>
        <p>La integración de sistemas embebidos como Raspberry Pi y microcontroladores Arduino con modelos de visión permite crear soluciones de automatización agrícola, rescate y soporte médico a bajo costo.</p>
        <br>
        <p>Desde Chuquisaca, la motivación estudiantil por desarrollar proyectos tecnológicos con impacto social sigue creciendo firmemente.</p>
      `
    }
  };

  const modalOverlay = document.getElementById('news-modal');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const readMoreButtons = document.querySelectorAll('.read-more-btn');

  // Abrir modal con la información de la noticia seleccionada
  readMoreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const articleId = btn.getAttribute('data-id');
      const article = newsArticlesData[articleId];

      if (article) {
        modalContent.innerHTML = `
          <img src="${article.img}" alt="${article.title}">
          <div class="modal-text-block">
            <div class="modal-meta">
              <span><i class="fa-solid fa-tag"></i> ${article.category}</span>
              <span><i class="fa-regular fa-calendar"></i> ${article.date}</span>
              <span><i class="fa-regular fa-clock"></i> ${article.readingTime}</span>
            </div>
            <h2 class="modal-title">${article.title}</h2>
            <div class="modal-body-text">
              ${article.content}
            </div>
          </div>
        `;

        modalOverlay.classList.add('open');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Evita scroll de fondo
      }
    });
  });

  // Función para cerrar modal
  const closeModal = () => {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto'; // Restaura el scroll
  };

  modalCloseBtn.addEventListener('click', closeModal);

  // Cerrar modal al hacer clic en el fondo oscuro
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Cerrar modal con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });


  /* ----------------------------------------------------------------------------
     6. VALIDACIÓN Y ENVÍO DEL FORMULARIO DE CONTACTO
     ---------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  // Elementos de campos de entrada
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  // Elementos para mensajes de error
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  // Función auxiliar para validar correo electrónico
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Limpiar mensajes de error en tiempo real
  const inputs = [nameInput, emailInput, subjectInput, messageInput];
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const errorElement = document.getElementById(`${input.id}-error`);
      if (errorElement) errorElement.textContent = '';
      input.style.borderColor = '';
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previene el envío tradicional de formulario
    let isValid = true;

    // Validación: Nombre
    if (nameInput.value.trim().length < 3) {
      nameError.textContent = 'Por favor, introduce tu nombre completo (mínimo 3 letras).';
      nameInput.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      nameError.textContent = '';
      nameInput.style.borderColor = '';
    }

    // Validación: Correo electrónico
    if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = 'Introduce una dirección de correo válida (ej. usuario@usfx.bo).';
      emailInput.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      emailError.textContent = '';
      emailInput.style.borderColor = '';
    }

    // Validación: Asunto
    if (subjectInput.value.trim().length < 4) {
      subjectError.textContent = 'Por favor, indica un asunto claro (mínimo 4 caracteres).';
      subjectInput.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      subjectError.textContent = '';
      subjectInput.style.borderColor = '';
    }

    // Validación: Mensaje
    if (messageInput.value.trim().length < 10) {
      messageError.textContent = 'El mensaje debe tener al menos 10 caracteres explicativos.';
      messageInput.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      messageError.textContent = '';
      messageInput.style.borderColor = '';
    }

    // Si todas las validaciones son correctas
    if (isValid) {
      // Ocultar formulario y mostrar mensaje de éxito
      contactForm.style.display = 'none';
      formFeedback.classList.add('show');

      // Limpiar los campos
      contactForm.reset();

      // Permitir enviar otro mensaje después de 5 segundos
      setTimeout(() => {
        formFeedback.classList.remove('show');
        contactForm.style.display = 'flex';
      }, 6000);
    }
  });


  /* ----------------------------------------------------------------------------
     7. TEMA CLARO / TEMA OSCURO CON PERSISTENCIA EN LOCALSTORAGE
     ---------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('i');

  // Revisar si el usuario ya guardó preferencia en localStorage
  const savedTheme = localStorage.getItem('technews-theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    document.body.classList.remove('light-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }

  // Alternar tema al pulsar el botón
  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');

    if (isLight) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('technews-theme', 'light');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('technews-theme', 'dark');
    }
  });

});
