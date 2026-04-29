import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Colors = {
  primary: '#6C63FF',
  secondary: '#4A44D4',
  white: '#FFFFFF',
};

export default function Busca({ navigation }) {
  const [ultimoCadastro, setUltimoCadastro] = useState(null);

  useEffect(() => {
    carregarUltimoCadastro();
    const unsubscribe = navigation.addListener('focus', () => {
      carregarUltimoCadastro();
    });
    return unsubscribe;
  }, [navigation]);

  const carregarUltimoCadastro = async () => {
    try {
      const cadastros = await AsyncStorage.getItem('@cadastros');
      if (cadastros) {
        const lista = JSON.parse(cadastros);
        if (lista.length > 0) {
          setUltimoCadastro(lista[lista.length - 1]);
        }
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Ionicons name="search" size={60} color={Colors.white} />
          <Text style={styles.title}>Último Cadastro</Text>
        </View>

        {ultimoCadastro ? (
          <View style={styles.card}>
            <Text style={styles.cardName}>
              {ultimoCadastro.nome} {ultimoCadastro.sobrenome}
            </Text>
            <Text style={styles.cardText}>📍 {ultimoCadastro.endereco}</Text>
            <Text style={styles.cardText}>📮 CEP: {ultimoCadastro.cep}</Text>
            <Text style={styles.cardText}>🏙️ {ultimoCadastro.cidade} - {ultimoCadastro.estado}</Text>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text" size={60} color={Colors.white} />
            <Text style={styles.emptyText}>Nenhum cadastro encontrado</Text>
          </View>
        )}

        <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Voltar ao Login</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => navigation.navigate('ListaCompleta')}>
          <Text style={styles.buttonText}>Ver Lista Completa</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.white, marginTop: 10 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
  cardName: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: Colors.primary },
  cardText: { fontSize: 14, marginBottom: 5, color: '#333' },
  emptyContainer: { alignItems: 'center', marginVertical: 50 },
  emptyText: { color: Colors.white, fontSize: 16, marginTop: 10 },
  button: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { color: Colors.primary, fontSize: 16, fontWeight: 'bold' },
});