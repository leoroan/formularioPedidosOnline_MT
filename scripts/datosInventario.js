const url = "https://script.google.com/macros/s/AKfycbxf3yr348qyVn6Sx4d92LyH9JXeiuduJYNJJ4BWREeQQ33XDhg87PK1EeiSsKBbG8IE/exec";

let inventarioData = [];
let tamanioPagina = '10';

//encabezados a mostrar en la tabla
var listaEncabezados = [
  "mtEquipo",
  "tipoEquipo",
  "Date",
  "equipoModelo",
  "usuarioAsignado",
  "subsecretaría",
];

const descripcionEncabezados = {
  Date: 'FECHA',
  tipoEquipo: 'TIPO DE EQUIPO',
  mtEquipo: 'NUMERO DE MT:',
  usuarioResponsable: 'RESPONSABLE',
  usuarioAsignado: 'USUARIO',
  equipoMarca: 'MARCA DEL EQUIPO',
  equipoModelo: 'MODELO DEL EQUIPO',
  equipoNroSerie: 'NRO. DE SERIE DEL EQUIPO',
  monitorModelo: 'MODELO DEL MONITOR',
  monitorNroSerie: 'NRO. SERIE DEL MONITOR',
  nroInventarioPatrimonio: 'NRO. PATRIMONIO',
  subsecretaría: 'SUBSECRETARÍA',
  direccion: 'DIRECCIÓN',
  direccionII: 'SUB DIRECCIÓN ',
  observaciones: 'ORBSERVACIONES',
  fechaEntregado: 'FECHA ENTREGADO',
};

const table = document.getElementById('itemsTable');
const tableBody = document.getElementById('tableBody');

window.addEventListener("load", function () {

  async function getInventario() {
    try {
      const params = {
        requestType: 'getItemsTable',
        pagina: '1',
        tamanioPagina: tamanioPagina,
        encabezados: listaEncabezados,
      };
      const queryParams = new URLSearchParams(params);
      const urlWithParams = `${url}?${queryParams}`;
      const response = await fetch(urlWithParams);

      const data = await response.json();
      // console.log(data);
      inventarioData = data;
      // console.log(data.body);
      if (!response.ok) {
        alert('Error en la solicitud');
        throw new Error('Error en la solicitud');
      }

    } catch (error) {
      console.error(error);
    }
  }

  async function obtenerItems() {
    table.style.display = 'none';
    spinner.style.display = 'block';
    await getInventario();
    const responseArray = JSON.parse(inventarioData.body);
    generarTabla(responseArray);
    table.style.display = 'block';
    spinner.style.display = 'none';
  }

   obtenerItems();

  function generarTabla(datos) {
    tableBody.innerHTML = "";
    // Iterate over the data array
    for (let i = 0; i < datos.length; i++) {
      const record = datos[i];
      const row = document.createElement('tr'); // Create a table row element
      const th = document.createElement('th'); // Create a table header cell element
      th.setAttribute('scope', 'row');
      th.textContent = `${i + 1}`; // Set the header cell content to the row number
      row.appendChild(th); // Append the header cell to the row

      // Iterate over each property in the record
      for (const prop in record) {
        if (record.hasOwnProperty(prop)) {
          const td = document.createElement('td'); // Create a table data cell element
          td.textContent = record[prop]; // Set the cell content to the value of the property
          row.appendChild(td); // Append the cell to the row
        }
      }
      tableBody.appendChild(row);
    }
  }



  var cant25 = document.getElementById("cant25");
  var cant50 = document.getElementById("cant50");
  var cant100 = document.getElementById("cant100");

  // Eventos de escucha al seleccionarlos
  cant25.addEventListener("click", function () {
    obtenerValorSeleccionado("25");
  });

  cant50.addEventListener("click", function () {
    obtenerValorSeleccionado("50");
  });

  cant100.addEventListener("click", function () {
    obtenerValorSeleccionado("100");
  });

  // Función para obtener el valor seleccionado
  function obtenerValorSeleccionado(valor) {
    tamanioPagina = valor;
    // console.log(tamanioPagina);
    obtenerItems();
  }

  // completar los headers de la tabla, dinamicamente

  function ponerHeaders() {
    // Get the 'tr' element
    var trElement = document.getElementById('headersPlace');
    //inicio el elemento vacio
    trElement.innerHTML = "";
    
    // creo el indice del header con "bootstrap incluido"
    trElement.innerHTML += `<th scope="col">#</th>`;

    // Crear un elemento 'th' para cada elemento en la lista
    for (var i = 0; i < listaEncabezados.length; i++) {
      var thElement = document.createElement('th');
      thElement.textContent = descripcionEncabezados[listaEncabezados[i]];
      // Agregar el 'th' al elemento 'tr'
      trElement.appendChild(thElement);
    }

    // Append the 'th' element to the 'tr' element
    trElement.appendChild(thElement);
  }

  ponerHeaders();

  // CHECKBOXES - GENERARLOS!

  // Obtener la referencia al contenedor
  var checkboxesContainer = document.getElementById('checkboxesContainer');

  // Recorrer los elementos (keys) de descripcionEncabezados
  for (var key in descripcionEncabezados) {
    // Verificar si el encabezado no está en listaEncabezados
    if (!listaEncabezados.includes(key)) {
      // Crear el checkbox para el encabezado
      var checkboxElement = document.createElement('input');
      checkboxElement.type = 'checkbox';

      // Crear un elemento <label> para el texto del checkbox
      var labelElement = document.createElement('label');
      labelElement.textContent = descripcionEncabezados[key];
      checkboxElement.value = key;

      // Agregar el evento de cambio al checkbox
      checkboxElement.addEventListener('change', handleChange);

      // Agregar el checkbox y el texto al contenedor
      checkboxesContainer.appendChild(checkboxElement);
      checkboxesContainer.appendChild(labelElement);
     
      // Agregar un salto de línea
    checkboxesContainer.appendChild(document.createElement('br'));
    }
  }


  // Función para manejar el evento de cambio en los checkboxes
  function handleChange(event) {
    var checkbox = event.target;
    var encabezado = checkbox.value;

    // Verificar si el checkbox está seleccionado
    if (checkbox.checked) {
      // Agregar el encabezado a listaEncabezados si no está presente
      if (!listaEncabezados.includes(encabezado)) {
        listaEncabezados.push(encabezado);
        ponerHeaders();
        obtenerItems();
      }
    } else {
      // Eliminar el encabezado de listaEncabezados si está presente
      var index = listaEncabezados.indexOf(encabezado);
      if (index > -1) {
        listaEncabezados.splice(index, 1);
        obtenerItems();
        ponerHeaders();
      }
    }
  }

});