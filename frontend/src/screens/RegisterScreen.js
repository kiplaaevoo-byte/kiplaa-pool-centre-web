import React, {
  useState
} from "react";

import {
  View,
  TextInput,
  Button,
  Text
} from "react-native";

import { supabase }
from "../services/supabase";

export default function RegisterScreen({
  navigation
}) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const register = async () => {

    const {
      error
    } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Registration successful");

    navigation.navigate("Login");
  };

  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20
      }}
    >

      <Text
        style={{
          fontSize: 28,
          marginBottom: 20
        }}
      >
        Register
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          marginBottom: 20,
          padding: 10
        }}
      />

      <Button
        title="Register"
        onPress={register}
      />

    </View>

  );
}