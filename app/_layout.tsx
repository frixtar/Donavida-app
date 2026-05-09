import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';

function RootLayoutNav() {
  const { user, loading, medicalOnboardingPassed } = useAuth();

  if (loading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!user ? (
        // Pantallas de autenticación (sin redirigir)
        <>
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="login" />
          <Stack.Screen name="registro" />
        </>
      ) : !medicalOnboardingPassed ? (
        // Flujo de onboarding médico
        <>
          <Stack.Screen name="bienvenida" />
          <Stack.Screen name="cuestionario" />
          <Stack.Screen name="analisis-clinico" />
        </>
      ) : (
        // Pantalla principal
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}