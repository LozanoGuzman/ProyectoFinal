import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();

  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const navigateToConferencia = () => {
    navigation.navigate('Conferencia');
  };

  const navigateToAsientos = () => {
    navigation.navigate('Asientos');
  };

  const navigateToReserva = () => {
    navigation.navigate('Reserva');
  };

  return (
    <View style={[styles.container, darkTheme && styles.darkContainer]}>
      <Text style={[styles.title, darkTheme && styles.darkTitle]}>AUDITORIO UPDS</Text>
      
      {/* Agrega la imagen con enlace URL */}
      <Image
        source={{ uri: 'https://www.upds.edu.bo/wp-content/uploads/2020/06/Santa-Cruz-5.jpg' }}
        style={styles.image}
      />
      
      {/* Contenedor de botones de navegación */}
      <View style={styles.navigationButtonsContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToConferencia}>
          <Text style={styles.buttonText}>Ir a Conferencia</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navigationButtonsContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToAsientos}>
          <Text style={styles.buttonText}>Ir a Asientos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navigationButtonsContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToReserva}>
          <Text style={styles.buttonText}>Ir a Reserva</Text>
        </TouchableOpacity>
      </View>

      {/* Contenedor del botón de cambio de tema */}
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={styles.buttonText}>{darkTheme ? 'Tema Claro' : 'Tema Oscuro'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'cursive',
    color: '#2c3e50',
  },
  darkTitle: {
    color: '#fff',
  },
  image: {
    width: '80%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  navigationButtonsContainer: {
    marginBottom: 10, // Mayor separación entre los conjuntos de botones
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2980b9',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'sans-serif-condensed',
  },
  themeButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#c0392b',
  },
});

export default App;
