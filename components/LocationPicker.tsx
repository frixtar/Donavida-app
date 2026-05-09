import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useLocation } from '../src/hooks/useLocation';
import { useAuth } from '../src/contexts/AuthContext';

export const LocationPicker = ({ onSaved }: { onSaved?: () => void }) => {
  const { location, address, postalCode, loading, errorMsg, refresh } = useLocation();
  const { updateUserLocation, user } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleSaveLocation = async () => {
    if (!location || !address) {
      Alert.alert('Sin ubicación', 'Primero obtén tu ubicación actual');
      return;
    }
    setSaving(true);
    const result = await updateUserLocation(
      location.coords.latitude,
      location.coords.longitude,
      address,
      postalCode
    );
    setSaving(false);
    if (result.success) {
      Alert.alert('Éxito', 'Ubicación guardada correctamente');
      onSaved?.();
    } else {
      Alert.alert('Error', result.message);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#C0221A" />;
  if (errorMsg) return <Text style={styles.error}>{errorMsg}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu ubicación actual</Text>
      {address ? (
        <Text style={styles.address}>{address}</Text>
      ) : (
        <Text style={styles.info}>No se pudo obtener la dirección</Text>
      )}
      <TouchableOpacity onPress={refresh} style={styles.refreshBtn}>
        <Text style={styles.refreshText}>🔄 Actualizar ubicación</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSaveLocation}
        disabled={saving}
        style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
      >
        <Text style={styles.saveText}>
          {saving ? 'Guardando...' : 'Guardar esta ubicación'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', borderRadius: 12, margin: 16 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  address: { fontSize: 14, color: '#2c2c2a', marginBottom: 12, backgroundColor: '#f5f5f3', padding: 10, borderRadius: 8 },
  info: { fontSize: 14, color: '#888', marginBottom: 12 },
  refreshBtn: { marginBottom: 12 },
  refreshText: { color: '#C0221A', fontSize: 14 },
  saveBtn: { backgroundColor: '#C0221A', padding: 12, borderRadius: 8, alignItems: 'center' },
  saveBtnDisabled: { backgroundColor: '#e8a0a0' },
  saveText: { color: 'white', fontWeight: '600' },
  error: { color: '#C0221A', textAlign: 'center', margin: 20 },
});