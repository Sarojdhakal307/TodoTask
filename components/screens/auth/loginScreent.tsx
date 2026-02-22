import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from "react-native";

import { useAuth } from "@/app/AuthContext";
import { darkStyles, lightStyles } from "@/styles/auth/loginscreen.style";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "./schema";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = isDark ? darkStyles : lightStyles;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    Keyboard.dismiss();
    setApiErrorMessage(null);
    setIsPending(true);

    try {
      await login(data.email); // using AuthContext login
    } catch (error: any) {
      setApiErrorMessage(error.message || "Login failed");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Login to your account</Text>

              {/* EMAIL */}
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor={isDark ? "#9bbfb0" : "#7fbf9b"}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={value}
                      onChangeText={onChange}
                      returnKeyType="next"
                    />
                    {errors.email && (
                      <Text style={{ color: "red", marginBottom: 8 }}>
                        {errors.email.message}
                      </Text>
                    )}
                  </>
                )}
              />

              {/* PASSWORD */}
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange } }) => (
                  <>
                    <View style={{ position: "relative" }}>
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={isDark ? "#9bbfb0" : "#7fbf9b"}
                        secureTextEntry={!showPassword}
                        value={value}
                        onChangeText={onChange}
                        returnKeyType="done"
                        onSubmitEditing={handleSubmit(onSubmit)}
                      />

                      <TouchableOpacity
                        style={{ position: "absolute", right: 10, top: 25 }}
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Feather
                          name={showPassword ? "eye" : "eye-off"}
                          size={20}
                          color={isDark ? "#9bbfb0" : "#7fbf9b"}
                        />
                      </TouchableOpacity>
                    </View>

                    {errors.password && (
                      <Text style={{ color: "red", marginBottom: 8 }}>
                        {errors.password.message}
                      </Text>
                    )}
                  </>
                )}
              />

              {/* API ERROR */}
              {apiErrorMessage && (
                <Text
                  style={{
                    color: "#ff4d4f",
                    textAlign: "center",
                    marginBottom: 12,
                    fontSize: 14,
                  }}
                >
                  {apiErrorMessage}
                </Text>
              )}

              {/* BUTTON */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
                disabled={isPending}
              >
                {isPending ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
