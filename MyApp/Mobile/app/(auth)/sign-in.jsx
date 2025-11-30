import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Image, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import React from 'react';
import { styles } from '../../assets/styles/auth.styles';
import { BlurView } from 'expo-blur';
import { Button } from 'react-native-elements';


export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()
    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')


    // Handle the submission of the sign-in form
    const onSignInPress = async () => {
        if (!isLoaded) return

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }

    return (
        <ImageBackground source={require("../../assets/images/bglogin.png")} style={{ flex: 1, width: '200px', height: '600px' }}>

            <View>
                <Image source={require("../../assets/images/logonew.png")} style={styles.illustrationIn} />
            </View>


            <View style={styles.verificationContainer}>
                <BlurView intensity={70} tint="light" style={styles.blurBox}>
                    <Image source={require("../../assets/images/lgsymb.png")} style={{ height: '18%', width: '25%' }}></Image>
                        <View style={styles.inputContainer}>
                            <Text style={{ fontWeight:'bold' }}>Enter Email:</Text>
                            <TextInput
                                style={styles.verificationInput}
                                autoCapitalize="none"
                                value={emailAddress}
                                placeholder="Enter email"
                                onChangeText={(emailAddress) => setEmailAddress(emailAddress)}

                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={{ fontWeight:'bold' }}>Enter Password:</Text>
                            <TextInput
                                style={styles.verificationInput}
                                value={password}
                                placeholder="Enter password"
                                secureTextEntry={true}
                                onChangeText={(password) => setPassword(password)}

                            />
                        </View>
                        
                    <TouchableOpacity onPress={onSignInPress} style={styles.button}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 15, marginBottom: 15, paddingBottom: 12 }}>
                        <Text style={{ fontSize: 17 }}>New User?</Text>
                        <Link href="/sign-up">
                            <Text style={{ color: "#2E7D32", fontSize: 17, fontWeight: 'bold' }}>Sign up</Text>
                        </Link>
                    </View>
                    <Link href="/contact/contact-us">
                        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 16 }}>Trouble to sign in <Text style={{ fontWeight:'bold' }}>Contact Us</Text> ☎️</Text>
                    </Link>
                </BlurView>
            </View>
        </ImageBackground>

    )
}