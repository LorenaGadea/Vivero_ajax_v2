SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS vivero;
CREATE DATABASE vivero;
USE vivero;

CREATE TABLE cliente (
  email varchar(20) PRIMARY KEY,
  nif varchar(10), 
  clave varchar(10),
  nombre varchar(50) NOT NULL,
  apellido varchar(50) NOT NULL,
  telefono integer NOT NULL
);


INSERT INTO cliente (email, nif, clave, nombre, apellido, telefono)
VALUES
('vasili@gmail.com', '78789565F', 'vasili', 'Vasili', 'Sirota', '777658941'),
('ekaterina@gmail.com', '68598874F', 'ekaterina', 'Ekaterina', 'Kursova', '658888954'),
('danila@gmail.com', '41415878S', 'danila', 'Danila', 'Sorokin', '412555846'),
('misha@gmail.com', '12354485R', 'mikhail', 'Mikhail', 'Chapayev', '654222365');

INSERT INTO cliente (email, clave)
VALUES
('admin@gmail.com', 'admin');

CREATE TABLE tipos_producto (
  codigo varchar(10) NOT NULL,
  tipo varchar(10) NOT NULL,
  check (tipo='Maceta' or tipo='Planta'),
  PRIMARY KEY (codigo)
);

INSERT INTO tipos_producto (codigo, tipo)
VALUES
('M1','Maceta'),
('M2','Maceta'),
('M3','Maceta'),
('M4','Maceta'),
('P1','Planta'),
('P2','Planta'),
('P3','Planta'),
('P4','Planta');

CREATE TABLE maceta (
  codigo varchar(10) PRIMARY KEY,
  stock integer (3), 
  precio float NOT NULL,
  material varchar(30) NOT NULL,
  color varchar(30) NOT NULL,
  capacidad integer NOT NULL,
  check (capacidad >0 ),
  check (precio >0 ),
  foreign key (codigo)  REFERENCES tipos_producto(codigo)
);

INSERT INTO maceta (codigo, stock, precio, material, color, capacidad)
VALUES
('M1', 20, 7.50, 'Cerámica', 'Natural', 6),
('M2', 25, 15, 'Barro', 'Blanco', 10),
('M3', 50, 2.5, 'Plástico', 'Marrón', 0.5),
('M4', 10, 35, 'Barro', 'Azul', 60);

CREATE TABLE planta (
  codigo varchar(10) PRIMARY KEY,
  stock integer (3), 
  precio float NOT NULL,
  nombre varchar(30) NOT NULL,
  tamaño varchar(30) NOT NULL,
  flor boolean NOT NULL default false,
  frutal boolean NOT NULL default false,
  check (tamaño='Pequeño' or tamaño='Mediano' or tamaño='Grande'),
  check (precio >0 ),
  foreign key (codigo)  REFERENCES tipos_producto(codigo)
);

INSERT INTO planta (codigo, stock, precio, nombre, tamaño, flor, frutal)
VALUES
('P1', 20, 7.50, 'Geranio Mediano', 'Mediano', true, false),
('P2', 25, 15, 'Limonero', 'Mediano', false, true),
('P3', 50, 2.5, 'Poto', 'Pequeño', false, false),
('P4', 10, 35, 'Costilla de Adán', 'Grande', false, false);

CREATE TABLE venta (
  id int(3) NOT NULL AUTO_INCREMENT,
  codigo varchar(10) REFERENCES tipos_producto(codigo),
  nif varchar(10)  REFERENCES cliente(nif),
  fecha date NOT NULL,
  PRIMARY KEY (id, codigo, nif)
);

INSERT INTO venta (codigo, nif, fecha)
VALUES
('P1', '78789565F', '2019-02-25'),
('M2', '41415878S', '2019-05-15'),
('P3', '41415878S', '2019-05-04'),
('M1', '12354485R', '2019-03-18');

CREATE TABLE alquiler (
  id  int(3) NOT NULL AUTO_INCREMENT,
  codigo varchar(10) REFERENCES tipos_producto(codigo),
  nif varchar(10)  REFERENCES cliente(nif),
  fechaInicial date NOT NULL,
  fechaFinal date NOT NULL,
  PRIMARY KEY (id, codigo, nif)
);

INSERT INTO alquiler (codigo, nif, fechaInicial, fechaFinal)
VALUES
('P4', '78789565F', '2019-02-25', '2019-03-25'),
('P4', '78789565F', '2019-02-25', '2021-03-25'),
('P4', '41415878S', '2019-02-25', '2021-03-25'),
('M4', '41415878S', '2019-05-15', '2019-05-25'); 
