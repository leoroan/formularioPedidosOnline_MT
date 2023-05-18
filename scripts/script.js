console.log("js working!");

let ministerioEstructura = MinisterioDeTransporte;


//APIS THING (DATA)

const equipos = {
    Desktop: {
        HP: ["Modelo 1", "Modelo 2", "Modelo 3"],
        Dell: ["Modelo 4", "Modelo 5"],
        Lenovo: ["Modelo 6", "Modelo 7"],
        Exo: ["modelo 8", "Modelo 9"],
    },
    Notebook: {
        HP: ["Modelo 8", "Modelo 9"],
        Dell: ["Modelo 10", "Modelo 11", "Modelo 12"],
        Lenovo: ["Modelo 13"],
    },
    Impresora: {
        HP: ["Modelo 14", "Modelo 15"],
        Epson: ["Modelo 16", "Modelo 17", "Modelo 18"],
        Canon: ["Modelo 19"],
    },
    Escaner: {
        Epson: ["Modelo 20", "Modelo 21"],
        Canon: ["Modelo 22"],
    },
};

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

const select_subse = document.getElementById("lugarSubse");
var subsecretarias = ministerioEstructura.subsecretarias;

for (var subse in subsecretarias) {
    var option = document.createElement("option");
    option.value = subsecretarias[subse].nombre;
    option.text = subsecretarias[subse].nombre;
    select_subse.appendChild(option);
}

// SELECCIONAR OFI/DIRE

var direccionesSubsecretariaTransporteTerrestre = MinisterioDeTransporte.subsecretarias.subsecretariaTecnicaAdministrativaLegal.direcciones.direccionGeneralAdministracion.direcciones.direccionTecnologiaInformacion;
console.log(direccionesSubsecretariaTransporteTerrestre);
