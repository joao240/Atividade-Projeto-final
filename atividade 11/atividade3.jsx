import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createClient } from '@supabase/supabase-js';

// 🔥 COLOQUE SUAS CREDENCIAIS AQUI
const supabase = createClient(
  'https://SUA_URL.supabase.co',
  'SUA_ANON_KEY'
);

function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const fazerLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha email e senha!');
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      setLoading(false);

      if (error) {
        Alert.alert('Erro de login', error.message);
        return;
      }

      // ✅ LOGIN OK
      Alert.alert('Bem-vindo!', `Login realizado com sucesso, ${email}`);

      console.log('JWT TOKEN:', data.session?.access_token);
    } catch (err) {
      setLoading(false);
      Alert.alert('Erro inesperado', 'Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Login</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.disabled]}
          onPress={fazerLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🧭 Navegação
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={TelaLogin}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#38bdf8',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 12,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#64748b',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});