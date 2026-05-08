import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

type DocumentoEstado = "pendiente" | "subido" | "requerido";

interface Documento {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  requerido: boolean;
  estado: DocumentoEstado;
  valor?: string;
}

const documentosIniciales: Documento[] = [
  {
    id: "1",
    titulo: "Análisis de sangre",
    descripcion: "Hemoglobina, hematocrito y grupo sanguíneo confirmado",
    icono: "🩸",
    requerido: true,
    estado: "requerido",
  },
  {
    id: "2",
    titulo: "Presión arterial",
    descripcion: "Resultado reciente, máximo 3 meses de antigüedad",
    icono: "💓",
    requerido: true,
    estado: "requerido",
  },
  {
    id: "3",
    titulo: "Peso y talla",
    descripcion: "Peso mínimo requerido: 50 kg",
    icono: "⚖️",
    requerido: true,
    estado: "requerido",
  },
  {
    id: "4",
    titulo: "Certificado médico",
    descripcion: "Carta de un médico que confirme tu buen estado de salud",
    icono: "📄",
    requerido: false,
    estado: "pendiente",
  },
];

const pasos = [
  { num: 1, label: "Cuestionario", completado: true },
  { num: 2, label: "Análisis clínico", completado: false, activo: true },
  { num: 3, label: "Aprobación", completado: false },
];

