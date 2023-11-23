import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AsientosComponent = () => {
  const navigation = useNavigation();
  const [asientos, setAsientos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAsientosFromApi = async () => {
    try {
      const response = await axios.get('http://177.222.34.34:5006/api/Asiento/GetListEstadoAsientosByConferencia/5');
      setAsientos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching asientos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsientosFromApi();
  }, []);

  const navigateToInicio = () => {
    navigation.navigate('Inicio');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.asientosContainer}>
        <Text style={styles.titulo}>Listado de Asientos</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
        ) : (
          <ScrollView>
            {asientos.map((asiento) => (
              <View key={asiento.id} style={styles.item}>
                <Text style={styles.itemText}>{`Asiento ID: ${asiento.asientoId}`}</Text>
                <Text style={styles.itemText}>{`Número de Asiento: ${asiento.numeroAsiento}`}</Text>
                <Text style={styles.itemText}>{`Fila: ${asiento.fila}`}</Text>
                <Text style={[styles.itemText, { color: asiento.estado === 'Reservado' ? '#e74c3c' : '#2ecc71' }]}>
                  {`Estado: ${asiento.estado}`}
                </Text>
                {/* Agrega aquí más detalles del asiento según la estructura de tu API */}
              </View>
            ))}
          </ScrollView>
        )}
         <Button title="Ir a Inicio" onPress={navigateToInicio} />
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
  asientosContainer: {
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
    fontSize: 24,
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

export default AsientosComponent;
