<?php
session_name('vivero');
session_start();
if (isset($_SESSION) && $_SESSION['rol'] == "Administrador") {
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

            <div class="row" id="sesion">
                <div class="col-12">
                    Usuario activo: <?= $_SESSION["usuario"]; ?><br>
                    <form action="index.php" method="post">
                        <input class="btn btn-dark" type="submit" value="Cerrar sesión" id="btnSesion">
                    </form>
                </div>
            </div>
            <div id="tabla">
                <table id="ventas" class="table table-striped">
                    <tr>
                        <th>Número Venta</th>
                        <th>Código Producto</th>
                        <th>NIF</th>
                        <th>Fecha</th>
                    </tr>
                </table>
            </div>
            <div id="UD">
            <h2>Gestión de ventas</h2>
            <form name="gestionVentas" id="gestionVentas">
                Seleccione una venta:
	      <select class="form-control" name="selId" id="selector"></select><br>

              <div class="row">
                <div class="col-6">
                  <label >Código</label>
                </div>
                <div class="col-6">
                  <select class="form-control"  name="selCodigo" id="selCodigo" required>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label >Cliente</label>
                </div>
                <div class="col-6">
                  <select class="form-control" name="selNif" id="selNif" required>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <label >Fecha</label>
                </div>
                <div class="col-6">
                  <input class="form-control" type="date" name="txtFecha" id="txtFecha" required><label id=" "></label>
                </div>
              </div>
	            <input class="btn btn-dark" type="button" value="Borrar Cliente" name="btnBorrar">
              <input class="btn btn-dark" type="button" value="Modificar Cliente" name="btnModificar">
            </form>
        </div>
        </div>
    <?php } ?>
    <script src="JS/plantarum.js"></script>
    <script src="JS/gestionVenta.js"></script>
    </body>

    </html>