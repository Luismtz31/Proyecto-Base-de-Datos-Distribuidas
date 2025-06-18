import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { obtenerProveedores } from '../services/api';
import DataTable from './DataTable';

export default function ListaProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function cargar() {
      const datos = await obtenerProveedores();
      setProveedores(datos);
    }
    cargar();
  }, []);

  const columns = [
    { key: 'ID_Proveedor', label: 'ID' },
    { key: 'Nombre', label: 'Nombre' },
    { key: 'Contacto', label: 'Contacto' },
    { key: 'Telefono', label: 'Teléfono' },
    { key: 'Direccion', label: 'Dirección' },
  ];

  const filteredProveedores = proveedores.filter(proveedor => {
    const search = searchText.toLowerCase();
    return (
      String(proveedor.ID_Proveedor).toLowerCase().includes(search) ||
      proveedor.Nombre?.toLowerCase().includes(search) ||
      proveedor.Contacto?.toLowerCase().includes(search) ||
      proveedor.Telefono?.toLowerCase().includes(search) ||
      proveedor.Direccion?.toLowerCase().includes(search)
    );
  });

  return (
    <View style={{ flex: 1, padding: 10, paddingTop: 50 }}>
      <TextInput
        placeholder="Buscar proveedor por ID..."
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
        data={filteredProveedores}
        columns={columns}
        onPress={(item) => console.log('Proveedor seleccionado:', item)}
      />
    </View>
  );
}