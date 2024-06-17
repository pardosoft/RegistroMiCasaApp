//let ltCategorias = new Object();
//ltCategorias = getCategorias();
getEstados();
getSubcategorias();
//getCodigoPostal("66490");

const btnEnviar = document.getElementById("btn-enviar");
btnEnviar.addEventListener('click', function () {
    /* Validar todos los campos */
    let tEmail = document.getElementById("email").value;
    let tTelefono = document.getElementById("telefono").value;
    let tNombre = document.getElementById("nombre").value;
    let tApellidoPaterno = document.getElementById("paterno").value;
    let tApellidoMaterno = document.getElementById("materno").value;
    let tCalle = document.getElementById("calle").value;
    let tNumeroExt = document.getElementById("numeroExt").value;
    let tColonia = document.getElementById("colonia").value;
    let tCodigoPostal = document.getElementById("codigoPostal").value;
    let sEstado = document.getElementById("selectEstado").value;
    let sMunicipio = document.getElementById("selectMunicipio").value;
    let tPais = document.getElementById("pais").value;
    let tDescripcion = document.getElementById("descripcion").value;

    if(tEmail.length == 0) {
        alert("Escriba un correo electrónico válido.");
        return;
    }
    if(!validateEmail(tEmail)) {
        alert("Escriba un correo electrónico válido.");
        return;
    }
    if(tTelefono.length == 0) {
        alert("Escriba un número de teléfono.");
        return;
    }
    if(tNombre.length == 0) {
        alert("Escriba su nombre.");
        return;
    }
    if(tApellidoPaterno.length == 0) {
        alert("Escriba su apellido paterno.");
        return;
    }
    if(tApellidoMaterno.length == 0) {
        alert("Escriba su apellido materno.");
        return;
    }
    if(tCalle.length == 0) {
        alert("Escriba la calle donde vive.");
        return;
    }
    if(tNumeroExt.length == 0) {
        alert("Escriba el número exterior de su casa.");
        return;
    }
    if(tColonia.length == 0) {
        alert("Escriba el nombre de su colonia.");
        return;
    }
    if(tCodigoPostal.length == 0) {
        alert("Escriba su código postal.");
        return;
    }
    /*if(sEstado.value == null || sEstado.value < 1) {
        alert("Elija el estado donde vive.");
        return;
    }
    if(sMunicipio.value == null || sMunicipio.value < 1) {
        alert("Elija el municipio donde vive.");
        return;
    }*/
    if(tDescripcion.length == 0) {
        alert("Escriba una descripción de su trabajo.");
        return;
    }

    let checks = document.querySelectorAll(".checks-categorias:checked");
    let arrayChecks = new Array();
    for(let i = 0; i < checks.length; i++) {
        //arrayChecks.push({"IdCategoria": checks[i].value, "NombreCategoria": "X"});
        arrayChecks.push(checks[i].value);
    }

    console.log(arrayChecks);

    if(arrayChecks.length == 0) {
        alert("Debe seleccionar al menos una categoría.");
        return;
    }

    if(document.getElementById("fotos").files.length == 0 ){
        alert("Debe seleccionar un archivo o fotografía de su trabajo.");
        return;
    }
    if(document.getElementById("selfie").files.length == 0 ){
        alert("Debe seleccionar un archivo o fotografía de su rostro.");
        return;
    }
    if(document.getElementById("idOficial").files.length == 0 ){
        alert("Debe seleccionar un archivo o fotografía de su identificación oficial.");
        return;
    }
    if(document.getElementById("comprobanteDomicilio").files.length == 0 ){
        alert("Debe seleccionar un archivo o fotografía de su comprobante de domicilio.");
        return;
    }

    let registro = {
        "email": tEmail,
        "telefono": tTelefono,
        "nombre": tNombre,
        "apellidoPaterno": tApellidoPaterno,
        "apellidoMaterno": tApellidoMaterno,
        "calle": tCalle,
        "numeroExt": tNumeroExt,
        "colonia": tColonia,
        "codigoPostal": tCodigoPostal,
        "idEstado": 1,
        "idMunicipio": 1,
        "idPais": "1",
        "descripcionTrabajo": tDescripcion,
        "listCategorias": arrayChecks
    }

    postRegistro(registro);
});

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};



async function getEstados() {
    const response = await fetch('https://micasaapptestapi.azurewebsites.net/api/estados')
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

            selectEstado.addEventListener('change', function () {
                console.log(this.value);
                getMunicipios(this.value);
            });
        })
        .catch(console.log("Error Estados"))
}

