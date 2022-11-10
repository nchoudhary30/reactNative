import React from "react";
import { StyleSheet} from "react-native";
import AddTodo from "./components/AddTodo";
import Login from "./components/Login";
import UserHome from "./components/UserHome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const stack = createNativeStackNavigator();

export default function App() {
  AsyncStorage.setItem('todos', JSON.stringify([]));
  
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Login" component={Login}/>
        
        <stack.Screen name="AddTodo" component={AddTodo}/>

        <stack.Screen name="UserHome" component={UserHome}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});