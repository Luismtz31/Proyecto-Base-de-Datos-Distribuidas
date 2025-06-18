import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function DataTable({ data, columns, onPress }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onPress && onPress(item)}
    >
      {columns.map((column, index) => (
        <View key={index} style={styles.cell}>
          <Text style={styles.label}>{column.label}:</Text>
          <Text style={styles.value}>{item[column.key]}</Text>
        </View>
      ))}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  list: {
    padding: 10,
  },
  row: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cell: {
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 2,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 