export default function AnalisisClinicoScreen() {
  const router = useRouter();
  const [documentos, setDocumentos] = useState<Documento[]>(documentosIniciales);
  const [enviado, setEnviado] = useState(false);

  // Valores manuales para los campos numéricos
  const [hemoglobina, setHemoglobina] = useState("");
  const [presionSistolica, setPresionSistolica] = useState("");
  const [presionDiastolica, setPresionDiastolica] = useState("");
  const [peso, setPeso] = useState("");
  const [talla, setTalla] = useState("");

  const todosRequeridosCompletos = () => {
    return hemoglobina !== "" &&
      presionSistolica !== "" &&
      presionDiastolica !== "" &&
      peso !== "" &&
      talla !== "";
  };

  const validarDatos = () => {
    const hb = parseFloat(hemoglobina);
    const ps = parseFloat(presionSistolica);
    const pd = parseFloat(presionDiastolica);
    const kg = parseFloat(peso);

    if (hb < 12.5) {
      Alert.alert(
        "Hemoglobina baja",
        "Tu nivel de hemoglobina es menor al mínimo requerido (12.5 g/dL) para donar.",
        [{ text: "Entendido" }]
      );
      return false;
    }
    if (ps > 180 || pd > 100) {
      Alert.alert(
        "Presión arterial elevada",
        "Tu presión arterial está fuera del rango permitido para donar.",
        [{ text: "Entendido" }]
      );
      return false;
    }
    if (kg < 50) {
      Alert.alert(
        "Peso insuficiente",
        "El peso mínimo para donar es 50 kg.",
        [{ text: "Entendido" }]
      );
      return false;
    }
    return true;
  };

  const handleEnviar = () => {
    if (!todosRequeridosCompletos()) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos requeridos.");
      return;
    }
    if (!validarDatos()) return;
    setEnviado(true);
  };

  if (enviado) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.exitoContainer}>
          <View style={styles.exitoCirculo}>
            <Text style={styles.exitoIcono}>✓</Text>
          </View>
          <Text style={styles.exitoTitulo}>
            ¡Análisis enviado!
          </Text>
          <Text style={styles.exitoSub}>
            Tus datos clínicos han sido registrados exitosamente.
            Tu perfil está listo para recibir alertas de donación.
          </Text>

          {/* Resumen de datos */}
          <View style={styles.resumenCard}>
            <Text style={styles.resumenTitulo}>Resumen de tu análisis</Text>
            <View style={styles.resumenFila}>
              <Text style={styles.resumenLabel}>Hemoglobina</Text>
              <Text style={styles.resumenValor}>{hemoglobina} g/dL ✓</Text>
            </View>
            <View style={styles.resumenFila}>
              <Text style={styles.resumenLabel}>Presión arterial</Text>
              <Text style={styles.resumenValor}>{presionSistolica}/{presionDiastolica} mmHg ✓</Text>
            </View>
            <View style={styles.resumenFila}>
              <Text style={styles.resumenLabel}>Peso</Text>
              <Text style={styles.resumenValor}>{peso} kg ✓</Text>
            </View>
            <View style={styles.resumenFila}>
              <Text style={styles.resumenLabel}>Talla</Text>
              <Text style={styles.resumenValor}>{talla} cm ✓</Text>
            </View>
          </View>

          <View style={styles.aprobadoBadge}>
            <Text style={styles.aprobadoIcono}>🩸</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.aprobadoTitulo}>Donante aprobado</Text>
              <Text style={styles.aprobadoSub}>
                Ya puedes recibir alertas de hospitales cercanos
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.btnIrAlertas}
            onPress={() => router.replace("/(tabs)/alertas")}
          >
            <Text style={styles.btnIrAlertasTexto}>
              🔔 Ver alertas de hospitales
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnHome}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.btnHomeTexto}>Ir al inicio</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Regresar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Análisis clínico</Text>
        <Text style={styles.subtitulo}>
          Ingresa tus resultados médicos para confirmar tu aptitud
        </Text>
      </View>

      {/* Stepper */}
      <View style={styles.stepper}>
        {pasos.map((paso, i) => (
          <View key={paso.num} style={styles.stepperItem}>
            <View style={[
              styles.stepperCirculo,
              paso.completado && styles.stepperCompletado,
              paso.activo && styles.stepperActivo,
            ]}>
              {paso.completado
                ? <Text style={styles.stepperCheck}>✓</Text>
                : <Text style={styles.stepperNum}>{paso.num}</Text>
              }
            </View>
            <Text style={[
              styles.stepperLabel,
              (paso.completado || paso.activo) && styles.stepperLabelActivo,
            ]}>
              {paso.label}
            </Text>
            {i < pasos.length - 1 && (
              <View style={[
                styles.stepperLinea,
                paso.completado && styles.stepperLineaCompletada,
              ]} />
            )}
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Aviso */}
        <View style={styles.aviso}>
          <Text style={styles.avisoIcono}>ℹ️</Text>
          <Text style={styles.avisoTexto}>
            Ingresa los valores de tu análisis clínico más reciente.
            Los datos serán validados automáticamente según los criterios
            oficiales de donación de sangre en México.
          </Text>
        </View>

        {/* SECCIÓN 1: Análisis de sangre */}
        <View style={styles.seccion}>
          <View style={styles.seccionHeader}>
            <Text style={styles.seccionIcono}>🩸</Text>
            <View>
              <Text style={styles.seccionTitulo}>Análisis de sangre</Text>
              <Text style={styles.seccionSub}>Resultado de laboratorio reciente</Text>
            </View>
            <View style={styles.requeridoBadge}>
              <Text style={styles.requeridoTexto}>Requerido</Text>
            </View>
          </View>

          <Text style={styles.inputLabel}>
            Hemoglobina (g/dL) <Text style={styles.rojo}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 14.5"
            placeholderTextColor="#b4b2a9"
            keyboardType="decimal-pad"
            value={hemoglobina}
            onChangeText={setHemoglobina}
          />
          <View style={styles.rangoCard}>
            <Text style={styles.rangoTexto}>
              ✓ Mínimo requerido: 12.5 g/dL (mujeres) / 13.5 g/dL (hombres)
            </Text>
          </View>
        </View>

        {/* SECCIÓN 2: Presión arterial */}
        <View style={styles.seccion}>
          <View style={styles.seccionHeader}>
            <Text style={styles.seccionIcono}>💓</Text>
            <View>
              <Text style={styles.seccionTitulo}>Presión arterial</Text>
              <Text style={styles.seccionSub}>Medición reciente en mmHg</Text>
            </View>
            <View style={styles.requeridoBadge}>
              <Text style={styles.requeridoTexto}>Requerido</Text>
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>
                Sistólica <Text style={styles.rojo}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 120"
                placeholderTextColor="#b4b2a9"
                keyboardType="number-pad"
                value={presionSistolica}
                onChangeText={setPresionSistolica}
              />
            </View>
            <Text style={styles.separador}>/</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>
                Diastólica <Text style={styles.rojo}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 80"
                placeholderTextColor="#b4b2a9"
                keyboardType="number-pad"
                value={presionDiastolica}
                onChangeText={setPresionDiastolica}
              />
            </View>
          </View>
          <View style={styles.rangoCard}>
            <Text style={styles.rangoTexto}>
              ✓ Rango permitido: 90/60 a 180/100 mmHg
            </Text>
          </View>
        </View>

        {/* SECCIÓN 3: Peso y talla */}
        <View style={styles.seccion}>
          <View style={styles.seccionHeader}>
            <Text style={styles.seccionIcono}>⚖️</Text>
            <View>
              <Text style={styles.seccionTitulo}>Peso y talla</Text>
              <Text style={styles.seccionSub}>Medidas corporales actuales</Text>
            </View>
            <View style={styles.requeridoBadge}>
              <Text style={styles.requeridoTexto}>Requerido</Text>
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>
                Peso (kg) <Text style={styles.rojo}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 70"
                placeholderTextColor="#b4b2a9"
                keyboardType="decimal-pad"
                value={peso}
                onChangeText={setPeso}
              />
            </View>
            <View style={{ width: 16 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>
                Talla (cm) <Text style={styles.rojo}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 170"
                placeholderTextColor="#b4b2a9"
                keyboardType="number-pad"
                value={talla}
                onChangeText={setTalla}
              />
            </View>
          </View>
          <View style={styles.rangoCard}>
            <Text style={styles.rangoTexto}>
              ✓ Peso mínimo requerido: 50 kg
            </Text>
          </View>
        </View>

        {/* SECCIÓN 4: Documentos opcionales */}
        <View style={styles.seccion}>
          <View style={styles.seccionHeader}>
            <Text style={styles.seccionIcono}>📄</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.seccionTitulo}>Documentos de respaldo</Text>
              <Text style={styles.seccionSub}>Opcional — refuerza tu solicitud</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => router.push("/documentos-medicos")}
          >
            <Text style={styles.uploadIcono}>📎</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.uploadTitulo}>Subir análisis de laboratorio</Text>
              <Text style={styles.uploadSub}>PDF o foto — máx. 10 MB</Text>
            </View>
            <Text style={styles.uploadFlecha}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Criterios de aprobación */}
        <View style={styles.criteriosCard}>
          <Text style={styles.criteriosTitulo}>Criterios de aprobación</Text>
          {[
            "Hemoglobina ≥ 12.5 g/dL",
            "Presión arterial dentro del rango normal",
            "Peso mínimo de 50 kg",
            "Cuestionario de salud aprobado",
          ].map((c, i) => (
            <View key={i} style={styles.criterioItem}>
              <Text style={styles.criterioCheck}>✓</Text>
              <Text style={styles.criterioTexto}>{c}</Text>
            </View>
          ))}
        </View>

        {/* Botón enviar */}
        <TouchableOpacity
          style={[
            styles.btnEnviar,
            !todosRequeridosCompletos() && styles.btnDesactivado,
          ]}
          onPress={handleEnviar}
          disabled={!todosRequeridosCompletos()}
        >
          <Text style={styles.btnEnviarTexto}>
            {todosRequeridosCompletos()
              ? "✓ Confirmar mis datos clínicos"
              : "Completa todos los campos requeridos"}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f3" },

  // Header
  header: {
    backgroundColor: "#C0221A",
    padding: 20,
    paddingBottom: 16,
  },
  back: { color: "rgba(255,255,255,0.8)", fontSize: 13, marginBottom: 8 },
  titulo: { color: "white", fontSize: 20, fontWeight: "600" },
  subtitulo: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2, lineHeight: 18 },

  // Stepper
  stepper: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e8e6df",
  },
  stepperItem: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  stepperCirculo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f1efe8",
    borderWidth: 1.5,
    borderColor: "#d0cfc8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  stepperCompletado: {
    backgroundColor: "#EAF3DE",
    borderColor: "#3B6D11",
  },
  stepperActivo: {
    backgroundColor: "#FCEBEB",
    borderColor: "#C0221A",
  },
  stepperCheck: { color: "#3B6D11", fontWeight: "700", fontSize: 14 },
  stepperNum: { color: "#888780", fontWeight: "600", fontSize: 13 },
  stepperLabel: { fontSize: 10, color: "#888780", textAlign: "center" },
  stepperLabelActivo: { color: "#C0221A", fontWeight: "600" },
  stepperLinea: {
    position: "absolute",
    top: 16,
    right: -"50%" as any,
    width: "100%",
    height: 1.5,
    backgroundColor: "#e8e6df",
    zIndex: -1,
  },
  stepperLineaCompletada: { backgroundColor: "#3B6D11" },

  // Aviso
  aviso: {
    flexDirection: "row",
    backgroundColor: "#E6F1FB",
    margin: 16,
    borderRadius: 10,
    padding: 12,
    gap: 8,
    borderWidth: 0.5,
    borderColor: "#B5D4F4",
  },
  avisoIcono: { fontSize: 16 },
  avisoTexto: { flex: 1, fontSize: 12, color: "#185FA5", lineHeight: 18 },

  // Secciones
  seccion: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "#e8e6df",
  },
  seccionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  seccionIcono: { fontSize: 22 },
  seccionTitulo: { fontSize: 14, fontWeight: "600", color: "#2c2c2a" },
  seccionSub: { fontSize: 11, color: "#888780", marginTop: 2 },
  requeridoBadge: {
    marginLeft: "auto",
    backgroundColor: "#FCEBEB",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  requeridoTexto: { fontSize: 10, color: "#C0221A", fontWeight: "500" },

  // Inputs
  inputLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#2c2c2a",
    marginBottom: 6,
  },
  rojo: { color: "#C0221A" },
  input: {
    backgroundColor: "#f5f5f3",
    borderWidth: 0.5,
    borderColor: "#e8e6df",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: "#2c2c2a",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  separador: {
    fontSize: 22,
    color: "#888780",
    marginHorizontal: 8,
    marginBottom: 16,
  },
  rangoCard: {
    backgroundColor: "#EAF3DE",
    borderRadius: 8,
    padding: 10,
  },
  rangoTexto: { fontSize: 11, color: "#3B6D11" },

  // Upload
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C0221A",
    borderStyle: "dashed",
    gap: 10,
  },
  uploadIcono: { fontSize: 20 },
  uploadTitulo: { fontSize: 13, fontWeight: "500", color: "#2c2c2a" },
  uploadSub: { fontSize: 11, color: "#888780", marginTop: 2 },
  uploadFlecha: { fontSize: 16, color: "#C0221A" },

  // Criterios
  criteriosCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "#e8e6df",
  },
  criteriosTitulo: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2c2c2a",
    marginBottom: 12,
  },
  criterioItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  criterioCheck: { color: "#3B6D11", fontWeight: "700", fontSize: 14 },
  criterioTexto: { fontSize: 13, color: "#2c2c2a" },

  // Botón enviar
  btnEnviar: {
    backgroundColor: "#C0221A",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  btnDesactivado: { opacity: 0.4 },
  btnEnviarTexto: { color: "white", fontSize: 14, fontWeight: "600" },

  // Pantalla de éxito
  exitoContainer: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    paddingTop: 60,
  },
  exitoCirculo: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#EAF3DE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  exitoIcono: { fontSize: 40, color: "#3B6D11" },
  exitoTitulo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c2c2a",
    marginBottom: 10,
    textAlign: "center",
  },
  exitoSub: {
    fontSize: 14,
    color: "#888780",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  resumenCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#e8e6df",
    marginBottom: 16,
  },
  resumenTitulo: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2c2c2a",
    marginBottom: 12,
  },
  resumenFila: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e8e6df",
  },
  resumenLabel: { fontSize: 12, color: "#888780" },
  resumenValor: { fontSize: 12, fontWeight: "600", color: "#3B6D11" },
  aprobadoBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCEBEB",
    borderRadius: 12,
    padding: 14,
    width: "100%",
    gap: 10,
    marginBottom: 24,
    borderWidth: 0.5,
    borderColor: "#F09595",
  },
  aprobadoIcono: { fontSize: 24 },
  aprobadoTitulo: { fontSize: 14, fontWeight: "600", color: "#A32D2D" },
  aprobadoSub: { fontSize: 12, color: "#C0221A", marginTop: 2 },
  btnIrAlertas: {
    backgroundColor: "#C0221A",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  btnIrAlertasTexto: { color: "white", fontSize: 15, fontWeight: "600" },
  btnHome: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e8e6df",
  },
  btnHomeTexto: { color: "#888780", fontSize: 14 },
});