// app/_layout.tsx
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';

function RootLayoutNav() {
  const { user, loading, medicalOnboardingPassed } = useAuth();

  if (loading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="login" />
          <Stack.Screen name="registro" />
        </>
      ) : (
        <>
          {/* Si el onboarding médico aún no se ha completado, mostrar las pantallas del flujo */}
          {!medicalOnboardingPassed ? (
            <>
              <Stack.Screen name="bienvenida" />
              <Stack.Screen name="cuestionario" />
            </>
          ) : (
            <Stack.Screen name="(tabs)" />
          )}
        </>
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