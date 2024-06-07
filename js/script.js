let ltCategorias = new Object();
ltCategorias = getCategorias();
getEstados();
getCodigoPostal("66490");

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
                                    <input type="checkbox" name="ch${categoria.idCategoria}" id="ch${categoria.idCategoria}" />
                                    <label for="ch${categoria.idCategoria}" class="form-label">${categoria.nombreCategoria}</label>
                                </div>`;
        });
        const containerCheckbox = document.querySelector('.container-checkbox');
        containerCheckbox.innerHTML = strHtml;
    });
}

async function getCodigoPostal(cp) {
    fetch('https://micasaapptestapi.azurewebsites.net/api/CodigoPostal?cp=' + cp)
        .then(response => response.json())
        .then(codigoPostal => {
            console.log(codigoPostal);

            const selectEstado = document.getElementById('selectEstado');
            selectEstado.
                codigoPostal.estado
        })
        .catch(console.log("Error codigoPostal"))
}