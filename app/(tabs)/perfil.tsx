import { useState, useEffect } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  Alert, ActivityIndicator, TextInput, Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/contexts/AuthContext";
import { supabase } from "../../services/supabase";

const TIPOS_SANGRE: Record<string, string> = {
  "A+": "A Positivo", "A-": "A Negativo",
  "B+": "B Positivo", "B-": "B Negativo",
  "O+": "O Positivo", "O-": "O- Negativo",
  "AB+": "AB Positivo", "AB-": "AB Negativo",
};

export default function PerfilScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [peso, setPeso] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [tipoSangre, setTipoSangre] = useState("O+");
  const [disponible, setDisponible] = useState(true);
  const [notificaciones, setNotificaciones] = useState(true);

  useEffect(() => {
    cargarPerfil();
  }, [user]);

  const cargarPerfil = async () => {
    if (!user) return;
    setCargando(true);
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setNombre(data.nombre || "");
      setTelefono(data.telefono || "");
      setPeso(data.peso_kg?.toString() || "");
      setCiudad(data.domicilio || "");
      setTipoSangre(data.tipo_sangre || "O+");
      setDisponible(data.disponible ?? true);
      setNotificaciones(data.notificaciones ?? true);
    }
    setEmail(user.email || "");
    setCargando(false);
  };

  const guardarCambios = async () => {
    if (!user) return;
    setGuardando(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        nombre,
        telefono,
        peso_kg: parseFloat(peso) || null,
        domicilio: ciudad,
        disponible,
        notificaciones,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    setGuardando(false);
    if (error) {
      Alert.alert("Error", "No se pudieron guardar los cambios");
    } else {
      Alert.alert("¡Listo!", "Perfil actualizado correctamente");
    }
  };

  const iniciales = nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "DN";

  if (cargando) {
    return (
      <SafeAreaView style={s.container}>
        <View style={s.loadingContainer}>
          <ActivityIndicator size="large" color="#C0221A" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.headerBack}>
          <Text style={s.headerBackTexto}>←</Text>
        </TouchableOpacity>
        <Text style={s.headerTitulo}>DonaVida</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.content}>

          {/* Título */}
          <Text style={s.tituloPagina}>Editar Perfil</Text>

          {/* Foto de perfil */}
          <View style={s.fotoContainer}>
            <View style={s.fotoCirculo}>
              <Text style={s.fotoIniciales}>{iniciales}</Text>
            </View>
            <TouchableOpacity>
              <Text style={s.cambiarFotoTexto}>Cambiar foto</Text>
            </TouchableOpacity>
          </View>

          {/* Tipo de sangre */}
          <View style={s.tipoSangreCard}>
            <View style={s.tipoSangreInfo}>
              <Text style={s.tipoSangreLabel}>GRUPO SANGUÍNEO</Text>
              <Text style={s.tipoSangreValor}>
                {TIPOS_SANGRE[tipoSangre] || tipoSangre}
              </Text>
            </View>
            <View style={s.tipoSangreBadge}>
              <Text style={s.tipoSangreBadgeTexto}>{tipoSangre}</Text>
            </View>
          </View>

          {/* Campos del formulario */}
          <View style={s.formCard}>
            {/* Nombre */}
            <View style={s.campo}>
              <Text style={s.campoLabel}>Nombre Completo</Text>
              <TextInput
                style={s.campoInput}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Tu nombre completo"
                placeholderTextColor="#b4b2a9"
              />
              <View style={s.campoLinea} />
            </View>

            {/* Correo */}
            <View style={s.campo}>
              <Text style={s.campoLabel}>Correo Electrónico</Text>
              <TextInput
                style={[s.campoInput, s.campoDesactivado]}
                value={email}
                editable={false}
                placeholderTextColor="#b4b2a9"
              />
              <View style={s.campoLinea} />
            </View>

            {/* Teléfono y Peso */}
            <View style={s.campoRow}>
              <View style={[s.campo, { flex: 1.5 }]}>
                <Text style={s.campoLabel}>Teléfono</Text>
                <TextInput
                  style={s.campoInput}
                  value={telefono}
                  onChangeText={setTelefono}
                  placeholder="+52 00 0000 0000"
                  placeholderTextColor="#b4b2a9"
                  keyboardType="phone-pad"
                />
                <View style={s.campoLinea} />
              </View>
              <View style={{ width: 16 }} />
              <View style={[s.campo, { flex: 1 }]}>
                <Text style={s.campoLabel}>Peso (kg)</Text>
                <TextInput
                  style={s.campoInput}
                  value={peso}
                  onChangeText={setPeso}
                  placeholder="70"
                  placeholderTextColor="#b4b2a9"
                  keyboardType="decimal-pad"
                />
                <View style={s.campoLinea} />
              </View>
            </View>

            {/* Ciudad */}
            <View style={s.campo}>
              <Text style={s.campoLabel}>Ciudad Principal</Text>
              <TextInput
                style={s.campoInput}
                value={ciudad}
                onChangeText={setCiudad}
                placeholder="Oaxaca de Juárez"
                placeholderTextColor="#b4b2a9"
              />
              <View style={s.campoLinea} />
            </View>
          </View>

          {/* Toggles */}
          <View style={s.togglesCard}>
            <View style={s.toggleItem}>
              <View style={{ flex: 1 }}>
                <Text style={s.toggleTitulo}>Disponible para donar</Text>
                <Text style={s.toggleSub}>
                  Aparecer en búsquedas urgentes.
                </Text>
              </View>
              <Switch
                value={disponible}
                onValueChange={setDisponible}
                trackColor={{ false: "#e8e6df", true: "#C0221A" }}
                thumbColor="white"
              />
            </View>

            <View style={s.toggleDivider} />

            <View style={s.toggleItem}>
              <View style={{ flex: 1 }}>
                <Text style={s.toggleTitulo}>Notificaciones Críticas</Text>
                <Text style={s.toggleSub}>
                  Alertas de escasez en tu zona.
                </Text>
              </View>
              <Switch
                value={notificaciones}
                onValueChange={setNotificaciones}
                trackColor={{ false: "#e8e6df", true: "#C0221A" }}
                thumbColor="white"
              />
            </View>
          </View>

          {/* Botón guardar */}
          <TouchableOpacity
            style={[s.btnGuardar, guardando && s.btnGuardando]}
            onPress={guardarCambios}
            disabled={guardando}
          >
            <Text style={s.btnGuardarTexto}>
              {guardando ? "GUARDANDO..." : "GUARDAR CAMBIOS"}
            </Text>
          </TouchableOpacity>

          {/* Opciones adicionales */}
          <View style={s.opcionesCard}>
            <TouchableOpacity
              style={s.opcionItem}
              onPress={() => router.push("/documentos-medicos")}
            >
              <Text style={s.opcionIcono}>📄</Text>
              <Text style={s.opcionTexto}>Documentos médicos</Text>
              <Text style={s.opcionFlecha}>→</Text>
            </TouchableOpacity>

            <View style={s.opcionDivider} />

            <TouchableOpacity
              style={s.opcionItem}
              onPress={() => router.push("/cuestionario")}
            >
              <Text style={s.opcionIcono}>🩺</Text>
              <Text style={s.opcionTexto}>Verificar aptitud</Text>
              <Text style={s.opcionFlecha}>→</Text>
            </TouchableOpacity>

            <View style={s.opcionDivider} />

            <TouchableOpacity
              style={s.opcionItem}
              onPress={() => router.push("/(tabs)/historial")}
            >
              <Text style={s.opcionIcono}>🩸</Text>
              <Text style={s.opcionTexto}>Historial de donaciones</Text>
              <Text style={s.opcionFlecha}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 32 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = {
  container: { flex: 1, backgroundColor: "#f5f5f3" } as any,
  loadingContainer: {
    flex: 1, justifyContent: "center", alignItems: "center",
  } as any,

  // Header
  header: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 0.5, borderBottomColor: "#e8e6df",
  } as any,
  headerBack: { width: 40, height: 40, justifyContent: "center" } as any,
  headerBackTexto: { fontSize: 22, color: "#C0221A" } as any,
  headerTitulo: {
    fontSize: 17, fontWeight: "600", color: "#2c2c2a",
  } as any,

  content: { padding: 20 } as any,

  // Título
  tituloPagina: {
    fontSize: 28, fontWeight: "700", color: "#2c2c2a", marginBottom: 24,
  } as any,

  // Foto
  fotoContainer: { alignItems: "center", marginBottom: 24 } as any,
  fotoCirculo: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: "#2c2c2a",
    alignItems: "center", justifyContent: "center",
    marginBottom: 8,
  } as any,
  fotoIniciales: {
    color: "white", fontSize: 36, fontWeight: "700",
  } as any,
  cambiarFotoTexto: {
    color: "#C0221A", fontSize: 14, fontWeight: "500",
  } as any,

  // Tipo de sangre
  tipoSangreCard: {
    backgroundColor: "white", borderRadius: 12,
    padding: 16, marginBottom: 16,
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  } as any,
  tipoSangreInfo: { flex: 1 } as any,
  tipoSangreLabel: {
    fontSize: 11, fontWeight: "600",
    color: "#888780", letterSpacing: 0.5,
    marginBottom: 4,
  } as any,
  tipoSangreValor: {
    fontSize: 20, fontWeight: "700", color: "#2c2c2a",
  } as any,
  tipoSangreBadge: {
    backgroundColor: "#FCEBEB", borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 10,
    alignItems: "center", justifyContent: "center",
  } as any,
  tipoSangreBadgeTexto: {
    color: "#C0221A", fontSize: 16, fontWeight: "700",
  } as any,

  // Formulario
  formCard: {
    backgroundColor: "white", borderRadius: 12,
    paddingHorizontal: 16, paddingTop: 8,
    paddingBottom: 8, marginBottom: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  } as any,
  campo: { paddingVertical: 8 } as any,
  campoRow: {
    flexDirection: "row", alignItems: "flex-start",
  } as any,
  campoLabel: {
    fontSize: 12, color: "#888780",
    fontWeight: "500", marginBottom: 4,
  } as any,
  campoInput: {
    fontSize: 15, color: "#2c2c2a",
    paddingVertical: 4,
  } as any,
  campoDesactivado: { color: "#b4b2a9" } as any,
  campoLinea: {
    height: 0.5, backgroundColor: "#C0221A",
    marginTop: 4, opacity: 0.4,
  } as any,

  // Toggles
  togglesCard: {
    backgroundColor: "white", borderRadius: 12,
    paddingHorizontal: 16, marginBottom: 20,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  } as any,
  toggleItem: {
    flexDirection: "row", alignItems: "center",
    paddingVertical: 16, gap: 12,
  } as any,
  toggleDivider: {
    height: 0.5, backgroundColor: "#e8e6df",
  } as any,
  toggleTitulo: {
    fontSize: 15, fontWeight: "600", color: "#2c2c2a",
  } as any,
  toggleSub: {
    fontSize: 12, color: "#888780", marginTop: 2,
  } as any,

  // Botón guardar
  btnGuardar: {
    backgroundColor: "#C0221A", borderRadius: 12,
    padding: 18, alignItems: "center", marginBottom: 20,
  } as any,
  btnGuardando: { opacity: 0.7 } as any,
  btnGuardarTexto: {
    color: "white", fontSize: 15, fontWeight: "700",
    letterSpacing: 1,
  } as any,

  // Opciones adicionales
  opcionesCard: {
    backgroundColor: "white", borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  } as any,
  opcionItem: {
    flexDirection: "row", alignItems: "center",
    paddingVertical: 16, gap: 12,
  } as any,
  opcionDivider: {
    height: 0.5, backgroundColor: "#e8e6df",
  } as any,
  opcionIcono: { fontSize: 20 } as any,
  opcionTexto: {
    flex: 1, fontSize: 14, fontWeight: "500", color: "#2c2c2a",
  } as any,
  opcionFlecha: { fontSize: 16, color: "#888780" } as any,
};