import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../src/contexts/AuthContext';

const { width, height } = Dimensions.get('window');

const urgenciaConfig: Record<string, { bg: string; text: string; label: string }> = {
  critica: { bg: "#FCEBEB", text: "#A32D2D", label: "Urgente" },
  necesita: { bg: "#FAEEDA", text: "#854F0B", label: "Necesita" },
  suficiente: { bg: "#EAF3DE", text: "#3B6D11", label: "Suficiente" },
};

export default function MapaScreen() {
  const { user } = useAuth();
  const [hospitalesCercanos, setHospitalesCercanos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [sinUbicacion, setSinUbicacion] = useState(false);
  const [ubicacionUsuario, setUbicacionUsuario] = useState<{ lat: number; lng: number } | null>(null);
  const [region, setRegion] = useState({
    latitude: 19.4326,
    longitude: -99.1332,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const cargarHospitales = async () => {
      if (!user) return;
      const { data: perfil, error } = await supabase
        .from('profiles')
        .select('latitud, longitud')
        .eq('id', user.id)
        .single();

      if (error || !perfil?.latitud) {
        setSinUbicacion(true);
        setCargando(false);
        return;
      }

      setUbicacionUsuario({ lat: perfil.latitud, lng: perfil.longitud });
      setRegion({
        latitude: perfil.latitud,
        longitude: perfil.longitud,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      const { data, error: rpcError } = await supabase.rpc('hospitales_cercanos', {
        lat_user: perfil.latitud,
        lon_user: perfil.longitud,
        radio_km: 10,
      });

      if (!rpcError && data) {
        setHospitalesCercanos(data);
      } else {
        console.error('Error al obtener hospitales:', rpcError);
      }
      setCargando(false);
    };

    cargarHospitales();
  }, [user]);

  if (cargando) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#C0221A" />
          <Text style={{ marginTop: 16 }}>Buscando hospitales cercanos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (sinUbicacion) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.centeredText}>Aún no has guardado tu ubicación.</Text>
          <TouchableOpacity
            style={styles.botonIrPerfil}
            onPress={() => alert('Ve a tu perfil y guarda tu ubicación')}
          >
            <Text style={{ color: '#C0221A', fontWeight: '600' }}>Ir a mi perfil</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Hospitales cercanos</Text>
        {ubicacionUsuario && (
          <View style={styles.filtro}>
            <Text style={styles.filtroText}>Radio 10 km</Text>
          </View>
        )}
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {hospitalesCercanos.map((hospital) => (
          <Marker
            key={hospital.id}
            coordinate={{
              latitude: hospital.latitud,
              longitude: hospital.longitud,
            }}
            title={hospital.nombre}
            description={`${hospital.distancia_km?.toFixed(1)} km - ${urgenciaConfig[hospital.urgencia]?.label || 'Suficiente'}`}
            pinColor={urgenciaConfig[hospital.urgencia]?.text === "#A32D2D" ? "red" : urgenciaConfig[hospital.urgencia]?.text === "#854F0B" ? "orange" : "green"}
          />
        ))}
        {ubicacionUsuario && (
          <Marker
            coordinate={{
              latitude: ubicacionUsuario.lat,
              longitude: ubicacionUsuario.lng,
            }}
            title="Tu ubicación"
            pinColor="blue"
          />
        )}
      </MapView>

      <ScrollView style={styles.listaContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.seccionTitulo}>Hospitales a menos de 10 km</Text>
        {hospitalesCercanos.length === 0 ? (
          <Text style={styles.sinResultados}>No hay hospitales en esta zona</Text>
        ) : (
          hospitalesCercanos.map((hospital) => {
            const config = urgenciaConfig[hospital.urgencia] || urgenciaConfig.suficiente;
            return (
              <TouchableOpacity key={hospital.id} style={styles.hospitalCard}>
                <View style={styles.hospitalIcono}>
                  <Text style={styles.hospitalCruz}>🏥</Text>
                </View>
                <View style={styles.hospitalInfo}>
                  <Text style={styles.hospitalNombre}>{hospital.nombre}</Text>
                  <Text style={styles.hospitalMeta}>
                    {hospital.distancia_km?.toFixed(1)} km —{" "}
                    {hospital.abierto ? "Abierto ahora" : "Cerrado"}
                  </Text>
                  {hospital.direccion && (
                    <Text style={styles.direccion}>{hospital.direccion}</Text>
                  )}
                </View>
                <View style={[styles.urgenciaBadge, { backgroundColor: config.bg }]}>
                  <Text style={[styles.urgenciaText, { color: config.text }]}>
                    {config.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f3" },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  centeredText: { fontSize: 16, color: '#888', marginBottom: 16, textAlign: 'center' },
  botonIrPerfil: { backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#C0221A' },
  header: {
    backgroundColor: "#C0221A",
    padding: 20,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: { color: "white", fontSize: 20, fontWeight: "600" },
  filtro: { borderWidth: 0.5, borderColor: "rgba(255,255,255,0.5)", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  filtroText: { color: "white", fontSize: 11 },
  map: {
    width: '100%',
    height: height * 0.4,
  },
  listaContainer: {
    flex: 1,
    marginTop: 8,
  },
  seccionTitulo: { fontSize: 13, fontWeight: "600", color: "#2c2c2a", marginHorizontal: 16, marginVertical: 8 },
  sinResultados: { textAlign: 'center', marginTop: 20, color: '#888' },
  hospitalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 10,
    padding: 12,
    borderWidth: 0.5,
    borderColor: "#e8e6df",
    gap: 10,
  },
  hospitalIcono: { width: 32, height: 32, borderRadius: 8, backgroundColor: "#FCEBEB", alignItems: "center", justifyContent: "center" },
  hospitalCruz: { color: "#C0221A", fontSize: 18, fontWeight: "700" },
  hospitalInfo: { flex: 1 },
  hospitalNombre: { fontSize: 12, fontWeight: "600", color: "#2c2c2a" },
  hospitalMeta: { fontSize: 11, color: "#888780", marginTop: 2 },
  direccion: { fontSize: 10, color: "#aaa", marginTop: 2 },
  urgenciaBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  urgenciaText: { fontSize: 11, fontWeight: "500" },
});