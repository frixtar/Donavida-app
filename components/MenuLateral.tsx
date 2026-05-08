// components/MenuLateral.tsx
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
import { useRouter, usePathname } from "expo-router";
import { useAuth } from "../src/contexts/AuthContext";

const { width } = Dimensions.get("window");
const MENU_WIDTH = 280;

interface Props {
  children: React.ReactNode;
}

export default function MenuLateral({ children }: Props) {
  const [abierto, setAbierto] = useState(false);
  const translateX = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth();

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

  const navegar = (ruta: string) => {
    cerrar();
    router.push(ruta);
  };

  const items = [
    { icon: "🏠", label: "Inicio", ruta: "/(tabs)" },
    { icon: "🗺️", label: "Mapa", ruta: "/(tabs)/mapa" },
    { icon: "🔔", label: "Alertas", ruta: "/(tabs)/alertas" },
    { icon: "👤", label: "Perfil", ruta: "/(tabs)/perfil" },
    { icon: "📅", label: "Agendar cita", ruta: "/cita" },
    { icon: "🏆", label: "Recompensas", ruta: "/(tabs)/perfil" }, // misma que perfil
    { icon: "📚", label: "Historial", ruta: "/(tabs)/historial" },
  ];

  const handleCerrarSesion = async () => {
    cerrar();
    await signOut();
    router.replace("/onboarding");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={abrir} style={styles.menuBtn}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </TouchableOpacity>
          <Text style={styles.headerTitulo}>DonaVida</Text>
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
      <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
        <View style={styles.menuHeader}>
  <View style={styles.avatar}>
    <Text style={styles.avatarText}>
      {user?.user_metadata?.nombre
        ? user.user_metadata.nombre.charAt(0).toUpperCase()
        : "U"}
    </Text>
  </View>
  <Text style={styles.menuNombre}>
    {user?.user_metadata?.nombre || "Usuario"}
  </Text>
  <View style={styles.menuTipoChip}>
    <Text style={styles.menuTipoText}>
      {user?.user_metadata?.tipo_sangre || "O+"} · Donante
    </Text>
  </View>
</View>

        {items.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.menuItem,
              pathname === item.ruta && styles.menuItemActivo,
            ]}
            onPress={() => navegar(item.ruta)}
          >
            <Text style={styles.menuItemIcon}>{item.icon}</Text>
            <Text
              style={[
                styles.menuItemLabel,
                pathname === item.ruta && styles.menuItemLabelActivo,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Cerrar sesión */}
        <TouchableOpacity style={styles.menuItem} onPress={handleCerrarSesion}>
          <Text style={styles.menuItemIcon}>🚪</Text>
          <Text style={styles.menuItemLabel}>Cerrar sesión</Text>
        </TouchableOpacity>

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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
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
  menuItemActivo: {
    backgroundColor: "#fce4e4",
  },
  menuItemIcon: { fontSize: 18 },
  menuItemLabel: {
    fontSize: 14,
    color: "#2c2c2a",
    fontWeight: "500",
  },
  menuItemLabelActivo: {
    color: "#C0221A",
    fontWeight: "bold",
  },
  menuFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#e8e6df",
  },
  footerText: { fontSize: 12, color: "#888780", fontWeight: "500" },
  footerSub: { fontSize: 11, color: "#C0221A", marginTop: 2 },
});