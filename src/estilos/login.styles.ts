// src/estilos/login.styles.ts
import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#C0221A',
  background: '#f5f5f3',
  white: '#ffffff',
  gray: '#888780',
  border: '#e8e6df',
};

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 1,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 8,
  },
  formContainer: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 28,
    paddingTop: 36,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#2c2c2a',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  registerButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 0.5,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 13,
    color: colors.gray,
  },
});