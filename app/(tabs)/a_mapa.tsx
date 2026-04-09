import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hospitales } from "../../constants/mockData";

const urgenciaConfig: Record<string, { bg: string; text: string; label: string }> = {
  critica: { bg: "#FCEBEB", text: "#A32D2D", label: "Urgente" },
  necesita: { bg: "#FAEEDA", text: "#854F0B", label: "Necesita" },
  suficiente: { bg: "#EAF3DE", text: "#3B6D11", label: "Suficiente" },
};

export default function MapaScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Hospitales cercanos</Text>
        <View style={styles.filtro}>
          <Text style={styles.filtroText}>O− urgente</Text>
        </View>
      </View>

      {/* Mapa placeholder */}
      <View style={styles.mapaPlaceholder}>
        <Text style={styles.mapaTexto}>🗺️ Mapa</Text>
        <Text style={styles.mapaSubtexto}>
          Integración con react-native-maps próximamente
        </Text>
      </View>

      {/* Ruta sugerida */}
      <View style={styles.rutaCard}>
        <Text style={styles.rutaTitulo}>Ruta sugerida → Hospital Civil</Text>
        <View style={styles.rutaPaso}>
          <View style={[styles.rutaDot, { backgroundColor: "#C0221A" }]} />
          <Text style={styles.rutaTexto}>Tu ubicación actual</Text>
        </View>
        <View style={styles.rutaLinea} />
        <View style={styles.rutaPaso}>
          <View style={[styles.rutaDot, { backgroundColor: "#BA7517" }]} />
          <View>
            <Text style={styles.rutaTexto}>Av. Independencia</Text>
            <Text style={styles.rutaSub}>Continúa 600m</Text>
          </View>
        </View>
        <View style={styles.rutaLinea} />
        <View style={styles.rutaPaso}>
          <View style={[styles.rutaDot, { backgroundColor: "#639922" }]} />
          <View>
            <Text style={styles.rutaTexto}>Hospital Civil — Banco de Sangre</Text>
            <Text style={styles.rutaSub}>~8 min caminando</Text>
          </View>
        </View>
      </View>

      {/* Lista de hospitales */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.seccionTitulo}>Hospitales con urgencia O−</Text>
        {hospitales.map((hospital) => {
          const config = urgenciaConfig[hospital.urgencia];
          return (
            <TouchableOpacity key={hospital.id} style={styles.hospitalCard}>
              <View style={styles.hospitalIcono}>
                <Text style={styles.hospitalCruz}>+</Text>
              </View>
              <View style={styles.hospitalInfo}>
                <Text style={styles.hospitalNombre}>{hospital.nombre}</Text>
                <Text style={styles.hospitalMeta}>
                  {hospital.distancia} —{" "}
                  {hospital.abierto ? "Abierto ahora" : "Cerrado"}
                </Text>
              </View>
              <View style={[styles.urgenciaBadge, { backgroundColor: config.bg }]}>
                <Text style={[styles.urgenciaText, { color: config.text }]}>
                  {config.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f3" },
  header: {
    backgroundColor: "#C0221A",
    padding: 20,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: { color: "white", fontSize: 20, fontWeight: "600" },
  filtro: {
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  filtroText: { color: "white", fontSize: 11 },
  mapaPlaceholder: {
    height: 180,
    backgroundColor: "#e8e6df",
    alignItems: "center",
    justifyContent: "center",
  },
  mapaTexto: { fontSize: 32, marginBottom: 8 },
  mapaSubtexto: { fontSize: 12, color: "#888780" },
  rutaCard: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 12,
    padding: 14,
    borderWidth: 0.5,
    borderColor: "#e8e6df",
  },
  rutaTitulo: { fontSize: 13, fontWeight: "600", color: "#2c2c2a", marginBottom: 12 },
  rutaPaso: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  rutaDot: { width: 10, height: 10, borderRadius: 5, marginTop: 3 },
  rutaLinea: {
    width: 1,
    height: 16,
    backgroundColor: "#e8e6df",
    marginLeft: 4,
    marginVertical: 4,
  },
  rutaTexto: { fontSize: 12, color: "#2c2c2a", fontWeight: "500" },
  rutaSub: { fontSize: 11, color: "#888780", marginTop: 2 },
  seccionTitulo: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2c2c2a",
    marginHorizontal: 16,
    marginBottom: 8,
  },
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
  hospitalIcono: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FCEBEB",
    alignItems: "center",
    justifyContent: "center",
  },
  hospitalCruz: { color: "#C0221A", fontSize: 18, fontWeight: "700" },
  hospitalInfo: { flex: 1 },
  hospitalNombre: { fontSize: 12, fontWeight: "600", color: "#2c2c2a" },
  hospitalMeta: { fontSize: 11, color: "#888780", marginTop: 2 },
  urgenciaBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  urgenciaText: { fontSize: 11, fontWeight: "500" },
});