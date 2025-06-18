import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { obtenerProductos } from '../services/api';

export default function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function cargar() {
      const datos = await obtenerProductos();
      setProductos(datos);
    }
    cargar();
  }, []);

  const filteredProductos = productos.filter(producto => {
    const search = searchText.toLowerCase();
    return (
      String(producto.ID_Producto).toLowerCase().includes(search) ||
      producto.Descripcion?.toLowerCase().includes(search) ||
      producto.Categoria?.toLowerCase().includes(search) ||
      String(producto.Precio1).toLowerCase().includes(search) ||
      String(producto.Stock).toLowerCase().includes(search)
    );
  });

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}><Text style={styles.label}>ID:</Text> {item.ID_Producto}</Text>
      <Text style={styles.text}><Text style={styles.label}>Descripción:</Text> {item.Descripcion}</Text>
      <Text style={styles.text}><Text style={styles.label}>Categoría:</Text> {item.Categoria}</Text>
      <Text style={styles.text}><Text style={styles.label}>Precio 1:</Text> {item.Precio1}</Text>
      <Text style={styles.text}><Text style={styles.label}>Stock:</Text> {item.Stock}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10, paddingTop: 50 }}>
      <TextInput
        placeholder="Buscar producto..."
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
      <FlatList
        data={filteredProductos}
        keyExtractor={(item) => item.ID_Producto}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: 20 },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  text: { fontSize: 14 },
  label: { fontWeight: 'bold' },
});