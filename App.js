import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  View,
  Modal,
  Pressable,
  TextInput,
  FlatList,
  StatusBar,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const ListTodo = [
  {
    key: 1,
    title: "List Todo ke 1",
    status: "open",
    color: "#97ead2",
  },
  {
    key: 2,
    title: "List Todo ke 2",
    status: "open",
    color: "#8cc7a1",
  },
  {
    key: 3,
    title: "List Todo ke 3",
    status: "open",
    color: "#816e94",
  },
];

export default function App() {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [todoValue, setTodoValue] = useState();
  const randomColor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);

  const createTwoButtonAlert = (key) =>
    Alert.alert("Perhatian", "Apakah ToDo ini sudah selesai ?", [
      {
        text: "Belum",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Selesai", onPress: () => handleCloseStatusTodoItem(key) },
    ]);

  const handleCloseStatusTodoItem = (key) => {
    const tempTodoData = data;

    const updatedListTodo = tempTodoData.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          status: "close",
        };
      }
      return item;
    });

    setData(updatedListTodo);
  };

  const handleAddTodo = () => {
    if (todoValue !== "") {
      const currentData = data;

      const newObject = {
        key: currentData.length + 1,
        title: todoValue,
        status: "open",
        color: randomColor,
      };

      console.log(todoValue);

      setData([...data, newObject]);
      setModalVisible(false);
      setTodoValue("");
    }
  };

  const handleCancelTodo = () => {
    setModalVisible(false);
    setTodoValue("");
  };

  useEffect(() => {
    setData(ListTodo);
  }, []);

  const Item = ({ data }) => (
    <View style={[styles.listTodo, { backgroundColor: data?.color }]}>
      <Text
        onPress={() => createTwoButtonAlert(data?.key)}
        style={styles.title}
      >
        {data?.title}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.filter((item) => item.status === "open")}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={(item) => item.key}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add-circle" size={36} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setTodoValue}
              value={todoValue}
              placeholder="Masukan Todo"
            />
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonCancel, styles.buttonLeft]}
                onPress={() => handleCancelTodo()}
              >
                <Text style={[styles.textStyle, styles.textBlack]}>Batal</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, styles.buttonRight]}
                onPress={() => todoValue !== "" && handleAddTodo()}
              >
                <Text style={styles.textStyleAdd}>Tambah Todo</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listTodo: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "left",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  button: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonCancel: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#fff",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyleAdd: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonLeft: {
    marginRight: 5,
  },
  buttonRight: {
    marginLeft: 5,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  textBlack: {
    color: "black",
  },
});
