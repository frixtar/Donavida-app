import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { donante } from "../../constants/mockData";

const recompensas = [
  { id: "1", nombre: "20% desc. Farmacias Similares", puntos: 500, disponible: true },
  { id: "2", nombre: "Carta de servicio social", puntos: 300, disponible: true },
  { id: "3", nombre: "Reconocimiento público", puntos: 1000, disponible: false },
];

export default function PerfilScreen() {
  const progreso = donante.puntos / 1000;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>CM</Text>
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

        {/* Puntos */}
        <View style={styles.puntosCard}>
          <Text style={styles.puntosLabel}>Mis puntos DonaVida</Text>
          <Text style={styles.puntosNum}>{donante.puntos} pts</Text>
          <View style={styles.barBg}>
            <View style={[styles.barFill, { width: `${progreso * 100}%` }]} />
          </View>
          <Text style={styles.puntosNext}>
            {1000 - donante.puntos} pts para nivel Platino
          </Text>
        </View>

        {/* Recompensas */}
        <Text style={styles.seccionTitulo}>Recompensas disponibles</Text>
        {recompensas.map((r) => (
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
              style={[
                styles.btnCanjear,
                !r.disponible && styles.btnBloqueado,
              ]}
            >
              <Text
                style={[
                  styles.btnCanjearText,
                  !r.disponible && styles.btnBloqueadoText,
                ]}
              >
                {r.disponible ? "Canjear" : "Bloqueado"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Info */}
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
  btnCanjear: {
    backgroundColor: "#C0221A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  btnCanjearText: { color: "white", fontSize: 11, fontWeight: "500" },
  btnBloqueado: { backgroundColor: "#f1efe8" },
  btnBloqueadoText: { color: "#888780" },
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