
let ministerioEstructura = data;

//APIS THING (DATA)

const equipos = {
    "Desktop": {
        "EXO": ["H7-V5488P", "PC READY D1 RTX", "PC READY H7", "AIO"],
        "Letos": ["Sin modelo"],
        "CX": ["5835", "9217"],
        "Coradir": ["AMD A"],
        "Bangho": ["7168", "4168"],
        "Lenovo": ["ThinkCentre neo"],
        "HP": ["Pro 3000 SFF"],
        "BANGHO": ["CLON"]
    },
    "Notebook": {
        "Dell": ["Latitude 3510", "Vostro 14 3000"],
        "HP": ["Elitebook 840 G7", "HP ProBook 450 G4", "HP 14-FQ0013DX"],
        "Lenovo": ["ThinkBook V14 G2 ARE", "IdeaPad", "Lenovo E41-55", "ThinkBook V15 G2", "IdeaPad 330", "B50-80", "E41-55"],
        "Banghó": ["Sin modelo"]
    },

    "Impresora": {
        "HP": ["Modelo 14", "Modelo 15", "LaserJet Pro MFP M428FWD", "LaserJet Pro P2035N", "LaserJet Pro 400 M401DN", "LaserJet P2055DN", "P2015d", "LaserJet P1102w", "LaserJet P1505", "LaserJet P1606DN", "LaserJet 428fdw", "LaserJet Pro M102W", "LaserJet Pro MFP M130FW", "LaserJet P3005D", "LaserJet Pro M201DW", "LaserJet P3015"],
        "Epson": ["Modelo 16", "Modelo 17", "Modelo 18", "EcoTank L220", "EcoTank L8180", "EcoTank L3250", "EcoTank L380"],
        "Brother": ["HL-1200"],
        "Lexmark": ["MX522", "M2880DFW", "MS315dn", "MX317DN"],
        "Ricoh": ["C 307"],
        "Samsung": ["ProXpress M4020ND", "ML4050N", "Xpress M2020W", "ML2165W"],
        "Toshiba": ["e-studio 409p/409s"]
    },
    "Escaner": {
        "Epson": ["DS-530 II", "DS-770 II"]
    }
}

let miVariableParaMTs;

//SELECCION DE TIPO

const tipoEquipoSelect = document.getElementById('tipoEquipo');

// Función para cargar las opciones del objeto equipos en el selector de tipo de equipo
function cargarOpcionesTipoEquipo() {
    // Eliminar las opciones anteriores
    tipoEquipoSelect.innerHTML = '';
    // Crear opción por defecto
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Seleccione un tipo de equipo';
    defaultOption.value = '';
    tipoEquipoSelect.appendChild(defaultOption);
    // Crear opciones para cada tipo de equipo
    for (const tipoEquipo in equipos) {
        const option = document.createElement('option');
        option.text = tipoEquipo;
        option.value = tipoEquipo;
        tipoEquipoSelect.appendChild(option);
    }
}

// Llamar a la función para cargar las opciones al cargar la página o formulario
cargarOpcionesTipoEquipo();

// SELECCIONAR MARCA / MODELO X TIPO
const tipoEquipo = document.getElementById("tipoEquipo");
const tipoCheck = document.getElementById("poseeMonitor");
const equipoMarca = document.getElementById("equipoMarca");
const modeloEquipo = document.getElementById("equipoModelo");

tipoEquipo.addEventListener("change", actualizarListaMarcas);
equipoMarca.addEventListener("change", actualizarListaModelos);

function actualizarListaMarcas() {
    const tipoSeleccionado = tipoEquipo.value;
    let marcas = equipos[tipoSeleccionado];
    let opcionesMarcas = "";
    opcionesMarcas += `<option >seleccione una marca</option>`;

    for (let marca in marcas) {
        opcionesMarcas += `<option value="${marca}" >${marca}</option>`;
    }
    equipoMarca.innerHTML = opcionesMarcas;
}

function actualizarListaModelos() {
    const tipoSeleccionado = tipoEquipo.value;
    const marcaSeleccionada = equipoMarca.value;
    const modelos = equipos[tipoSeleccionado][marcaSeleccionada];
    let opcionesModelos = "";
    opcionesModelos += `<option >seleccione un modelo</option>`;

    if (marcaSeleccionada != "seleccione una marca") {
        for (let modelo of modelos) {
            opcionesModelos += `<option value="${modelo}" >${modelo}</option>`;
        }
    }
    modeloEquipo.innerHTML = opcionesModelos;
}



