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
  updateUserLocation: (lat: number, lng: number, domicilio: string, codigoPostal: string) => Promise<{ success: boolean; message?: string }>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [medicalOnboardingPassed, setMedicalOnboardingPassed] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
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
      }
      setLoading(false);
    };
    loadData();

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

    return () => listener?.subscription.unsubscribe();
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

  const register = async (nombre: string, email: string, password: string, tipo_sangre: string, telefono?: string, genero?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nombre, tipo_sangre, telefono, genero },
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

  const updateUserLocation = async (lat: number, lng: number, domicilio: string, codigoPostal: string) => {
    if (!user) return { success: false, message: 'No hay usuario logueado' };
    const { error } = await supabase
      .from('profiles')
      .update({ latitud: lat, longitud: lng, domicilio, codigo_postal: codigoPostal, updated_at: new Date() })
      .eq('id', user.id);
    if (error) return { success: false, message: error.message };
    return { success: true };
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
        updateUserLocation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};