import { StyleSheet } from "react-native";

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
    color: "#2e7d32", // dark green
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
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  forgotText: {
    color: "#4caf50",
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#6d907a",
    fontSize: 14,
  },
  signupText: {
    color: "#2e7d32",
    fontSize: 14,
    fontWeight: "600",
  },
});

export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1f17", // deep green-black
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
    color: "#062017",
    fontSize: 18,
    fontWeight: "600",
  },
  forgotText: {
    color: "#7fd3a6",
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#9bbfb0",
    fontSize: 14,
  },
  signupText: {
    color: "#b9e4c9",
    fontSize: 14,
    fontWeight: "600",
  },
});
