import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#970800",
        tabBarInactiveTintColor: "#888780",
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: "#c0baa2",
          backgroundColor: "white",
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen name="login" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="registro" options={{ tabBarButton: () => null }} />
      <Tabs.Screen name="index" options={{ title: "Inicio" }} />
      <Tabs.Screen name="a_mapa" options={{ title: "Mapa" }} />
      <Tabs.Screen name="alertas" options={{ title: "Alertas" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}