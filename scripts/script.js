console.log("js working!");

//APIS THING (DATA)

let PCs = {
    "Desconocido": ["Modelo 1", "Modelo 2", "Modelo 3"],
    "EXO": ["Modelo A", "Modelo B", "Modelo C"],
    "HP": ["Modelo X", "Modelo Y", "Modelo Z"],
    "LETOS": ["Modelo P", "Modelo Q", "Modelo R"],
    "LENOVO": ["Modelo M", "Modelo N", "Modelo O"],
    "DELL": ["Modelo D", "Modelo E", "Modelo F"],
    "CX": ["Modelo G", "Modelo H", "Modelo I"],
    "CORADIR": ["Modelo J", "Modelo K", "Modelo L"],
    "RICOH": ["Modelo S", "Modelo T", "Modelo U"],
    "BANGHO": ["Modelo V", "Modelo W"],
    "SAMSUNG": ["Modelo AA", "Modelo BB"],
    "LEXMARK": ["Modelo CC", "Modelo DD"],
    "EPSON": ["Modelo EE", "Modelo FF"],
    "TOSHIBA": ["Modelo GG", "Modelo HH"],
    "BROTHER": ["Modelo II", "Modelo JJ"]
};

// let marcasPC = ["Desconocido", "EXO", "HP", "LETOS", "LENOVO", "DELL", "CX", "CORADIR", "RICOH", "BANGHO", "DELL", "SAMSUNG", "LEXMARK", "EPSON", "TOSHIBA", "BROTHER"];
// let marcasIMP
// let marcasSCN
let marcasNTB = ["Lenovo", "EXO", "HP"];

// let modelosPC = ["mod1", "mod2", "mod3"];
// let modelosIMP
// let modelosSCN
let modelosNTB = ["mod1", "mod2", "mod3"];


// SELECCIONAR MARCA / MODELO X TIPO
const tipoEquipo = document.getElementById("tipoEquipo");
const equipoMarca = document.getElementById("equipoMarca");
const modeloEquipo = document.getElementById("equipoModelo");

tipoEquipo.addEventListener("change", actualizarListaMarcas);
equipoMarca.addEventListener("change", actualizarListaModelos);

function actualizarListaMarcas() {
    const tipoSeleccionado = tipoEquipo.value;
    let marcas = Object.keys(PCs);
    let opcionesMarcas = "";

    switch (tipoSeleccionado) {
        case "PcCompleta":
            for (let i = 0; i < marcas.length; i++) {
                opcionesMarcas += `<option value='${marcas[i]}'>${marcas[i]}</option>`;
            }
            break;
        case "Impresora":
            opcionesMarcas += "<option value='Marca4'>Marca4</option>";
            opcionesMarcas += "<option value='Marca5'>Marca5</option>";
            opcionesMarcas += "<option value='Marca6'>Marca6</option>";
            break;
        case "Notebook":
            for (let i = 0; i < marcasNTB.length; i++) {
                opcionesMarcas += `<option value='${marcasNTB[i]}'>${marcasNTB[i]}</option>`;
            }
            break;
        case "Escaner":
            opcionesMarcas += "<option value='Marca10'>Marca10</option>";
            opcionesMarcas += "<option value='Marca11'>Marca11</option>";
            opcionesMarcas += "<option value='Marca12'>Marca12</option>";
            break;
        default:
            opcionesMarcas = "<option value=''>Seleccione...</option>";
    }

    equipoMarca.innerHTML = opcionesMarcas;

}


function actualizarListaModelos() {

    const marcaSeleccionada = equipoMarca.value;
    let modelos = PCs[marcaSeleccionada];
    let opcionesModelos = "";

    for (let i = 0; i < modelos.length; i++) {
        opcionesModelos += `<option value='${modelos[i]}'>${modelos[i]}</option>`;
    }
    modeloEquipo.innerHTML = opcionesModelos;
}



// MOSTRAR MONITOR
/* aca muestra el campo si es tipoEquipo = PCcompleta*/

function mostrarCampoMonitor() {
    var tipoEquipo = document.getElementById("tipoEquipo").value;
    if (tipoEquipo == "PcCompleta") {
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


// CONNECTION THING
window.addEventListener("load", function () {
    const form = document.getElementById('pedido');
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
            method: 'POST',
            body: data,
        })
            .then(() => {
                form.reset();
                alert("Grabado correctamente");
            })
    });
});