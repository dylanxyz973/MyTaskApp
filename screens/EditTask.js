import React, { useContext, useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TaskContext } from "../TaskContext";

export default function EditTask({ navigation, route }) {
  const { id } = route.params;
  const { tasks, updateTask } = useContext(TaskContext);

  const taskToEdit = tasks.find((t) => t.id === id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDetails(taskToEdit.details || "");   
      setDueDate(taskToEdit.dueDate);
    }
  }, [taskToEdit]);

  function handleSave() {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedDetails = details.trim();
    const trimmedDueDate = dueDate.trim();

    if (!trimmedTitle || !trimmedDescription || !trimmedDueDate) return;

    updateTask(id, {
      title: trimmedTitle,
      description: trimmedDescription,
      details: trimmedDetails,   
      dueDate: trimmedDueDate,
    });

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Edit task title"
        placeholderTextColor="#5C4033"
        style={[styles.input, { marginTop: 16 }]}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Edit task description"
        placeholderTextColor="#5C4033"
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <TextInput
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="Edit due date (e.g. 10-12-2025)"
        placeholderTextColor="#5C4033"
        style={styles.input}
      />
      
      <TextInput
        value={details}
        onChangeText={setDetails}
        placeholder="Edit task details if have"
        placeholderTextColor="#5C4033"
        style={[styles.input, { height: 100 }]}
        multiline
        returnKeyType="done"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 100,
    backgroundColor: "transparent",
  },

  input: {
    borderWidth: 1,
    borderColor: "#CD7F32",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    color:"#B8860B",
  },

  saveBtn: {
    backgroundColor: "#008000",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  saveBtnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
