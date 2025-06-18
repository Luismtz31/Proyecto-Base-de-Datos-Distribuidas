import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { obtenerDetallesVenta } from '../services/api';

export default function ListaDetallesVenta() {
  const [detalles, setDetalles] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function cargar() {
      const datos = await obtenerDetallesVenta();
      setDetalles(datos);
    }
    cargar();
  }, []);

  const filteredDetalles = detalles.filter(detalle => {
    const search = searchText.toLowerCase();
    return (
      String(detalle.ID_Detalle).toLowerCase().includes(search) ||
      String(detalle.ID_Venta).toLowerCase().includes(search) ||
      String(detalle.ID_Producto).toLowerCase().includes(search) ||
      String(detalle.Cantidad).toLowerCase().includes(search) ||
      String(detalle.Total).toLowerCase().includes(search)
    );
  });

  return (
    <View style={{ flex: 1, padding: 10, paddingTop: 50 }}>
      <TextInput
        placeholder="Buscar detalle..."
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
        data={filteredDetalles}
        keyExtractor={(item) => item.ID_Detalle}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}><Text style={styles.label}>ID Detalle:</Text> {item.ID_Detalle}</Text>
            <Text style={styles.text}><Text style={styles.label}>ID Venta:</Text> {item.ID_Venta}</Text>
            <Text style={styles.text}><Text style={styles.label}>ID Producto:</Text> {item.ID_Producto}</Text>
            <Text style={styles.text}><Text style={styles.label}>Cantidad:</Text> {item.Cantidad}</Text>
            <Text style={styles.text}><Text style={styles.label}>Total:</Text> {item.Total}</Text>
          </View>
        )}
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