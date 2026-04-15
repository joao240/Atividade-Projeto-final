import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabase';

export default function TaskScreen() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
    loadTasks();
  };

  const loadTasks = async () => {
    const { data } = await supabase.from('tarefas').select('*');
    setTasks(data || []);
  };

  const addTask = async () => {
    if (!title) return;

    await supabase.from('tarefas').insert([
      { titulo: title, user_id: user.id, concluida: false }
    ]);

    setTitle('');
    loadTasks();
  };

  const toggleTask = async (task) => {
    await supabase
      .from('tarefas')
      .update({ concluida: !task.concluida })
      .eq('id', task.id);

    loadTasks();
  };

  const deleteTask = async (id) => {
    await supabase.from('tarefas').delete().eq('id', id);
    loadTasks();
  };

  return (
    <View>
      <Text>Tarefas</Text>

      <TextInput placeholder="Nova tarefa" onChangeText={setTitle} />

      <TouchableOpacity onPress={addTask}>
        <Text>Adicionar</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text onPress={() => toggleTask(item)}>
              {item.concluida ? '✔' : '○'} {item.titulo}
            </Text>

            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}