const url = "https://script.google.com/macros/s/AKfycbx18-WjBM8jl2qJGa34XygQG-9z2AjWqLpzQjhB00MS-cBGNXfQ0XrN3I--90z0y2T9/exec";

let inventarioData = [];
const table = document.getElementById('itemsTable');
const tableBody = document.getElementById('tableBody');

window.addEventListener("load", function () {

  async function getInventario() {
    try {
      const params = {
        requestType: 'getItemsTable',
        pagina: '2',
        tamanioPagina: '25',
      };
      const queryParams = new URLSearchParams(params);
      const urlWithParams = `${url}?${queryParams}`;
      const response = await fetch(urlWithParams);

      const data = await response.json();
      console.log(data);
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
    // Iterate over the response array
    for (let i = 0; i < datos.length; i++) {
      const row = datos[i];
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      th.setAttribute('scope', 'row');
      th.textContent = `${i+1}`;
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

});
