import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { bienvenidaStyles } from '../src/estilos/bienvenida.styles';
import { usePrimeraVez } from '../src/hooks/usePrimeraVez';

export default function BienvenidaScreen() {
  const router = useRouter();
  const { marcarVista } = usePrimeraVez();

  const irAApp = async () => {
    await marcarVista();
    router.replace("/(tabs)");
  };

  const irAPerfil = async () => {
    await marcarVista();
    router.replace("/(tabs)/d_perfil");
  };

  return (
    <SafeAreaView style={bienvenidaStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C0221A" />
      <View style={bienvenidaStyles.content}>

        {/* Logo */}
        <View style={bienvenidaStyles.logoContainer}>
          <View style={bienvenidaStyles.circulo3}>
            <View style={bienvenidaStyles.circulo2}>
              <View style={bienvenidaStyles.circulo1}>
                <View style={bienvenidaStyles.cruz}>
                  <View style={bienvenidaStyles.cruzH} />
                  <View style={bienvenidaStyles.cruzV} />
                </View>
              </View>
            </View>
          </View>
        </View>

        <Text style={bienvenidaStyles.titulo}>¡Bienvenido a DonaVida!</Text>
        <Text style={bienvenidaStyles.subtitulo}>
          Tu cuenta ha sido creada exitosamente.{"\n"}
          Ya formas parte de nuestra comunidad de donantes.
        </Text>

        {/* Stats */}
        <View style={bienvenidaStyles.statsRow}>
          <View style={bienvenidaStyles.statBox}>
            <Text style={bienvenidaStyles.statNum}>142</Text>
            <Text style={bienvenidaStyles.statLabel}>Donantes{"\n"}activos</Text>
          </View>
          <View style={bienvenidaStyles.statBox}>
            <Text style={bienvenidaStyles.statNum}>47</Text>
            <Text style={bienvenidaStyles.statLabel}>Donaciones{"\n"}este mes</Text>
          </View>
          <View style={bienvenidaStyles.statBox}>
            <Text style={bienvenidaStyles.statNum}>3</Text>
            <Text style={bienvenidaStyles.statLabel}>Vidas por{"\n"}donación</Text>
          </View>
        </View>

        {/* Próximos pasos */}
        <View style={bienvenidaStyles.pasosCard}>
          <Text style={bienvenidaStyles.pasosTitulo}>Próximos pasos</Text>
          {[
            { num: "1", texto: "Completa tu perfil médico" },
            { num: "2", texto: "Activa las notificaciones" },
            { num: "3", texto: "Verifica tu aptitud para donar" },
          ].map((paso) => (
            <View key={paso.num} style={bienvenidaStyles.pasoItem}>
              <View style={bienvenidaStyles.pasoNum}>
                <Text style={bienvenidaStyles.pasoNumTexto}>{paso.num}</Text>
              </View>
              <Text style={bienvenidaStyles.pasoTexto}>{paso.texto}</Text>
            </View>
          ))}
        </View>

        {/* Botones */}
        <TouchableOpacity
          style={bienvenidaStyles.btnPrimario}
          onPress={irAApp}
        >
          <Text style={bienvenidaStyles.btnPrimarioTexto}>
            Ir a la app 🩸
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={bienvenidaStyles.btnSecundario}
          onPress={irAPerfil}
        >
          <Text style={bienvenidaStyles.btnSecundarioTexto}>
            Completar perfil médico ahora
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}