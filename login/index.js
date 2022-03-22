//funcion para el acceso al sistema.
function acceso() {
    var datos = new FormData(Login);
    var username = datos.get('username');
    var password = datos.get('pass');
    var accion = "Login"
    var ExistUser = false;
    var idUser = 0;
    $.post('datos.php', { accion, username, password }, function (response) {
        var dat = JSON.parse(response)
        console.log(dat);
        for (let itm of dat) {
            if (itm.UserName != username || itm.Pass != password) {

            } else {
                ExistUser = true;
                idUser = itm.CvUser;
            }
        }
        if (ExistUser == true) {
            var cv = idUser;
            var accion = "updateEdo";
            $.post("datos.php", { accion, cv }, function (data) {
                var dat = JSON.parse(data)
                if (dat == "Hecho") {
                    window.location.href = "http://localhost:3000/menu/index.html";
                }
            });
        } else {
            alerta("Error en usuario/contraseña", "warning");
        }
    });
}

function alerta(mensaje, icono) {
    Swal.fire({
        position: 'center',
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: 2500
    })
}