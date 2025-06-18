CREATE TABLE Metodo_Pago (
    ID_Metodo CHAR(6) PRIMARY KEY,
    Metodo VARCHAR(50)
);

-- Tabla de proveedores
CREATE TABLE Proveedor (
    ID_Proveedor CHAR(6) PRIMARY KEY,
    Nombre VARCHAR(255),
    Contacto VARCHAR(255),
    Telefono VARCHAR(20),
    Direccion TEXT
);

-- Tabla de productos
CREATE TABLE Producto (
    ID_Producto CHAR(8) PRIMARY KEY,
    Numero_Serie VARCHAR(255),
    Descripcion TEXT,
    Unidad_Medida VARCHAR(50),
    Categoria VARCHAR(100),
    SubCategoria VARCHAR(100),
    Precio_Minimo DECIMAL(10, 2),
    Precio1 DECIMAL(10, 2),
    Precio2 DECIMAL(10, 2),
    Precio3 DECIMAL(10, 2),
    Impuesto DECIMAL(10, 2),
    ID_Proveedor1 CHAR(6),
    ID_Proveedor2 CHAR(6),
    Stock_Minimo INT,
    Stock_Maximo INT,
    Stock INT,
    Costo_Unitario DECIMAL(10, 2),
    Costo_Promedio DECIMAL(10, 2),
    Metodo_Costeo ENUM('Promedio', 'Ultimo', 'FIFO'),
    Ventas_Totales DECIMAL(10, 2),
    Unidades_Vendidas INT,
    FOREIGN KEY (ID_Proveedor1) REFERENCES Proveedor(ID_Proveedor),
    FOREIGN KEY (ID_Proveedor2) REFERENCES Proveedor(ID_Proveedor)
);

-- Tabla de empleados
CREATE TABLE Empleado (
    ID_Empleado CHAR(6) PRIMARY KEY,
    Nombre VARCHAR(255),
    Cargo VARCHAR(100),
    Horario_Entrada TIME,
    Horario_Salida TIME
);

-- Tabla de tareas pendientes
CREATE TABLE Tarea_Pendiente (
    ID_Tarea CHAR(6) PRIMARY KEY,
    Descripcion TEXT,
    Asignado_A CHAR(6),
    Fecha_Limite DATE,
    FOREIGN KEY (Asignado_A) REFERENCES Empleado(ID_Empleado)
);

-- Tabla de clientes
CREATE TABLE Cliente (
    ID_Cliente CHAR(8) PRIMARY KEY,
    Nombre VARCHAR(255),
    Correo VARCHAR(255),
    Telefono VARCHAR(20),
    Direccion TEXT,
    Metodo_Pago_ID CHAR(6),
    FOREIGN KEY (Metodo_Pago_ID) REFERENCES Metodo_Pago(ID_Metodo)
);

-- Tabla de ventas
CREATE TABLE Venta (
    ID_Venta CHAR(8) PRIMARY KEY,
    ID_Cliente CHAR(8),
    Fecha_Compra DATETIME,
    Metodo_Pago VARCHAR(50),
    Total_Productos INT,
    Subtotal DECIMAL(10, 2),
    Impuesto DECIMAL(10, 2),
    Descuento_Total DECIMAL(10, 2),
    Total_Pagar DECIMAL(10, 2),
    Estado ENUM('Pendiente', 'Entregado', 'Cancelado'),
    Fecha_Entrega DATETIME,
    Observaciones TEXT,
    FOREIGN KEY (ID_Cliente) REFERENCES Cliente(ID_Cliente)
);

-- Tabla de detalles de venta
CREATE TABLE Detalle_Venta (
    ID_Detalle CHAR(10) PRIMARY KEY,
    ID_Venta CHAR(8),
    ID_Producto CHAR(8),
    Cantidad INT,
    Precio_Unitario DECIMAL(10, 2),
    Descuento DECIMAL(10, 2),
    Subtotal DECIMAL(10, 2),
    Impuesto DECIMAL(10, 2),
    Total DECIMAL(10, 2),
    Fecha_Registro DATETIME,
    FOREIGN KEY (ID_Venta) REFERENCES Venta(ID_Venta),
    FOREIGN KEY (ID_Producto) REFERENCES Producto(ID_Producto)
);