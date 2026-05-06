import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { alertaActiva } from "../../constants/mockData";

const estadoColor: Record<string, { bg: string; text: string; label: string }> = {
  pendiente: { bg: "#FCEBEB", text: "#A32D2D", label: "Pendiente" },
  respondida: { bg: "#EAF3DE", text: "#3B6D11", label: "Respondida" },
  ignorada: { bg: "#F1EFE8", text: "#888780", label: "Ignorada" },
};

export default function AlertasScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Mis alertas</Text>
        <Text style={styles.subtitulo}>{alertaActiva.length} notificaciones</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {alertaActiva.map((alertaActiva) => {
          const estado = estadoColor[alertaActiva.estado];
          return (
            <TouchableOpacity key={alertaActiva.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.badge, { backgroundColor: estado.bg }]}>
                  <Text style={[styles.badgeText, { color: estado.text }]}>
                    {estado.label}
                  </Text>
                </View>
                <Text style={styles.fecha}>{alertaActiva.fecha}</Text>
              </View>
              <Text style={styles.hospital}>{alertaActiva.hospital}</Text>
              <View style={styles.cardFooter}>
                <View style={styles.tipoChip}>
                  <Text style={styles.tipoText}>{alertaActiva.tipo_sangre}</Text>
                </View>
                <Text style={styles.distancia}>{alertaActiva.distancia}</Text>
              </View>
              {alertaActiva.estado === "pendiente" && (
                <View style={styles.botones}>
                  <TouchableOpacity style={styles.btnAceptar}>
                    <Text style={styles.btnAceptarText}>Voy a donar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnRechazar}>
                    <Text style={styles.btnRechazarText}>No puedo</Text>
                  </TouchableOpacity>
                </View>
              )}
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
  },
  titulo: { color: "white", fontSize: 20, fontWeight: "600" },
  subtitulo: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2 },
  card: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 14,
    borderWidth: 0.5,
    borderColor: "#e8e6df",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: { fontSize: 11, fontWeight: "500" },
  fecha: { fontSize: 11, color: "#888780" },
  hospital: { fontSize: 14, fontWeight: "600", color: "#2c2c2a", marginBottom: 8 },
  cardFooter: { flexDirection: "row", alignItems: "center", gap: 8 },
  tipoChip: {
    backgroundColor: "#FCEBEB",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  tipoText: { fontSize: 12, fontWeight: "600", color: "#A32D2D" },
  distancia: { fontSize: 12, color: "#888780" },
  botones: { flexDirection: "row", gap: 8, marginTop: 12 },
  btnAceptar: {
    backgroundColor: "#C0221A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  btnAceptarText: { color: "white", fontSize: 12, fontWeight: "600" },
  btnRechazar: {
    borderWidth: 0.5,
    borderColor: "#F09595",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  btnRechazarText: { color: "#A32D2D", fontSize: 12 },
});