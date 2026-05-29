import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>WELCOME</Text>
      <Text>{user?.email}</Text>

      <Button title="Wallet" onPress={() => navigation.navigate("Wallet")} />
      <Button title="Match" onPress={() => navigation.navigate("Match")} />
    </View>
  );
}