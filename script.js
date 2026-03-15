
/* ==========================================

    1. FUNCIONES DE INTERFAZ Y CONTACTO

   ========================================== */

   function revealContactForm() {

    const viewInitial = document.getElementById('viewInitial');

    if (viewInitial) {

        viewInitial.style.display = 'none';

        document.getElementById('viewForm').style.display = 'block';

        document.getElementById('contactContainer').classList.add('form-active');

    }

}



function hideContactForm() {

    const viewForm = document.getElementById('viewForm');

    if (viewForm) {

        viewForm.style.display = 'none';

        document.getElementById('viewInitial').style.display = 'flex';

        document.getElementById('contactContainer').classList.remove('form-active');

    }

}



function handleFormSubmit(event) {

    event.preventDefault();

    document.getElementById('viewForm').style.display = 'none';

    document.getElementById('viewLoading').style.display = 'block';

        setTimeout(() => {
            document.getElementById('viewLoading').style.display = 'none';
            document.getElementById('viewSuccess').style.display = 'block';
            
            // Auto-ocultar mensaje de éxito después de 5 segundos
            setTimeout(() => {
                hideContactForm();
                // Resetear para la próxima vez
                document.getElementById('viewSuccess').style.display = 'none';
            }, 5000);
        }, 1200);

}



/* ==========================================

    2. LÓGICA DEL EDITOR Y PERSISTENCIA

   ========================================== */

let cambiosSinGuardar = false;

