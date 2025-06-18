import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { obtenerMetodosPago } from '../services/api';

export default function ListaMetodosPago() {
  const [metodos, setMetodos] = useState([]);

  useEffect(() => {
    async function cargar() {
      const datos = await obtenerMetodosPago();
      setMetodos(datos);
    }
    cargar();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}><Text style={styles.label}>ID:</Text> {item.ID_Metodo}</Text>
      <Text style={styles.text}><Text style={styles.label}>Método:</Text> {item.Metodo}</Text>
    </View>
  );

  return (
    <FlatList
      data={metodos}
      keyExtractor={(item) => item.ID_Metodo}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
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