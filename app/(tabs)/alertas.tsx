import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../services/supabase";
import { useAuth } from "../../src/contexts/AuthContext";
import { alertaStyles as styles } from "../../src/estilos/alerta.style";

const estadoColor: Record<string, { bg: string; text: string; label: string }> = {
  critica: { bg: "#FCEBEB", text: "#A32D2D", label: "Crítica" },
  necesita: { bg: "#FAEEDA", text: "#854F0B", label: "Necesita" },
};

export default function AlertasScreen() {
  const { user } = useAuth();
  const [alertas, setAlertas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [sinUbicacion, setSinUbicacion] = useState(false);
  const [tipoSangre, setTipoSangre] = useState('');

  useEffect(() => {
    const cargarAlertas = async () => {
      if (!user) return;

      // Obtener perfil: ubicación y tipo sangre
      const { data: perfil, error } = await supabase
        .from('profiles')
        .select('latitud, longitud, tipo_sangre')
        .eq('id', user.id)
        .single();

      if (error || !perfil?.latitud) {
        setSinUbicacion(true);
        setCargando(false);
        return;
      }

      setTipoSangre(perfil.tipo_sangre);

      // Llamar a la función de Supabase
      const { data, error: rpcError } = await supabase.rpc('alertas_para_donante', {
        lat_user: perfil.latitud,
        lon_user: perfil.longitud,
        radio_km: 15,
        tipo_sangre_donante: perfil.tipo_sangre,
      });

      if (!rpcError && data) {
        setAlertas(data);
      } else {
        console.error('Error al cargar alertas:', rpcError);
      }
      setCargando(false);
    };

    cargarAlertas();
  }, [user]);

  const responderAlerta = async (hospitalId: number, action: 'aceptar' | 'rechazar') => {
    // Aquí puedes registrar la respuesta en una tabla `alertas_respuestas`
    // Por ahora solo mostramos un mensaje
    if (action === 'aceptar') {
      alert('Gracias por tu disposición. El hospital se pondrá en contacto.');
      // Podrías redirigir a la pantalla de cita o agendar una donación
    } else {
      alert('Entendido, recibirás otras alertas.');
    }
    // Opcional: eliminar la alerta de la lista local
    setAlertas(alertas.filter(a => a.id !== hospitalId));
  };

  if (cargando) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#C0221A" />
          <Text style={{ marginTop: 16 }}>Buscando alertas cercanas...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (sinUbicacion) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <View style={styles.centered}>
          <Text style={styles.centeredText}>⚠️ No hemos podido obtener tu ubicación.</Text>
          <TouchableOpacity
            style={styles.botonPerfil}
            onPress={() => alert('Ve a tu perfil y guarda tu ubicación')}
          >
            <Text style={{ color: '#C0221A' }}>Configurar ubicación</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Alertas de urgencia</Text>
        <Text style={styles.subtitulo}>
          {alertas.length} hospitales necesitan donantes {tipoSangre}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {alertas.length === 0 ? (
          <Text style={styles.sinAlertas}>No hay alertas activas cerca de ti por ahora.</Text>
        ) : (
          alertas.map((alerta) => {
            const estado = estadoColor[alerta.urgencia] || estadoColor.necesita;
            const esCompatible = alerta.tipo_sangre === tipoSangre;
            return (
              <View key={alerta.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={[styles.badge, { backgroundColor: estado.bg }]}>
                    <Text style={[styles.badgeText, { color: estado.text }]}>
                      {estado.label}
                    </Text>
                  </View>
                  <Text style={styles.distancia}>{alerta.distancia_km?.toFixed(1)} km</Text>
                </View>
                <Text style={styles.hospital}>{alerta.nombre}</Text>
                {alerta.direccion && <Text style={styles.direccion}>{alerta.direccion}</Text>}
                {esCompatible && (
                  <View style={styles.compatibleBadge}>
                    <Text style={styles.compatibleText}>✅ Tu tipo de sangre es necesario</Text>
                  </View>
                )}
                <View style={styles.botones}>
                  <TouchableOpacity
                    style={styles.btnAceptar}
                    onPress={() => responderAlerta(alerta.id, 'aceptar')}
                  >
                    <Text style={styles.btnAceptarText}>Voy a donar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnRechazar}
                    onPress={() => responderAlerta(alerta.id, 'rechazar')}
                  >
                    <Text style={styles.btnRechazarText}>No puedo ahora</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}