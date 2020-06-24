import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect  from 'react-native-picker-select';

import axios from 'axios';

interface IBGEUfResponse {
  sigla: string;
  nome: string;
}

interface IBGECityResponse {
  id: number;
  nome: string;
}

const Home = () => {

  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);
  const [uf, setUf] = useState('Selecione um estado');
  const [city, setCity] = useState('Selecione uma cidade');
  const [disabledCity, setDisabledCity] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    axios.get<IBGEUfResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
      .then(response => {

        const ufsObject = response.data.map(ufObject => { 
          return { label: ufObject.nome, value: ufObject.sigla, key: ufObject.sigla };
        });

        setUfs(ufsObject);

      });
  }, []);

  function handleClickSelected(value) {
    setUf(value);

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${value}/municipios`)
    .then(response => {

      const citiesObjects = response.data.map(cityObject => {
        return { label: cityObject.nome, value: cityObject.nome, key: cityObject.nome };
      });

      setCities(citiesObjects);
    })
    setDisabledCity(false);
  }

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf,
      city,
    });   
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground 
        source={require('../../assets/home-background.png')} 
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}

      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>


        <View style={styles.footer}>
        
          <RNPickerSelect 
            style={styles.select} 
            onValueChange={value => {
              if (value === null) {
                setDisabledCity(true)
              } else {
                handleClickSelected(value);
                setDisabledCity(false);
              }
            }}
            items={ufs}
          >
            <Text style={styles.selectText}>{uf}</Text>
          </RNPickerSelect>

          <RNPickerSelect 
            style={styles.select}
            disabled={disabledCity}
            useNativeAndroidPickerStyle={true}
            onValueChange={value => setCity(value)}
            items={cities}
          >
            <Text style={styles.selectText}>{city}</Text>
          </RNPickerSelect>


          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  selectText: {
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 8,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },

  input: {
    height: 60,  
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;