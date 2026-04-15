import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function InfoAuth() {
  return (
    <View style={styles.container}>
      
      <View style={styles.card}>
        <Text style={styles.title}>🔐 Autenticação com JWT</Text>

        <Text style={styles.step}>
          1️⃣ O usuário faz login com email e senha
        </Text>

        <Text style={styles.step}>
          2️⃣ O servidor valida e retorna um token (JWT)
        </Text>

        <Text style={styles.step}>
          3️⃣ O app envia o token em cada requisição para provar identidade
        </Text>
      </View>

      <Text style={styles.footer}>
        🔵 Supabase Auth gerencia login, cadastro e segurança com JWT de forma simples e segura.
      </Text>

    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="InfoAuth" 
          component={InfoAuth} 
          options={{ title: 'Info Auth' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 25,
    borderRadius: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    color: '#38bdf8',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  step: {
    color: '#e2e8f0',
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
  },
});