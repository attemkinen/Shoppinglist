import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  appStylesheet,
  Text,
  TextInput,
  View,
} from "react-native";
import appStyles from "./styles/appStyles";

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
    <View style={appStyles.container}>
      <TextInput
        style={appStyles.input}
        placeholder="title"
        value={product.title}
        onChangeText={handleTitleChange}
      />
      <TextInput
        style={appStyles.input}
        placeholder="Amount"
        value={product.amount}
        keyboardType="numeric"
        onChangeText={handleAmountChange}
      />
      <View style={appStyles.buttonContainer}>
        <Button title="SAVE" onPress={saveItem} />
        <Button title="CLEAR" onPress={handleClear} />
      </View>
      <Text style={appStyles.resultText}>Ostoslista:</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={appStyles.itemContainer}>
            <Text style={appStyles.itemTitle}>{item.title}</Text>
            <Text style={appStyles.itemAmount}>{item.amount + " kpl"}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString() + (index %2).toString()}
        ItemSeparatorComponent={() => <View style={appStyles.separator} />}
        numColumns={2}
      />
    </View>
  );
}


