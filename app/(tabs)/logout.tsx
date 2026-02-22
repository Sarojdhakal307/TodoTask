import { clearTokens } from "@/lib/authLib";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../AuthContext";

export default function LogoutScreen() {
  const [loggingOut, setLoggingOut] = useState(false);
  const { logout } = useAuth();
  const logOut = async () => {
    try {
      setLoggingOut(true);
      await clearTokens();
      logout();
      router.replace("/auth/login");
    } catch (error) {
      setLoggingOut(false);
    }
  };

  return (
    <View style={styles.container}>
      {loggingOut ? (
        <>
          <ActivityIndicator size="large" />
          <Text style={styles.text}>Logging out...</Text>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={logOut}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "#368a34",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
