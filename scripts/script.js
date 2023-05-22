
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
    "Escáner": {
        "Epson": ["DS-530 II", "Ds770 II"]
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

const select_subse = document.getElementById("lugarSubse");
var subsecretarias = ministerioEstructura["subsecretarias"];

function agregarOpciones() {
    for (var subse in subsecretarias) {
        var option = document.createElement("option");
        option.id = subse;
        option.value = subsecretarias[subse].nombre; // va a la bdd/gsheet
        option.text = subsecretarias[subse].nombre; // a display
        select_subse.appendChild(option);
        option.dataset.subseValue = subse;
    }
}
agregarOpciones();


// SELECCIONAR OFI/DIRE
const contenedor = document.getElementById("masLugares");

// Agregar event listener al cambio de selección
select_subse.addEventListener("change", susbsecretariaSeleccionada);

function susbsecretariaSeleccionada() {
    // Obtener el valor seleccionado
    var selec = select_subse.options[select_subse.selectedIndex];
    var seleccionado = selec.id;

    // Limpiar el contenido previo
    contenedor.innerHTML = "";

    // Función auxiliar para crear y configurar un elemento de selección
    function crearSelect(direcciones) {
        const select_direcciones = document.createElement("select");

        for (let key in direcciones) {
            const option = document.createElement("option");
            option.value = key; // Set the value as the "key" of direcciones
            option.name = "Direccion";
            option.text = direcciones[key].nombre;
            select_direcciones.appendChild(option);
        }

        contenedor.appendChild(select_direcciones);
        return select_direcciones;
    }


    // Verificar si la opción seleccionada tiene la propiedad "oficinaPrivada"
    if (subsecretarias.hasOwnProperty(seleccionado) && subsecretarias[seleccionado].hasOwnProperty("oficinaPrivada")) {
        let oficinaPrivada = subsecretarias[seleccionado].oficinaPrivada;

        // Crear un input y configurarlo
        const input = document.createElement("input");
        input.id = "inputPrivada";
        input.type = "text";
        input.name = "Direccion";
        input.value = oficinaPrivada.nombre;
        contenedor.appendChild(input);

        // Ajustar el ancho del input según el contenido
        var inputElement = document.getElementById("inputPrivada");
        var anchoContenido = inputElement.scrollWidth;
        inputElement.style.width = anchoContenido + 10 + "px";
    }

    // Verificar si la opción seleccionada tiene la propiedad "direcciones"
    function mostrarNombre(subsecretaria) {
        if (subsecretaria.hasOwnProperty("direcciones")) {
            let direcciones = subsecretaria.direcciones;

            console.log("crea direcciones: ");
            let select = crearSelect(direcciones);

            select.addEventListener("change", function () {
                let selectedIndex = this.selectedIndex;
                let direccionSeleccionada = this.options[selectedIndex].value;

                if (subsecretaria.direcciones[direccionSeleccionada].hasOwnProperty("direcciones")) {
                    contenedor.innerHTML = "";
                    let nuevasDirecciones = subsecretaria.direcciones[direccionSeleccionada].direcciones;
                    
                    console.log("crea mas direcciones: ");
                    let nuevoSelect = crearSelect(nuevasDirecciones);

                    nuevoSelect.addEventListener("change", function () {
                        let selectedIndex = this.selectedIndex;
                        let direccionSeleccionada = this.options[selectedIndex].value;

                        console.log(direccionSeleccionada);

                        // console.log(subsecretaria.direcciones[direccionSeleccionada]);

                        // if (subsecretaria.direcciones[direccionSeleccionada].hasOwnProperty("direcciones")) {
                        //     mostrarNombre(subsecretaria.direcciones[direccionSeleccionada]);
                        // } else {
                        //     console.log("no tiene direccion: ");
                        //     let nombre = subsecretaria.direcciones[direccionSeleccionada].nombre;
                        //     console.log("Nombre:", nombre);
                        // }
                    });

                    contenedor.appendChild(nuevoSelect);
                } else {
                    let nombre = subsecretaria.direcciones[direccionSeleccionada].nombre;
                    console.log("Nombre:", nombre);
                }
            });

            contenedor.appendChild(select);
        }
    }

    // Usage:
    mostrarNombre(subsecretarias[seleccionado]);

}


// console.log(subsecretarias);