import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { obtenerClientes } from '../services/api';
import DataTable from './DataTable';

export default function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function cargar() {
      const datos = await obtenerClientes();
      setClientes(datos);
    }
    cargar();
  }, []);

  const columns = [
    { key: 'ID_Cliente', label: 'ID' },
    { key: 'Nombre', label: 'Nombre' },
    { key: 'Telefono', label: 'Teléfono' },
    { key: 'Metodo_Pago_ID', label: 'Método de Pago' },
  ];

  const filteredClientes = clientes.filter(cliente => {
    const search = searchText.toLowerCase();
    return (
      cliente.Nombre?.toLowerCase().includes(search) ||
      cliente.Telefono?.toLowerCase().includes(search) ||
      String(cliente.ID_Cliente).toLowerCase().includes(search) ||
      String(cliente.Metodo_Pago_ID).toLowerCase().includes(search)
    );
  });

  return (
    <View style={{ flex: 1, padding: 10, paddingTop: 50 }}>
      <TextInput
        placeholder="Buscar cliente..."
        value={searchText}
        onChangeText={setSearchText}
        style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: '#ccc',
        }}
      />
      <DataTable
        data={filteredClientes}
        columns={columns}
        onPress={(item) => console.log('Cliente seleccionado:', item)}
      />
    </View>
  );
}
