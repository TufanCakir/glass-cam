import { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import styles from "../styles/TodoStyles";
import TaskItem from "../components/TaskItem";
import { loadTasks, saveTasks } from "../utils/storage";
import isValidDate from "../utils/dateValidator";
import Footer from "../components/Footer";

export default function TodoScreen() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("mittel");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // Aufgaben beim ersten Rendern laden
  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      const saved = await loadTasks();
      if (saved) setTasks(saved);
      setLoading(false);
    }
    fetchTasks();
  }, []);

  // Tasks immer speichern, wenn sich tasks ändern
  useEffect(() => {
    if (!loading) saveTasks(tasks);
  }, [tasks, loading]);

  const handleAddTask = useCallback(() => {
    if (task.trim() === "") {
      Alert.alert("Hinweis", "Die Aufgabe darf nicht leer sein!");
      return;
    }
    if (!isValidDate(dueDate)) {
      Alert.alert(
        "Fehler",
        "Bitte ein gültiges Datum im Format TT.MM.JJJJ eingeben."
      );
      return;
    }
    let updatedTasks;
    if (editIndex !== null) {
      updatedTasks = [...tasks];
      updatedTasks[editIndex] = { text: task, done: false, priority, dueDate };
      setEditIndex(null);
    } else {
      updatedTasks = [...tasks, { text: task, done: false, priority, dueDate }];
    }
    setTasks(updatedTasks);
    setTask("");
    setPriority("mittel");
    setDueDate("");
  }, [task, dueDate, priority, editIndex, tasks]);

  const handleToggleDone = useCallback(
    (index) => {
      const updatedTasks = [...tasks];
      updatedTasks[index].done = !updatedTasks[index].done;
      setTasks(updatedTasks);
    },
    [tasks]
  );

  const handleEditTask = useCallback(
    (index) => {
      setTask(tasks[index].text);
      setPriority(tasks[index].priority);
      setDueDate(tasks[index].dueDate);
      setEditIndex(index);
    },
    [tasks]
  );

  const handleDeleteTask = useCallback(
    (index) => {
      Alert.alert("Löschen", "Möchtest du diese Aufgabe wirklich löschen?", [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Löschen",
          style: "destructive",
          onPress: () => {
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
            if (editIndex === index) {
              setEditIndex(null);
              setTask("");
              setPriority("mittel");
              setDueDate("");
            }
          },
        },
      ]);
    },
    [tasks, editIndex]
  );

  const sortedTasks = useMemo(() => {
    const priorityOrder = { hoch: 3, mittel: 2, niedrig: 1 };
    return [...tasks].sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  }, [tasks]);

  const renderItem = useCallback(
    ({ item, index }) => (
      <TaskItem
        item={item}
        index={index}
        onToggleDone={handleToggleDone}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        isEditing={editIndex === index}
      />
    ),
    [handleToggleDone, handleEditTask, handleDeleteTask, editIndex]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.title}>📝 Todo-Liste</Text>

          <View
            style={[
              styles.inputContainer,
              editIndex !== null && styles.editMode,
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Aufgabe eingeben"
              placeholderTextColor="#888"
              value={task}
              onChangeText={setTask}
              editable={!loading}
              returnKeyType="done"
              accessibilityLabel="Neue Aufgabe"
            />
            <TextInput
              style={styles.input}
              placeholder="Fälligkeitsdatum (TT.MM.JJJJ)"
              placeholderTextColor="#888"
              value={dueDate}
              onChangeText={(text) => setDueDate(text.replace(/,/g, "."))}
              keyboardType="numeric"
              editable={!loading}
              accessibilityLabel="Fälligkeitsdatum"
              maxLength={10}
            />
            <View style={styles.priorityButtons}>
              {["hoch", "mittel", "niedrig"].map((level, i) => (
                <TouchableOpacity
                  key={level}
                  onPress={() => setPriority(level)}
                  style={[
                    styles.priorityBtn,
                    priority === level && styles.activePriorityBtn,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Priorität ${level} auswählen`}
                >
                  <Text
                    style={[
                      styles.priority,
                      priority === level && styles.activePriority,
                    ]}
                  >
                    {level === "hoch"
                      ? "🔴 Hoch"
                      : level === "mittel"
                      ? "🟡 Mittel"
                      : "🔵 Niedrig"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[
                styles.addButton,
                editIndex !== null && styles.updateButton,
              ]}
              onPress={handleAddTask}
              disabled={loading}
              accessibilityRole="button"
              accessibilityLabel={
                editIndex !== null
                  ? "Aufgabe aktualisieren"
                  : "Aufgabe hinzufügen"
              }
            >
              <Text style={styles.addButtonText}>
                {editIndex !== null
                  ? "Aufgabe aktualisieren"
                  : "Aufgabe hinzufügen"}
              </Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#3498db"
              style={{ marginTop: 40 }}
            />
          ) : (
            <FlatList
              data={sortedTasks}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={styles.listContainer}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Keine Aufgaben vorhanden.</Text>
              }
              keyboardShouldPersistTaps="handled"
            />
          )}

          <Footer />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
