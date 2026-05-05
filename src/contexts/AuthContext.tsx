// contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

type User = {
  id: string;
  name: string;
  email: string;
  // otros campos
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  async function loadStoredData() {
    try {
      const storedUser = await AsyncStorage.getItem('@PulsoMX:user');
      const storedToken = await AsyncStorage.getItem('@PulsoMX:token');
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        // Configurar token en axios si lo usas
        // api.defaults.headers.Authorization = `Bearer ${storedToken}`;
      }
    } catch (error) {
      console.log('Error loading auth data', error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      // 🔁 Reemplazar con tu API real
      const response = await fetch('https://tu-api.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error en login');

      const { user: userData, token } = data;
      await AsyncStorage.setItem('@PulsoMX:user', JSON.stringify(userData));
      await AsyncStorage.setItem('@PulsoMX:token', token);
      setUser(userData);
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      const response = await fetch('https://tu-api.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error en registro');
      // Opcional: auto-login después de registro
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem('@PulsoMX:user');
    await AsyncStorage.removeItem('@PulsoMX:token');
    setUser(null);
    router.replace('/onboarding');
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);