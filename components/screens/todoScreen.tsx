import { getUserTodos, Todo } from "@/api/todo";
import { darkTheme, lightTheme } from "@/constants/theme";
import { styles } from "@/styles/todo.style";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TodoScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all",
  );
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = useCallback(async () => {
    try {
      setError(null);
      const data = await getUserTodos();
      setTodos(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setInitialLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTodos();
  };

  //Filter for completed incompleted states
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "completed":
        return todos.filter((t) => t.completed);
      case "incomplete":
        return todos.filter((t) => !t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

// Create, toggle and delete todo functions

  const addTodo = () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now(),
      title: newTodo.trim(),
      completed: false,
    };

    setTodos((prev) => [todo, ...prev]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // List item for todo

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={[styles.todoCard, { backgroundColor: theme.card }]}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => toggleTodo(item.id)}
      >
        <View
          style={[
            styles.checkbox,
            { borderColor: theme.primary },
            item.completed && { backgroundColor: theme.primary },
          ]}
        />
        <Text
          style={[
            styles.todoText,
            { color: theme.text },
            item.completed && styles.completedText,
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Text style={{ color: theme.danger, fontSize: 18 }}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  // Loading state and error state handling

  if (initialLoading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.danger }}>{error}</Text>
        <TouchableOpacity
          onPress={fetchTodos}
          style={[styles.retryBtn, { backgroundColor: theme.primary }]}
        >
          <Text style={{ color: "#fff" }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Screen Return
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />

      <Text style={[styles.title, { color: theme.text }]}>My Todos</Text>

      {/* ADD TODO */}
      <View style={styles.inputContainer}>
        <TextInput
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add new todo..."
          placeholderTextColor={theme.secondaryText}
          style={[
            styles.input,
            { backgroundColor: theme.input, color: theme.text },
          ]}
        />
        <TouchableOpacity
          onPress={addTodo}
          style={[styles.addBtn, { backgroundColor: theme.accent }]}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* FILTERS */}
      <View style={styles.filters}>
        {["all", "completed", "incomplete"].map((f) => {
          const active = filter === f;
          return (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f as any)}
              style={[
                styles.filterBtn,
                {
                  backgroundColor: active ? theme.primary : theme.border,
                },
              ]}
            >
              <Text
                style={{
                  color: active ? "#fff" : theme.text,
                  fontWeight: "600",
                  fontSize: 12,
                }}
              >
                {f.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* LIST */}
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}
