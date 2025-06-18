import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ListaClientes from './src/components/ListaClientes';
import ListaProveedores from './src/components/ListaProveedores';
import ListaProductos from './src/components/ListaProductos';
import ListaEmpleados from './src/components/ListaEmpleados';
import ListaMetodosPago from './src/components/ListaMetodosPago';
import ListaTareasPendientes from './src/components/ListaTareasPendientes';
import ListaVentas from './src/components/ListaVentas';
import ListaDetallesVenta from './src/components/ListaDetallesVenta';

const Stack = createNativeStackNavigator();

const MenuScreen = ({ navigation }) => {
  const menuItems = [
    { title: 'Clientes', screen: 'ListaClientes', icon: 'people' },
    { title: 'Proveedores', screen: 'ListaProveedores', icon: 'business' },
    { title: 'Productos', screen: 'ListaProductos', icon: 'cube' },
    { title: 'Empleados', screen: 'ListaEmpleados', icon: 'person' },
    { title: 'Métodos de Pago', screen: 'ListaMetodosPago', icon: 'card' },
    { title: 'Tareas Pendientes', screen: 'ListaTareasPendientes', icon: 'list' },
    { title: 'Ventas', screen: 'ListaVentas', icon: 'cart' },
    { title: 'Detalles de Venta', screen: 'ListaDetallesVenta', icon: 'receipt' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Sistema de Gestión</Text>
      </View>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View style={styles.menuItemContent}>
            <Ionicons name={item.icon} size={24} color="#000" />
            <Text style={styles.menuText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" options={{ title: 'Menú Principal', headerShown: false }}>
          {props => <MenuScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ListaClientes" options={{ title: 'Lista de Clientes', headerShown: false }}>
          {props => <ListaClientes {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ListaProveedores" options={{ title: 'Lista de Proveedores', headerShown: false }}>
          {props => <ListaProveedores {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ListaProductos" options={{ title: 'Lista de Productos', headerShown: false }}>
          {props => <ListaProductos {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ListaEmpleados" options={{ title: 'Lista de Empleados', headerShown: false }}>
          {props => <ListaEmpleados {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ListaMetodosPago" options={{ title: 'Métodos de Pago', headerShown: false }}>
          {props => <ListaMetodosPago {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ListaTareasPendientes" options={{ title: 'Tareas Pendientes', headerShown: false }}>
          {props => <ListaTareasPendientes {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ListaVentas" options={{ title: 'Ventas', headerShown: false }}>
          {props => <ListaVentas {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ListaDetallesVenta" options={{ title: 'Detalles de Venta', headerShown: false }}>
          {props => <ListaDetallesVenta {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: '#000',
  },
  menuItem: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
});


