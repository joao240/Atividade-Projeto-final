import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://SUA_URL.supabase.co',
  'SUA_CHAVE_ANON'
);

function TelaLista() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const buscarProdutos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setProdutos(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Produtos</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1976d2" />
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          refreshing={loading}
          onRefresh={buscarProdutos}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

function TelaAdicionar() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [loading, setLoading] = useState(false);

  const inserirProduto = async () => {
    if (!nome || !preco) return;

    try {
      setLoading(true);

      const { error } = await supabase.from('produtos').insert([
        {
          nome: nome,
          preco: parseFloat(preco)
        }
      ]);

      if (error) throw error;

      alert('Produto inserido com sucesso!');
      setNome('');
      setPreco('');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar Produto</Text>

      <TextInput
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={inserirProduto}>
        <Text style={styles.buttonText}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lista" component={TelaLista} />
        <Tab.Screen name="Adicionar" component={TelaAdicionar} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5'
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  preco: {
    fontSize: 16,
    color: '#1976d2',
    marginTop: 5
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#1976d2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});