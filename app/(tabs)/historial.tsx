import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { historialMedico } from "../../constants/mockData";

type Tab = "signos" | "enfermedades" | "medicamentos" | "cirugias";

export default function HistorialScreen() {
  const [tabActiva, setTabActiva] = useState<Tab>("signos");

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "signos", label: "Signos", icon: "❤️" },
    { id: "enfermedades", label: "Condiciones", icon: "🏥" },
    { id: "medicamentos", label: "Medicamentos", icon: "💊" },
    { id: "cirugias", label: "Cirugías", icon: "🔬" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Mi historial médico</Text>
        <Text style={styles.subtitulo}>
          Última actualización:{" "}
          {historialMedico.signos_vitales.ultima_actualizacion}
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, tabActiva === tab.id && styles.tabActiva]}
            onPress={() => setTabActiva(tab.id)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabLabel,
                tabActiva === tab.id && styles.tabLabelActiva,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* SIGNOS VITALES */}
        {tabActiva === "signos" && (
          <View style={styles.seccion}>
            <Text style={styles.seccionTitulo}>Signos vitales</Text>

            <View style={styles.signosGrid}>
              <View style={[styles.signoCard, { borderTopColor: "#C0221A" }]}>
                <Text style={styles.signoValor}>
                  {historialMedico.signos_vitales.tipo_sangre}
                </Text>
                <Text style={styles.signoLabel}>Tipo de sangre</Text>
              </View>
              <View style={[styles.signoCard, { borderTopColor: "#185FA5" }]}>
                <Text style={styles.signoValor}>
                  {historialMedico.signos_vitales.hemoglobina}
                </Text>
                <Text style={styles.signoLabel}>Hemoglobina g/dL</Text>
              </View>
              <View style={[styles.signoCard, { borderTopColor: "#639922" }]}>
                <Text style={styles.signoValor}>
                  {historialMedico.signos_vitales.peso_kg} kg
                </Text>
                <Text style={styles.signoLabel}>Peso</Text>
              </View>
              <View style={[styles.signoCard, { borderTopColor: "#BA7517" }]}>
                <Text style={styles.signoValor}>
                  {historialMedico.signos_vitales.estatura_cm} cm
                </Text>
                <Text style={styles.signoLabel}>Estatura</Text>
              </View>
            </View>

            {/* Presión arterial */}
            <View style={styles.presionCard}>
              <View>
                <Text style={styles.presionLabel}>Presión arterial</Text>
                <Text style={styles.presionValor}>
                  {historialMedico.signos_vitales.presion_arterial} mmHg
                </Text>
              </View>
              <View style={styles.presionBadge}>
                <Text style={styles.presionBadgeText}>Normal</Text>
              </View>
            </View>

            {/* Aptitud visual */}
            <View style={styles.aptitudCard}>
              <Text style={styles.aptitudIcono}>✓</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.aptitudTitulo}>Apto para donar</Text>
                <Text style={styles.aptitudSub}>
                  Todos tus signos vitales están dentro del rango normal
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* ENFERMEDADES Y ALERGIAS */}
        {tabActiva === "enfermedades" && (
          <View style={styles.seccion}>
            <Text style={styles.seccionTitulo}>Enfermedades crónicas</Text>
            {historialMedico.enfermedades.map((e) => (
              <View key={e.id} style={styles.itemCard}>
                <View
                  style={[
                    styles.itemDot,
                    { backgroundColor: e.activa ? "#C0221A" : "#639922" },
                  ]}
                />
                <Text style={styles.itemNombre}>{e.nombre}</Text>
                <Text
                  style={[
                    styles.itemEstado,
                    { color: e.activa ? "#C0221A" : "#639922" },
                  ]}
                >
                  {e.activa ? "Activa" : "Sin condiciones"}
                </Text>
              </View>
            ))}

            <Text style={[styles.seccionTitulo, { marginTop: 20 }]}>
              Alergias
            </Text>
            {historialMedico.alergias.map((a) => (
              <View key={a.id} style={styles.itemCard}>
                <View
                  style={[styles.itemDot, { backgroundColor: "#BA7517" }]}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemNombre}>{a.nombre}</Text>
                  <Text style={styles.itemMeta}>Severidad: {a.severidad}</Text>
                </View>
                <View style={styles.alergiaChip}>
                  <Text style={styles.alergiaChipText}>{a.severidad}</Text>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.btnAgregar}>
              <Text style={styles.btnAgregarText}>
                + Agregar condición o alergia
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* MEDICAMENTOS */}
        {tabActiva === "medicamentos" && (
          <View style={styles.seccion}>
            <Text style={styles.seccionTitulo}>Medicamentos actuales</Text>
            {historialMedico.medicamentos.map((m) => (
              <View key={m.id} style={styles.medCard}>
                <View style={styles.medIcono}>
                  <Text style={{ fontSize: 18 }}>💊</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.medNombre}>{m.nombre}</Text>
                  <Text style={styles.medMeta}>
                    {m.dosis} — {m.frecuencia}
                  </Text>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.btnAgregar}>
              <Text style={styles.btnAgregarText}>+ Agregar medicamento</Text>
            </TouchableOpacity>

            {/* Aviso importante */}
            <View style={styles.avisoCard}>
              <Text style={styles.avisoIcono}>⚠️</Text>
              <Text style={styles.avisoTexto}>
                Algunos medicamentos pueden afectar tu aptitud para donar. El
                médico del hospital verificará tu caso al momento de la
                donación.
              </Text>
            </View>
          </View>
        )}

        {/* CIRUGÍAS Y TRANSFUSIONES */}
        {tabActiva === "cirugias" && (
          <View style={styles.seccion}>
            <Text style={styles.seccionTitulo}>Historial de cirugías</Text>
            {historialMedico.cirugias.map((c) => (
              <View key={c.id} style={styles.cirugiaCard}>
                <View style={styles.cirugiaFecha}>
                  <Text style={styles.cirugiaFechaText}>{c.fecha}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cirugiaNombre}>{c.tipo}</Text>
                  <Text style={styles.cirugiaHospital}>{c.hospital}</Text>
                </View>
              </View>
            ))}

            <Text style={[styles.seccionTitulo, { marginTop: 20 }]}>
              Historial de transfusiones
            </Text>
            {historialMedico.transfusiones.map((t) => (
              <View key={t.id} style={styles.cirugiaCard}>
                <View
                  style={[styles.cirugiaFecha, { backgroundColor: "#E6F1FB" }]}
                >
                  <Text style={[styles.cirugiaFechaText, { color: "#185FA5" }]}>
                    {t.fecha}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cirugiaNombre}>{t.tipo}</Text>
                  <Text style={styles.cirugiaHospital}>{t.hospital}</Text>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.btnAgregar}>
              <Text style={styles.btnAgregarText}>+ Agregar registro</Text>
            </TouchableOpacity>
          </View>
        )}

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
  tabs: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e8e6df",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    gap: 3,
  },
  tabActiva: {
    borderBottomWidth: 2,
    borderBottomColor: "#C0221A",
  },
  tabIcon: { fontSize: 16 },
  tabLabel: { fontSize: 10, color: "#888780" },
  tabLabelActiva: { color: "#C0221A", fontWeight: "600" },
  seccion: { padding: 16 },
  seccionTitulo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c2c2a",
    marginBottom: 12,
  },
  signosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
  },
  signoCard: {
    width: "47%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    borderTopWidth: 3,
    borderWidth: 0.5,
    borderColor: "#e8e6df",
  },
  signoValor: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2c2c2a",
    marginBottom: 4,
  },
  signoLabel: { fontSize: 11, color: "#888780" },
  presionCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    borderWidth: 0.5,
    borderColor: "#e8e6df",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  presionLabel: { fontSize: 12, color: "#888780", marginBottom: 4 },
  presionValor: { fontSize: 18, fontWeight: "600", color: "#2c2c2a" },
  presionBadge: {
    backgroundColor: "#EAF3DE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  presionBadgeText: { fontSize: 12, color: "#3B6D11", fontWeight: "500" },
  aptitudCard: {
    backgroundColor: "#EAF3DE",
    borderRadius: 10,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 0.5,
    borderColor: "#C0DD97",
  },
  aptitudIcono: {
    fontSize: 22,
    color: "#3B6D11",
    fontWeight: "700",
  },
  aptitudTitulo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3B6D11",
  },
  aptitudSub: {
    fontSize: 11,
    color: "#3B6D11",
    marginTop: 2,
    opacity: 0.8,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: "#e8e6df",
    gap: 10,
  },
  itemDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  itemNombre: { fontSize: 13, fontWeight: "500", color: "#2c2c2a", flex: 1 },
  itemEstado: { fontSize: 11, fontWeight: "500" },
  itemMeta: { fontSize: 11, color: "#888780", marginTop: 2 },
  alergiaChip: {
    backgroundColor: "#FAEEDA",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  alergiaChipText: { fontSize: 10, color: "#854F0B" },
  medCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: "#e8e6df",
    gap: 10,
  },
  medIcono: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#f1efe8",
    alignItems: "center",
    justifyContent: "center",
  },
  medNombre: { fontSize: 13, fontWeight: "500", color: "#2c2c2a" },
  medMeta: { fontSize: 11, color: "#888780", marginTop: 2 },
  avisoCard: {
    flexDirection: "row",
    backgroundColor: "#FAEEDA",
    borderRadius: 10,
    padding: 14,
    marginTop: 8,
    gap: 10,
    borderWidth: 0.5,
    borderColor: "#FAC775",
  },
  avisoIcono: { fontSize: 18 },
  avisoTexto: {
    flex: 1,
    fontSize: 12,
    color: "#854F0B",
    lineHeight: 18,
  },
  cirugiaCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: "#e8e6df",
    gap: 12,
  },
  cirugiaFecha: {
    backgroundColor: "#FCEBEB",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  cirugiaFechaText: {
    fontSize: 10,
    color: "#A32D2D",
    fontWeight: "500",
  },
  cirugiaNombre: { fontSize: 13, fontWeight: "500", color: "#2c2c2a" },
  cirugiaHospital: { fontSize: 11, color: "#888780", marginTop: 2 },
  btnAgregar: {
    borderWidth: 1,
    borderColor: "#C0221A",
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  btnAgregarText: {
    color: "#C0221A",
    fontSize: 13,
    fontWeight: "500",
  },
});
