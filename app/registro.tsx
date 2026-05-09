import React, { useState } from 'react';
import {
  Text, View, TextInput, TouchableOpacity,
  Alert, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function RegistroScreen() {
  const { register } = useAuth();
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tipoSangre, setTipoSangre] = useState('O+');
  const [telefono, setTelefono] = useState('');
  const [genero, setGenero] = useState('M');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!apellidoPaterno.trim()) newErrors.apellidoPaterno = 'El apellido paterno es obligatorio';
    if (!apellidoMaterno.trim()) newErrors.apellidoMaterno = 'El apellido materno es obligatorio';
    if (!email.trim()) newErrors.email = 'El correo es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Correo inválido';
    if (!telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
    if (!password) newErrors.password = 'La contraseña es obligatoria';
    else if (password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!aceptaTerminos) newErrors.terminos = 'Debes aceptar los términos';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleRegister = async () => {
  if (!validateForm()) return;
  const nombreCompleto = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;

  setLoading(true);
  const result = await register(
    nombreCompleto,  // nombre completo
    email,
    password,
    tipoSangre,
    telefono,
    genero
    // fechaNacimiento eliminado
  );
    setLoading(false);
    if (result.success) {
      Alert.alert(
        'Registro exitoso',
        'Tu cuenta ha sido creada. Inicia sesión para continuar.',
        [{ text: 'OK', onPress: () => router.replace('/login') }]
      );
    } else {
      Alert.alert('Hubo un error, favor de intentarlo de nuevo', result.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#C0221A' }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 24, paddingTop: 48, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 32, fontWeight: '700' }}>DonaVida</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4 }}>
            Crea tu cuenta de donante
          </Text>
        </View>

        <View style={{
          flex: 1, backgroundColor: '#f5f5f3',
          borderTopLeftRadius: 28, borderTopRightRadius: 28,
          padding: 24, paddingTop: 32,
        }}>
          <Text style={{ fontSize: 22, fontWeight: '700', color: '#2c2c2a', marginBottom: 20 }}>
            Tus datos
          </Text>

          {/* Nombre */}
          <Text style={labelStyle}>Nombre</Text>
          <TextInput
            style={[inputStyle, errors.nombre ? errorInputStyle : {}]}
            placeholder="Ej. Carlos"
            placeholderTextColor="#b4b2a9"
            value={nombre}
            onChangeText={setNombre}
          />
          {errors.nombre ? <Text style={errorTextStyle}>{errors.nombre}</Text> : null}

          {/* Apellido Paterno */}
          <Text style={labelStyle}>Apellido paterno</Text>
          <TextInput
            style={[inputStyle, errors.apellidoPaterno ? errorInputStyle : {}]}
            placeholder="Ej. Mendoza"
            placeholderTextColor="#b4b2a9"
            value={apellidoPaterno}
            onChangeText={setApellidoPaterno}
          />
          {errors.apellidoPaterno ? <Text style={errorTextStyle}>{errors.apellidoPaterno}</Text> : null}

          {/* Apellido Materno */}
          <Text style={labelStyle}>Apellido materno</Text>
          <TextInput
            style={[inputStyle, errors.apellidoMaterno ? errorInputStyle : {}]}
            placeholder="Ej. López"
            placeholderTextColor="#b4b2a9"
            value={apellidoMaterno}
            onChangeText={setApellidoMaterno}
          />
          {errors.apellidoMaterno ? <Text style={errorTextStyle}>{errors.apellidoMaterno}</Text> : null}

          {/* Email */}
          <Text style={labelStyle}>Correo electrónico</Text>
          <TextInput
            style={[inputStyle, errors.email ? errorInputStyle : {}]}
            placeholder="correo@ejemplo.com"
            placeholderTextColor="#b4b2a9"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          {errors.email ? <Text style={errorTextStyle}>{errors.email}</Text> : null}

          {/* Teléfono */}
          <Text style={labelStyle}>Teléfono</Text>
          <TextInput
            style={[inputStyle, errors.telefono ? errorInputStyle : {}]}
            placeholder="10 dígitos"
            placeholderTextColor="#b4b2a9"
            keyboardType="phone-pad"
            maxLength={10}
            value={telefono}
            onChangeText={setTelefono}
          />
          {errors.telefono ? <Text style={errorTextStyle}>{errors.telefono}</Text> : null}

          {/* Tipo de sangre */}
          <Text style={labelStyle}>Tipo de sangre</Text>
          <View style={{
            backgroundColor: 'white', borderRadius: 10,
            borderWidth: 0.5, borderColor: '#e8e6df', marginBottom: 16,
          }}>
            <Picker
              selectedValue={tipoSangre}
              onValueChange={(val) => setTipoSangre(val)}
              style={{ height: 50 }}
            >
              {bloodTypes.map((t) => (
                <Picker.Item key={t} label={t} value={t} />
              ))}
            </Picker>
          </View>

          {/* Género */}
          <Text style={labelStyle}>Género</Text>
          <View style={{
            backgroundColor: 'white', borderRadius: 10,
            borderWidth: 0.5, borderColor: '#b1e76b', marginBottom: 16,
          }}>
            <Picker
              selectedValue={genero}
              onValueChange={(val) => setGenero(val)}
              style={{ height: 50 }}
            >
              <Picker.Item label="Masculino" value="M" />
              <Picker.Item label="Femenino" value="F" />
              <Picker.Item label="Otro" value="O" />
            </Picker>
          </View>

          {/* Contraseña */}
          <Text style={labelStyle}>Contraseña</Text>
          <TextInput
            style={[inputStyle, errors.password ? errorInputStyle : {}]}
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor="#b4b2a9"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errors.password ? <Text style={errorTextStyle}>{errors.password}</Text> : null}

          {/* Confirmar contraseña */}
          <Text style={labelStyle}>Confirmar contraseña</Text>
          <TextInput
            style={[inputStyle, errors.confirmPassword ? errorInputStyle : {}]}
            placeholder="Repite tu contraseña"
            placeholderTextColor="#b4b2a9"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {errors.confirmPassword ? <Text style={errorTextStyle}>{errors.confirmPassword}</Text> : null}

          {/* Términos */}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 10 }}
            onPress={() => setAceptaTerminos(!aceptaTerminos)}
          >
            <View style={{
              width: 22, height: 22, borderRadius: 6,
              borderWidth: 1.5,
              borderColor: aceptaTerminos ? '#C0221A' : '#e8e6df',
              backgroundColor: aceptaTerminos ? '#C0221A' : 'white',
              alignItems: 'center', justifyContent: 'center',
            }}>
              {aceptaTerminos && <Text style={{ color: 'white', fontSize: 13, fontWeight: '700' }}>✓</Text>}
            </View>
            <Text style={{ fontSize: 13, color: '#888780', flex: 1 }}>
              Acepto los{' '}
              <Text style={{ color: '#C0221A' }}>términos y condiciones</Text>
              {' '}y la{' '}
              <Text style={{ color: '#C0221A' }}>política de privacidad</Text>
            </Text>
          </TouchableOpacity>
          {errors.terminos ? <Text style={errorTextStyle}>{errors.terminos}</Text> : null}

          {/* Botón registro */}
          <TouchableOpacity
            style={{
              backgroundColor: loading ? '#e8a0a0' : '#C0221A',
              padding: 16, borderRadius: 12,
              alignItems: 'center', marginTop: 16, marginBottom: 12,
            }}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Text>
          </TouchableOpacity>

          {/* Link a login */}
          <TouchableOpacity
            style={{ alignItems: 'center', padding: 8 }}
            onPress={() => router.push('/login')}
          >
            <Text style={{ color: '#C0221A', fontSize: 13, fontWeight: '500' }}>
              ¿Ya tienes cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>

          <View style={{ height: 32 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const labelStyle = {
  fontSize: 13, fontWeight: '500' as const,
  color: '#2c2c2a', marginBottom: 6,
};
const inputStyle = {
  backgroundColor: 'white', borderWidth: 0.5,
  borderColor: '#e8e6df', borderRadius: 10,
  padding: 14, fontSize: 15, color: '#2c2c2a', marginBottom: 16,
};
const errorInputStyle = { borderColor: '#C0221A', borderWidth: 1 };
const errorTextStyle = { fontSize: 11, color: '#C0221A', marginTop: -12, marginBottom: 12 };