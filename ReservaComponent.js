import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const ReservaComponent = () => {
  const navigation = useNavigation();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservas = async () => {
    try {
      const response = await axios.get('http://177.222.34.34:5006/api/Reservas/GetListMisReservas');
      setReservas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reservas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const navigateToInicio = () => {
    navigation.navigate('Inicio');
  };

  const navigateToAsientoReserva = () => {
    navigation.navigate('Reserva_asiento');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.reservasContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          reservas.map((reserva) => (
            <View key={reserva.reservaId} style={styles.item}>
              <Text style={styles.titulo}>Detalles de la Reserva:</Text>
              <Text style={styles.itemText}>{`ReservaId: ${reserva.reservaId}`}</Text>
              <Text style={styles.itemText}>{`Conferencia Id: ${reserva.conferenciaId}`}</Text>
              <Text style={styles.itemText}>{`Asiento Id: ${reserva.asientoId}`}</Text>
              <Text style={styles.itemText}>{`Fila: ${reserva.fila}`}</Text>
              <Text style={styles.itemText}>{`Número de Asiento: ${reserva.numeroAsiento}`}</Text>
              <Text style={styles.itemText}>{`Tema: ${reserva.tema}`}</Text>
              <Text style={styles.itemText}>{`Conferencistas: ${reserva.nombreConferencistas}`}</Text>
              <Text style={styles.itemText}>{`Fecha de Inicio: ${moment(reserva.fechaInicio).format('DD/MM/YYYY HH:mm')}`}</Text>
              <Text style={styles.itemText}>{`Fecha de Fin: ${moment(reserva.fechaFin).format('DD/MM/YYYY HH:mm')}`}</Text>
              <Image source={{ uri: reserva.imagenUrl }} style={{ width: 100, height: 100 }} />
              <Text style={styles.itemText}>{`Fecha y Hora de Reserva: ${moment(reserva.fechaHoraReserva).format('DD-MM-YYYY HH:mm:ss')}`}</Text>
              {/* Agrega más detalles según la estructura de tu API */}
            </View>
          ))
        )}
        <TouchableOpacity style={styles.button} onPress={navigateToInicio}>
          <Text style={styles.buttonText}>Ir a Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToAsientoReserva}>
          <Text style={styles.buttonText}>Reservar Asiento</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#A0D2FE',
  },
  loader: {
    marginTop: 20,
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
  },
  titulo: {
    fontFamily: 'cursive',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db',
    textAlign: 'center',
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
    fontFamily: 'serif',
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReservaComponent;
