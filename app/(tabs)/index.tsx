import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/contexts/AuthContext";
import { historialDonaciones, alertaActiva } from "../../constants/mockData";
import { homeStyles as s } from "../../src/estilos/home.styles";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  // Datos reales del usuario autenticado
  const nombre = user?.user_metadata?.nombre || "Donante";
  const tipoSangre = user?.user_metadata?.tipo_sangre || "O+";
  const puntos = user?.user_metadata?.puntos || 0;
  const donaciones = user?.user_metadata?.donaciones || 0;
  const vidasSalvadas = donaciones * 3;
  const perfilCompleto = user?.user_metadata?.peso_kg ? true : false;

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C0221A" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <View style={{ flex: 1 }}>
            <Text style={s.greeting}>Bienvenido de vuelta,</Text>
            <Text style={s.nombre}>{nombre} 👋</Text>
          </View>
          <View style={s.tipoCard}>
            <Text style={s.tipoSangre}>{tipoSangre}</Text>
            <Text style={s.tipoLabel}>Mi tipo</Text>
          </View>
        </View>

        {!perfilCompleto && (
          <View style={s.bannerPerfil}>
            <Text style={s.bannerPerfilIcono}>📋</Text>
            <Text style={s.bannerPerfilTexto}>
              Completa tu perfil médico para verificar tu aptitud como donante
            </Text>
            <TouchableOpacity
              style={s.bannerPerfilBtn}
              onPress={() => router.push("/(tabs)/perfil")}
            >
              <Text style={s.bannerPerfilBtnTexto}>Completar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Aptitud */}
        <View style={s.aptitudCard}>
          <View style={s.aptitudDot} />
          <Text style={s.aptitudText}>
            {donaciones > 0
              ? "✓ Apto para donar — próxima donación disponible"
              : "Verifica si eres apto para donar"}
          </Text>
          <TouchableOpacity
            style={s.aptitudBtn}
            onPress={() => router.push("/cuestionario")}
          >
            <Text style={s.aptitudBtnTexto}>Verificar</Text>
          </TouchableOpacity>
        </View>

        {/* Alerta de emergencia */}
        {alertaActiva && (
          <View style={s.alertaBanner}>
            <View style={s.alertaHeader}>
              <View style={s.pulseDot} />
              <Text style={s.alertaTitulo}>
                Urgencia — {alertaActiva.tipo_sangre}
              </Text>
              <View style={s.alertaUrgencia}>
                <Text style={s.alertaUrgenciaTexto}>CRÍTICO</Text>
              </View>
            </View>
            <Text style={s.alertaBody}>
              {alertaActiva.hospital} necesita tu tipo de sangre urgentemente.
              Estás a {alertaActiva.distancia}.
            </Text>
            <View style={s.alertaBotones}>
              <TouchableOpacity
                style={s.btnAceptar}
                onPress={() => router.push("/(tabs)/mapa")}
              >
                <Text style={s.btnAceptarText}>🩸 Voy a donar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.btnRechazar}>
                <Text style={s.btnRechazarText}>No puedo ahora</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Stats */}
        <Text style={s.seccionTitulo}>Tu impacto</Text>
        <View style={s.statsRow}>
          <View style={s.statBox}>
            <Text style={[s.statNum, { color: "#C0221A" }]}>{donaciones}</Text>
            <Text style={s.statLabel}>Donaciones</Text>
          </View>
          <View style={s.statBox}>
            <Text style={[s.statNum, { color: "#3B6D11" }]}>{puntos}</Text>
            <Text style={s.statLabel}>Puntos</Text>
          </View>
          <View style={s.statBox}>
            <Text style={[s.statNum, { color: "#185FA5" }]}>{vidasSalvadas}</Text>
            <Text style={s.statLabel}>Vidas aprox.</Text>
          </View>
        </View>

        {/* Acciones rápidas */}
        <Text style={s.seccionTitulo}>Acciones rápidas</Text>
        <View style={s.accionesRow}>
          <TouchableOpacity
            style={s.accionBtn}
            onPress={() => router.push("/cuestionario")}
          >
            <Text style={s.accionIcono}>🩺</Text>
            <Text style={s.accionLabel}>Verificar aptitud</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.accionBtn}
            onPress={() => router.push("/cita")}
          >
            <Text style={s.accionIcono}>📅</Text>
            <Text style={s.accionLabel}>Agendar cita</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.accionBtn}
            onPress={() => router.push("/(tabs)/mapa")}
          >
            <Text style={s.accionIcono}>🗺️</Text>
            <Text style={s.accionLabel}>Ver mapa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.accionBtn, s.accionBtnActivo]}
            onPress={() => router.push("/(tabs)/alertas")}
          >
            <Text style={s.accionIcono}>🔔</Text>
            <Text style={[s.accionLabel, s.accionLabelActivo]}>Alertas</Text>
          </TouchableOpacity>
        </View>

        {/* Próxima donación */}
        <Text style={s.seccionTitulo}>Próxima donación</Text>
        <View style={s.proximaCard}>
          <View style={s.proximaIcono}>
            <Text style={s.proximaIconoTexto}>🩸</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.proximaTitulo}>Donación disponible</Text>
            <Text style={s.proximaFecha}>
              {donaciones > 0 ? "Ya puedes donar nuevamente" : "Agenda tu primera donación"}
            </Text>
          </View>
          <View style={s.proximaBadge}>
            <Text style={s.proximaBadgeTexto}>
              {donaciones > 0 ? "Disponible" : "Pendiente"}
            </Text>
          </View>
        </View>

        {/* Historial */}
        <Text style={s.seccionTitulo}>Historial reciente</Text>
        {historialDonaciones.length > 0 ? (
          historialDonaciones.map((item) => (
            <View key={item.id} style={s.historialItem}>
              <View style={s.historialIcono}>
                <Text style={s.historialCruz}>+</Text>
              </View>
              <View style={s.historialInfo}>
                <Text style={s.historialHospital}>{item.hospital}</Text>
                <Text style={s.historialFecha}>{item.fecha}</Text>
              </View>
              <Text style={s.historialPuntos}>+{item.puntos} pts</Text>
            </View>
          ))
        ) : (
          <View style={[s.historialItem, { justifyContent: "center" }]}>
            <Text style={{ color: "#888780", fontSize: 13 }}>
              Aún no tienes donaciones registradas
            </Text>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}