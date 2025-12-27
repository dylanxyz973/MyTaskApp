import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TaskContext } from "../TaskContext";

export default function AddTask({ navigation }) {
  const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");   
  const [dueDate, setDueDate] = useState("");   


  function handleAdd() {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedDetails = details.trim();
    const trimmedDueDate = dueDate.trim();
    if (!trimmedTitle && !trimmedDescription) return;
    
    addTask({
      title: trimmedTitle,
      description: trimmedDescription,   
      dueDate: trimmedDueDate || "No due date",
      completed: false,
      details: trimmedDetails,
    });

    setTitle("");
    setDescription("");
    setDetails("");
    setDueDate("");
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
        placeholderTextColor="#5C4033"
        style={[styles.input, { marginTop: 16 }]}
        returnKeyType="done"
      />

      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        placeholderTextColor="#5C4033"
        style={[styles.input, { height: 80 }]} 
        multiline
        returnKeyType="done"
      />

      <TextInput
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="Enter due date (e.g. 10-12-2025)"
        placeholderTextColor="#5C4033"
        style={styles.input}
      />

      <TextInput
        value={details}
        onChangeText={setDetails}
        placeholder="Enter task details (optional)"
        placeholderTextColor="#5C4033"
        style={[styles.input, { height: 100 }]}
        multiline
        returnKeyType="done"
      />

      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.addBtnText}>Save Task</Text>
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
    borderWidth: 1.5,
    borderColor: "#CD7F32",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    color:"#B8860B",
  },

  addBtn: {
    backgroundColor: "#008000",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  addBtnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
