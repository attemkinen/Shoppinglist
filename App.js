import { database, ref, push, onValue, remove } from "./firebase";
import { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import HeaderComponent from "./header";
import appStyles from "./styles";
import { Icon } from "@rneui/themed";
import { Input, Button } from "@rneui/themed";

export default function App() {
  const [product, setProduct] = useState({
    title: "",
    amount: "",
  });
  const [items, setItems] = useState([]);

  const saveItem = () => {
    push(ref(database, "items/"), product);
  };

  useEffect(() => {
    const itemsRef = ref(database, "items/");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.keys(data).map(key => ({ ...data[key], id: key }));
        setItems(itemsArray);
      } else {
        setItems([]);
      }
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

  const deleteItem = (itemId) => {
    const itemRef = ref(database, `items/${itemId}`);
    
    remove(itemRef)
      .then(() => {
        console.log('Item deleted successfully');
        // Päivitä tila hakemalla uudet tiedot
        const updatedItems = items.filter(item => item.id !== itemId);
        setItems(updatedItems);
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  };

  return (
    <View style={appStyles.container}>
      <HeaderComponent />
      <Input
        style={appStyles.input}
        label="Product"
        placeholder="Product"
        value={product.title}
        onChangeText={handleTitleChange}
      />
      <Input
        style={appStyles.input}
        label="Amount"
        placeholder="Amount"
        value={product.amount}
        onChangeText={handleAmountChange}
      />
      <View style={appStyles.buttonContainer}>
        <Button
          raised
          icon={{ name: "save" }}
          onPress={saveItem}
          title="SAVE"
          buttonStyle={appStyles.button}
        />
      </View>

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={appStyles.itemContainer}>
            <Text style={appStyles.itemTitle}>{item.title}</Text>
            <Text style={appStyles.itemAmount}>{item.amount}</Text> 
            <Button onPress={() => deleteItem(item.id)} raised icon={{name: "delete", color: "red"}} buttonStyle={appStyles.deleteButton}/> 
          </View>
        )}
        keyExtractor={(item, index) =>
          index.toString() + (index % 3).toString()
        }
        ItemSeparatorComponent={() => <View style={appStyles.separator} />}
        numColumns={3}
      />
    </View>
  );
}
