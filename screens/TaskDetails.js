import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

export default function TaskDetails({ route }) {
  const { task } = route.params;
  const headerHeight = useHeaderHeight();

  return (
    <View style={[styles.container, { marginTop: headerHeight + 80, flex: 1 }]}>
      <Text style={styles.title}>{task.title}</Text>

      <Text style={styles.label}>Description:</Text>
      <Text style={styles.text}>{task.description}</Text>

      <Text style={styles.label}>Due Date:</Text>
      <Text style={styles.text}>{task.dueDate}</Text>

      <Text style={styles.label}>Details:</Text>
      <Text style={styles.text}>{task.details}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.text}>
        {task.completed ? "Completed" : "Not Completed"}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color:"#B8860B",
  },
  label: {
    marginTop: 20,
    fontSize: 21,
    fontWeight: "500",
    color:"#CD7F32",
  },
  text: {
    fontSize: 18,
    color:"#B8860B",
  },
});
