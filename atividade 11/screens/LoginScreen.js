import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    await supabase.auth.signInWithPassword({ email, password });
  };

  return (
    <View>
      <Text>Login</Text>

      <TextInput placeholder="Email" onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Senha" onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity onPress={login}>
        <Text>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}