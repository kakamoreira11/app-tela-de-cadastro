import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Colors = {
  primary: '#6C63FF',
  secondary: '#4A44D4',
  white: '#FFFFFF',
  cinza: '#DDDDDD',
};

export default function ListaCompleta({ navigation }) {
  const [cadastros, setCadastros] = useState([]);

  useEffect(() => {
    carregarCadastros();
    const unsubscribe = navigation.addListener('focus', () => {
      carregarCadastros();
    });
    return unsubscribe;
  }, [navigation]);

  const carregarCadastros = async () => {
    try {
      const dados = await AsyncStorage.getItem('@cadastros');
      if (dados) {
        setCadastros(JSON.parse(dados));
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const ItemCadastro = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.cardIndex}>#{index + 1}</Text>
      <Text style={styles.cardName}>{item.nome} {item.sobrenome}</Text>
      <Text style={styles.cardText}>📍 {item.endereco}</Text>
      <Text style={styles.cardText}>📮 CEP: {item.cep}</Text>
      <Text style={styles.cardText}>🏙️ {item.cidade} - {item.estado}</Text>
    </View>
  );

  return (
    <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="list" size={60} color={Colors.white} />
          <Text style={styles.title}>Lista Completa</Text>
          <Text style={styles.total}>Total: {cadastros.length} cadastros</Text>
        </View>

        {cadastros.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text" size={60} color={Colors.white} />
            <Text style={styles.emptyText}>Nenhum cadastro realizado</Text>
          </View>
        ) : (
          <FlatList
            data={cadastros}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => <ItemCadastro item={item} index={index} />}
            showsVerticalScrollIndicator={false}
          />
        )}

        <Pressable style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.buttonText}>Voltar ao Cadastro</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.white, marginTop: 10 },
  total: { fontSize: 14, color: Colors.white, marginTop: 5 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cardIndex: { fontSize: 12, color: Colors.cinza, marginBottom: 5 },
  cardName: { fontSize: 18, fontWeight: 'bold', color: Colors.primary, marginBottom: 8 },
  cardText: { fontSize: 14, marginBottom: 3, color: '#333' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: Colors.white, fontSize: 16, marginTop: 10 },
  button: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: Colors.primary, fontSize: 16, fontWeight: 'bold' },
});