import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { obtenerTareasPendientes } from '../services/api';

export default function ListaTareasPendientes() {
  const [tareas, setTareas] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function cargar() {
      const datos = await obtenerTareasPendientes();
      setTareas(datos);
    }
    cargar();
  }, []);

  const filteredTareas = tareas.filter(tarea => {
    const search = searchText.toLowerCase();
    return (
      String(tarea.ID_Tarea).toLowerCase().includes(search) ||
      tarea.Descripcion?.toLowerCase().includes(search) ||
      tarea.Asignado_A?.toLowerCase().includes(search) ||
      tarea.Fecha_Limite?.toLowerCase().includes(search)
    );
  });

  return (
    <View style={{ flex: 1, padding: 10, paddingTop: 50 }}>
      <TextInput
        placeholder="Buscar tarea..."
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
        data={filteredTareas}
        keyExtractor={(item) => item.ID_Tarea}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}><Text style={styles.label}>ID:</Text> {item.ID_Tarea}</Text>
            <Text style={styles.text}><Text style={styles.label}>Descripción:</Text> {item.Descripcion}</Text>
            <Text style={styles.text}><Text style={styles.label}>Asignado a:</Text> {item.Asignado_A}</Text>
            <Text style={styles.text}><Text style={styles.label}>Fecha Límite:</Text> {item.Fecha_Limite}</Text>
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