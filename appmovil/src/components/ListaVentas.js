import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { obtenerVentas } from '../services/api';

export default function ListaVentas() {
  const [ventas, setVentas] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function cargar() {
      const datos = await obtenerVentas();
      setVentas(datos);
    }
    cargar();
  }, []);

  const filteredVentas = ventas.filter(venta => {
    const search = searchText.toLowerCase();
    return (
      String(venta.ID_Venta).toLowerCase().includes(search) ||
      String(venta.ID_Cliente).toLowerCase().includes(search) ||
      venta.Fecha_Compra?.toLowerCase().includes(search) ||
      String(venta.Total_Pagar).toLowerCase().includes(search) ||
      venta.Estado?.toLowerCase().includes(search)
    );
  });

  return (
    <View style={{ flex: 1, padding: 10, paddingTop: 50 }}>
      <TextInput
        placeholder="Buscar venta..."
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
        data={filteredVentas}
        keyExtractor={(item) => item.ID_Venta}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}><Text style={styles.label}>ID Venta:</Text> {item.ID_Venta}</Text>
            <Text style={styles.text}><Text style={styles.label}>Cliente:</Text> {item.ID_Cliente}</Text>
            <Text style={styles.text}><Text style={styles.label}>Fecha Compra:</Text> {item.Fecha_Compra}</Text>
            <Text style={styles.text}><Text style={styles.label}>Total Pagar:</Text> {item.Total_Pagar}</Text>
            <Text style={styles.text}><Text style={styles.label}>Estado:</Text> {item.Estado}</Text>
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