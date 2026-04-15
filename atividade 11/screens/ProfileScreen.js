import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabase';

export default function ProfileScreen() {
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View>
      <Text>Perfil</Text>

      <TouchableOpacity onPress={logout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}