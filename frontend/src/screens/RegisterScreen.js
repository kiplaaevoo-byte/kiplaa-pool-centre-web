import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { supabase } from "../services/supabase";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) return alert(error.message);

    alert("Account created");
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text>Register</Text>

      <TextInput placeholder="Email" onChangeText={setEmail} style={{ borderWidth: 1, marginVertical: 10 }} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 10 }} />

      <Button title="Register" onPress={register} />
    </View>
  );
}