import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { obtenerEmpleados } from '../services/api';

export default function ListaEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function cargar() {
      const datos = await obtenerEmpleados();
      setEmpleados(datos);
    }
    cargar();
  }, []);

  const filteredEmpleados = empleados.filter(empleado => {
    const search = searchText.toLowerCase();
    return (
      String(empleado.ID_Empleado).toLowerCase().includes(search) ||
      empleado.Nombre?.toLowerCase().includes(search) ||
      empleado.Cargo?.toLowerCase().includes(search) ||
      empleado.Horario_Entrada?.toLowerCase().includes(search) ||
      empleado.Horario_Salida?.toLowerCase().includes(search)
    );
  });

  return (
    <View style={{ flex: 1, padding: 10, paddingTop: 50 }}>
      <TextInput
        placeholder="Buscar empleado..."
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
        data={filteredEmpleados}
        keyExtractor={(item) => item.ID_Empleado}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}><Text style={styles.label}>ID:</Text> {item.ID_Empleado}</Text>
            <Text style={styles.text}><Text style={styles.label}>Nombre:</Text> {item.Nombre}</Text>
            <Text style={styles.text}><Text style={styles.label}>Cargo:</Text> {item.Cargo}</Text>
            <Text style={styles.text}><Text style={styles.label}>Horario Entrada:</Text> {item.Horario_Entrada}</Text>
            <Text style={styles.text}><Text style={styles.label}>Horario Salida:</Text> {item.Horario_Salida}</Text>
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