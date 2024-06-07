let ltCategorias = new Object();
ltCategorias = getCategorias();
getEstados();
getCodigoPostal("66490");

const btnEnviar = document.getElementById("btn-enviar");
btnEnviar.addEventListener('click', function () {
    /* Validar todos los campos */
    /*let tEmail = document.getElementById("email");
    let tTelefono = document.getElementById("telefono");
    let tNombre = document.getElementById("nombre");
    let tApellidoPaterno = document.getElementById("paterno");
    let tApellidoMaterno = document.getElementById("materno");
    let tCalle = document.getElementById("calle");
    let tNumeroExt = document.getElementById("numeroExt");
    let tColonia = document.getElementById("colonia");
    let tCodigoPostal = document.getElementById("codigoPostal");
    let sEstado = document.getElementById("selectEstado");
    let sMunicipio = document.getElementById("selectMunicipio");
    let tPais = document.getElementById("pais");

    if(!validateEmail) alert("Escriba un correo válido.");
    if(tTelefono.length == 0) alert("Escriba un número de teléfono.");
    if(tNombre.length == 0) alert("Escriba su nomnbre.");
    if(tApellidoPaterno.length == 0) alert("Escriba su apellido paterno.");
    if(tApellidoMaterno.length == 0) alert("Escriba su apellido materno.");
    if(tCalle.length == 0) alert("Escriba la calle donde vive.");
    if(tNumeroExt.length == 0) alert("Escriba el numero exterior de su casa.");
    if(tColonia.length == 0) alert("Escriba el nombre de su coloina.");
    if(tCodigoPostal.length == 0) alert("Escriba su código postal.");
    if(sEstado.value == null || sEstado.value < 1) alert("Elija el estado donde vive.");
    if(sMunicipio.value == null || sMunicipio.value < 1) alert("Elija el municipio donde vive.");*/

    let checks = document.querySelectorAll(".checks-categorias:checked");
    let arrayChecks = new Array();
    for(let i = 0; i < checks.length; i++) {
        arrayChecks.push(checks[i].value);
    }

    console.log(arrayChecks);
});

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};



function getEstados() {
    fetch('https://micasaapptestapi.azurewebsites.net/api/estados')
        .then(response => response.json())
        .then(ltEstados => {
            const selectEstado = document.getElementById('selectEstado');

            let optionDefault = document.createElement('option');
            optionDefault.value = 0;
            optionDefault.innerHTML = "Seleccione un Estado";
            selectEstado.appendChild(optionDefault);

            ltEstados.forEach(estado => {
                let option = document.createElement('option');
                option.value = estado.idEstado;
                option.innerHTML = estado.nombreEstado;
                selectEstado.appendChild(option);
            });

            selectEstado.addEventListener('click', function () {
                console.log(this.value);
                getMunicipios(this.value);
            });
        })
        .catch(console.log("Error Estados"))
}

function getMunicipios(idEstado) {
    fetch('https://micasaapptestapi.azurewebsites.net/api/municipios?idEstado=' + idEstado)
        .then(response => response.json())
        .then(ltMunicipios => {
            document.querySelectorAll('#selectMunicipio option').forEach(option => option.remove())

            ltMunicipios.forEach(municipio => {
                console.log("Municipio: " + municipio.NombreMunicipio);
                let option = document.createElement('option');
                option.value = municipio.idMunicipio;
                option.innerHTML = municipio.nombreMunicipio;
                selectMunicipio.appendChild(option);
            });
        })
        .catch(console.log("Error Municipios"))
}

async function getCategorias(url = 'https://micasaapptestapi.azurewebsites.net/api/categorias', data = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'http://localhost:8080'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }).then((response) => {
        return response.json();
    }).then((data) => {
        let ltCategorias = data;
        console.log(ltCategorias.length);

        let strHtml = "";
        ltCategorias.forEach(categoria => {
            strHtml += `<div class="item-checkbox">
                                    <input type="checkbox" name="checks-categorias" id="ch${categoria.idCategoria}" class="checks-categorias" value="${categoria.idCategoria}"/>
                                    <label for="ch${categoria.idCategoria}" class="form-label">${categoria.nombreCategoria}</label>
                                </div>`;
        });
        const containerCheckbox = document.querySelector('.container-checkbox');
        containerCheckbox.innerHTML = strHtml;
    });
}

/*async function getCodigoPostal(cp) {
    fetch('https://micasaapptestapi.azurewebsites.net/api/CodigoPostal?cp=' + cp)
        .then(response => response.json())
        .then(codigoPostal => {
            console.log(codigoPostal);

            const selectEstado = document.getElementById('selectEstado');
            selectEstado.
                codigoPostal.estado
        })
        .catch(console.log("Error codigoPostal"))
}*/