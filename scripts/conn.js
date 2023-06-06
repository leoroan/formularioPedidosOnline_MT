// CONNECTION THING
const url = "https://script.google.com/macros/s/AKfycbz3c-AZs_bigEeFYJmNpZh4HwthscBARBFrls-3yYHLcjW7REL-TJPFDrOiC2r7Ct_0/exec";

const form = document.getElementById('pedido');
const spinner = document.getElementById('spinner');
const equiSelect = document.getElementById("tipoEquipo");
form.action = url;

window.addEventListener("load", function () {

    setTimeout(function () {
        // Your code here
        resetPage();
        document.getElementById("pedido").reset();
        console.log("Timer finished! - page RESETED");
    }, 120000);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        form.style.display = 'none';
        const data = new FormData(form);
        const action = e.target.action;
        spinner.style.display = 'block';

        fetch(action, {
            method: 'POST',
            body: data,
        })
            .then(() => {
                const button = document.getElementById("successModalButton");
                button.click();
                envieForm = true;
            })
            .finally(() => {
                spinner.style.display = 'none';
                form.style.display = 'block';
                mostrarDatosEnModal(data);
            });
    });
});

// lo uso para devolverle el numero NO usado de MT
function sendDataToWebApp(data) {
    console.log("a mandar ", data);

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(function (response) {
            console.log("Data sent successfully!", response);
        })
        .catch(function (error) {
            console.error("Error sending data:", error);
        });
}


equiSelect.addEventListener("change", () => {
    // comprobar si se seleccionó otro tipo de equipo
    if (equipoActual != null) {
        console.log("son distintos los tipos");
        cambieMt = true;
        resetPage();
    }
    equipoActual = equiSelect.value;
    console.log("equipo actual ", equipoActual);

    obtenerDatos();
});



async function getMT() {
    try {
        const params = {
            requestType: 'getMtEquipo', 
            tipo: equiSelect.value
        };
        const queryParams = new URLSearchParams(params);
        const urlWithParams = `${url}?${queryParams}`;
        const response = await fetch(urlWithParams);

        const data = await response.json();
        console.log(data);
        miVariableParaMTs = data;
        tengoMt = true;
        // console.log("tengo mt: ", tengoMt);
        // console.log(miVariableParaMTs.value);

        if (!response.ok || miVariableParaMTs.value == "") {
            alert('Error en la solicitud, posiblemente otro usuario esta pidiendo un MT para el mismo equipo. Aguardá un instante y volve a intentarlo...');
            document.getElementById("pedido").reset();
            throw new Error('Error en la solicitud');
        }

    } catch (error) {
        console.error(error);
        // Resto del código para manejar el error
    }
}

// Utilizar async/await para esperar a que la función get se complete
async function obtenerDatos() {
    form.style.display = 'none';
    spinner.style.display = 'block';
    await getMT();
    form.style.display = 'flex';
    spinner.style.display = 'none';

    document.getElementById('mtEquipo').value = miVariableParaMTs.value;
    anteriorMT = miVariableParaMTs.value;

}
