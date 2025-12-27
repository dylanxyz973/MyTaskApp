import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskContext } from "../TaskContext";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";

export default function TaskList({ navigation }) {
  const { tasks, setTasks, deleteTask, toggleTask } = useContext(TaskContext);
  const headerHeight = useHeaderHeight();

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    async function load() {
      const saved = await AsyncStorage.getItem("tasks");
      if (saved) setTasks(JSON.parse(saved));
    }
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    applyFilters(tasks, search);
  }, [tasks]);

  useEffect(() => {
    applyFilters(tasks, search);
  }, [search]);

  function applyFilters(list, searchValue) {
    let data = [...list];

    if (searchValue.trim() !== "") {
      const text = searchValue.toLowerCase();
      data = data.filter(
        (t) =>
          t.title.toLowerCase().includes(text) ||
          t.description.toLowerCase().includes(text)
      );
    }
    setFiltered(data);
  }

  function showSummary() {
    const total = tasks.length;
    const completed = tasks.filter((t) => Boolean(t.completed)).length;
    const incomplete = total - completed;
    const percent = total === 0 ? 0 : (completed / total) * 100;
    const percentStr = percent.toFixed(1);

    Alert.alert(
      "Overall Status",
      `Completed Tasks: ${completed}\nIncomplete Tasks: ${incomplete}\n${percentStr}% of tasks complete`,
      [{ text: "OK" }]
    );
  }

  function renderItem({ item }) {
  return (
    <LinearGradient
      colors={["#FFB7C5", "#FFE29A", "#A8F5C8", "#9FD4FF", "#D9B3FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardGradient}
    >
      <View style={styles.cardInner}>
        <Pressable
          onPress={() => toggleTask(item.id)}
          android_ripple={{ color: "#e6e6e6" }}
          style={styles.cardContent}
        >
          <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
            {item.title}
          </Text>

          <Text style={styles.descriptionText}>{item.description}</Text>

          <Text style={styles.statusText}>
            {item.completed ? "Completed" : "Not Complete"}
          </Text>

          <Text style={styles.dueDateText}>
            Due: {item.dueDate || "No due date"}
          </Text>

          <View style={styles.bottomRow}>
            <Pressable
              onPress={() => navigation.navigate("TaskDetails", { task: item })}
              style={styles.moreDetailsWrapper} 
            >
              <Text style={styles.moreDetails}>More Details</Text>
            </Pressable>

            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => navigation.navigate("EditTask", { id: item.id })}
              >
                <Text style={styles.btnText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() =>
                  Alert.alert("Delete !", "Are you sure you want to delete this task?", [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => deleteTask(item.id),
                    },
                  ])
                }
              >
                <FontAwesome5 name="trash" size={20} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          </View>

        </Pressable>
      </View>
    </LinearGradient>
  );
}

  return (
    <View style={styles.container}>
      <View style={{ marginTop: headerHeight, zIndex: 20 }}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search tasks..."
          value={search}
          onChangeText={setSearch}
          pointerEvents="auto"
        />
      </View>

      <View style={styles.listContainer}>
        {filtered.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {search.trim().length > 0
                ? "No tasks match your search."
                : "No tasks yet... Add one to get started!"}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingTop: 60, paddingBottom: 150 }}
          />
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate("AddTask")}
        >
          <Text style={styles.primaryBtnText}>Add Task</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={showSummary}>
          <Text style={styles.secondaryBtnText}>Overall Summary</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingBottom: 30,
  },

  searchBar: {
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#71706E",
    fontSize: 16,
    fontWeight: "bold",              
  },

  listContainer: {
    flex: 1,
  },

  cardGradient: {
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#B8860B",
  },

  cardInner: {
    borderRadius: 12,
  },

  cardContent: {
    flexDirection: "column",    
    alignItems: "flex-start",    
    justifyContent: "flex-start", 
    padding: 14,
  },

  taskText: {
    fontSize: 26,
    fontWeight: "600",
    color: "#5C4033",
  },

  taskCompleted: {
    textDecorationLine: "line-through",
    color: "#5C4033",
  },

  statusText: {
    marginTop: 6,
    fontSize: 16,
    color: "#5C4033",
  },

  descriptionText: {
    fontSize: 17,               
    color: "#5C4033",
    marginTop: 4,
    flexWrap: "wrap",
  },

  dueDateText: {
    marginTop: 4,
    fontSize: 16,
    color: "#5C4033",
  },

  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  
  moreDetailsWrapper: {
    flex: 1, 
  },

  bottomRow: {
    flexDirection: "row", 
    alignItems: "center",
    marginTop: 10,
  },

  editBtn: {
    backgroundColor: "#fff44f",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
    fontSize: 16,
  },

  deleteBtn: {
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteIcon: {
    color: "red",
    opacity: 0.9,
  },

  btnText: {
    color: "#d90166",
    fontWeight: "600",
    fontSize: 16,
  },

  footer: {
    padding: 16,
  },

  moreDetails: {
    color: "#007BFF", 
    fontWeight: "bold", 
    fontSize: 18 
  },

  primaryBtn: {
    backgroundColor: "#FFC000",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },

  primaryBtnText: {
    color: "#5C4033",
    fontWeight: "700",
    fontSize: 18,
  },

  secondaryBtn: {
    backgroundColor: "#1f78d1",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  secondaryBtnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#555",
    fontSize: 20,
  },
});