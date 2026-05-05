// app/login.tsx
import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { loginStyles } from '../src/estilos/login.styles'; 

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Por favor, llena todos los campos.');
      return;
    }
    Alert.alert('Iniciando sesión', `Correo: ${email}`);
    // Cuando el login sea exitoso: router.replace('/');
  };

  const handleRegister = () => {
    router.push('/registro');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={loginStyles.container}
    >
      <View style={loginStyles.headerContainer}>
        <Text style={loginStyles.logoText}>DonaVida</Text>
        <Text style={loginStyles.subtitle}>Conectando donantes, salvando vidas</Text>
      </View>

      <View style={loginStyles.formContainer}>
        <TextInput
          style={loginStyles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={loginStyles.loginButton} onPress={handleLogin}>
          <Text style={loginStyles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <View style={loginStyles.dividerContainer}>
          <View style={loginStyles.divider} />
          <Text style={loginStyles.dividerText}>o</Text>
          <View style={loginStyles.divider} />
        </View>

        <TouchableOpacity style={loginStyles.registerButton} onPress={handleRegister}>
          <Text style={loginStyles.registerButtonText}>Registrar nueva cuenta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}