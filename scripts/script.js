
let ministerioEstructura = data;

//APIS THING (DATA)

const equipos = {
    "Desktop": {
        "EXO": ["H7-V5488P", "H2-P5685P", "PC READY D1 RTX", "PC READY H7", "AIO"],
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
        "HP": ["LaserJet Pro MFP M428FWD", "LaserJet Pro P2035N", "LaserJet Pro 400 M401DN", "LaserJet P2055DN", "P2015d", "LaserJet P1102w", "LaserJet P1505", "LaserJet P1606DN", "LaserJet 428fdw", "LaserJet Pro M102W", "LaserJet Pro MFP M130FW", "LaserJet P3005D", "LaserJet Pro M201DW", "LaserJet P3015"],
        "Epson": ["EcoTank L220", "EcoTank L8180", "EcoTank L3250", "EcoTank L380"],
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

var miVariableParaMTs;
var anteriorMT;
var tengoMt = false;
var cambieMt = false;
var equipoActual = null;
var envieForm = false;

console.log("tengo mt: ", tengoMt);


const errorMessage = document.getElementById('errorMessage');

// Verificar si se accede desde un dispositivo móvil
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Mostrar un mensaje de error si se accede desde un dispositivo móvil
if (isMobileDevice()) {
    let form = document.getElementById('pedido');
    alert("Acceso desde un dispositivo móvil no permitido por el momento debido a problemas de comunicacion con el servidor desde equipos móviles!");
    form.style.display = 'none';
    errorMessage.style.display = 'block';
}


//escucho cuando se refresca la página
window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
    //here do something
    if (tengoMt && !envieForm) {
        // this.alert("tenes mt!");
        resetPage();
    }
    event.returnValue = "";

});

var isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);

// if (isMobile) {
//   // El usuario está accediendo desde un dispositivo móvil
//   console.log("Acceso desde un dispositivo móvil");
// } else {
//   // El usuario está accediendo desde una PC
//   console.log("Acceso desde una PC");
// }

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden" && isMobile) {
        // Aquí puedes ejecutar el código que deseas cuando la ventana se minimiza o se cierra
        console.log("La ventana se minimizó o se cerró");
        if (tengoMt && !envieForm) {
            // this.alert("tenes mt!");
            resetPage();
            document.getElementById("pedido").reset();
        }
    }
});

function resetPage() {
    // console.log("do something when reset occurs");
    if (cambieMt || tengoMt) {
        var dataToSent = {
            equipoAnterior: equipoActual.toLowerCase(),
            numAnterior: anteriorMT
        };
        console.log("cambie!");
        sendDataToWebApp(dataToSent);
    }
}


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
selectElement.name = "direccionII";

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

//MODAL BUTTON
const modalButton = document.getElementById("modalCloseButton");
const printButton = document.getElementById("printButton");

modalButton.addEventListener("click", function () {
    location.reload();
});

//MODAL DATOS  
function mostrarDatosEnModal(data) {
    const contenidoModal = document.querySelector('.contenidoModal');
    contenidoModal.innerHTML = '';

    let texto = '';
    let textoImprimir = '';

    const descripciones = {
        tipoEquipo: 'El equipo es tipo:',
        mtEquipo: 'Número de MT:',
        usuarioResponsable: 'El usuario responsable es:',
        usuarioAsignado: 'El usuario asignado es:',
        equipoMarca: 'La marca del equipo es:',
        equipoModelo: 'El modelo del equipo es:',
        equipoNroSerie: 'El número de serie del equipo es:',
        monitorModelo: 'El modelo del monitor es:',
        monitorNroSerie: 'El número de serie del monitor es:',
        nroInventarioPatrimonio: 'El número de patrimonio es:',
        subsecretaría: 'La subsecretaría es:',
        direccion: 'La dirección es:',
        direccionII: 'La dirección II es:',
        observaciones: 'Observaciones:',
        fechaEntregado: 'Fecha de entrega:',
    };

    for (const [name, value] of data.entries()) {
        console.log("nom: ", name, " val: ", value);
        texto += `${name}: ${value}\n`;
        textoImprimir += `${descripciones[name]} ${value}<br><br>`;
    }

    const textoElement = document.createElement('textarea');
    textoElement.value = texto;
    textoElement.setAttribute('readonly', true);
    contenidoModal.appendChild(textoElement);

    printButton.addEventListener("click", function () {
        imprimirEtiqueta(textoImprimir);
    });
}

function imprimirEtiqueta(unTexto) {
    // hay q hacer la pagina afuera y llamarla con esto
    var ventanaImpresion = window.open('', '_blank');
    ventanaImpresion.document.write(`
    <html>
        <head>
            <title>Remito</title>
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                }
                h1 {
                    color: #333;
                    font-size: 24px;
                    margin-bottom: 20px;
                    text-align: center;
                }
                h2 {
                    color: #555;
                    font-size: 18px;
                    margin-bottom: 10px;
                    text-align: center;
                }
                p {
                    color: #777;
                    font-size: 14px;
                    margin-bottom: 10px;
                }
                .campo-firma {
                    margin-top: 60px;
                }
                .campo-firma label {
                    display: block;
                    font-size: 14px;
                    margin-bottom: 50px;
                }
                .campo-firma input {
                    width: 100%;
                    padding: 5px;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <h1>MINISTERIO DE TRANSPORTE</h1>
            <h2>Gobierno de la Provincia de Buenos Aires</h2>
            <p>En el día de la fecha, he recibido del MINISTERIO DE TRANSPORTE de la Provincia de Buenos Aires el/los siguiente/s material/es para su uso exclusivo y excluyente en mis actividades laborales, comprometiéndome a utilizarlo/s estrictamente de acuerdo con el propósito indicado, y no para comunicaciones personales, ya que no es para beneficio personal. Asimismo, me comprometo a devolverlo/s a la primera solicitud o al término de mi relación jurídica con la misma.</p>
            <br>
            ${unTexto}
            <div class="campo-firma">
                <label>Firma:</label>
            </div>
            <div class="campo-firma">
                <label>Aclaración:</label>
            </div>
            <div class="campo-firma">
                <label>DNI:</label>
            </div>
        </body>
    </html>
`);
    ventanaImpresion.document.close();
    ventanaImpresion.print();
    ventanaImpresion.close();
}




