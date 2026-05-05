import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { donante, historialDonaciones, alertaActiva } from "../../constants/mockData";
import MenuLateral from "../../components/MenuLateral";

export default function HomeScreen() {
  return (
    <MenuLateral>
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C0221A" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bienvenido de vuelta,</Text>
            <Text style={styles.nombre}>{donante.nombre}</Text>
          </View>
          <View style={styles.tipoCard}>
            <Text style={styles.tipoSangre}>{donante.tipo_sangre}</Text>
            <Text style={styles.tipoLabel}>Donante universal</Text>
          </View>
        </View>

        {/* Estado aptitud */}
        <View style={styles.aptitudCard}>
          <View style={styles.aptitudDot} />
          <Text style={styles.aptitudText}>
            {donante.apto ? "✓ Apto para donar" : `Próxima donación: ${donante.proxima_donacion}`}
          </Text>
        </View>

        {/* Alerta */}
        {alertaActiva && (
          <View style={styles.alertaBanner}>
            <View style={styles.alertaHeader}>
              <View style={styles.pulseDot} />
              <Text style={styles.alertaTitulo}>
                Urgencia cercana — {alertaActiva.tipo_sangre}
              </Text>
            </View>
            <Text style={styles.alertaBody}>
              {alertaActiva.hospital} necesita tu tipo de sangre. Estás a {alertaActiva.distancia}.
            </Text>
            <View style={styles.alertaBotones}>
              <TouchableOpacity style={styles.btnAceptar}>
                <Text style={styles.btnAceptarText}>Voy a donar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnRechazar}>
                <Text style={styles.btnRechazarText}>No puedo ahora</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Stats */}
        <Text style={styles.seccionTitulo}>Tu impacto</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={[styles.statNum, { color: "#C0221A" }]}>{donante.donaciones}</Text>
            <Text style={styles.statLabel}>Donaciones</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNum, { color: "#3B6D11" }]}>{donante.puntos}</Text>
            <Text style={styles.statLabel}>Puntos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{donante.vidas_salvadas}</Text>
            <Text style={styles.statLabel}>Vidas aprox.</Text>
          </View>
        </View>

        {/* Historial */}
        <Text style={styles.seccionTitulo}>Historial reciente</Text>
        {historialDonaciones.map((item) => (   // 👈 usa historialDonaciones
          <View key={item.id} style={styles.historialItem}>
            <View style={styles.historialIcono}>
              <Text style={styles.historialCruz}>+</Text>
            </View>
            <View style={styles.historialInfo}>
              <Text style={styles.historialHospital}>{item.hospital}</Text>
              <Text style={styles.historialFecha}>{item.fecha}</Text>
            </View>
            <Text style={styles.historialPuntos}>+{item.puntos} pts</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
    </MenuLateral>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f3" },
  header: {
    backgroundColor: "#C0221A",
    padding: 20,
    paddingBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greeting: { color: "rgba(255,255,255,0.8)", fontSize: 13 },
  nombre: { color: "white", fontSize: 20, fontWeight: "600", marginTop: 2 },
  tipoCard: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  tipoSangre: { color: "white", fontSize: 22, fontWeight: "700" },
  tipoLabel: { color: "rgba(255,255,255,0.8)", fontSize: 10, marginTop: 2 },
  aptitudCard: {
    backgroundColor: "#EAF3DE",
    margin: 16,
    marginTop: -8,
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  aptitudDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#3B6D11" },
  aptitudText: { color: "#3B6D11", fontSize: 13, fontWeight: "500" },
  alertaBanner: {
    backgroundColor: "#FCEBEB",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
    borderWidth: 0.5,
    borderColor: "#F09595",
    marginBottom: 8,
  },
  alertaHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#C0221A" },
  alertaTitulo: { color: "#A32D2D", fontWeight: "600", fontSize: 13 },
  alertaBody: { color: "#C0221A", fontSize: 12, marginBottom: 10, lineHeight: 18 },
  alertaBotones: { flexDirection: "row", gap: 8 },
  btnAceptar: {
    backgroundColor: "#C0221A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnAceptarText: { color: "white", fontSize: 12, fontWeight: "600" },
  btnRechazar: {
    borderWidth: 0.5,
    borderColor: "#F09595",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnRechazarText: { color: "#A32D2D", fontSize: 12 },
  seccionTitulo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c2c2a",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  statsRow: { flexDirection: "row", marginHorizontal: 16, gap: 8 },
  statBox: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#e8e6df",
  },
  statNum: { fontSize: 22, fontWeight: "700", color: "#2c2c2a" },
  statLabel: { fontSize: 10, color: "#888780", marginTop: 4 },
  historialItem: {
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
  historialIcono: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FCEBEB",
    alignItems: "center",
    justifyContent: "center",
  },
  historialCruz: { color: "#C0221A", fontSize: 18, fontWeight: "700" },
  historialInfo: { flex: 1 },
  historialHospital: { fontSize: 12, fontWeight: "500", color: "#2c2c2a" },
  historialFecha: { fontSize: 11, color: "#888780", marginTop: 2 },
  historialPuntos: { fontSize: 12, fontWeight: "600", color: "#3B6D11" },
});