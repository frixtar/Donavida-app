import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DONANTE_INICIAL = {
  nombre: "Carlos Martínez",
  tipo_sangre: "O+",
  donaciones: 4,
  puntos: 450,
  proxima_donacion: "12 mayo 2025",
};

const RECOMPENSAS_DISPONIBLES = [
  { id: "1", nombre: "20% desc. Farmacias Similares", puntos: 500 },
  { id: "2", nombre: "Carta de servicio social", puntos: 300 },
  { id: "3", nombre: "Reconocimiento público", puntos: 1000 },
];

export default function PerfilScreen() {
  const [donante, setDonante] = useState(DONANTE_INICIAL);
  const [recompensas, setRecompensas] = useState(RECOMPENSAS_DISPONIBLES);
  const [recompensasCanjeadas, setRecompensasCanjeadas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const donanteGuardado = await AsyncStorage.getItem("@PulsoMX:donante");
        const canjeadasGuardadas = await AsyncStorage.getItem("@PulsoMX:canjeadas");
        if (donanteGuardado) setDonante(JSON.parse(donanteGuardado));
        if (canjeadasGuardadas) setRecompensasCanjeadas(JSON.parse(canjeadasGuardadas));
      } catch (error) {
        console.log("Error al cargar datos", error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  // Guardar donante y canjeadas cada vez que cambien
  useEffect(() => {
    if (!cargando) {
      AsyncStorage.setItem("@PulsoMX:donante", JSON.stringify(donante));
    }
  }, [donante, cargando]);

  useEffect(() => {
    if (!cargando) {
      AsyncStorage.setItem("@PulsoMX:canjeadas", JSON.stringify(recompensasCanjeadas));
    }
  }, [recompensasCanjeadas, cargando]);

  const canjearRecompensa = async (recompensa) => {
    if (donante.puntos < recompensa.puntos) {
      Alert.alert("Puntos insuficientes", `Necesitas ${recompensa.puntos} pts. Tienes ${donante.puntos} pts.`);
      return;
    }

    // Confirmar canje
    Alert.alert(
      "Canjear recompensa",
      `¿Canjear "${recompensa.nombre}" por ${recompensa.puntos} puntos?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Canjear",
          style: "default",
          onPress: async () => {
            // Descontar puntos
            const nuevosPuntos = donante.puntos - recompensa.puntos;
            setDonante({ ...donante, puntos: nuevosPuntos });

            // Mover recompensa a canjeadas
            setRecompensas(recompensas.filter(r => r.id !== recompensa.id));
            setRecompensasCanjeadas([...recompensasCanjeadas, { ...recompensa, fecha: new Date().toLocaleDateString() }]);

            Alert.alert("¡Canje exitoso!", `Has canjeado ${recompensa.nombre}.`);
          },
        },
      ]
    );
  };

  const progreso = donante.puntos / 1000; // para nivel Platino

  if (cargando) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {donante.nombre.split(" ").map(n => n[0]).join("")}
            </Text>
          </View>
          <Text style={styles.nombre}>{donante.nombre}</Text>
          <Text style={styles.subtitulo}>
            Tipo {donante.tipo_sangre} · Donante Héroe
          </Text>
        </View>

        {/* Badges */}
        <View style={styles.badgesRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeNum}>{donante.donaciones}</Text>
            <Text style={styles.badgeLabel}>Donaciones</Text>
          </View>
          <View style={styles.badge}>
            <Text style={[styles.badgeNum, { color: "#C0221A" }]}>
              {donante.puntos}
            </Text>
            <Text style={styles.badgeLabel}>Puntos</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeNum}>#14</Text>
            <Text style={styles.badgeLabel}>Ranking</Text>
          </View>
        </View>

        {/* Puntos card */}
        <View style={styles.puntosCard}>
          <Text style={styles.puntosLabel}>Mis puntos DonaVida</Text>
          <Text style={styles.puntosNum}>{donante.puntos} pts</Text>
          <View style={styles.barBg}>
            <View style={[styles.barFill, { width: `${Math.min(progreso * 100, 100)}%` }]} />
          </View>
          <Text style={styles.puntosNext}>
            {Math.max(1000 - donante.puntos, 0)} pts para nivel Platino
          </Text>
        </View>

        {/* Recompensas disponibles */}
        <Text style={styles.seccionTitulo}>Recompensas disponibles</Text>
        {recompensas.length === 0 ? (
          <Text style={styles.textoVacio}>No hay recompensas disponibles por ahora.</Text>
        ) : (
          recompensas.map((r) => (
            <View key={r.id} style={styles.recompensaItem}>
              <View style={styles.recompensaIcono}>
                <Text style={{ fontSize: 16 }}>
                  {r.id === "1" ? "💊" : r.id === "2" ? "📄" : "🏅"}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.recompensaNombre}>{r.nombre}</Text>
                <Text style={styles.recompensaPuntos}>{r.puntos} pts</Text>
              </View>
              <TouchableOpacity
                style={styles.btnCanjear}
                onPress={() => canjearRecompensa(r)}
              >
                <Text style={styles.btnCanjearText}>Canjear</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        {/* Recompensas canjeadas */}
        {recompensasCanjeadas.length > 0 && (
          <>
            <Text style={styles.seccionTitulo}>Mis recompensas canjeadas</Text>
            {recompensasCanjeadas.map((r, idx) => (
              <View key={idx} style={styles.recompensaItemCanjeada}>
                <View style={styles.recompensaIcono}>
                  <Text>✅</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.recompensaNombre}>{r.nombre}</Text>
                  <Text style={styles.fechaCanje}>Canjeada el {r.fecha}</Text>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Información del donante */}
        <Text style={styles.seccionTitulo}>Mi información</Text>
        <View style={styles.infoSection}>
          {[
            { key: "Tipo de sangre", val: donante.tipo_sangre, color: "#C0221A" },
            { key: "Próxima donación", val: donante.proxima_donacion },
            { key: "Ciudad", val: "Oaxaca de Juárez" },
            { key: "Alertas activas", val: "Activadas", color: "#3B6D11" },
          ].map((item, i) => (
            <View key={i} style={styles.infoRow}>
              <Text style={styles.infoKey}>{item.key}</Text>
              <Text style={[styles.infoVal, item.color ? { color: item.color } : {}]}>
                {item.val}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos (igual que los originales, solo añado algunos)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f3" },
  header: {
    backgroundColor: "#C0221A",
    alignItems: "center",
    padding: 24,
    paddingBottom: 32,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatarText: { color: "white", fontSize: 22, fontWeight: "700" },
  nombre: { color: "white", fontSize: 18, fontWeight: "600" },
  subtitulo: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 4 },
  badgesRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: -16,
    gap: 8,
    zIndex: 1,
  },
  badge: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#e8e6df",
  },
  badgeNum: { fontSize: 16, fontWeight: "700", color: "#2c2c2a" },
  badgeLabel: { fontSize: 10, color: "#888780", marginTop: 2 },
  puntosCard: {
    backgroundColor: "#C0221A",
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  puntosLabel: { color: "rgba(255,255,255,0.8)", fontSize: 11 },
  puntosNum: { color: "white", fontSize: 26, fontWeight: "700", marginVertical: 6 },
  barBg: {
    height: 5,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 3,
    marginBottom: 6,
  },
  barFill: { height: "100%", backgroundColor: "white", borderRadius: 3 },
  puntosNext: { color: "rgba(255,255,255,0.7)", fontSize: 11 },
  seccionTitulo: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2c2c2a",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  recompensaItem: {
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
  recompensaItemCanjeada: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0ec",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 10,
    padding: 12,
    borderWidth: 0.5,
    borderColor: "#e8e6df",
    gap: 10,
  },
  recompensaIcono: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#f1efe8",
    alignItems: "center",
    justifyContent: "center",
  },
  recompensaNombre: { fontSize: 12, fontWeight: "500", color: "#2c2c2a" },
  recompensaPuntos: { fontSize: 11, color: "#888780", marginTop: 2 },
  fechaCanje: { fontSize: 10, color: "#888780", marginTop: 2 },
  btnCanjear: {
    backgroundColor: "#C0221A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  btnCanjearText: { color: "white", fontSize: 11, fontWeight: "500" },
  textoVacio: {
    textAlign: "center",
    color: "#888780",
    marginVertical: 12,
    marginHorizontal: 16,
  },
  infoSection: {
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#e8e6df",
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e8e6df",
  },
  infoKey: { fontSize: 12, color: "#888780" },
  infoVal: { fontSize: 12, fontWeight: "500", color: "#2c2c2a" },
});