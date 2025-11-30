import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { styles } from "../../assets/styles/auth.styles";
import { COLORS } from '../../assets/constants/colors';
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';


export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [resendCountdown, setResendCountdown] = useState(0)
  const [canResend, setCanResend] = useState(false)


  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email provided
    try {
      await signUp.create({
        emailAddress
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)

      // Start countdown for resend option
      setResendCountdown(30)
      setCanResend(false)
      const countdownInterval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval)
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log('Verification error:', err);
      console.error('Error message:', err.message);
      console.error('Error name:', err.name);

      if (err.name === 'TypeError') {
        alert(err.message);
      } else {
        alert('Verification failed. Please try again.');
      }
    }
  }

  // Handle resend verification code
  const onResendPress = async () => {
    if (!isLoaded || !canResend) return

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Reset countdown
      setResendCountdown(30)
      setCanResend(false)
      const countdownInterval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval)
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      alert('Verification code sent! Check your email.')
    } catch (err) {
      console.error('Resend error:', err)
      alert('Failed to resend verification code. Please try again.')
    }
  }

  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your email</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#9A8478"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onResendPress}
          disabled={!canResend}
          style={{ marginTop: 20 }}
        >
          <Text style={{
            color: canResend ? '#2E7D32' : '#9A8478',
            fontSize: 16,
            textAlign: 'center'
          }}>
            {canResend ? 'Resend verification code' : `Resend in ${resendCountdown}s`}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (

    <View style={{ display: 'flex', flexDirection: 'row', flex: 1, alignContent: "center", justifyContent: "center" }}>
      <ImageBackground source={require("../../assets/images/signupbg.jpg")} style={{ flex: 1, width: '200px', height: '600px' }}>

        <View style={styles.container}>
          <BlurView intensity={90} tint="light" style={styles.blurBox}>

            <Image source={require("../../assets/images/signuplogo.png")} style={styles.illustration} />
            <Text style={styles.verificationTitleSignup}>SIGN UP</Text>
            <View style={styles.inputContainer}>
              <Text style={{ fontWeight: 'bold' }}>Enter Email:</Text>
              <TextInput
                style={styles.verificationInput}
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Enter email"
                onChangeText={(email) => setEmailAddress(email)}

              />
            </View>
            <TouchableOpacity onPress={onSignUpPress} style={styles.buttonSignup}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 16, justifyContent: 'center' }}>
              <Text style={{ fontSize: 17 }}>Already have an account?</Text>
              <Link href="/sign-in">
                <Text style={{ color: "#2E7D32", fontSize: 17, fontWeight: 'bold' }}>Sign in</Text>
              </Link>
            </View>
          </BlurView>
        </View>
      </ImageBackground>

    </View>
  )
}