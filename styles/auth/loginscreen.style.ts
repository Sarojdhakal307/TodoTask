import { StyleSheet } from "react-native";

// Light Mode
export const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f5e9",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2e7d32",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#66a37d",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#a5d6a7",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 13,
    fontSize: 16,
    color: "#2e7d32",
    backgroundColor: "#f1f8f4",
  },
  button: {
    backgroundColor: "#66bb6a",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    color: "#ff4d4f",
    marginBottom: 8,
    fontSize: 14,
  },
  apiErrorText: {
    color: "#d32f2f",
    textAlign: "center",
    marginBottom: 12,
    fontSize: 14,
  },
});

// Dark Mode
export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1f17",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#162a21",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#b9e4c9",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#8fbfa6",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#2f5d49",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 13,
    fontSize: 16,
    color: "#e4fff1",
    backgroundColor: "#1e3a2e",
  },
  button: {
    backgroundColor: "#4caf83",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    color: "#ff6f61",
    marginBottom: 8,
    fontSize: 14,
  },
  apiErrorText: {
    color: "#ff6f61",
    textAlign: "center",
    marginBottom: 12,
    fontSize: 14,
  },
});
