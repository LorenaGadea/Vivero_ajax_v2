<?php
session_name('vivero');
session_start();
$_SESSION['usuario'] = "No conectado";
$_SESSION['rol'] = '';
$error="";
if (isset($_POST["txtEmail"]) && isset($_POST["txtPassword"])) {
    $conn = new mysqli('localhost', 'root', '', 'vivero');
    $sql = "
    SELECT COUNT(*) as cliente
    FROM cliente
    WHERE email = '{$_POST["txtEmail"]}'
    AND clave = '{$_POST["txtPassword"]}'
  ";

    $res = $conn->query($sql);
    $fila = $res->fetch_assoc();
    $conn->set_charset("utf8");

    if ((int) $fila['cliente'] > 0) {
        session_destroy();
        session_name("vivero");
        session_start();
        if ($_POST["txtEmail"] == "admin@gmail.com") {
            $_SESSION['usuario'] = $_POST["txtEmail"];
            $_SESSION['rol'] = "Administrador";
            header("Location:plantarum.php");
        } else {
            $_SESSION['usuario'] = $_POST["txtEmail"];
            $_SESSION['rol'] = "Cliente";
            header("Location:areaClientes.php");
        }
    }else{
        $error = "Los datos introducidos son incorrectos. Inténtelo de nuevo.";
    }
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>Plantarum</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/mainStyle.css">
    <link rel="icon" type="image/png" href="img/icon.png" sizes="16x16">
    <script type="text/javascript" src="jquery/jquery-3.4.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <style>
        body {
            background-image: url("./img/fondo.jpg");
        }

        .oculto {
            display: none;
        }

        #main {
            padding-bottom: 10%;
        }

        #login {
            text-align: left;
        }
    </style>
</head>

<body>
    <div class="container-fluid" id="main">
        <div class="row col-12">
            <div id="logo" class="col-lg-1 col-md-2 col-sm-12">
                <img src="img/icon.png" width="160" alt="logotipo">
            </div>
            <div class="titulo col-lg-11 col-md-10 col-sm-12">PLANTARUM</div>
        </div>
        <h2>Iniciar sesión</h2>
        <div id="login">
            <form action="" method="POST">
                <div class="row">
                    <div class="col-2">
                        <label for="txtEmail">Email</label>
                    </div>
                    <div class="col-4">
                        <input class="form-control" type="email" name="txtEmail" id="txtEmail" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2">
                        <label for="txtPassword">Contraseña</label>
                    </div>
                    <div class="col-4">
                        <input class="form-control" type="password" name="txtPassword" id="txtPassword" required>
                    </div>
                </div>
                <br>
                <input class="btn btn-dark" type="submit" value="Enviar">
            </form>
        </div>
        <div id="mensaje">
            <?=$error;?>
        </div>
    </div>
</body>