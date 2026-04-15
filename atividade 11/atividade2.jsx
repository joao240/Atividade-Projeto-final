import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { createClient } from '@supabase/supabase-js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const supabase = createClient(
  'https://SUA_URL.supabase.co',
  'SUA_CHAVE_ANON'
);

function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const fazerLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Erro de Login', error.message);
      return;
    }

    Alert.alert('Sucesso', 'Login realizado com sucesso!');

    // JWT disponível aqui:
    console.log('TOKEN JWT:', data.session?.access_token);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TaskApp</Text>
      <Text style={styles.subtitulo}>Faça login para continuar</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.botao, loading && styles.botaoDisabled]}
          onPress={fazerLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBotao}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={TelaLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1976d2',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#1976d2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoDisabled: {
    backgroundColor: '#90caf9',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});