import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { alerta } from "../../constants/mockData";
import { alertaStyles as styles } from "../../src/estilos/alerta.style";

const estadoColor: Record<string, { bg: string; text: string; label: string }> = {
  pendiente: { bg: "#FCEBEB", text: "#A32D2D", label: "Pendiente" },
  respondida: { bg: "#EAF3DE", text: "#3B6D11", label: "Respondida" },
  ignorada: { bg: "#F1EFE8", text: "#888780", label: "Ignorada" },
};

export default function AlertasScreen() {
  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Mis alertas</Text>
        <Text style={styles.subtitulo}>{alerta.length} notificaciones</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {alerta.map((alerta) => {
          const estado = estadoColor[alerta.estado];
          return (
            <TouchableOpacity key={alerta.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.badge, { backgroundColor: estado.bg }]}>
                  <Text style={[styles.badgeText, { color: estado.text }]}>
                    {estado.label}
                  </Text>
                </View>
                <Text style={styles.fecha}>{alerta.fecha}</Text>
              </View>
              <Text style={styles.hospital}>{alerta.hospital}</Text>
              <View style={styles.cardFooter}>
                <View style={styles.tipoChip}>
                  <Text style={styles.tipoText}>{alerta.tipo_sangre}</Text>
                </View>
                <Text style={styles.distancia}>{alerta.distancia}</Text>
              </View>
              {alerta.estado === "pendiente" && (
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
      </ScrollView>
    </SafeAreaView>
  );
}