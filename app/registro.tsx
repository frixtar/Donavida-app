// app/registro.tsx
import React, { useState } from 'react';
// @ts-ignore
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { registroStyles, colors } from '../src/estilos/registro.styles';

// Opciones para tipo de sangre
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function RegistroScreen() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tipoSangre, setTipoSangre] = useState('O+');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!email.trim()) newErrors.email = 'El correo es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Correo inválido';
    if (!password) newErrors.password = 'La contraseña es obligatoria';
    else if (password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!aceptaTerminos) newErrors.terminos = 'Debes aceptar los términos';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    // Simulación de registro exitoso
    Alert.alert(
      'Registro exitoso',
      `Bienvenido ${nombre}, tu cuenta ha sido creada.`,
      [
        {
          text: 'Ir a Iniciar sesión',
          onPress: () => router.replace('/login'),
        },
      ]
    );
    // Aquí iría la llamada a la API real
  };

  const handleGoToLogin = () => {
    router.push('/login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={registroStyles.container}
    >
      <ScrollView contentContainerStyle={registroStyles.scrollContainer}>
        <View style={registroStyles.headerContainer}>
          <Text style={registroStyles.logoText}>DonaVida</Text>
          <Text style={registroStyles.subtitle}>Únete como donante</Text>
        </View>

        <View style={registroStyles.formContainer}>
          {/* Nombre completo */}
          <TextInput
            style={[registroStyles.input, errors.nombre && registroStyles.inputError]}
            placeholder="Nombre completo"
            placeholderTextColor="#999"
            value={nombre}
            onChangeText={setNombre}
          />
          {errors.nombre && <Text style={registroStyles.errorText}>{errors.nombre}</Text>}

          {/* Correo electrónico */}
          <TextInput
            style={[registroStyles.input, errors.email && registroStyles.inputError]}
            placeholder="Correo electrónico"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={registroStyles.errorText}>{errors.email}</Text>}

          {/* Contraseña */}
          <TextInput
            style={[registroStyles.input, errors.password && registroStyles.inputError]}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errors.password && <Text style={registroStyles.errorText}>{errors.password}</Text>}

          {/* Confirmar contraseña */}
          <TextInput
            style={[registroStyles.input, errors.confirmPassword && registroStyles.inputError]}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {errors.confirmPassword && <Text style={registroStyles.errorText}>{errors.confirmPassword}</Text>}

          {/* Tipo de sangre (Picker) */}
          <View style={registroStyles.pickerContainer}>
            <Picker
              selectedValue={tipoSangre}
              onValueChange={(itemValue) => setTipoSangre(itemValue)}
              style={registroStyles.picker}
            >
              {bloodTypes.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>

          {/* Términos y condiciones */}
          <View style={registroStyles.termsContainer}>
            <TouchableOpacity
              style={[registroStyles.checkbox, aceptaTerminos && registroStyles.checked]}
              onPress={() => setAceptaTerminos(!aceptaTerminos)}
            >
              {aceptaTerminos && <Text style={registroStyles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <Text style={registroStyles.termsText}>
              Acepto los{' '}
              <Text style={{ color: colors.primary }}>términos y condiciones</Text> y la{' '}
              <Text style={{ color: colors.primary }}>política de privacidad</Text>.
            </Text>
          </View>
          {errors.terminos && <Text style={registroStyles.errorText}>{errors.terminos}</Text>}

          {/* Botón Registrarse */}
          <TouchableOpacity style={registroStyles.registerButton} onPress={handleRegister}>
            <Text style={registroStyles.registerButtonText}>Registrarse</Text>
          </TouchableOpacity>

          {/* Link a Iniciar sesión */}
          <View style={registroStyles.loginLinkContainer}>
            <Text style={registroStyles.loginLinkText}>¿Ya tienes cuenta?</Text>
            <TouchableOpacity onPress={handleGoToLogin}>
              <Text style={registroStyles.loginLink}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}