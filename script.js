window.onload = function() {
    showData();
};


function validateForm() {
    var nombre = document.getElementById("nombre").value;
    var edad = document.getElementById("edad").value;
    var direccion = document.getElementById("direccion").value;

    if (nombre == "") {
        alert("Tu nombre es obligatorio");
        return false;
    }

    if (edad == "") {
        alert("Tu edad es obligatoria")
        return false
    }

    else if (edad < 1) {
        alert("Tu edad no puede ser menor a uno");
        return false;
    }

    if (direccion == "") {
        alert("Tu dirección es obligatoria");
        return false;
    }

    return true;
}

function showData() {
    var listaPersonas;
    if (localStorage.getItem("listaPersonas") == null) {
        listaPersonas = [];
    }

    else {
        listaPersonas = JSON.parse(localStorage.getItem("listaPersonas"));

    }

    var html = "";

    listaPersonas.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.nombre + "</td>";
        html += "<td>" + element.edad + "</td>";
        html += "<td>" + element.direccion + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Eliminar</button><button onclick="updateData(' + index + ')" class="btn btn-warning">Editar</button></td>';


    });

    document.querySelector("#tablaCrud tbody").innerHTML =
        html;
}

window.onload = showData;

function AddData() {
    if (validateForm() == true) {
        var nombre = document.getElementById("nombre").value;
        var edad = document.getElementById("edad").value;
        var direccion = document.getElementById("direccion").value;

        var listaPersonas;
        if (localStorage.getItem("listaPersonas") == null) {
            listaPersonas = [];
        }

        else {
            listaPersonas = JSON.parse(localStorage.getItem("listaPersonas"));

        }

        listaPersonas.push({
            nombre: nombre,
            edad: edad,
            direccion: direccion,
        });

        localStorage.setItem("listaPersonas", JSON.stringify(listaPersonas));
        showData();
        document.getElementById("nombre").value = "";
        document.getElementById("edad").value = "";
        document.getElementById("direccion").value = "";

    }
}

function deleteData(index) {
    var listaPersonas = JSON.parse(localStorage.getItem("listaPersonas"));

    if (confirm("¿Estás seguro de que quieres eliminar este dato?")) {
        listaPersonas.splice(index, 1);
        localStorage.setItem("listaPersonas", JSON.stringify(listaPersonas));
        showData();
    }
}



function updateData(index) {
    var listaPersonas = JSON.parse(localStorage.getItem("listaPersonas"));
    var persona = listaPersonas[index];

    document.getElementById("nombre").value = persona.nombre;
    document.getElementById("edad").value = persona.edad;
    document.getElementById("direccion").value = persona.direccion;

    document.getElementById("Agregar").style.display = "none";
    document.getElementById("Actualizar").style.display = "block";

    document.getElementById("Actualizar").onclick = function () {
        if (validateForm()) {
            var nombre = document.getElementById("nombre").value;
            var edad = document.getElementById("edad").value;
            var direccion = document.getElementById("direccion").value;

            listaPersonas[index] = {
                nombre: nombre,
                edad: edad,
                direccion: direccion,
            };

            localStorage.setItem("listaPersonas", JSON.stringify(listaPersonas));
            showData();
            document.getElementById("nombre").value = "";
            document.getElementById("edad").value = "";
            document.getElementById("direccion").value = "";

            document.getElementById("Agregar").style.display = "block";
            document.getElementById("Actualizar").style.display = "none";
        }
    };
}

