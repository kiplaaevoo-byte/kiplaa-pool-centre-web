import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { supabase } from "../services/supabase";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return alert(error.message);

    setUser(data.user);
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text>Login</Text>

      <TextInput placeholder="Email" onChangeText={setEmail} style={{ borderWidth: 1, marginVertical: 10 }} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 10 }} />

      <Button title="Login" onPress={login} />
      <Button title="Go to Register" onPress={() => navigation.navigate("Register")} />
    </View>
  );
}