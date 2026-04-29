import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Colors = {
  primary: '#6C63FF',
  secondary: '#4A44D4',
  white: '#FFFFFF',
  cinza: '#DDDDDD',
};

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const salvarCadastro = async () => {
    if (!nome || !sobrenome || !endereco || !cep || !cidade || !estado) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    try {
      const cadastrosExistentes = await AsyncStorage.getItem('@cadastros');
      let lista = cadastrosExistentes ? JSON.parse(cadastrosExistentes) : [];
      
      const novoCadastro = {
        id: Date.now().toString(),
        nome,
        sobrenome,
        endereco,
        cep,
        cidade,
        estado,
        dataCadastro: new Date().toISOString(),
      };
      
      lista.push(novoCadastro);
      await AsyncStorage.setItem('@cadastros', JSON.stringify(lista));
      
      Alert.alert('Sucesso', 'Cadastro realizado!');
      navigation.navigate('Busca');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar');
    }
  };

  return (
    <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="person-add" size={60} color={Colors.white} />
          <Text style={styles.title}>Cadastro</Text>
          <Text style={styles.subtitle}>Preencha seus dados</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />

          <Text style={styles.label}>Sobrenome</Text>
          <TextInput style={styles.input} value={sobrenome} onChangeText={setSobrenome} />

          <Text style={styles.label}>Endereço</Text>
          <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />

          <Text style={styles.label}>CEP</Text>
          <TextInput 
            style={styles.input} 
            value={cep} 
            onChangeText={setCep}
            keyboardType="numeric"
            maxLength={8}
          />

          <Text style={styles.label}>Cidade</Text>
          <TextInput style={styles.input} value={cidade} onChangeText={setCidade} />

          <Text style={styles.label}>Estado (UF)</Text>
          <TextInput 
            style={styles.input} 
            value={estado} 
            onChangeText={setEstado}
            maxLength={2}
          />

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Voltar</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={salvarCadastro}>
              <Text style={styles.buttonText}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  header: { alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 32, fontWeight: 'bold', color: Colors.white, marginTop: 10 },
  subtitle: { fontSize: 16, color: Colors.white },
  form: { backgroundColor: Colors.white, borderRadius: 20, padding: 20 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: Colors.primary },
  input: {
    backgroundColor: '#F0EFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: { flexDirection: 'row', gap: 10, marginTop: 10 },
  button: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
});