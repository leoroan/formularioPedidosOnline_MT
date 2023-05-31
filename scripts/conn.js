// CONNECTION THING
const url = "https://script.google.com/macros/s/AKfycbyfxMKXEXyhcFfm9Yaj5WtdtYwwX1XnyqzTnuXolwOgCnkQt2lC-r7kPUlEU5t5cwfm/exec";

const form = document.getElementById('pedido');
const spinner = document.getElementById('spinner');
const equiSelect = document.getElementById("tipoEquipo");
form.action = url;

window.addEventListener("load", function () {
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
            })
            .finally(() => {
                spinner.style.display = 'none';
                form.style.display = 'block';
                mostrarDatosEnModal(data);
            });
    });
});

equiSelect.addEventListener("change", () => {
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
}
