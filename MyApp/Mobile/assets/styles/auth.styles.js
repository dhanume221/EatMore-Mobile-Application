import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    marginBottom: 150,
    paddingTop: 1
  },
  curvedView: {
    width: "100%",
    height: "200px",
    backgroundColor: "#4CAF50",
    position: 'relative',
    borderRadius: 50
  },
  illustration: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 110,
    height: 110
  },
  illustrationIn: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    marginVertical: 15,
    textAlign: "center",
  },
  titles: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginVertical: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 16,
    color: COLORS.text,
    textAlign: "left"
  },
  errorInput: {
    borderColor: COLORS.expense,
  },
  button: {
    backgroundColor: "#3b748eff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  buttonSignup: {
    backgroundColor: "#e96417ff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    color: COLORS.text,
    fontSize: 16,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  blurBox: {
    marginLeft:10,
    width: 350,
    padding: 20,
    paddingBottom: 60,
    paddingTop: 55,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  blurBoxs: {
    width: 350,
    padding: 20,
    paddingBottom: 25,
    paddingTop: 55,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  verificationContainer: {
    flex: 1,
    padding: 20,
    marginTop: 160,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: "center",
  },
  verificationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 20,
    textAlign: "center",
  },
  verificationTitleSignup: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 70,
    marginBottom: 20,
    textAlign: "center",
  },
  verificationInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    paddingTop: 20,
    marginBottom: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 16,
    color: COLORS.text,
    width: "100%",
    textAlign: "left",
    letterSpacing: 0,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    marginTop: 10,
  },

  //error styles
  errorBox: {
    backgroundColor: "#FFE5E5",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.expense,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  errorText: {
    color: COLORS.text,
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
});