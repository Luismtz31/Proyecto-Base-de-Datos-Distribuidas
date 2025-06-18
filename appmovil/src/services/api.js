import axios from 'axios';

const API_URL = 'http://192.168.33.104:3000/api';

export const obtenerRegistros = async (tipo) => {
  try {
    const response = await axios.get(`${API_URL}/${tipo.toLowerCase()}s`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener registros:', error);
    return [];
  }
};

export const crearRegistro = async (tipo, data) => {
  try {
    await axios.post(`${API_URL}/${tipo.toLowerCase()}s`, data);
    return true;
  } catch (error) {
    console.error('Error al crear registro:', error);
    return false;
  }
};

export const obtenerClientes = async () => {
  try {
    const response = await axios.get(`${API_URL}/clientes`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    return [];
  }
};

export const crearCliente = async (data) => {
  try {
    await axios.post(`${API_URL}/clientes`, data);
    return true;
  } catch (error) {
    console.error('Error al crear cliente:', error);
    return false;
  }
};

export const obtenerProveedores = async () => {
  try {
    const response = await axios.get(`${API_URL}/proveedores`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    return [];
  }
};

export const crearProveedor = async (data) => {
  try {
    await axios.post(`${API_URL}/proveedores`, data);
    return true;
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    return false;
  }
};

export const obtenerProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

export const crearProducto = async (data) => {
  try {
    await axios.post(`${API_URL}/productos`, data);
    return true;
  } catch (error) {
    console.error('Error al crear producto:', error);
    return false;
  }
};

export const obtenerEmpleados = async () => {
  try {
    const response = await axios.get(`${API_URL}/empleados`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    return [];
  }
};

export const crearEmpleado = async (data) => {
  try {
    await axios.post(`${API_URL}/empleados`, data);
    return true;
  } catch (error) {
    console.error('Error al crear empleado:', error);
    return false;
  }
};

// METODO_PAGO
export const obtenerMetodosPago = async () => {
  try {
    const response = await axios.get(`${API_URL}/metodos_pago`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener métodos de pago:', error);
    return [];
  }
};

export const crearMetodoPago = async (data) => {
  try {
    await axios.post(`${API_URL}/metodos_pago`, data);
    return true;
  } catch (error) {
    console.error('Error al crear método de pago:', error);
    return false;
  }
};

// TAREA_PENDIENTE
export const obtenerTareasPendientes = async () => {
  try {
    const response = await axios.get(`${API_URL}/tareas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener tareas pendientes:', error);
    return [];
  }
};

export const crearTareaPendiente = async (data) => {
  try {
    await axios.post(`${API_URL}/tareas`, data);
    return true;
  } catch (error) {
    console.error('Error al crear tarea pendiente:', error);
    return false;
  }
};

// VENTA
export const obtenerVentas = async () => {
  try {
    const response = await axios.get(`${API_URL}/ventas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    return [];
  }
};

export const crearVenta = async (data) => {
  try {
    await axios.post(`${API_URL}/ventas`, data);
    return true;
  } catch (error) {
    console.error('Error al crear venta:', error);
    return false;
  }
};

// DETALLE_VENTA
export const obtenerDetallesVenta = async () => {
  try {
    const response = await axios.get(`${API_URL}/detalles`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de venta:', error);
    return [];
  }
};

export const crearDetalleVenta = async (data) => {
  try {
    await axios.post(`${API_URL}/detalles`, data);
    return true;
  } catch (error) {
    console.error('Error al crear detalle de venta:', error);
    return false;
  }
};
