import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { obtenerRegistros } from '../services/api';

export default function ListaRegistros({ route }) {
  const { tipo } = route.params;
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    async function cargar() {
      const data = await obtenerRegistros(tipo);
      setRegistros(data);
    }
    cargar();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {Object.entries(item).map(([key, value], index) => (
        <Text key={index} style={styles.text}><Text style={{ fontWeight: 'bold' }}>{key}:</Text> {value}</Text>
      ))}
    </View>
  );

  return (
    <FlatList
      data={registros}
      keyExtractor={(item, index) => index.toString()}
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
  text: {
    fontSize: 14,
  },
});