// --- LÓGICA DE ACORDEÓN INTELIGENTE ---
function toggleAccordion(boxId) {
    const box = document.getElementById(boxId);
    if (!box || !box.classList.contains('has-info')) return;

    const isClosed = box.classList.contains('closed');

    // Cerramos todos los demás que tengan info
    document.querySelectorAll('.editor-section-box.has-info').forEach(b => {
        b.classList.add('closed');
        b.classList.remove('open');
    });

    // Si estaba cerrado, lo abrimos
    if (isClosed) {
        box.classList.remove('closed');
        box.classList.add('open');
        
        // Scroll suave al abrir manualmente
        setTimeout(() => {
            const header = box.querySelector('.section-header-acc');
            if (header) {
                header.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 50);
    } else {
        box.classList.add('closed');
        box.classList.remove('open');
    }
}

function actualizarEstadoAcordeones() {
    const sections = [
        { container: 'editor-titulos-container', box: 'box-titulos' },
        { container: 'editor-servicios-container', box: 'box-actualmente' },
        { container: 'editor-zonas-container', box: 'box-lugares' }
    ];

    sections.forEach(s => {
        const cont = document.getElementById(s.container);
        const box = document.getElementById(s.box);
        if (cont && box) {
            if (cont.children.length > 0) {
                box.classList.add('has-info');
                // Si tiene info y no está ni abierto ni cerrado, lo cerramos por defecto
                if (!box.classList.contains('open') && !box.classList.contains('closed')) {
                    box.classList.add('closed');
                }
            } else {
                // Si está vacío, se comporta como una caja normal (abierta)
                box.classList.remove('has-info');
                box.classList.remove('closed');
                box.classList.remove('open');
            }
        }
    });

    // Manejo especial para la sección de contacto (siempre tiene info porque son campos fijos)
    const boxContacto = document.getElementById('box-contacto');
    if (boxContacto) {
        boxContacto.classList.add('has-info');
        if (!boxContacto.classList.contains('open') && !boxContacto.classList.contains('closed')) {
            boxContacto.classList.add('closed');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Detectar cualquier cambio en el formulario
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('input', () => {
            cambiosSinGuardar = true;
        });
    }

    // Aviso al intentar salir
    window.addEventListener('beforeunload', (e) => {
        if (cambiosSinGuardar) {
            e.preventDefault();
            e.returnValue = ''; // Estándar para navegadores modernos
        }
    });

    // Manejo del link "Volver"
    const linkVolver = document.getElementById('link-volver-portafolio');
    if (linkVolver) {
        linkVolver.addEventListener('click', (e) => {
            if (cambiosSinGuardar) {
                const confirmar = confirm("Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?");
                if (!confirmar) e.preventDefault();
            }
        });
    }

    // Forzamos que al cargar la página el scroll arranque arriba del todo
    window.scrollTo(0, 0);

    // Lógica del botón volver arriba
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const datosGuardados = localStorage.getItem('perfilVeterinario');
    const esEditor = document.getElementById('profileForm');

    if (datosGuardados) {
        const data = JSON.parse(datosGuardados);
        if (!esEditor) {
            cargarDatosEnPortafolio(data);
        } else {
            cargarDatosEnEditor(data);
        }
    } else {
        // Si no hay datos guardados, cargamos el ejemplo por defecto
        if (!esEditor) {
            cargarDatosEnPortafolio(defaultData);
        } else {
            cargarDatosEnEditor(defaultData);
        }
    }

    const inputFoto = document.getElementById('input-foto');
    const previewFoto = document.getElementById('preview-foto');

    if (inputFoto && previewFoto) {
        inputFoto.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewFoto.src = e.target.result;
                    previewFoto.style.display = 'block';
                    
                    // Actualizar también la previsualización en vivo
                    const livePreviewFoto = document.getElementById('live-preview-foto');
                    if(livePreviewFoto) livePreviewFoto.src = e.target.result;

                    const placeholderText = document.getElementById('placeholder-text');
                    const container = document.getElementById('placeholder-container');
                    if(placeholderText) placeholderText.style.display = 'none';
                    if(container) container.style.border = 'none';
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // Lógica de Previsualización en Tiempo Real (Texto)
    const nombreInput = document.getElementById('nombre_completo');
    const especialidadInput = document.getElementById('especialidad');
    const bioInput = document.getElementById('bio');

    if (nombreInput) {
        nombreInput.addEventListener('input', (e) => {
            const val = e.target.value || "Tu Nombre";
            document.getElementById('live-preview-nombre').innerText = val;
        });
    }
    if (especialidadInput) {
        especialidadInput.addEventListener('input', (e) => {
            const val = e.target.value || "Especialidad";
            document.getElementById('live-preview-especialidad').innerText = val;
        });
    }
    if (bioInput) {
        bioInput.addEventListener('input', (e) => {
            const val = e.target.value || "Tu biografía aparecerá aquí...";
            document.getElementById('live-preview-bio').innerText = val;
        });
    }

    const bioArea = document.getElementById('bio');
    if (bioArea) {
        bioArea.addEventListener('input', actualizarContador);
        actualizarContador();
    }

    // Monitorear cambios en los contenedores para actualizar el estado del acordeón
    if (esEditor) {
        const config = { childList: true };
        const containers = ['editor-titulos-container', 'editor-servicios-container', 'editor-zonas-container', 'editor-casos-container'];
        
        containers.forEach(id => {
            const target = document.getElementById(id);
            if (target) {
                const observer = new MutationObserver(() => {
                    actualizarEstadoAcordeones();
                });
                observer.observe(target, config);
            }
        });

        // Ejecución inicial
        setTimeout(actualizarEstadoAcordeones, 200);
    }
});

function actualizarContador() {
    const bioArea = document.getElementById('bio');
    const counter = document.getElementById('char-counter');
    if (bioArea && counter) {
        const longitud = bioArea.value.length;
        counter.innerText = `${longitud} / 350`;
        counter.style.color = longitud >= 340 ? "#e74c3c" : "#888";
    }
}

function actualizarContadorDinamico(textarea) {
    const counter = textarea.nextElementSibling;
    if (counter && counter.classList.contains('counter-label')) {
        const longitud = textarea.value.length;
        counter.innerText = `${longitud} / 200`;
        counter.style.color = longitud >= 190 ? "#e74c3c" : "#888";
    }
    
    // Actualizar altura del contenido expandible si está abierto
    const card = textarea.closest('.card-dinamica-servicio');
    if (card) {
        const contenido = card.querySelector('.titulo-contenido-expandible');
        if (contenido && contenido.style.maxHeight && contenido.style.maxHeight !== '0px') {
            contenido.style.maxHeight = contenido.scrollHeight + 'px';
        }
    }
}

/* ==========================================

    3. CAMPOS DINÁMICOS (TÍTULOS, SERVICIOS, ZONAS)

   ========================================== */

function agregarCampoTitulo(titulo = "", desc = "", foto = "", visible = true, legajoNum = "", tipo = "general") {
    const container = document.getElementById('editor-titulos-container');
    if (!container) return;

    // Guardar la posición del título antes de expandir
    const box = document.getElementById('box-titulos');
    let scrollPos = 0;
    if (box) {
        const header = box.querySelector('.section-header-acc');
        if (header) {
            const rect = header.getBoundingClientRect();
            scrollPos = window.pageYOffset + rect.top - 20;
        }

        // Cerramos todos los demás que tengan info
        document.querySelectorAll('.editor-section-box.has-info').forEach(b => {
            if (b !== box) {
                b.classList.add('closed');
                b.classList.remove('open');
            }
        });
        box.classList.add('has-info');
        box.classList.remove('closed');
        box.classList.add('open');
    }

    const div = document.createElement('div');
    div.className = 'bloque-input-dinamico';
    div.draggable = true;

    const uniqueId = 'titulo-' + Date.now() + Math.floor(Math.random() * 100);
    const fotoDefault = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E";
    
    // Determinar clase según el tipo
    let tipoClass = 'tipo-general';
    if (tipo === 'especialidad') {
        tipoClass = 'tipo-especialidad';
    } else if (tipo === 'posgrado') {
        tipoClass = 'tipo-posgrado';
    }

    div.innerHTML = `
        <div class="card-dinamica-servicio ${tipoClass}" style="position: relative; background: #fff !important; padding: 0 !important; overflow: hidden;">
            <!-- Tirador para arrastrar -->
            <div class="drag-handle" title="Arrastrar para reordenar" style="position: absolute; left: -30px; top: 20px; cursor: grab; color: #94a3b8; font-size: 20px; padding: 10px; z-index: 10;">
                <i class="fas fa-grip-vertical"></i>
            </div>

            <!-- Header Colapsable -->
            <div class="titulo-header-colapsable" onclick="toggleTituloIndividual(this)" style="padding: 15px 25px; background: #f8fafc; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; transition: all 0.3s ease;">
                <span class="titulo-preview" style="font-weight: 700; color: var(--petroleo); font-size: 14px; flex: 1;">${titulo || 'Nuevo Título'}</span>
                <i class="fas fa-chevron-down" style="color: var(--petroleo); transition: transform 0.3s ease;"></i>
            </div>

            <!-- Contenido Expandible -->
            <div class="titulo-contenido-expandible" style="max-height: 0; overflow: hidden; transition: max-height 0.4s ease;">
                <div style="padding: 25px;">
                    <div class="flex-container-servicio" style="display: flex; gap: 20px; align-items: flex-start;">
                        <div class="inputs-lado" style="flex: 1; position: relative; min-width: 0;">
                            <input type="text" placeholder="Título (Ej: Médica Veterinaria)" class="simple-input titulo-val" value="${titulo}" oninput="actualizarHeaderTitulo(this)">
                    <div class="help-tooltip">El nombre debe coincidir con el diploma adjunto.</div>
                    <textarea placeholder="Institución o Descripción" class="simple-textarea desc-val" style="margin-top:10px; height: 80px;" maxlength="200" oninput="actualizarContadorDinamico(this)">${desc}</textarea>
                    <div class="counter-label" style="font-size: 10px; margin-top: 2px; text-align: right;">${desc.length} / 200</div>
                    
                    <div style="margin-top: 15px; display: flex; flex-direction: column; align-items: center; gap: 12px;">
                        <!-- Toggle Tipo de Título (Triple) -->
                        <div class="btn-triple-premium" data-value="${tipo || 'general'}" onclick="toggleTripleTipo(event, this)" title="Categoría del título">
                            <div class="txt">General</div>
                            <div class="txt">Especialidad</div>
                            <div class="txt">Posgrado</div>
                        </div>
                        <input type="hidden" class="titulo-tipo-val" value="${tipo || 'general'}">
                    </div>
                </div>

                <div class="foto-lado" style="display: flex; flex-direction: column;">
                    <label>LEGAJO (OBLIGATORIO) <span style="color: #e74c3c;">*</span></label>
                    <div class="foto-lado-row">
                        <div class="preview-mini-box">
                            <img id="${uniqueId}-preview" src="${foto || fotoDefault}">
                        </div>
                        <label class="btn-contacto-outline btn-subir-archivo-vete">
                            <i class="fas fa-upload"></i> SUBIR ARCHIVO
                            <input type="file" accept="image/*" style="display:none;"
                                   onchange="previsualizarFotoMini(this, '${uniqueId}-preview', 'titulo')">
                        </label>
                    </div>
                    <div style="width: 100%;">
                        <input type="number" placeholder="N° de Legajo" class="input-legajo legajo-val" value="${legajoNum}">
                    </div>
                    
                    <!-- Toggle Visibilidad -->
                    <div style="margin-top: auto; padding-top: 15px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <div class="btn-visibilidad-premium ${visible ? 'active' : ''}" onclick="toggleVisibilidadTitulo(this)" title="Visibilidad en el perfil">
                            <div class="txt">Privado</div>
                            <div class="txt">Público</div>
                        </div>
                        <input type="hidden" class="titulo-visible-val" value="${visible}">
                    </div>
                    
                        <input type="hidden" class="titulo-foto-hidden" value="${foto}">
                    </div>
                </div>
                <div style="display: flex; justify-content: flex-end; margin-top: 15px;">
                    <button type="button" class="btn-delete-dinamico" onclick="this.closest('.bloque-input-dinamico').remove()">✕ Eliminar Título</button>
                </div>
            </div>
            </div>
        </div>
    `;

    div.addEventListener('dragstart', handleDragStart);
    div.addEventListener('dragover', handleDragOver);
    div.addEventListener('drop', handleDrop);
    div.addEventListener('dragend', handleDragEnd);

    container.appendChild(div);
    
    // Expandir automáticamente cuando se crea un nuevo título (no cuando se carga)
    if (!titulo && !desc && !foto) {
        const contenido = div.querySelector('.titulo-contenido-expandible');
        const chevron = div.querySelector('.fa-chevron-down');
        if (contenido && chevron) {
            setTimeout(() => {
                contenido.style.maxHeight = contenido.scrollHeight + 'px';
                chevron.style.transform = 'rotate(180deg)';
            }, 10);
        }
    }

    // Forzar el scroll a la posición guardada después de añadir el contenido
    if (box && scrollPos > 0) {
        window.scrollTo({
            top: scrollPos,
            behavior: 'auto'
        });
    }
}

let dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    this.classList.add('dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) e.stopPropagation();
    if (dragSrcEl !== this) {
        const container = this.parentNode;
        const allNodes = Array.from(container.children);
        const srcIdx = allNodes.indexOf(dragSrcEl);
        const targetIdx = allNodes.indexOf(this);

        if (srcIdx < targetIdx) {
            container.insertBefore(dragSrcEl, this.nextSibling);
        } else {
            container.insertBefore(dragSrcEl, this);
        }
    }
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

function toggleTripleTipo(event, btn) {
    console.log('toggleTripleTipo llamado');
    const textElements = Array.from(btn.querySelectorAll('.txt'));
    const clickedIndex = textElements.indexOf(event.target);
    
    if (clickedIndex === -1) {
        console.log('clickedIndex === -1, intentando con parentElement');
        const parent = event.target.parentElement;
        if (parent && parent.classList.contains('txt')) {
            const clickedIndex2 = textElements.indexOf(parent);
            if (clickedIndex2 !== -1) {
                const values = ['general', 'especialidad', 'posgrado'];
                const newValue = values[clickedIndex2];
                console.log('Nuevo valor:', newValue);
                
                const hiddenInput = btn.nextElementSibling;
                btn.dataset.value = newValue;
                hiddenInput.value = newValue;
                
                // Cambiar el color del borde según el tipo seleccionado usando clases
                const card = btn.closest('.card-dinamica-servicio');
                if (card) {
                    console.log('Card encontrado, cambiando borde a:', newValue);
                    // Remover todas las clases de tipo
                    card.classList.remove('tipo-general', 'tipo-especialidad', 'tipo-posgrado');
                    // Agregar la clase correspondiente
                    if (newValue === 'especialidad') {
                        card.classList.add('tipo-especialidad');
                    } else if (newValue === 'posgrado') {
                        card.classList.add('tipo-posgrado');
                    } else {
                        card.classList.add('tipo-general');
                    }
                    console.log('Clases actuales del card:', card.className);
                }
            }
        }
        return;
    }

    const values = ['general', 'especialidad', 'posgrado'];
    const newValue = values[clickedIndex];
    console.log('Nuevo valor:', newValue);
    
    const hiddenInput = btn.nextElementSibling;
    btn.dataset.value = newValue;
    hiddenInput.value = newValue;
    
    // Cambiar el color del borde según el tipo seleccionado usando clases
    const card = btn.closest('.card-dinamica-servicio');
    if (card) {
        console.log('Card encontrado, cambiando borde a:', newValue);
        // Remover todas las clases de tipo
        card.classList.remove('tipo-general', 'tipo-especialidad', 'tipo-posgrado');
        // Agregar la clase correspondiente
        if (newValue === 'especialidad') {
            card.classList.add('tipo-especialidad');
        } else if (newValue === 'posgrado') {
            card.classList.add('tipo-posgrado');
        } else {
            card.classList.add('tipo-general');
        }
        console.log('Clases actuales del card:', card.className);
    }
}

function toggleVisibilidadTitulo(btn) {
    const hiddenInput = btn.nextElementSibling;
    const isVisible = hiddenInput.value === 'true';
    const nuevoEstado = !isVisible;
    hiddenInput.value = nuevoEstado;
    btn.classList.toggle('active');
}

function toggleTituloIndividual(header) {
    console.log('toggleTituloIndividual llamado');
    const card = header.closest('.card-dinamica-servicio');
    const contenido = card.querySelector('.titulo-contenido-expandible');
    const chevron = header.querySelector('.fa-chevron-down');
    
    console.log('Card:', card);
    console.log('Contenido:', contenido);
    console.log('Chevron:', chevron);
    console.log('maxHeight actual:', contenido.style.maxHeight);
    
    if (contenido.style.maxHeight && contenido.style.maxHeight !== '0px') {
        // Colapsar
        console.log('Colapsando');
        contenido.style.maxHeight = '0';
        chevron.style.transform = 'rotate(0deg)';
    } else {
        // Expandir
        console.log('Expandiendo a:', contenido.scrollHeight + 'px');
        contenido.style.maxHeight = contenido.scrollHeight + 'px';
        chevron.style.transform = 'rotate(180deg)';
    }
}

function actualizarHeaderTitulo(input) {
    const card = input.closest('.card-dinamica-servicio');
    const preview = card.querySelector('.titulo-preview');
    if (preview) {
        preview.textContent = input.value || 'Nuevo Título';
    }
    // Actualizar altura del contenido expandible si está abierto
    const contenido = card.querySelector('.titulo-contenido-expandible');
    if (contenido.style.maxHeight && contenido.style.maxHeight !== '0px') {
        contenido.style.maxHeight = contenido.scrollHeight + 'px';
    }
}


function toggleWhatsappEditor(btn) {
    const hiddenInput = document.getElementById('whatsapp_activo');
    const wrapper = document.getElementById('wrapper-input-whatsapp');
    const inputNum = document.getElementById('whatsapp_num');
    const reqStar = document.getElementById('req-wa');
    
    const isActive = hiddenInput.value === 'true';
    const newState = !isActive;
    
    hiddenInput.value = newState;
    btn.classList.toggle('active', newState);
    
    if (newState) {
        wrapper.style.opacity = "1";
        wrapper.style.pointerEvents = "auto";
        inputNum.required = true;
        if (reqStar) reqStar.style.display = 'inline';
    } else {
        wrapper.style.opacity = "0.5";
        wrapper.style.pointerEvents = "none";
        inputNum.required = false;
        inputNum.value = ""; // Limpiar si se desactiva
        if (reqStar) reqStar.style.display = 'none';
    }
}

function agregarCampoServicio(servicio = "", desc = "", foto = "") {
    const container = document.getElementById('editor-servicios-container');
    if (!container) return;

    // Guardar la posición del título antes de expandir
    const box = document.getElementById('box-actualmente');
    let scrollPos = 0;
    if (box) {
        const header = box.querySelector('.section-header-acc');
        if (header) {
            const rect = header.getBoundingClientRect();
            scrollPos = window.pageYOffset + rect.top - 20;
        }

        // Cerramos todos los demás que tengan info
        document.querySelectorAll('.editor-section-box.has-info').forEach(b => {
            if (b !== box) {
                b.classList.add('closed');
                b.classList.remove('open');
            }
        });
        box.classList.add('has-info');
        box.classList.remove('closed');
        box.classList.add('open');
    }

    const div = document.createElement('div');
    div.className = 'bloque-input-dinamico';
    div.draggable = true;
    const uniqueId = 'servicio-' + Date.now() + Math.floor(Math.random() * 100);
    const fotoDefault = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/%3E%3C/svg%3E";

    div.innerHTML = `
        <div class="card-dinamica-servicio" style="border-left: 5px solid var(--petroleo); position: relative; background: #fff !important; padding: 0 !important; overflow: hidden;">
            <!-- Tirador para arrastrar -->
            <div class="drag-handle" title="Arrastrar para reordenar" style="position: absolute; left: -30px; top: 20px; cursor: grab; color: #94a3b8; font-size: 20px; padding: 10px; z-index: 10;">
                <i class="fas fa-grip-vertical"></i>
            </div>

            <!-- Header Colapsable -->
            <div class="servicio-header-colapsable" onclick="toggleServicioIndividual(this)" style="padding: 15px 25px; background: #f8fafc; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; transition: all 0.3s ease;">
                <span class="servicio-preview" style="font-weight: 700; color: var(--petroleo); font-size: 14px; flex: 1;">${servicio || 'Nuevo Servicio'}</span>
                <i class="fas fa-chevron-down" style="color: var(--petroleo); transition: transform 0.3s ease;"></i>
            </div>

            <!-- Contenido Expandible -->
            <div class="servicio-contenido-expandible" style="max-height: 0; overflow: hidden; transition: max-height 0.4s ease;">
                <div style="padding: 25px;">
                    <div class="flex-container-servicio" style="display: flex; gap: 20px; align-items: flex-start;">
                        <div class="inputs-lado" style="flex: 1; position: relative; min-width: 0;">
                            <input type="text" placeholder="¿Qué servicio ofreces?" class="simple-input servicio-val" value="${servicio}" oninput="actualizarHeaderServicio(this)">
                            <textarea placeholder="Descripción corta del servicio..." class="simple-textarea desc-val" style="margin-top:10px; height: 80px;" maxlength="200" oninput="actualizarContadorDinamico(this)">${desc}</textarea>
                            <div class="counter-label" style="font-size: 10px; margin-top: 2px; text-align: right;">${desc.length} / 200</div>
                        </div>
                        <div class="foto-lado">
                            <label>IMAGEN<br>(OPCIONAL)</label>
                            <div class="foto-lado-row">
                                <div class="preview-mini-box">
                                    <img id="${uniqueId}-preview" src="${foto || fotoDefault}">
                                </div>
                                <label class="btn-contacto-outline btn-subir-archivo-vete">
                                    <i class="fas fa-upload"></i> SUBIR ARCHIVO
                                    <input type="file" accept="image/*" style="display:none;"
                                           onchange="previsualizarFotoMini(this, '${uniqueId}-preview', 'servicio')">
                                </label>
                            </div>
                            <input type="hidden" class="servicio-foto-hidden" value="${foto}">
                        </div>
                    </div>
                    <div style="display: flex; justify-content: flex-end; margin-top: 15px;">
                        <button type="button" class="btn-delete-dinamico" onclick="this.closest('.bloque-input-dinamico').remove()">✕ Eliminar este servicio</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    div.addEventListener('dragstart', handleDragStart);
    div.addEventListener('dragover', handleDragOver);
    div.addEventListener('drop', handleDrop);
    div.addEventListener('dragend', handleDragEnd);

    container.appendChild(div);
    
    // Expandir automáticamente cuando se crea un nuevo servicio (no cuando se carga)
    if (!servicio && !desc && !foto) {
        const contenido = div.querySelector('.servicio-contenido-expandible');
        const chevron = div.querySelector('.fa-chevron-down');
        if (contenido && chevron) {
            setTimeout(() => {
                contenido.style.maxHeight = contenido.scrollHeight + 'px';
                chevron.style.transform = 'rotate(180deg)';
            }, 10);
        }
    }

    // Forzar el scroll a la posición guardada después de añadir el contenido
    if (box && scrollPos > 0) {
        window.scrollTo({
            top: scrollPos,
            behavior: 'auto'
        });
    }
}

function toggleServicioIndividual(header) {
    console.log('toggleServicioIndividual llamado');
    const card = header.closest('.card-dinamica-servicio');
    const contenido = card.querySelector('.servicio-contenido-expandible');
    const chevron = header.querySelector('.fa-chevron-down');
    
    console.log('Card:', card);
    console.log('Contenido:', contenido);
    console.log('Chevron:', chevron);
    console.log('maxHeight actual:', contenido.style.maxHeight);
    
    if (contenido.style.maxHeight && contenido.style.maxHeight !== '0px') {
        // Colapsar
        console.log('Colapsando');
        contenido.style.maxHeight = '0';
        chevron.style.transform = 'rotate(0deg)';
    } else {
        // Expandir
        console.log('Expandiendo a:', contenido.scrollHeight + 'px');
        contenido.style.maxHeight = contenido.scrollHeight + 'px';
        chevron.style.transform = 'rotate(180deg)';
    }
}

function actualizarHeaderServicio(input) {
    const card = input.closest('.card-dinamica-servicio');
    const preview = card.querySelector('.servicio-preview');
    if (preview) {
        preview.textContent = input.value || 'Nuevo Servicio';
    }
    // Actualizar altura del contenido expandible si está abierto
    const contenido = card.querySelector('.servicio-contenido-expandible');
    if (contenido && contenido.style.maxHeight && contenido.style.maxHeight !== '0px') {
        contenido.style.maxHeight = contenido.scrollHeight + 'px';
    }
}

function agregarCampoZona(nombreZona = "", veterinarias = []) {
    const container = document.getElementById('editor-zonas-container');
    if (!container) return;

    // Guardar la posición del título antes de expandir
    const box = document.getElementById('box-lugares');
    let scrollPos = 0;
    if (box) {
        const header = box.querySelector('.section-header-acc');
        if (header) {
            const rect = header.getBoundingClientRect();
            scrollPos = window.pageYOffset + rect.top - 20;
        }

        // Cerramos todos los demás que tengan info
        document.querySelectorAll('.editor-section-box.has-info').forEach(b => {
            if (b !== box) {
                b.classList.add('closed');
                b.classList.remove('open');
            }
        });
        box.classList.add('has-info');
        box.classList.remove('closed');
        box.classList.add('open');
    }

    const zonaId = 'zona-' + Date.now();
    const div = document.createElement('div');
    div.className = 'bloque-zona-completa';

    div.innerHTML = `
        <div class="card-dinamica-servicio" style="border-left: 5px solid var(--petroleo); position: relative; background: #fff !important; padding: 25px !important;">
            <label style="font-size: 12px; font-weight: bold; color: var(--petroleo); margin-bottom: 5px; display: block;">NOMBRE DE LA ZONA:</label>
            <input type="text" placeholder="Ej: Zona Norte" class="simple-input zona-nombre-val" value="${nombreZona}" style="font-size: 15px;">
            <div class="help-tooltip">Organizá tus lugares por zona (ej: "Zona Sur"). Verificá que los links funcionen.</div>
            <div id="${zonaId}" class="vetes-container" style="margin-top:20px; padding-left: 15px; border-left: 2px solid #eee;"></div>
            <div class="editor-footer-actions">
                <button type="button" class="btn-ver-mas" onclick="agregarVeterinaria('${zonaId}')">+ Agregar Clínica</button>
                <button type="button" class="btn-delete-dinamico" onclick="this.closest('.bloque-zona-completa').remove()">✕ Eliminar Zona</button>
            </div>
        </div>
    `;
    container.appendChild(div);

    // Forzar el scroll a la posición guardada después de añadir el contenido
    if (box && scrollPos > 0) {
        window.scrollTo({
            top: scrollPos,
            behavior: 'auto'
        });
    }

    if (veterinarias.length > 0) veterinarias.forEach(v => agregarVeterinaria(zonaId, v.nombre, v.link));
    else agregarVeterinaria(zonaId);
}

function agregarVeterinaria(containerId, nombre = "", link = "") {
    const container = document.getElementById(containerId);
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'vete-item';
    div.style = "margin-bottom: 10px; padding: 10px; background: #f9f9f9; border-radius: 8px;";
    div.innerHTML = `
        <input type="text" placeholder="Nombre de la Clínica" class="simple-input vete-nombre-val" value="${nombre}" style="margin-bottom:5px;">
        <input type="text" placeholder="Link Google Maps" class="simple-input vete-link-val" value="${link}">
        <button type="button" class="btn-ver-mas" style="color:#e74c3c; background: #fff; border: 1px solid #ffcccc; margin-top:10px; padding: 8px 15px; font-size: 10px; letter-spacing: 0.5px;" onclick="this.parentElement.remove()">✕ Quitar veterinaria</button>
    `;
    container.appendChild(div);
}

function agregarCampoCaso(titulo = "", subtitulo = "", desc = "", fotos = []) {
    const container = document.getElementById('editor-casos-container');
    if (!container) return;

    // Si fotos es un string (por compatibilidad anterior), lo convertimos a array
    if (typeof fotos === 'string' && fotos !== "") fotos = [fotos];
    if (!Array.isArray(fotos)) fotos = [];

    const box = document.getElementById('box-casos');
    let scrollPos = 0;
    if (box) {
        const header = box.querySelector('.section-header-acc');
        if (header) {
            const rect = header.getBoundingClientRect();
            scrollPos = window.pageYOffset + rect.top - 20;
        }
        document.querySelectorAll('.editor-section-box.has-info').forEach(b => {
            if (b !== box) {
                b.classList.add('closed');
                b.classList.remove('open');
            }
        });
        box.classList.add('has-info');
        box.classList.remove('closed');
        box.classList.add('open');
    }

    const div = document.createElement('div');
    div.className = 'bloque-input-dinamico';
    div.draggable = true;
    const uniqueId = 'caso-' + Date.now() + Math.floor(Math.random() * 100);
    
    div.innerHTML = `
        <div class="card-dinamica-servicio" style="border-left: 5px solid var(--petroleo); position: relative; background: #fff !important; padding: 0 !important; overflow: hidden;">
            <div class="drag-handle" title="Arrastrar para reordenar" style="position: absolute; left: -30px; top: 20px; cursor: grab; color: #94a3b8; font-size: 20px; padding: 10px; z-index: 10;">
                <i class="fas fa-grip-vertical"></i>
            </div>
            
            <div class="caso-header-colapsable" onclick="toggleCasoIndividual(this)" style="padding: 15px 25px; background: #f8fafc; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; transition: all 0.3s ease;">
                <span class="caso-preview" style="font-weight: 700; color: var(--petroleo); font-size: 14px; flex: 1;">${titulo || subtitulo || 'Nuevo Caso'}</span>
                <i class="fas fa-chevron-down" style="color: var(--petroleo); transition: transform 0.3s ease;"></i>
            </div>
            
            <div class="caso-contenido-expandible" style="max-height: 0; overflow: hidden; transition: max-height 0.4s ease;">
                <div style="padding: 25px;">
                    <div class="flex-container-servicio" style="display: flex; gap: 20px; align-items: flex-start;">
                <div class="inputs-lado" style="flex: 1.2; position: relative; min-width: 0;">
                    <div style="position: relative;">
                        <input type="text" placeholder="Nombre del Paciente (Ej: Luna)" class="simple-input caso-titulo-val" value="${titulo}">
                    </div>
                    <div style="position: relative; margin-top:10px;">
                        <input type="text" placeholder="Procedimiento (Ej: Cirugía de Cadera)" class="simple-input caso-subtitulo-val" value="${subtitulo}">
                    </div>
                    <div style="position: relative; margin-top:10px;">
                        <textarea placeholder="Descripción detallada del caso..." class="simple-textarea caso-desc-val" style="height: 150px;" maxlength="1000" oninput="actualizarContadorDinamicoCaso(this)">${desc}</textarea>
                        <div class="counter-label" style="font-size: 10px; margin-top: 2px; text-align: right;">${desc.length} / 1000</div>
                        <div class="help-tooltip-inline">
                            <i class="fas fa-info-circle"></i> Aquí puedes contar más sobre el procedimiento y los datos relevantes. Es un buen lugar para mencionar si colaboraste con otros colegas o detalles específicos del tratamiento.
                        </div>
                    </div>
                </div>
                <div class="foto-lado" style="flex: 1; min-width: 0; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center;">
                    <div style="margin-bottom: 15px; text-align: center;">
                        <label style="font-weight: 800; font-size: 11px; color: var(--petroleo); margin: 0; display: block; text-transform: uppercase;">GALERÍA DEL CASO</label>
                        <span style="font-size: 10px; color: #64748b; display: block; margin-top: 2px;">Máx. 8 fotos</span>
                    </div>
                    
                    <div style="margin-bottom: 15px; width: 100%;">
                        <label class="btn-contacto-outline btn-subir-archivo-vete" style="width: 100%; justify-content: center; padding: 6px 10px; font-size: 10px; min-height: auto; height: 32px;">
                            <i class="fas fa-plus-circle"></i> AÑADIR FOTOS
                            <input type="file" accept="image/*" multiple style="display:none;"
                                   onchange="manejarSubidaMultipleFotos(this, '${uniqueId}-galeria')">
                        </label>
                        <div class="help-tooltip-inline" style="margin-top: 8px; text-align: left;">
                            <i class="fas fa-camera"></i> <strong>Tip:</strong> La primera foto será la principal. Te recomendamos elegir una imagen estética y llamativa del paciente para captar la atención, y luego sumar fotos del procedimiento con buena calidad.
                        </div>
                    </div>

                    <div id="${uniqueId}-galeria" class="galeria-fotos-grid custom-scroll-editor" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; max-height: 160px; overflow-y: auto; padding-right: 5px; width: 100%;">
                        <!-- Las fotos se cargarán aquí -->
                    </div>
                    <input type="hidden" class="caso-fotos-hidden" value='${JSON.stringify(fotos)}'>
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end; margin-top: 15px;">
                <button type="button" class="btn-delete-dinamico" onclick="this.closest('.bloque-input-dinamico').remove()">✕ Eliminar este caso</button>
            </div>
        </div>
    `;

    div.addEventListener('dragstart', handleDragStart);
    div.addEventListener('dragover', handleDragOver);
    div.addEventListener('drop', handleDrop);
    div.addEventListener('dragend', handleDragEnd);

    container.appendChild(div);
    
    // Cargar fotos existentes
    if (fotos.length > 0) {
        const galeria = document.getElementById(`${uniqueId}-galeria`);
        fotos.forEach((f, index) => {
            const item = crearItemFotoGaleria(f, `${uniqueId}-galeria`);
            galeria.appendChild(item);
        });
    }

    if (box && scrollPos > 0) window.scrollTo({ top: scrollPos, behavior: 'auto' });
}

function manejarSubidaMultipleFotos(input, galeriaId) {
    const galeria = document.getElementById(galeriaId);
    if (!galeria || !input.files) return;

    const archivos = Array.from(input.files);
    const fotosActuales = galeria.children.length;
    const espacioDisponible = 8 - fotosActuales;

    if (espacioDisponible <= 0) {
        alert("Ya has alcanzado el máximo de 8 fotos para este caso.");
        return;
    }

    archivos.slice(0, espacioDisponible).forEach(archivo => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const item = crearItemFotoGaleria(e.target.result, galeriaId);
            galeria.appendChild(item);
            actualizarHiddenFotos(galeriaId);
        };
        reader.readAsDataURL(archivo);
    });
}

function crearItemFotoGaleria(src, galeriaId) {
    const div = document.createElement('div');
    div.className = 'foto-galeria-item';
    div.style = "position: relative; width: 100%; aspect-ratio: 1; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; cursor: move;";
    div.draggable = true;
    
    div.innerHTML = `
        <img src="${src}" style="width:100%; height:100%; object-fit: cover; display: block;" onclick="ampliarFotoEditor('${src}')">
        <button type="button" onclick="this.parentElement.remove(); actualizarHiddenFotos('${galeriaId}')" 
                style="position: absolute; top: 4px; right: 4px; background: rgba(231, 76, 60, 0.9); color: white; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            ✕
        </button>
    `;

    // Lógica simple de reordenar fotos dentro de la galería
    div.addEventListener('dragstart', (e) => {
        e.stopPropagation();
        div.classList.add('dragging-foto');
    });
    div.addEventListener('dragend', (e) => {
        e.stopPropagation();
        div.classList.remove('dragging-foto');
        actualizarHiddenFotos(galeriaId);
    });
    
    return div;
}

// Añadir listener para reordenar fotos por drag & drop
document.addEventListener('dragover', e => {
    const draggingFoto = document.querySelector('.dragging-foto');
    if (!draggingFoto) return;
    
    e.preventDefault();
    const galeria = draggingFoto.parentElement;
    const afterElement = getDragAfterElement(galeria, e.clientX, e.clientY);
    if (afterElement == null) {
        galeria.appendChild(draggingFoto);
    } else {
        galeria.insertBefore(draggingFoto, afterElement);
    }
});

function getDragAfterElement(container, x, y) {
    const draggableElements = [...container.querySelectorAll('.foto-galeria-item:not(.dragging-foto)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offsetX = x - box.left - box.width / 2;
        const offsetY = y - box.top - box.height / 2;
        const distance = Math.sqrt(offsetX*offsetX + offsetY*offsetY);
        if (distance < closest.distance) {
            return { distance: distance, element: child };
        } else {
            return closest;
        }
    }, { distance: Number.POSITIVE_INFINITY }).element;
}

function actualizarHiddenFotos(galeriaId) {
    const galeria = document.getElementById(galeriaId);
    const hiddenInput = galeria.parentElement.querySelector('.caso-fotos-hidden');
    const fotos = Array.from(galeria.querySelectorAll('img')).map(img => img.src);
    hiddenInput.value = JSON.stringify(fotos);
}

function ampliarFotoEditor(src) {
    const modal = document.getElementById('caseModal');
    if (!modal) {
        // Si no existe el modal (por ejemplo en el editor si no se cargó), lo creamos o avisamos
        console.error("No se encontró el modal de casos");
        return;
    }

    // Asegurarnos de que los elementos del modal existan
    const mTitulo = document.getElementById('modal-titulo');
    const mSub = document.getElementById('modal-subtitulo');
    const mDesc = document.getElementById('modal-descripcion');
    const mImg = document.getElementById('modal-img');

    if (mTitulo) mTitulo.innerText = "Vista previa de imagen";
    if (mSub) mSub.innerText = "Galería del Editor";
    if (mDesc) mDesc.innerText = "";
    if (mImg) mImg.src = src;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function actualizarContadorDinamicoCaso(textarea) {
    const counter = textarea.nextElementSibling;
    if (counter && counter.classList.contains('counter-label')) {
        const longitud = textarea.value.length;
        counter.innerText = `${longitud} / 1000`;
        counter.style.color = longitud >= 950 ? "#e74c3c" : "#888";
    }
}

/* ==========================================

    4. GUARDADO Y CARGA DE DATOS (REFORZADO)

   ========================================== */

const defaultData = {
    nombre: "Dra. Belén Micheli",
    especialidad: "Cirujana Veterinaria & Especialista en Pequeños Animales",
    bio: "Médica Veterinaria apasionada por la salud y el bienestar animal. Con más de 8 años de experiencia en cirugías de alta complejidad y cuidados intensivos. Mi misión es brindar una atención médica de excelencia combinada con un trato humano y cercano tanto para los pacientes como para sus familias.",
    provincia: "Buenos Aires",
    whatsapp_activo: true,
    whatsapp_num: "5491122334455",
    foto: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800",
    titulos: [
        { titulo: "Médica Veterinaria", desc: "Universidad de Buenos Aires (UBA)", tipo: "general", visible: true },
        { titulo: "Especialista en Cirugía de Tejidos Blandos", desc: "Posgrado Internacional en Medicina Veterinaria", tipo: "especialidad", visible: true },
        { titulo: "Diplomada en Medicina Interna", desc: "Consejo Profesional de Médicos Veterinarios", tipo: "posgrado", visible: true }
    ],
    servicios: [
        { nombre: "Cirugía General", desc: "Intervenciones quirúrgicas programadas y de urgencia con tecnología de vanguardia.", foto: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600" },
        { nombre: "Consultoría Senior", desc: "Asesoramiento especializado para casos clínicos complejos y diagnósticos diferenciales.", foto: "" },
        { nombre: "Ecografía Abdominal", desc: "Diagnóstico por imágenes de alta resolución para una evaluación precisa.", foto: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=600" }
    ],
    zonas: [
        { nombreZona: "Zona Norte", veterinarias: [{ nombre: "Clínica Veterinaria del Sol", link: "#" }, { nombre: "Hospital Veterinario San Isidro", link: "#" }] },
        { nombreZona: "CABA", veterinarias: [{ nombre: "Centro Médico Veterinario Palermo", link: "#" }] }
    ],
    casos: [
        { titulo: "Luna", subtitulo: "Cirugía de Cadera", desc: "Luna llegó con una displasia severa que le impedía caminar con normalidad. Tras una intervención quirúrgica compleja y 3 meses de rehabilitación, hoy corre feliz en el parque.", foto: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600" },
        { titulo: "Simba", subtitulo: "Tratamiento Dermatológico", desc: "Simba padecía una dermatitis atópica severa. Con un cambio en su dieta y medicación específica, logramos restaurar su pelaje por completo en tiempo récord.", foto: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600" },
        { titulo: "Milo", subtitulo: "Odontología Preventiva", desc: "Realizamos una limpieza profunda bajo anestesia inhalatoria y extrajimos piezas dañadas que le causaban dolor crónico al comer.", foto: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600" },
        { titulo: "Rocky", subtitulo: "Fisioterapia", desc: "Tras un accidente, Rocky perdió movilidad en sus patas traseras. Con sesiones semanales de hidroterapia y ejercicios, ha vuelto a caminar.", foto: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600" },
        { titulo: "Bella", subtitulo: "Control Nutricional", desc: "Bella tenía un sobrepeso que afectaba sus articulaciones. Diseñamos un plan nutricional estricto y hoy está en su peso ideal.", foto: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600" }
    ]
};

const profileForm = document.getElementById('profileForm');

if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btnGuardar = profileForm.querySelector('button[type="submit"]');
        
        // 1. EFECTO DE CARGA UX
        btnGuardar.classList.add('btn-loading');
        btnGuardar.disabled = true;

        // Simulamos un pequeño delay de guardado para dar feedback visual
        setTimeout(() => {
            const titulosInputs = document.querySelectorAll('#editor-titulos-container .bloque-input-dinamico');
            const listaTitulos = Array.from(titulosInputs).map(nodo => ({
                titulo: nodo.querySelector('.titulo-val').value,
                desc: nodo.querySelector('.desc-val').value,
                foto: nodo.querySelector('.titulo-foto-hidden').value,
                visible: nodo.querySelector('.titulo-visible-val').value === 'true',
                tipo: nodo.querySelector('.titulo-tipo-val').value // 'general', 'especialidad' o 'posgrado'
            }));

            const listaServicios = Array.from(document.querySelectorAll('#editor-servicios-container .bloque-input-dinamico')).map(nodo => ({
                nombre: nodo.querySelector('.servicio-val').value,
                desc: nodo.querySelector('.desc-val').value,
                foto: nodo.querySelector('.servicio-foto-hidden').value
            }));

            const listaZonas = Array.from(document.querySelectorAll('.bloque-zona-completa')).map(nodoZona => ({
                nombreZona: nodoZona.querySelector('.zona-nombre-val').value,
                veterinarias: Array.from(nodoZona.querySelectorAll('.vete-item')).map(vn => ({
                    nombre: vn.querySelector('.vete-nombre-val').value,
                    link: vn.querySelector('.vete-link-val').value
                }))
            }));

            const listaCasos = Array.from(document.querySelectorAll('#editor-casos-container .bloque-input-dinamico')).map(nodo => {
                const fotosVal = nodo.querySelector('.caso-fotos-hidden').value;
                let fotosArray = [];
                try { fotosArray = JSON.parse(fotosVal); } catch(e) { fotosArray = []; }
                
                return {
                    titulo: nodo.querySelector('.caso-titulo-val').value,
                    subtitulo: nodo.querySelector('.caso-subtitulo-val').value,
                    desc: nodo.querySelector('.caso-desc-val').value,
                    fotos: fotosArray,
                    foto: fotosArray[0] || "" // Mantenemos 'foto' para compatibilidad con el index actual
                };
            });

            const datos = {
                nombre: document.getElementById('nombre_completo').value,
                especialidad: document.getElementById('especialidad').value,
                bio: document.getElementById('bio').value,
                provincia: document.getElementById('provincia').value,
                email_contacto: document.getElementById('email_contacto').value,
                whatsapp_activo: document.getElementById('whatsapp_activo').value === 'true',
                whatsapp_num: document.getElementById('whatsapp_num').value,
                foto: document.getElementById('preview-foto').src,
                titulos: listaTitulos,
                servicios: listaServicios,
                zonas: listaZonas,
                casos: listaCasos
            };

            localStorage.setItem('perfilVeterinario', JSON.stringify(datos));
            
            btnGuardar.classList.remove('btn-loading');
            btnGuardar.classList.add('btn-saved');
            btnGuardar.innerText = "¡CAMBIOS GUARDADOS!";
            
            cambiosSinGuardar = false; 

            setTimeout(() => {
                btnGuardar.classList.remove('btn-saved');
                btnGuardar.innerText = "GUARDAR CAMBIOS";
                btnGuardar.disabled = false;
            }, 3000);
        }, 1500);
    });
}

function previsualizarFotoMini(input, imgId, tipo) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(imgId).src = e.target.result;
            const hiddenClass = tipo === 'titulo' ? '.titulo-foto-hidden' : '.servicio-foto-hidden';
            const hiddenInput = input.closest('.bloque-input-dinamico').querySelector(hiddenClass);
            if (hiddenInput) {
                hiddenInput.value = e.target.result;
            }
            
            // Actualizar altura del contenido expandible si está abierto
            const card = input.closest('.card-dinamica-servicio');
            if (card) {
                const contenido = card.querySelector('.servicio-contenido-expandible, .titulo-contenido-expandible');
                if (contenido && contenido.style.maxHeight && contenido.style.maxHeight !== '0px') {
                    contenido.style.maxHeight = contenido.scrollHeight + 'px';
                }
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function restablecerEjemplo() {
    if (confirm("¿Estás seguro de que quieres borrar tus cambios y volver a cargar el ejemplo por defecto?")) {
        cargarDatosEnEditor(defaultData);
        cambiosSinGuardar = true;
        alert("Ejemplo cargado. No olvides hacer clic en 'GUARDAR CAMBIOS' para aplicarlos.");
    }
}

function cargarDatosEnEditor(data) {
    if(document.getElementById('nombre_completo')) {
        document.getElementById('nombre_completo').value = data.nombre || "";
        document.getElementById('live-preview-nombre').innerText = data.nombre || "Tu Nombre";
    }

    if(document.getElementById('especialidad')) {
        document.getElementById('especialidad').value = data.especialidad || "";
        document.getElementById('live-preview-especialidad').innerText = data.especialidad || "Especialidad";
    }

    if(document.getElementById('bio')) {
        document.getElementById('bio').value = data.bio || "";
        document.getElementById('live-preview-bio').innerText = data.bio || "Tu biografía aparecerá aquí...";
    }

    if(document.getElementById('provincia')) {
        document.getElementById('provincia').value = data.provincia || "";
    }

    if(document.getElementById('email_contacto')) {
        document.getElementById('email_contacto').value = data.email_contacto || "";
    }

    if(document.getElementById('whatsapp_activo')) {
        const waActivo = data.whatsapp_activo === true;
        document.getElementById('whatsapp_activo').value = waActivo;
        const btnWa = document.getElementById('toggle-whatsapp');
        if(btnWa) btnWa.classList.toggle('active', waActivo);
        
        const wrapper = document.getElementById('wrapper-input-whatsapp');
        const inputNum = document.getElementById('whatsapp_num');
        const reqStar = document.getElementById('req-wa');
        
        if (waActivo) {
            if(wrapper) {
                wrapper.style.opacity = "1";
                wrapper.style.pointerEvents = "auto";
            }
            if(inputNum) {
                inputNum.value = data.whatsapp_num || "";
                inputNum.required = true;
            }
            if(reqStar) reqStar.style.display = 'inline';
        } else {
            if(wrapper) {
                wrapper.style.opacity = "0.5";
                wrapper.style.pointerEvents = "none";
            }
            if(inputNum) {
                inputNum.value = "";
                inputNum.required = false;
            }
            if(reqStar) reqStar.style.display = 'none';
        }
    }

    if(data.foto && document.getElementById('preview-foto')) {
        document.getElementById('preview-foto').src = data.foto;
        document.getElementById('preview-foto').style.display = 'block';
        document.getElementById('live-preview-foto').src = data.foto;
        const placeholderText = document.getElementById('placeholder-text');
        const container = document.getElementById('placeholder-container');
        if(placeholderText) placeholderText.style.display = 'none';
        if(container) container.style.border = 'none';
    }

    if (document.getElementById('editor-titulos-container')) {
        document.getElementById('editor-titulos-container').innerHTML = "";
        if (data.titulos && Array.isArray(data.titulos)) {
            data.titulos.forEach(t => agregarCampoTitulo(t.titulo, t.desc, t.foto, t.visible, t.legajoNum || "", t.tipo || 'general'));
        }
    }

    if (document.getElementById('editor-servicios-container')) {
        document.getElementById('editor-servicios-container').innerHTML = "";
        if (data.servicios && Array.isArray(data.servicios)) {
            data.servicios.forEach(s => agregarCampoServicio(s.nombre, s.desc, s.foto));
        }
    }

    if (document.getElementById('editor-zonas-container')) {
        document.getElementById('editor-zonas-container').innerHTML = "";
        if (data.zonas && Array.isArray(data.zonas)) {
            data.zonas.forEach(z => agregarCampoZona(z.nombreZona, z.veterinarias));
        }
    }

    if (document.getElementById('editor-casos-container')) {
        document.getElementById('editor-casos-container').innerHTML = "";
        if (data.casos && Array.isArray(data.casos)) {
            data.casos.forEach(c => agregarCampoCaso(c.titulo, c.subtitulo, c.desc, c.fotos || (c.foto ? [c.foto] : [])));
        }
    }
}

function cargarDatosEnPortafolio(data) {
    // Usamos los datos guardados o los globales por defecto
    const d = (data && data.nombre) ? data : defaultData;

    const n1 = document.querySelector('.hero-text-side h1');
    const e1 = document.querySelector('.specialty');
    const b1 = document.querySelector('.about-info p');
    const imgPerfil = document.querySelector('.hero-image-wrapper img');
    const prov1 = document.getElementById('perfil-provincia');

    if (n1) n1.innerText = d.nombre;
    if (e1) e1.innerText = d.especialidad;
    if (b1) b1.innerText = d.bio;
    if (imgPerfil && d.foto) imgPerfil.src = d.foto;
    if (prov1 && d.provincia) prov1.innerText = `En ${d.provincia}.`;

    // Actualizar WhatsApp en el index
    const btnWaIndex = document.querySelector('.btn-round-whatsapp');
    if (btnWaIndex) {
        if (d.whatsapp_activo && d.whatsapp_num) {
            btnWaIndex.style.display = 'flex';
            const cleanNum = d.whatsapp_num.replace(/\D/g, '');
            btnWaIndex.href = `https://wa.me/${cleanNum}`;
        } else {
            btnWaIndex.style.display = 'none';
        }
    }

    const contTitulos = document.getElementById('container-titulos');
    if (contTitulos && d.titulos) {
        const titulosVisibles = d.titulos.filter(t => t.visible !== false);
        const ordenPrioridad = { 'especialidad': 1, 'posgrado': 2, 'general': 3 };
        const titulosOrdenados = [...titulosVisibles].sort((a, b) => (ordenPrioridad[a.tipo] || 3) - (ordenPrioridad[b.tipo] || 3));
        
        contTitulos.innerHTML = titulosOrdenados.map(t => {
            let extraClass = t.tipo === 'especialidad' ? 'specialty-highlight' : (t.tipo === 'posgrado' ? 'postgrad-highlight' : '');
            return `<div class="title-card ${extraClass}"><h3>${t.titulo}</h3><p>${t.desc}</p></div>`;
        }).join('');
    }

    const contServicios = document.getElementById('container-servicios');
    if (contServicios && d.servicios) {
        contServicios.innerHTML = d.servicios.map(s => {
            const fotoHTML = s.foto ? `<div class="service-media"><img src="${s.foto}"></div>` : '';
            return `<div class="service-card">${fotoHTML}<div class="service-content"><h3>${s.nombre}</h3><div class="full-desc"><p>${s.desc}</p></div></div></div>`;
        }).join('');
    }

    const contCasos = document.getElementById('container-casos');
    const sectionCasos = document.getElementById('casos-exito');
    
    if (contCasos && sectionCasos) {
        if (d.casos && d.casos.length > 0) {
            sectionCasos.classList.add('active');
            contCasos.innerHTML = d.casos.map(c => `
                <div class="case-card" onclick="abrirModalCaso('${c.titulo}', '${c.subtitulo}', \`${c.desc}\`, '${c.foto}')">
                    <div class="case-img-box">
                        <img src="${c.foto || 'https://placehold.co/600x400?text=Caso+de+Éxito'}" alt="${c.titulo}">
                    </div>
                    <div class="case-content">
                        <h3>${c.titulo}</h3>
                        <p class="case-subtitle">${c.subtitulo}</p>
                        <p class="case-description-preview">${c.desc}</p>
                        <span class="case-read-more">Leer más...</span>
                    </div>
                </div>
            `).join('');
        } else {
            sectionCasos.classList.remove('active');
        }
    }

    const contZonas = document.querySelector('.zones-grid');
    if (contZonas && d.zonas) {
        contZonas.innerHTML = d.zonas.map(z => {
            const vetesHTML = z.veterinarias.map(v => `
                <li class="clinic-item"><strong>${v.nombre}</strong><a href="${v.link}" target="_blank" class="btn-zone-link visible-link">📍 Ver mapa</a></li>
            `).join('');
            return `<div class="zone-card"><div class="zone-icon">📍</div><h3>${z.nombreZona}</h3><ul class="clinic-list visible-list">${vetesHTML}</ul></div>`;
        }).join('');
    }
}

/* ==========================================

    5. DETECTOR SIMULADOR MÓVIL

   ========================================== */

function toggleServicios() {
    const wrapper = document.getElementById('servicesWrapper');
    const btnContainer = document.getElementById('btnVerMasContainer');
    
    if (wrapper && btnContainer) {
        wrapper.classList.add('expanded');
        btnContainer.style.display = 'none';
    }
}

function toggleTitulos() {
    const wrapper = document.getElementById('titlesWrapper');
    const btnContainer = document.getElementById('btnVerMasTitulosContainer');
    
    if (wrapper && btnContainer) {
        wrapper.classList.remove('limited');
        wrapper.classList.add('expanded');
        btnContainer.style.display = 'none';
    }
}

/* --- LÓGICA DE CASOS DE ÉXITO --- */
function abrirModalCaso(titulo, subtitulo, descripcion, foto) {
    const modal = document.getElementById('caseModal');
    if (!modal) return;

    document.getElementById('modal-titulo').innerText = titulo;
    document.getElementById('modal-subtitulo').innerText = subtitulo;
    document.getElementById('modal-descripcion').innerText = descripcion;
    document.getElementById('modal-img').src = foto || "https://placehold.co/600x400?text=Caso+de+Éxito";

    modal.style.display = 'flex';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Bloquear scroll del fondo
}

function cerrarModalCaso(e) {
    const modal = document.getElementById('caseModal');
    if (!modal) return;

    // Solo cerrar si se hace clic en la X o fuera del contenido
    if (e.target === modal || e.target.classList.contains('close-modal')) {
        modal.style.display = 'none';
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
}

function moveCarousel(direction) {
    const container = document.getElementById('container-casos');
    if (!container) return;
    
    const cards = Array.from(container.children);
    if (cards.length <= 4) return; // No hay suficientes para rotar

    const cardWidth = cards[0].offsetWidth + 20; // 230px + 20px gap

    if (direction === 1) {
        // Mover a la derecha (siguiente)
        container.style.transition = "transform 0.5s ease-in-out";
        container.style.transform = `translateX(-${cardWidth}px)`;

        setTimeout(() => {
            container.style.transition = "none";
            const firstCard = container.firstElementChild;
            container.appendChild(firstCard);
            container.style.transform = "translateX(0)";
        }, 500);
    } else {
        // Mover a la izquierda (anterior)
        container.style.transition = "none";
        const lastCard = container.lastElementChild;
        container.insertBefore(lastCard, container.firstElementChild);
        container.style.transform = `translateX(-${cardWidth}px)`;

        // Forzar reflow
        container.offsetHeight;

        container.style.transition = "transform 0.5s ease-in-out";
        container.style.transform = "translateX(0)";
    }
}

document.addEventListener('click', (e) => {
    if (e.target.closest('button') && e.target.innerText.includes('Móvil')) {
        document.querySelector('.white-card-container').classList.add('is-mobile');
    }
    if (e.target.closest('button') && e.target.innerText.includes('PC')) {
        document.querySelector('.white-card-container').classList.remove('is-mobile');
    }
});

// Funciones para acordeón de casos de éxito
function toggleCasoIndividual(header) {
    console.log('toggleCasoIndividual llamado');
    const card = header.closest('.card-dinamica-servicio');
    const contenido = card.querySelector('.caso-contenido-expandible');
    const chevron = header.querySelector('.fa-chevron-down');
    
    if (contenido.style.maxHeight && contenido.style.maxHeight !== '0px') {
        // Colapsar
        contenido.style.maxHeight = '0';
        chevron.style.transform = 'rotate(0deg)';
    } else {
        // Expandir
        contenido.style.maxHeight = contenido.scrollHeight + 'px';
        chevron.style.transform = 'rotate(180deg)';
    }
}

// Configuración inicial al cargar la página completamente
window.addEventListener('load', () => {
    // Scroll al tope inmediato y forzado
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Forzar nuevamente después de un pequeño delay
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 50);
    
    // Cerrar todas las secciones acordeón
    setTimeout(() => {
        document.querySelectorAll('.editor-section-box').forEach(box => {
            box.classList.add('closed');
            box.classList.remove('open');
        });
    }, 100);
});

function actualizarHeaderCaso(input) {
    const card = input.closest('.card-dinamica-servicio');
    const preview = card.querySelector('.caso-preview');
    const subtituloInput = card.querySelector('.caso-subtitulo-val');
    if (preview) {
        preview.textContent = input.value || (subtituloInput ? subtituloInput.value : '') || 'Nuevo Caso';
    }
    // Actualizar altura si está expandido
    const contenido = card.querySelector('.caso-contenido-expandible');
    if (contenido && contenido.style.maxHeight && contenido.style.maxHeight !== '0px') {
        contenido.style.maxHeight = contenido.scrollHeight + 'px';
    }
}
