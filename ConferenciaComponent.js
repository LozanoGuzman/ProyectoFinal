import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';
import moment from 'moment'; // Importa la librería moment
import { useNavigation } from '@react-navigation/native';

const ConferenciaComponent = () => {
  const navigation = useNavigation();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarResultado, setMostrarResultado] = useState(true);

  useEffect(() => {
    fetchReservasFromApi();
  }, []);

  const fetchReservasFromApi = async () => {
    try {
      const response = await axios.get('http://177.222.34.34:5006/api/Conferencias/GetListConferencias/11/2023');
      setReservas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reservas:', error);
      setLoading(false);
    }
  };

  const toggleMostrarResultado = () => {
    setMostrarResultado(!mostrarResultado);
  };

  const navigateToInicio = () => {
    navigation.navigate('Inicio');
  };

  return (
    <ScrollView style={styles.container}>
        <Button title={mostrarResultado ? "Ocultar Reservas" : "Mostrar Reservas"} onPress={toggleMostrarResultado} />

        {mostrarResultado && (
          <View style={styles.reservasContainer}>
            <Text style={styles.titulo}>Listado de Conferencias:</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
            ) : (
              <ScrollView>
                {reservas.map((reserva) => (
                  <View key={reserva.reservaId} style={styles.item}>
                    <Text style={styles.itemText}>{`Tema: ${reserva.tema}`}</Text>
                    <Text style={styles.itemText}>{`Expositores: ${reserva.expositores}`}</Text>
                    <Text style={styles.itemText}>{`Fecha Inicio: ${moment(reserva.fechaInicio).format('DD/MM/YYYY HH:mm')}`}</Text>
                    <Text style={styles.itemText}>{`Fecha Fin: ${moment(reserva.fechaFin).format('DD/MM/YYYY HH:mm')}`}</Text>
                    <Image source={{ uri: reserva.imagenUrl }} style={{ width: 100, height: 100 }} />
                  </View>
                ))}
              </ScrollView>
            )}
                    <Button title="Ir a Inicio" onPress={navigateToInicio} />
          </View>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#A0D2FE',
  },
  reservasContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  titulo: {
    fontFamily: 'cursive', // Reemplaza con el nombre de la fuente que descargaste
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db',
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontFamily: 'serif', // Reemplaza con el nombre de la fuente que descargaste
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ConferenciaComponent;

