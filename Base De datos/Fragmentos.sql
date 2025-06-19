--Fragmentar usuarios por metodo de pago
--clientes que pagan en efectivo y transferencia
CREATE VIEW Cliente_Fragmento1 AS
SELECT * FROM Cliente
WHERE Metodo_Pago_ID IN ('MPGO01',  'MPGO03'); 
--clientes que pagan con tarjeta de debito y credito
CREATE VIEW Cliente_Fragmento2 AS
SELECT * FROM Cliente
WHERE Metodo_Pago_ID NOT IN ('MPGO02', 'MPGO04');

--Prodcutos por categoria
CREATE VIEW Producto_Fragmento1 AS
SELECT * FROM Producto
WHERE Categoria = 'Bebidas';

CREATE VIEW Producto_Fragmento2 AS
SELECT * FROM Producto
WHERE Categoria = 'Abarrotes';

--Ventas por anio de realizacion 
CREATE VIEW Venta_Fragmento1 AS
SELECT * FROM Venta
WHERE YEAR(Fecha_Compra) <= 2023;

CREATE VIEW Venta_Fragmento2 AS
SELECT * FROM Venta
WHERE YEAR(Fecha_Compra) > 2023;
--Detalle de venta por anio de realizacion
CREATE VIEW Detalle_Venta_Fragmento1 AS
SELECT * FROM Detalle_Venta
WHERE YEAR(Fecha_Registro) <= 2023;

CREATE VIEW Detalle_Venta_Fragmento2 AS
SELECT * FROM Detalle_Venta
WHERE YEAR(Fecha_Registro) > 2023;


