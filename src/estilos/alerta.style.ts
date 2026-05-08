import {StyleSheet} from 'react-native';

export const alertaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
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
  btnRechazarText: { color: "#A32D2D", 
    fontSize: 12 
  },
  contenedor: { flex: 1, backgroundColor: "#f5f5f3" },
  scrollContainer: { paddingVertical: 16 },

});