// MOSTRAR MONITOR
tipoEquipo.addEventListener("change", mostrarCampoMonitor);
tipoCheck.addEventListener("change", mostrarCamposMonitor);

function mostrarCampoMonitor() {
    var tipoEquipo = document.getElementById("tipoEquipo").value;
    if (tipoEquipo == "Desktop") {
        document.getElementById("campoMonitor").style.display = "block";
        document.getElementById("monitorModelo").value = "Desconocido";
        document.getElementById("monitorNroSerie").value = "Desconocido";
    } else {
        document.getElementById("campoMonitor").style.display = "none";
    }
}

function mostrarCamposMonitor() {
    var poseeMonitorCheckbox = document.getElementById("poseeMonitor");
    var camposMonitor = document.getElementById("camposMonitor");
    if (poseeMonitorCheckbox.checked == true) {
        camposMonitor.style.display = "block";
    } else {
        camposMonitor.style.display = "none";
    }
}


// SELECCIONAR SUBSE

const selectSubse = document.getElementById("selectSubse");
const selectDirec = document.getElementById("selectDirecc");
const contenedor = document.getElementById("masLugares");
const selectElement = document.createElement("select");
selectElement.name = "DireccionII";

// Popular los select con las opciones
function populateSubseOptions() {
    for (const subse in ministerioEstructura.subsecretarias) {
        const option = document.createElement("option");
        option.value = ministerioEstructura.subsecretarias[subse].nombre;
        option.textContent = ministerioEstructura.subsecretarias[subse].nombre;
        option.dataset.subseValue = subse;
        option.setAttribute("data-value", subse); // Custom attribute to store "subse" value
        selectSubse.appendChild(option);
    }

}

// Populates the selectDirec dropdown based on the selected sub-secretary
function populateDirecOptions() {

    var selectedOption = selectSubse.options[selectSubse.selectedIndex];
    var storedValue = selectedOption.getAttribute("data-value");
    // const selectedSubse = selectSubse.value;
    const subseData = ministerioEstructura.subsecretarias[storedValue];

    selectDirec.innerHTML = "";

    if (subseData.hasOwnProperty("oficinaPrivada")) {
        const option = document.createElement("option");
        option.value = subseData.oficinaPrivada.nombre;
        // option.value = "privada";
        option.textContent = subseData.oficinaPrivada.nombre;
        option.setAttribute("data-value", subseData);
        selectDirec.appendChild(option);

    } else if (subseData.hasOwnProperty("direcciones")) {
        for (const direccion in subseData.direcciones) {
            const option = document.createElement("option");
            option.value = subseData.direcciones[direccion].nombre;
            // option.value = direccion;
            option.textContent = subseData.direcciones[direccion].nombre;
            option.setAttribute("data-value", direccion);
            selectDirec.appendChild(option);
        }
    }
}

// Populates the selectElement dropdown based on the selected sub-secretary and direction
function populateDireccionOptions() {

    const selectedSubse = selectSubse.options[selectSubse.selectedIndex].getAttribute("data-value");
    // const selectedSubse = selectSubse.value;
    const selectedDirec = selectDirec.options[selectDirec.selectedIndex].getAttribute("data-value");
    // const selectedDirec = selectDirec.value;

    const direcciones = ministerioEstructura.subsecretarias[selectedSubse].direcciones[selectedDirec].direcciones;

    selectElement.innerHTML = "";

    if (ministerioEstructura.subsecretarias[selectedSubse].direcciones[selectedDirec].hasOwnProperty("oficinaPrivada")) {
        const option = document.createElement("option");
        option.value = ministerioEstructura.subsecretarias[selectedSubse].direcciones[selectedDirec].oficinaPrivada;
        option.textContent = ministerioEstructura.subsecretarias[selectedSubse].direcciones[selectedDirec].oficinaPrivada.nombre;
        option.setAttribute("data-value", ministerioEstructura.subsecretarias[selectedSubse].direcciones[selectedDirec]);
        selectElement.appendChild(option);

    } else {
        for (const direccion in direcciones) {
            const option = document.createElement("option");
            option.value = direcciones[direccion].nombre;
            option.textContent = direcciones[direccion].nombre;
            option.setAttribute("data-value", direccion);
            selectElement.appendChild(option);
        }
    }

    contenedor.style.display = "block";
    contenedor.appendChild(selectElement);
}

// Event listeners for selectSubse and selectDirec
selectSubse.addEventListener("change", populateDirecOptions);
selectDirec.addEventListener("change", populateDireccionOptions);

// Initialize the dropdown options
populateSubseOptions();



