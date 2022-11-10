import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { AddButton } from "../images";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserHome({ navigation }) {
  // const [user, setUser] = useState({});
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //console.log('use Effect called s in Todofrom backstack');
      getTodos();
    });
    return unsubscribe;
  }, [navigation]);

  const getTodos = async () => {
    try {
      const value = await AsyncStorage.getItem("todos");
      if (value !== null) {
        // We have data!!
        setTodos(JSON.parse(value));
        // console.log('from AS Todos fetching Saved todos', JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
      // console.log('from AS Todos fetching Saved user ERROR!');
    }
  };

  const handlePending = () => {};

  return (
    <View style={styles.parent}>
      <View style={styles.header}>
        <Text style={styles.hello}>Hello User</Text>
        <TouchableOpacity
          style={styles.wrapperIcon}
          onPress={() => navigation.navigate("AddTodo")}
        >
          <Image source={AddButton} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.category}>
        <TouchableOpacity onPress={handlePending}>
          <Text style={styles.listhead}>Pending</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.listhead}>Completed</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity>
          <Text style={styles.listhead}>Over Due</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.list}>
        <FlatList
          data={todos}
          renderItem={({ item }) => {
            //console.log('inside flat List', item);
            return (
              <View style={styles.todo}>
                <Text style={styles.temp}>{item.title}</Text>
                <Text style={styles.temp}>{item.body}</Text>
                <Text style={styles.temp}>{item.dueDate}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: "center",
    // alignItems:'center'
    // backgroundColor: "#C5C5C5",
  },
  header: {
    flex: 1.5,
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccffff",
  },
  hello: {
    fontSize: 25,
  },
  icon: {
    width: 30,
    height: 30,
  },
  wrapperIcon: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
  category: {
    position: "relative",
    // flex:1,
    // width: "70%",
    flexDirection: "row",
    backgroundColor: "#361f1f",
    justifyContent: "space-evenly",
    // marginLeft:'15%',
    borderRadius: 10,
    height: -10,
  },
  temp: {
    fontSize: 20,
  },

  list: {
    flex: 9,
    // marginHorizontal: 5,
    backgroundColor: "#baab82",
  },
  listhead: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 20,
    color: "#FFFFFF",
  },
  todo: {
    // flex: 1,
    margin: 3,
    borderTopWidth: 1,
    borderStartWidth: 5,
    height: 150,
  },
});
