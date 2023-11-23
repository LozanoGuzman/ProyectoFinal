// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ConferenciaComponent from './ConferenciaComponent';
import AsientosComponent from './AsientosComponent';
import ReservaComponent from './ReservaComponent';
import App from './InicioComponent';
import ReservaButton from './ReservaButton';


const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen
          name="Conferencia"
          component={ConferenciaComponent}
          options={{ title: 'Listado de Conferencia' }}
        />
        <Stack.Screen
          name="Asientos"
          component={AsientosComponent}
          options={{ title: 'Listado de Asientos' }}
        />
        <Stack.Screen
          name="Reserva_asiento"
          component={ReservaButton}
          options={{ title: 'Reserva de asiento' }}
        />
        <Stack.Screen
          name="Reserva"
          component={ReservaComponent}
          options={{ title: 'Listado de Sillas Reservadas' }}
        />
        <Stack.Screen
          name="Inicio"
          component={App}
          options={{ title: 'AUDITORIO UPDS' }}
        />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;