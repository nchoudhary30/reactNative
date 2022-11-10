import React, { useState, useEffect} from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { Calendarr } from "../images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Realm from "realm";


export default function AddTodo({navigation}) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [place, setPlace] = useState(true);
  const [dueDate, setDueDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // const [realm, setRealm] = useState(null);
  // const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const realm = await Realm.open({
  //       path: 'myrealm1',
  //       schema: [TodoSchema],
  //     }).then(realm => {
  //       // load data in the database...
  //       const todos = realm.objects('Todo');

  //       // set variable for tasks read from database
  //       setTodos([...todos]);

  //       // get realm instance to use later in app
  //       setRealm(realm);

  //       // set up listener to update task list when the
  //       // data is updated
  //       try {
  //         todos.addListener(() => {
  //           setTodos([...todos]);
  //         });
  //       } catch (error) {
  //         console.error(`Error updating todos: ${error}`);
  //       }
  //     });
  //   })();
  // }, []);

//   getId=(model)=>{
//     if (realm .objects(model).max("_id")) {
//       return realm.objects(model).max("_id") + 1;
//     }
//     return 1;
// }

//   let todo;
//   const addTodo = () => {
//     realm.write(() => {
//       todo = realm.create('Todo', {
//         _id: getId(Todo),
//         name: title,
//         body: body,
//         dueDate: dueDate,
//       });
//     });

//     setTitle('');
//     setBody('');
//     setDueDate('');
//   };

  const handleSave = async() =>{
    const data = await AsyncStorage.getItem('todos');
    const todos = JSON.parse(data);
 
    // console.log("Title and Due_Date are Here",title,body)
    if(title){
    todos.push({
      title: title,
      body: body,
      dueDate:dueDate,
    });
    // console.log(todos, 'add form');
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
    setTitle('');
    setBody('');
    setDueDate(new Date());

    alert("Saved");
    navigation.navigate('UserHome');
  }
  else {
    alert("Please provide title")
  }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add a Todo</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Title"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Body"
          placeholderTextColor="#003f5c"
          onChangeText={(body) => setBody(body)}
        />
      </View>
      <View style={styles.inputView}>
      <TextInput
          style={styles.TextInput}
          value={place?"Select due date":dueDate.toDateString()}
          // placeholder={place?"select due date"}
          placeholderTextColor="#003f5c"
        />
        <TouchableOpacity
          style={styles.wrapperIcon}
          onPress={() => setOpen(true)}
        >
          <DatePicker
        modal
        mode="datetime"
        minimumDate={new Date(Date.now())} 
        open={open}
        date={dueDate}
        onConfirm={(date) => {
          setOpen(false)
          setDueDate(date)
          setPlace(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        onDateChange={(date)=>{
          setDueDate(date)
        }}
      /> 
          <Image source={Calendarr} style={styles.icon} />
        </TouchableOpacity>
        
      </View>
      <Button title="Save" onPress={handleSave}/>
      <Button title="Back" onPress={()=>navigation.navigate('UserHome')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  date: {
    marginVertical: 20,
    backgroundColor:'red',
    // flex: 0.2,
    flexDirection: "row",
    alignContent: "space-between",
  },

  heading: {
    flex: 0.3,
    fontSize: 40,
  },
  wrapperIcon: {
    position: "absolute",
    right: 0,
    padding: 10,
  },

  icon: {
    width: 25,
    height: 20,
// marginLeft:10,
  },
  inputView: {
    // flex:1,
    borderRadius: 10,
    backgroundColor: "#b3b3cc",
    width: "70%",
    height: 45,
    marginBottom: 20,
    // alignItems: 'center',
  },

  TextInput: {
    height: 50,
    // flex: 1,
    padding: 10,
    marginLeft: 20,
  },
});
