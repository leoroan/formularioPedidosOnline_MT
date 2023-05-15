console.log("js working!");
let marcasPC = ["Desconocido", "EXO", "HP", "LETOS", "LENOVO", "DELL", "CX", "CORADIR", "RICOH", "BANGHO", "DELL", "SAMSUNG", "LEXMARK", "EPSON", "TOSHIBA", "BROTHER"];
// let marcasIMP
// let marcasSCN
// let marcasNTB

let modelosPC = ["mod1", "mod2", "mod3"];
// let modelosIMP
// let modelosSCN
// let modelosNTB


// SELECCIONAR MARCA / MODELO X TIPO
const tipoEquipo = document.getElementById("tipoEquipo");
const equipoMarca = document.getElementById("equipoMarca");
const modeloEquipo = document.getElementById("equipoModelo");

tipoEquipo.addEventListener("change", actualizarListaMarcas);
equipoMarca.addEventListener("change", actualizarListaModelos);

function actualizarListaMarcas() {
    const tipoSeleccionado = tipoEquipo.value;
    let opcionesMarcas = "";

    switch (tipoSeleccionado) {
        case "PcCompleta":
            for (let i = 0; i < marcasPC.length; i++) {
                opcionesMarcas += `<option value='${marcasPC[i]}'>${marcasPC[i]}</option>`;
            }
            break;
        case "Impresora":
            opcionesMarcas += "<option value='Marca4'>Marca4</option>";
            opcionesMarcas += "<option value='Marca5'>Marca5</option>";
            opcionesMarcas += "<option value='Marca6'>Marca6</option>";
            break;
        case "Notebook":
            opcionesMarcas += "<option value='Marca7'>Marca7</option>";
            opcionesMarcas += "<option value='Marca8'>Marca8</option>";
            opcionesMarcas += "<option value='Marca9'>Marca9</option>";
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
    let opcionesModelos = "";

    switch (marcaSeleccionada) {
        case "EXO":
            for (let i = 0; i < modelosPC.length; i++) {
                opcionesModelos += `<option value='${modelosPC[i]}'>${modelosPC[i]}</option>`;
            }
            break;
        case "Impresora":
            opcionesModelos += "<option value='Marca4'>Marca4</option>";
            opcionesModelos += "<option value='Marca5'>Marca5</option>";
            opcionesModelos += "<option value='Marca6'>Marca6</option>";
            break;
        case "Notebook":
            opcionesModelos += "<option value='Marca7'>Marca7</option>";
            opcionesModelos += "<option value='Marca8'>Marca8</option>";
            opcionesModelos += "<option value='Marca9'>Marca9</option>";
            break;
        case "Escaner":
            opcionesModelos += "<option value='Marca10'>Marca10</option>";
            opcionesModelos += "<option value='Marca11'>Marca11</option>";
            opcionesModelos += "<option value='Marca12'>Marca12</option>";
            break;
        default:
            opcionesModelos = "<option value=''>Seleccione...</option>";
    }

    modeloEquipo.innerHTML = opcionesModelos;
}



// MOSTRAR MONITOR
/* aca muestra el campo si es tipoEquipo = PCcompleta*/

function mostrarCampoMonitor() {
    var tipoEquipo = document.getElementById("tipoEquipo").value;
    if (tipoEquipo == "PcCompleta") {
        document.getElementById("campoMonitor").style.display = "block";
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
                alert("Grabado correctamente");
            })
    });
});