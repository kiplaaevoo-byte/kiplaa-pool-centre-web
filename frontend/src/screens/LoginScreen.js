import React, {
  useState,
  useContext
} from "react";

import {
  View,
  TextInput,
  Button,
  Text
} from "react-native";

import { supabase }
from "../services/supabase";

import {
  AuthContext
}
from "../context/AuthContext";

export default function LoginScreen({
  navigation
}) {

  const { login } =
    useContext(AuthContext);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    login(data.user);

    navigation.navigate("Home");
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
        Login
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
        title="Login"
        onPress={handleLogin}
      />

      <Button
        title="Go To Register"
        onPress={() =>
          navigation.navigate("Register")
        }
      />

    </View>

  );
}