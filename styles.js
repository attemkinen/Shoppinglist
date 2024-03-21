// styles/appStyles.js
import { StyleSheet } from "react-native";

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 15,
    height: 40,
    width: "95%",
    paddingHorizontal: 8,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginLeft: 10,
    padding: 10,
    width: "90%",
  },
  button: {
    width: "100%",
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
    width: "30%",
    aspectRatio: 1,
    margin: 2,
    borderColor: "black",
    justifyContent: "center",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
  },
  itemAmount: {
    fontSize: 14,
    color: "gray",
  },
  deleteButton: {
    backgroundColor: "transparent", 
    padding: 0, 
    margin: 0,
  },
});

export default appStyles;