async function getMunicipios(idEstado) {
    const response = await fetch('https://micasaapptestapi.azurewebsites.net/api/municipios?idEstado=' + idEstado)
        .then(response => response.json())
        .then(ltMunicipios => {
            document.querySelectorAll('#selectMunicipio option').forEach(option => option.remove());
            const selectMunicipio = document.getElementById('selectMunicipio');

            let optionDefault = document.createElement('option');
            optionDefault.value = 0;
            optionDefault.innerHTML = "Seleccione un Municipio";
            selectEstado.appendChild(optionDefault);

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

async function postRegistro(pRegistro) {
    const response = await fetch("https://micasaapptestapi.azurewebsites.net/api/registro", {
        method: "POST",
        body: JSON.stringify(pRegistro),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

async function getSubcategorias() {
    const response = await fetch('https://micasaapptestapi.azurewebsites.net/api/subcategorias')
    .then(response => response.json())
    .then(ltSubcategorias => {
        if(ltSubcategorias.length == 0) return;
        let categoriaActual = ltSubcategorias[0].idCategoria;
        let categoriaAnterior = ltSubcategorias[0].idCategoria;;
        let html = "";
        ltSubcategorias.forEach((subcategoria, index) => {
            if(index == 0) {
                html += `
                    <div class="item-checkbox">
                        <button type="button" class="list-categoria" id="sd">${subcategoria.nombreCategoria} ▼</button>
                        <div class="list-subcategorias">`;
            }
            categoriaActual = subcategoria.idCategoria;
            if(categoriaActual == categoriaAnterior) {
                // Misma Categoría, agregar checkbox al div de esta categoría
                html += `
                    <div>
                        <input type="checkbox" name="checks-categorias" id="ch${subcategoria.idSubcategoria}" class="checks-categorias" value="${subcategoria.idSubcategoria}">
                        <label for="ch${subcategoria.idSubcategoria}" class="form-label">${subcategoria.nombreSubcategoria}</label>
                    </div>`;
            }
            else {
                // Otra catergoría, cerrar el div de la categoría anterior 
                // y crear nuevo div con categoría actual
                categoriaAnterior = subcategoria.idCategoria;
                html += `
                        </div>
                    </div>
                    <div class="item-checkbox">
                        <button type="button" class="list-categoria" id="sd">${subcategoria.nombreCategoria} ▼</button>
                        <div class="list-subcategorias">
                            <div>
                                <input type="checkbox" name="checks-categorias" id="ch${subcategoria.idSubcategoria}" class="checks-categorias" value="${subcategoria.idSubcategoria}">
                                <label for="ch${subcategoria.idSubcategoria}" class="form-label">${subcategoria.nombreSubcategoria}</label>
                            </div>`;
            }
        });
        html += "</div>";

        const containerCheckbox = document.querySelector('.container-checkbox');
        containerCheckbox.innerHTML = html;

        const categoria = document.querySelectorAll(".list-categoria");
        for(let i = 0; i < categoria.length; i++) {
            categoria[i].addEventListener('click', function() {
                const sub = this.nextElementSibling;
                sub.toggle(this);
            });
        }
    })
}

/*async function getCategorias(url = 'https://micasaapptestapi.azurewebsites.net/api/categorias', data = {}) {
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
}*/

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

Element.prototype.toggle = function(sibling) { 
    if ( this.style.display == '') {
        this.style.display = 'block';
        let txtContent = sibling.textContent.substring(0, sibling.textContent.length - 1);
        sibling.textContent = txtContent + '▲';
    }
    else if( this.style.display == 'block' ) {
        this.style.display = 'none';
        let txtContent = sibling.textContent.substring(0, sibling.textContent.length - 1);
        sibling.textContent = txtContent + '▼';
    }
    else {
        this.style.display = 'block';
        let txtContent = sibling.textContent.substring(0, sibling.textContent.length - 1);
        sibling.textContent = txtContent + '▲';
    }
}

document.getElementById('fotos').onchange = function () {
    document.getElementById('p-fotos').innerHTML = document.getElementById('fotos').files[0].name;
}
document.getElementById('selfie').onchange = function () {
    document.getElementById('p-selfie').innerHTML = document.getElementById('selfie').files[0].name;
}
document.getElementById('idOficial').onchange = function () {
    document.getElementById('p-idOficial').innerHTML = document.getElementById('idOficial').files[0].name;
}
document.getElementById('comprobanteDomicilio').onchange = function () {
    document.getElementById('p-comprobanteDomicilio').innerHTML = document.getElementById('comprobanteDomicilio').files[0].name;
}