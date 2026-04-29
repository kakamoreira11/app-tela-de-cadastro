import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Colors = {
  primary: '#6C63FF',
  secondary: '#4A44D4',
  white: '#FFFFFF',
  cinza: '#DDDDDD',
};

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const fazerLogin = () => {
    if (email === '' || senha === '') {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }
    Alert.alert('Sucesso', 'Login realizado com sucesso!');
    navigation.navigate('Cadastro');
  };

  return (
    <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="person-circle" size={80} color={Colors.white} />
          <Text style={styles.title}>Bem-vindo</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor={Colors.cinza}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor={Colors.cinza}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <Pressable style={styles.button} onPress={fazerLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: Colors.white, marginTop: 10 },
  subtitle: { fontSize: 16, color: Colors.white, marginTop: 5 },
  form: { backgroundColor: Colors.white, borderRadius: 20, padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: Colors.primary },
  input: {
    backgroundColor: '#F0EFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
  link: { color: Colors.primary, textAlign: 'center', marginTop: 15, fontSize: 14 },
});