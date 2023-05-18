// CONNECTION THING
const url = "https://script.google.com/macros/s/AKfycbzxM_ARCNu_TABMpwPZrzjfJQiNrziIFaUoQ42pEhyQjB-uT9CXGdoTWUfgI6v6LxUW/exec";

const form = document.getElementById('pedido');
const spinner = document.getElementById('spinner');
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
                form.reset();
                alert("Grabado correctamente");
            })
            .finally(() => {
                // Ocultar el spinner cuando la solicitud se complete (ya sea éxito o error)
                spinner.style.display = 'none';
                form.style.display = 'block';
            });
    });
});

// function get() {
// fetch(url)
//     .then((res) => {
//         // console.log(res.status);
//         return res.text();
//     })
//     .then((res) => console.log(JSON.parse(res)));
// }

async function get() {
    form.style.display = 'none';
    spinner.style.display = 'block';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        // console.log(data);
        // Resto del código para trabajar con la respuesta
        miVariableParaMTs = data;
    } catch (error) {
        console.error(error);
        // Resto del código para manejar el error
    }
}

// Utilizar async/await para esperar a que la función get se complete
async function obtenerDatos() {
    await get();
    console.log("miVar :", miVariableParaMTs.valorA);    
    form.style.display = 'block';
    spinner.style.display = 'none';
    document.getElementById('nombreEquipo').value = miVariableParaMTs.valorA;
}

// Llamar a la función obtenerDatos para obtener los datos
obtenerDatos();