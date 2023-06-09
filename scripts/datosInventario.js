const url = "https://script.google.com/macros/s/AKfycbxKe7kCT_1aqHWEJ5ZvM3gxrn9-zAcpFgyBraJ0SqIW-MZw0SYpJxadTyD-olXrx07a/exec";

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

});

// completar los headers de la tabla, dinamicamente

// Get the 'tr' element
var trElement = document.getElementById('headersPlace');

// creo el indice del header
trElement.innerHTML += `<th scope="col">#</th>`;

// Crear un elemento 'th' para cada elemento en la lista
for (var i = 0; i < listaEncabezados.length; i++) {
  // Crear el elemento 'th'
  var thElement = document.createElement('th');

  // Establecer el contenido del 'th' como el valor actual de la lista
  // thElement.textContent = listaEncabezados[i];
  thElement.textContent = descripcionEncabezados[listaEncabezados[i]];

  // Agregar el 'th' al elemento 'tr'
  trElement.appendChild(thElement);
}

// Append the 'th' element to the 'tr' element
trElement.appendChild(thElement);
