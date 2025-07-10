CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  edad INT CHECK (edad >= 0)
);
