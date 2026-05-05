import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    icon: '🩸',
    titulo: 'Dona sangre,\nsalva vidas',
    descripcion:
      'Cada donación puede salvar hasta 3 vidas. Con PulsoMX conectamos donantes con hospitales que necesitan tu ayuda en tiempo real.',
    color: '#C0221A',
    colorClaro: '#FCEBEB',
  },
  {
    id: '2',
    icon: '🔔',
    titulo: 'Alertas en\ntiempo real',
    descripcion:
      'Recibe notificaciones cuando un hospital cercano necesita tu tipo de sangre. Tú decides si puedes ayudar con un solo toque.',
    color: '#185FA5',
    colorClaro: '#E6F1FB',
  },
  {
    id: '3',
    icon: '🗺️',
    titulo: 'Encuentra el\ncamino rápido',
    descripcion:
      'Te mostramos la ruta más rápida al hospital. Llega, muestra tu QR y done en menos de 30 minutos desde la alerta.',
    color: '#BA7517',
    colorClaro: '#FAEEDA',
  },
  {
    id: '4',
    icon: '🏆',
    titulo: 'Gana puntos\ny recompensas',
    descripcion:
      'Cada donación suma puntos canjeables en farmacias, carta de servicio social y reconocimientos en tu comunidad.',
    color: '#3B6D11',
    colorClaro: '#EAF3DE',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [slideActual, setSlideActual] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setSlideActual(index);
  };

  const siguiente = () => {
    if (slideActual < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: (slideActual + 1) * width, animated: true });
      setSlideActual(slideActual + 1);
    }
  };

  const esUltimo = slideActual === slides.length - 1;
  const slide = slides[slideActual];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Botón saltar */}
      {!esUltimo && (
        <TouchableOpacity
          style={styles.btnSaltar}
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.btnSaltarTexto}>Saltar</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((s, index) => (
          <View key={s.id} style={[styles.slide, { backgroundColor: s.color }]}>

            {/* Círculos decorativos */}
            <View style={[styles.circulo1, { backgroundColor: 'rgba(255,255,255,0.08)' }]} />
            <View style={[styles.circulo2, { backgroundColor: 'rgba(255,255,255,0.06)' }]} />

            {/* Contenido superior */}
            <View style={styles.slideTop}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <View style={[styles.iconInner, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                  <Text style={styles.icon}>{s.icon}</Text>
                </View>
              </View>
            </View>

            {/* Contenido inferior */}
            <View style={[styles.slideBottom, { backgroundColor: s.colorClaro }]}>
              <Text style={[styles.titulo, { color: s.color }]}>{s.titulo}</Text>
              <Text style={styles.descripcion}>{s.descripcion}</Text>

              {/* Número de slide */}
              <View style={styles.slideNumero}>
                <Text style={[styles.slideNumeroTexto, { color: s.color }]}>
                  {index + 1}/{slides.length}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Indicadores */}
      <View style={[styles.indicadores, { backgroundColor: slide.colorClaro }]}>
        {slides.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              scrollRef.current?.scrollTo({ x: i * width, animated: true });
              setSlideActual(i);
            }}
          >
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: i === slideActual ? slide.color : '#d0cfc8',
                  width: i === slideActual ? 24 : 8,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Botones */}
      <View style={[styles.botones, { backgroundColor: slide.colorClaro }]}>
        {!esUltimo ? (
          <TouchableOpacity
            style={[styles.btnSiguiente, { backgroundColor: slide.color }]}
            onPress={siguiente}
          >
            <Text style={styles.btnSiguienteTexto}>Siguiente →</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.btnCrear, { backgroundColor: slide.color }]}
              onPress={() => router.replace('/registro')}
            >
              <Text style={styles.btnCrearTexto}>🩸 Crear cuenta gratis</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnLogin, { borderColor: slide.color }]}
              onPress={() => router.replace('/login')}
            >
              <Text style={[styles.btnLoginTexto, { color: slide.color }]}>
                Ya tengo cuenta — Iniciar sesión
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  btnSaltar: {
    position: 'absolute',
    top: 52,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  btnSaltarTexto: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  slide: {
    width,
    flex: 1,
  },
  circulo1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    top: -80,
    right: -80,
  },
  circulo2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    top: 100,
    left: -60,
  },
  slideTop: {
    height: height * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 64,
  },
  slideBottom: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 32,
    paddingTop: 36,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    marginBottom: 16,
  },
  descripcion: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 26,
  },
  slideNumero: {
    marginTop: 20,
  },
  slideNumeroTexto: {
    fontSize: 13,
    fontWeight: '500',
    opacity: 0.6,
  },
  indicadores: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  botones: {
    padding: 20,
    paddingBottom: 36,
    gap: 10,
  },
  btnSiguiente: {
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnSiguienteTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  btnCrear: {
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnCrearTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  btnLogin: {
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  btnLoginTexto: {
    fontSize: 14,
    fontWeight: '500',
  },
});