import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { TaskProvider } from "./TaskContext";
import TaskList from "./screens/TaskList";
import AddTask from "./screens/AddTask";
import EditTask from "./screens/EditTask";
import TaskDetails from "./screens/TaskDetails";

const Stack = createNativeStackNavigator();

const TransparentTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
    card: "transparent",
    border: "transparent",
  },
};

export default function App() {
  return (
    <TaskProvider>
      <View style={styles.root}>
        <LinearGradient
          colors={[
            "#FFECF0",
            "#FFF9E6",
            "#E8FFF0",
            "#E8F4FF",
            "#F5E9FF",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        <NavigationContainer theme={TransparentTheme}>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator
              screenOptions={{
                headerTransparent: true,   
                headerShadowVisible: false,
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 32,
                  fontWeight: "700",
                  color: "#D29EA6",
                },
                contentStyle: {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Stack.Screen name="TaskList" component={TaskList} options={{ title: "MyTaskApp" }} />
              <Stack.Screen name="AddTask" component={AddTask} options={{ title: "Add Task" }} />
              <Stack.Screen name="EditTask" component={EditTask} options={{ title: "Edit Task" }} />
              <Stack.Screen name="TaskDetails" component={TaskDetails} options={{ title: "Task Details" }} />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </View>
    </TaskProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1,
  },
});
