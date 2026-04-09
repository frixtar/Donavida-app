import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

const { width } = Dimensions.get("window");
const MENU_WIDTH = 280;

interface Props {
  children: React.ReactNode;
}

export default function MenuLateral({ children }: Props) {
  const [abierto, setAbierto] = useState(false);
  const translateX = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const abrir = () => {
    setAbierto(true);
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.5,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const cerrar = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -MENU_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => setAbierto(false));
  };

  const items = [
    { icon: "🏠", label: "Inicio" },
    { icon: "🗺️", label: "Mapa" },
    { icon: "🔔", label: "Alertas" },
    { icon: "👤", label: "Perfil" },
    { icon: "📅", label: "Agendar cita" },
    { icon: "📱", label: "Mi QR" },
    { icon: "🏆", label: "Recompensas" },
    { icon: "⚙️", label: "Configuración" },
    { icon: "🚪", label: "Cerrar sesión" },
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Contenido principal */}
      <View style={{ flex: 1 }}>
        {/* Header con botón de menú */}
        <View style={styles.header}>
          <TouchableOpacity onPress={abrir} style={styles.menuBtn}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </TouchableOpacity>
          <Text style={styles.headerTitulo}>DonaVida</Text>
          <View style={styles.tipoChip}>
            <Text style={styles.tipoText}>O−</Text>
          </View>
        </View>
        {children}
      </View>

      {/* Overlay oscuro */}
      {abierto && (
        <TouchableWithoutFeedback onPress={cerrar}>
          <Animated.View style={[styles.overlay, { opacity }]} />
        </TouchableWithoutFeedback>
      )}

      {/* Menú lateral */}
      <Animated.View
        style={[styles.menu, { transform: [{ translateX }] }]}
      >
        {/* Header del menú */}
        <View style={styles.menuHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>CM</Text>
          </View>
          <Text style={styles.menuNombre}>Zaid Mendoza</Text>
          <View style={styles.menuTipoChip}>
            <Text style={styles.menuTipoText}>O− · Donante universal</Text>
          </View>
        </View>

        {/* Items */}
        {items.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.menuItem}
            onPress={cerrar}
          >
            <Text style={styles.menuItemIcon}>{item.icon}</Text>
            <Text style={styles.menuItemLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Footer */}
        <View style={styles.menuFooter}>
          <Text style={styles.footerText}>DonaVida v1.0.0</Text>
          <Text style={styles.footerSub}>Dona sangre, salva vidas</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#C0221A",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: 48,
    gap: 12,
  },
  menuBtn: { gap: 5, padding: 4 },
  menuLine: {
    width: 22,
    height: 2,
    backgroundColor: "white",
    borderRadius: 2,
  },
  headerTitulo: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
  },
  tipoChip: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tipoText: { color: "white", fontSize: 12, fontWeight: "600" },
  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "black",
  },
  menu: {
    position: "absolute",
    top: 0, left: 0, bottom: 0,
    width: MENU_WIDTH,
    backgroundColor: "white",
    elevation: 10,
  },
  menuHeader: {
    backgroundColor: "#C0221A",
    padding: 24,
    paddingTop: 52,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatarText: { color: "white", fontSize: 22, fontWeight: "700" },
  menuNombre: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  menuTipoChip: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  menuTipoText: { color: "white", fontSize: 11 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e8e6df",
  },
  menuItemIcon: { fontSize: 18 },
  menuItemLabel: {
    fontSize: 14,
    color: "#2c2c2a",
    fontWeight: "500",
  },
  menuFooter: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#e8e6df",
  },
  footerText: { fontSize: 12, color: "#888780", fontWeight: "500" },
  footerSub: { fontSize: 11, color: "#C0221A", marginTop: 2 },
});