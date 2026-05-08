import { useState } from "react";
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { cuestionarioAptitud } from "../constants/mockData";

type Respuesta = Record<string, boolean>;

const categorias: Record<string, { label: string; icon: string }> = {
  general:       { label: "General",       icon: "👤" },
  cirugias:      { label: "Cirugías",       icon: "🔬" },
  procedimientos:{ label: "Procedimientos", icon: "💉" },
  enfermedades:  { label: "Enfermedades",   icon: "🏥" },
  habitos:       { label: "Hábitos",        icon: "⚠️" },
  medicamentos:  { label: "Medicamentos",   icon: "💊" },
  sintomas:      { label: "Síntomas hoy",   icon: "🌡️" },
};

export default function CuestionarioScreen() {
  const router = useRouter();
  const [respuestas, setRespuestas] = useState<Respuesta>({});
  const [resultado, setResultado] = useState<null | "apto" | "no_apto">(null);
  const [razonesRechazo, setRazonesRechazo] = useState<string[]>([]);

  const responder = (id: string, valor: boolean) => {
    setRespuestas((prev) => ({ ...prev, [id]: valor }));
    setResultado(null);
  };

  const evaluar = () => {
    const razones: string[] = [];
    let apto = true;
    for (const pregunta of cuestionarioAptitud) {
      const respuesta = respuestas[pregunta.id];
      if (respuesta === undefined) continue;
      if (pregunta.critica) {
        const falla = pregunta.invertida ? respuesta === true : respuesta === false;
        if (falla) {
          apto = false;
          razones.push(pregunta.pregunta);
        }
      }
    }
    setRazonesRechazo(razones);
    setResultado(apto ? "apto" : "no_apto");
  };

  const todasRespondidas =
    cuestionarioAptitud.length === Object.keys(respuestas).length;
  const respondidas = Object.keys(respuestas).length;
  const total = cuestionarioAptitud.length;
  const progresoPct = Math.round((respondidas / total) * 100);

  // Agrupar por categoría
  const porCategoria = cuestionarioAptitud.reduce((acc, p) => {
    const cat = p.categoria || "general";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {} as Record<string, typeof cuestionarioAptitud>);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Regresar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Cuestionario de aptitud</Text>
        <Text style={styles.subtitulo}>
          Basado en los requisitos oficiales de donación de sangre
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Progreso */}
        <View style={styles.progresoContainer}>
          <View style={styles.progresoHeader}>
            <Text style={styles.progresoTexto}>
              {respondidas} de {total} respondidas
            </Text>
            <Text style={styles.progresoPct}>{progresoPct}%</Text>
          </View>
          <View style={styles.progresoBg}>
            <View style={[styles.progresoFill, { width: `${progresoPct}%` }]} />
          </View>
        </View>

        {/* Aviso */}
        <View style={styles.aviso}>
          <Text style={styles.avisoIcono}>ℹ️</Text>
          <Text style={styles.avisoTexto}>
            Las preguntas con ⚠️ son críticas. Una respuesta incorrecta
            indica que no puedes donar en este momento.
          </Text>
        </View>

        {/* Preguntas por categoría */}
        {Object.entries(porCategoria).map(([catId, preguntas]) => {
          const cat = categorias[catId] || { label: catId, icon: "📋" };
          return (
            <View key={catId}>
              <View style={styles.categoriaHeader}>
                <Text style={styles.categoriaIcono}>{cat.icon}</Text>
                <Text style={styles.categoriaLabel}>{cat.label}</Text>
              </View>

              {preguntas.map((p) => {
                const respondida = respuestas[p.id] !== undefined;
                const esFalla = respondida && p.critica && (
                  p.invertida
                    ? respuestas[p.id] === true
                    : respuestas[p.id] === false
                );

                return (
                  <View
                    key={p.id}
                    style={[
                      styles.preguntaCard,
                      esFalla && styles.preguntaCardFalla,
                    ]}
                  >
                    <View style={styles.preguntaTop}>
                      {p.critica && <Text>⚠️ </Text>}
                      <Text style={styles.preguntaTexto}>{p.pregunta}</Text>
                    </View>
                    {p.opcional && (
                      <Text style={styles.preguntaOpcional}>
                        Omite si no aplica
                      </Text>
                    )}
                    <View style={styles.opciones}>
                      <TouchableOpacity
                        style={[
                          styles.opcion,
                          respuestas[p.id] === true && (
                            p.invertida ? styles.opcionMal : styles.opcionBien
                          ),
                        ]}
                        onPress={() => responder(p.id, true)}
                      >
                        <Text style={[
                          styles.opcionTexto,
                          respuestas[p.id] === true && styles.opcionTextoActivo,
                        ]}>
                          Sí
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.opcion,
                          respuestas[p.id] === false && (
                            p.invertida ? styles.opcionBien : styles.opcionMal
                          ),
                        ]}
                        onPress={() => responder(p.id, false)}
                      >
                        <Text style={[
                          styles.opcionTexto,
                          respuestas[p.id] === false && styles.opcionTextoActivo,
                        ]}>
                          No
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}

        {/* Resultado apto */}
        {resultado === "apto" && (
          <View style={styles.resultadoApto}>
            <Text style={styles.resultadoIcono}>✓</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.resultadoTitulo}>¡Estás apto para donar!</Text>
              <Text style={styles.resultadoSub}>
                El siguiente paso es confirmar tu análisis clínico.
              </Text>
            </View>
          </View>
        )}

        {/* Resultado no apto */}
        {resultado === "no_apto" && (
          <View style={styles.resultadoNoApto}>
            <View style={{ flex: 1 }}>
              <Text style={styles.resultadoTitulo}>No puedes donar en este momento</Text>
              <Text style={styles.resultadoSub}>
                Razones detectadas:
              </Text>
              {razonesRechazo.map((r, i) => (
                <View key={i} style={styles.razonItem}>
                  <View style={styles.razonDot} />
                  <Text style={styles.razonTexto}>{r}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Botón evaluar */}
        {!resultado && (
          <TouchableOpacity
            style={[styles.btnEvaluar, !todasRespondidas && styles.btnDesactivado]}
            onPress={evaluar}
            disabled={!todasRespondidas}
          >
            <Text style={styles.btnEvaluarTexto}>
              {todasRespondidas
                ? "Ver mi resultado"
                : `Responde todas las preguntas (${respondidas}/${total})`}
            </Text>
          </TouchableOpacity>
        )}

        {/* Botón continuar si apto */}
        {resultado === "apto" && (
          <TouchableOpacity
            style={styles.btnSiguiente}
            onPress={() => router.push("/analisis-clinico")}
          >
            <Text style={styles.btnSiguienteTexto}>
              📋 Continuar — Análisis clínico →
            </Text>
          </TouchableOpacity>
        )}

        {/* Botón reintentar si no apto */}
        {resultado === "no_apto" && (
          <TouchableOpacity
            style={styles.btnReintentar}
            onPress={() => {
              setRespuestas({});
              setResultado(null);
              setRazonesRechazo([]);
            }}
          >
            <Text style={styles.btnReintentarTexto}>Volver a intentar</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 32 }} />
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
  back: { color: "rgba(255,255,255,0.8)", fontSize: 13, marginBottom: 8 },
  titulo: { color: "white", fontSize: 20, fontWeight: "600" },
  subtitulo: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2 },
  progresoContainer: { padding: 16, paddingBottom: 8 },
  progresoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progresoTexto: { fontSize: 12, color: "#888780" },
  progresoPct: { fontSize: 12, fontWeight: "600", color: "#C0221A" },
  progresoBg: { height: 6, backgroundColor: "#e8e6df", borderRadius: 3 },
  progresoFill: { height: "100%", backgroundColor: "#C0221A", borderRadius: 3 },
  aviso: {
    flexDirection: "row",
    backgroundColor: "#E6F1FB",
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    gap: 8,
    borderWidth: 0.5,
    borderColor: "#B5D4F4",
  },
  avisoIcono: { fontSize: 16 },
  avisoTexto: { flex: 1, fontSize: 12, color: "#185FA5", lineHeight: 18 },
  categoriaHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  categoriaIcono: { fontSize: 16 },
  categoriaLabel: { fontSize: 13, fontWeight: "600", color: "#2c2c2a" },
  preguntaCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: "#e8e6df",
  },
  preguntaCardFalla: {
    borderColor: "#F09595",
    backgroundColor: "#FFF8F8",
  },
  preguntaTop: { flexDirection: "row", marginBottom: 12 },
  preguntaTexto: {
    flex: 1,
    fontSize: 14,
    color: "#2c2c2a",
    fontWeight: "500",
    lineHeight: 20,
  },
  preguntaOpcional: {
    fontSize: 11,
    color: "#888780",
    marginBottom: 8,
    fontStyle: "italic",
  },
  opciones: { flexDirection: "row", gap: 8 },
  opcion: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#e8e6df",
    backgroundColor: "#f5f5f3",
  },
  opcionBien: { backgroundColor: "#EAF3DE", borderColor: "#C0DD97" },
  opcionMal:  { backgroundColor: "#FCEBEB", borderColor: "#F09595" },
  opcionTexto: { fontSize: 13, color: "#888780", fontWeight: "500" },
  opcionTextoActivo: { color: "#2c2c2a", fontWeight: "600" },
  resultadoApto: {
    margin: 16,
    backgroundColor: "#EAF3DE",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    borderWidth: 0.5,
    borderColor: "#C0DD97",
  },
  resultadoNoApto: {
    margin: 16,
    backgroundColor: "#FCEBEB",
    borderRadius: 12,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "#F09595",
  },
  resultadoIcono: { fontSize: 28 },
  resultadoTitulo: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2c2c2a",
    marginBottom: 6,
  },
  resultadoSub: {
    fontSize: 12,
    color: "#888780",
    lineHeight: 18,
    marginBottom: 8,
  },
  razonItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 6,
  },
  razonDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C0221A",
    marginTop: 5,
    flexShrink: 0,
  },
  razonTexto: { flex: 1, fontSize: 12, color: "#A32D2D", lineHeight: 18 },
  btnEvaluar: {
    backgroundColor: "#C0221A",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  btnDesactivado: { opacity: 0.4 },
  btnEvaluarTexto: { color: "white", fontSize: 14, fontWeight: "600" },
  btnSiguiente: {
    backgroundColor: "#C0221A",
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  btnSiguienteTexto: { color: "white", fontSize: 14, fontWeight: "600" },
  btnReintentar: {
    backgroundColor: "#f1efe8",
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  btnReintentarTexto: { color: "#888780", fontSize: 14, fontWeight: "500" },
});