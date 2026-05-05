import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function EIndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnCuestionario}
        onPress={() => router.push("/cuestionario")}
      >
        <Text style={styles.btnCuestionarioTexto}>
          🩺 Verificar aptitud para donar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  btnCuestionario: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C0221A",
  },
  btnCuestionarioTexto: {
    color: "#C0221A",
    fontSize: 14,
    fontWeight: "600",
  },
});