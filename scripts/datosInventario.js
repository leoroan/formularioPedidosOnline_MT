const url = "https://script.google.com/macros/s/AKfycbzOjvyIQThMIIUV0lkYvWh2HlqU7ltlmlgqtR01luBSCxqju2J07tKPARIhaZoF-Q6u/exec";

let inventarioData = [];
let tamanioPagina = '10';

const table = document.getElementById('itemsTable');
const tableBody = document.getElementById('tableBody');

window.addEventListener("load", function () {

  async function getInventario() {
    try {
      const params = {
        requestType: 'getItemsTable',
        pagina: '1',
        tamanioPagina: tamanioPagina,
      };
      const queryParams = new URLSearchParams(params);
      const urlWithParams = `${url}?${queryParams}`;
      const response = await fetch(urlWithParams);

      const data = await response.json();
      // console.log(data);
      inventarioData = data;

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
    completarTabla(responseArray);
    table.style.display = 'block';
    spinner.style.display = 'none';
  }

  obtenerItems();

  function completarTabla(datos) {
    tableBody.innerHTML = "";
    // Iterate over the response array
    for (let i = 0; i < datos.length; i++) {
      const row = datos[i];
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      th.setAttribute('scope', 'row');
      th.textContent = `${i + 1}`;
      tr.appendChild(th);

      // Iterate over each column in the row
      for (let j = 0; j < row.length; j++) {
        const value = row[j];
        const td = document.createElement('td'); // Create a new table data (cell) element
        td.textContent = value; // Set the text content of the cell to the value
        tr.appendChild(td);
      }

      tableBody.appendChild(tr);
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
    console.log(tamanioPagina);
    obtenerItems();
  }

});