import React, { useState, useRef } from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  // Different method to clear the input
  const todoInput = useRef(null);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    // tasks.push({ task, isCompleted: false }); Isn't good practice ig
    Keyboard.dismiss();
    setTasks([...tasks, task]);
    // setTask("");
    todoInput.current.clear();
  };

  const checkOffItems = (index) => {
    let itemsCopy = [...tasks];
    itemsCopy.splice(index, 1);
    setTasks(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* Today's tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {tasks.map((task, index) => (
            <TouchableOpacity key={index} onPress={() => checkOffItems(index)}>
              <Task text={task} key={index} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardWrapper}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Write a Task"
          onChangeText={(text) => setTask(text)}
          value={task}
          ref={todoInput}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addTaskWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaed",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  keyboardWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textInput: {
    paddingVertical: 10,
    maxWidth: 250,
    paddingHorizontal: 15,
    borderRadius: 25,
    borderColor: "#d6d6d6",
    borderWidth: 1,
    width: "100%",
    marginLeft: 12,
    backgroundColor: "white",
  },
  addTaskWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderColor: "#d6d6d6",
    borderWidth: 1,
  },
  addText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
