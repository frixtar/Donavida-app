// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { Session, User } from '@supabase/supabase-js';

type AuthContextData = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  medicalOnboardingPassed: boolean;
  setMedicalOnboardingPassed: (value: boolean) => void;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (nombre: string, email: string, password: string, tipo_sangre: string, telefono?: string, genero?: string) => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [medicalOnboardingPassed, setMedicalOnboardingPassed] = useState(false);

  // Cargar sesión inicial y el flag médico
  useEffect(() => {
    const loadData = async () => {
      // Obtener sesión
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);

      // Si hay usuario, cargar su bandera medical_onboarding_completed
      if (session?.user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('medical_onboarding_completed')
          .eq('id', session.user.id)
          .single();
        if (!error && data) {
          setMedicalOnboardingPassed(data.medical_onboarding_completed);
        }
      }
      setLoading(false);
    };
    loadData();

    // Escuchar cambios en la autenticación
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('medical_onboarding_completed')
          .eq('id', session.user.id)
          .single();
        if (!error && data) {
          setMedicalOnboardingPassed(data.medical_onboarding_completed);
        }
      } else {
        setMedicalOnboardingPassed(false);
      }
      setLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };

  const register = async (
  nombreCompleto: string,   // ej: "Carlos Mendoza López"
  email: string,
  password: string,
  tipo_sangre: string,
  telefono: string,
  fecha_nacimiento: string, // formato YYYY-MM-DD
  genero: string
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre_completo: nombreCompleto,
          tipo_sangre,
          telefono,
          fecha_nacimiento,
          genero,
          puntos: 0,
          donaciones: 0,
        },
      },
    });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setMedicalOnboardingPassed(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        medicalOnboardingPassed,
        setMedicalOnboardingPassed,
        signIn,
        register,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);