import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { cuestionarioAptitud } from "../constants/mockData";

export default function CuestionarioScreen() {
  const router = useRouter();
  const [respuestas, setRespuestas] = useState<Record<string, boolean>>({});
  const [resultado, setResultado] = useState<null | "apto" | "no_apto">(null);

  const responder = (id: string, valor: boolean) => {
    setRespuestas((prev) => ({ ...prev, [id]: valor }));
  };

  const evaluar = () => {
    let apto = true;
    for (const pregunta of cuestionarioAptitud) {
      const respuesta = respuestas[pregunta.id];
      if (respuesta === undefined) {
        return;
      }
      if (pregunta.critica) {
        if (pregunta.invertida && respuesta === true) {
          apto = false;
          break;
        }
        if (!pregunta.invertida && respuesta === false) {
          apto = false;
          break;
        }
      }
    }
    setResultado(apto ? "apto" : "no_apto");
  };

  const todasRespondidas =
    cuestionarioAptitud.length === Object.keys(respuestas).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Regresar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Cuestionario de aptitud</Text>
        <Text style={styles.subtitulo}>
          Responde para saber si puedes donar hoy
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Progreso */}
        <View style={styles.progreso}>
          <Text style={styles.progresoTexto}>
            {Object.keys(respuestas).length} de {cuestionarioAptitud.length} preguntas
          </Text>
          <View style={styles.progresoBg}>
            <View
              style={[
                styles.progresoFill,
                {
                  width: `${(Object.keys(respuestas).length / cuestionarioAptitud.length) * 100}%`,
                },
              ]}
            />
          </View>
        </View>

        {/* Preguntas */}
        <View style={styles.preguntas}>
          {cuestionarioAptitud.map((p, index) => (
            <View key={p.id} style={styles.preguntaCard}>
              <Text style={styles.preguntaNum}>
                {index + 1}. {p.critica && "⚠️ "}
              </Text>
              <Text style={styles.preguntaTexto}>{p.pregunta}</Text>
              <View style={styles.opciones}>
                <TouchableOpacity
                  style={[
                    styles.opcion,
                    respuestas[p.id] === true && styles.opcionSiActiva,
                  ]}
                  onPress={() => responder(p.id, true)}
                >
                  <Text
                    style={[
                      styles.opcionTexto,
                      respuestas[p.id] === true && styles.opcionTextoActivo,
                    ]}
                  >
                    Sí
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.opcion,
                    respuestas[p.id] === false && styles.opcionNoActiva,
                  ]}
                  onPress={() => responder(p.id, false)}
                >
                  <Text
                    style={[
                      styles.opcionTexto,
                      respuestas[p.id] === false && styles.opcionTextoActivo,
                    ]}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Resultado */}
        {resultado && (
          <View
            style={[
              styles.resultadoCard,
              resultado === "apto"
                ? styles.resultadoApto
                : styles.resultadoNoApto,
            ]}
          >
            <Text style={styles.resultadoIcono}>
              {resultado === "apto" ? "✓" : "✗"}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.resultadoTitulo}>
                {resultado === "apto"
                  ? "¡Estás apto para donar!"
                  : "No puedes donar hoy"}
              </Text>
              <Text style={styles.resultadoSub}>
                {resultado === "apto"
                  ? "Tus respuestas indican que puedes donar. El médico hará la confirmación final."
                  : "Alguna de tus respuestas indica que no es seguro donar en este momento. Consulta con tu médico."}
              </Text>
            </View>
          </View>
        )}

        {/* Botón evaluar */}
        {!resultado && (
          <TouchableOpacity
            style={[
              styles.btnEvaluar,
              !todasRespondidas && styles.btnDesactivado,
            ]}
            onPress={evaluar}
            disabled={!todasRespondidas}
          >
            <Text style={styles.btnEvaluarTexto}>
              {todasRespondidas
                ? "Ver mi resultado"
                : `Responde todas las preguntas (${Object.keys(respuestas).length}/${cuestionarioAptitud.length})`}
            </Text>
          </TouchableOpacity>
        )}

        {resultado === "apto" && (
          <TouchableOpacity
            style={styles.btnAgendar}
            onPress={() => router.push("/cita")}
          >
            <Text style={styles.btnAgendarTexto}>Agendar cita para donar</Text>
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
  progreso: { padding: 16 },
  progresoTexto: {
    fontSize: 12,
    color: "#888780",
    marginBottom: 6,
  },
  progresoBg: {
    height: 5,
    backgroundColor: "#e8e6df",
    borderRadius: 3,
  },
  progresoFill: {
    height: "100%",
    backgroundColor: "#C0221A",
    borderRadius: 3,
  },
  preguntas: { paddingHorizontal: 16, gap: 10 },
  preguntaCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 14,
    borderWidth: 0.5,
    borderColor: "#e8e6df",
    marginBottom: 8,
  },
  preguntaNum: { fontSize: 11, color: "#888780", marginBottom: 4 },
  preguntaTexto: {
    fontSize: 14,
    color: "#2c2c2a",
    fontWeight: "500",
    marginBottom: 12,
    lineHeight: 20,
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
  opcionSiActiva: {
    backgroundColor: "#EAF3DE",
    borderColor: "#C0DD97",
  },
  opcionNoActiva: {
    backgroundColor: "#FCEBEB",
    borderColor: "#F09595",
  },
  opcionTexto: { fontSize: 13, color: "#888780", fontWeight: "500" },
  opcionTextoActivo: { color: "#2c2c2a" },
  resultadoCard: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  resultadoApto: {
    backgroundColor: "#EAF3DE",
    borderWidth: 0.5,
    borderColor: "#C0DD97",
  },
  resultadoNoApto: {
    backgroundColor: "#FCEBEB",
    borderWidth: 0.5,
    borderColor: "#F09595",
  },
  resultadoIcono: { fontSize: 24 },
  resultadoTitulo: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2c2c2a",
    marginBottom: 4,
  },
  resultadoSub: {
    fontSize: 12,
    color: "#888780",
    lineHeight: 18,
  },
  btnEvaluar: {
    backgroundColor: "#C0221A",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  btnDesactivado: { opacity: 0.5 },
  btnEvaluarTexto: { color: "white", fontSize: 14, fontWeight: "600" },
  btnAgendar: {
    borderWidth: 1,
    borderColor: "#C0221A",
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  btnAgendarTexto: { color: "#C0221A", fontSize: 14, fontWeight: "600" },
});