// CONNECTION THING
const url = "https://script.google.com/macros/s/AKfycbwm1JCPu26esyOIfTZ98IgIAtWRLeYkQFtCRmiP_WrBSnVuzT7fVvl-GwdlblqRdnRY/exec";

const form = document.getElementById('pedido');
const spinner = document.getElementById('spinner');
const equiSelect = document.getElementById("tipoEquipo");
form.action = url;

window.addEventListener("load", function () {

    setTimeout(function () {
        // Your code here
        resetPage();
        console.log("Timer finished! - page RESETED");
    }, 60000);

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
    fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            console.log("Data sent successfully!");
        })
        .catch(function (error) {
            console.error("Error sending data:", error);
        });
}


equiSelect.addEventListener("change", () => {
    // comprobar si se seleccionó otro tipo de equipo
    if (equipoActual != null) {
        resetPage();
        console.log("son distintos los tipos");
        cambieMt = true;
    }
    equipoActual = equiSelect.value;
    console.log("equipo actual ", equipoActual);

    obtenerDatos();
});



async function get() {
    try {
        const params = {
            tipo: equiSelect.value
        };
        const queryParams = new URLSearchParams(params);
        const urlWithParams = `${url}?${queryParams}`;
        const response = await fetch(urlWithParams);

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        console.log(data);
        miVariableParaMTs = data;
        tengoMt = true;
        console.log("tengo mt: ", tengoMt);

    } catch (error) {
        console.error(error);
        // Resto del código para manejar el error
    }
}

// Utilizar async/await para esperar a que la función get se complete
async function obtenerDatos() {
    form.style.display = 'none';
    spinner.style.display = 'block';
    await get();
    form.style.display = 'flex';
    spinner.style.display = 'none';

    document.getElementById('mtEquipo').value = miVariableParaMTs.value;
    anteriorMT = miVariableParaMTs.value;

}
