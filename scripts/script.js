console.log("js working!");



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
const equipoMarca = document.getElementById("equipoMarca");
const modeloEquipo = document.getElementById("equipoModelo");

tipoEquipo.addEventListener("change", actualizarListaMarcas);
equipoMarca.addEventListener("change", actualizarListaModelos);

function actualizarListaMarcas() {
    const tipoSeleccionado = tipoEquipo.value;
    let marcas = equipos[tipoSeleccionado];
    let opcionesMarcas = "";
    opcionesMarcas += `<option>seleccione</option>`;

    for (let marca in marcas) {
        opcionesMarcas += `<option value="${marca}">${marca}</option>`;
    }

    equipoMarca.innerHTML = opcionesMarcas;

}

function actualizarListaModelos() {
    const tipoSeleccionado = tipoEquipo.value;
    const marcaSeleccionada = equipoMarca.value;
    const modelos = equipos[tipoSeleccionado][marcaSeleccionada];
    let opcionesModelos = "";
    opcionesModelos += `<option>seleccione una marca</option>`;

    if (marcaSeleccionada != "seleccione") {
        for (let modelo of modelos) {
            opcionesModelos += `<option value="${modelo}">${modelo}</option>`;
        }
    }

    modeloEquipo.innerHTML = opcionesModelos;
}



// MOSTRAR MONITOR
/* aca muestra el campo si es tipoEquipo = PCcompleta*/

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

const url = "https://script.google.com/macros/s/AKfycbzxM_ARCNu_TABMpwPZrzjfJQiNrziIFaUoQ42pEhyQjB-uT9CXGdoTWUfgI6v6LxUW/exec";

function get() {
  
    fetch(url)
      .then((res) => {
        console.log(res.status);
        return res.text();
      })
      .then((res) => console.log(res));
  }

  get();