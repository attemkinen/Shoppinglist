import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDdXbCF3ZamYOn5svzQ1qczcPuafgkkvnw",
    authDomain: "shoppinglist-d4b4e.firebaseapp.com",
    databaseURL:
      "https://shoppinglist-d4b4e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shoppinglist-d4b4e",
    storageBucket: "shoppinglist-d4b4e.appspot.com",
    messagingSenderId: "283182755323",
    appId: "1:283182755323:web:72e55d5836baa2ef4a2f5e",
    measurementId: "G-27QFDX7HCT",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  ref(database, "items/");

  const [product, setProduct] = useState({
    title: "",
    amount: "",
  });
  const [items, setItems] = useState([]);

  const saveItem = () => {
    push(ref(database, "items/"), product);
  };

  const handleClear = () => {
    setItems([]);
  };

  useEffect(() => {
    const itemsRef = ref(database, "items/");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      setItems(Object.values(data));
    });
  }, []);

  const handleTitleChange = (text) => {
    setProduct((prevState) => ({
      ...prevState,
      title: text,
    }));
  };

  const handleAmountChange = (text) => {
    setProduct((prevState) => ({
      ...prevState,
      amount: text,
    }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="title"
        value={product.title}
        onChangeText={handleTitleChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={product.amount}
        keyboardType="numeric"
        onChangeText={handleAmountChange}
      />
      <View style={styles.buttonContainer}>
        <Button title="SAVE" onPress={saveItem} />
        <Button title="CLEAR" onPress={handleClear} />
      </View>
      <Text style={styles.resultText}>Ostoslista:</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemAmount}>{item.amount + " kpl"}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 100,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 8,
    width: "80%",
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginLeft: 10,
    padding: 10,
    width: 150,
  },
  resultText: {
    fontSize: 20,
    marginTop: 16,
    color: "blue",
  },
  FlatlistContainer: {
    color: "blue",
  },
  itemContainer: {
    padding: 10,
    backgroundColor: "#FFF",
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE", 
  },
});
