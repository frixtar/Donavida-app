// constants/mockData.ts
export const historialDonaciones = [
  {
    id: "1",
    hospital: "Hospital Civil de Oaxaca",
    fecha: "12 Ene 2026",
    puntos: 100,
  },
  {
    id: "2",
    hospital: "Cruz Roja Oaxaca",
    fecha: "3 Oct 2025",
    puntos: 150,
  },
  {
    id: "3",
    hospital: "IMSS Oaxaca",
    fecha: "20 Jul 2025",
    puntos: 100,
  },
];

export const alerta = [
  {
    id: "1",
    hospital: "Hospital Civil de Oaxaca",
    tipo_sangre: "O-",
    distancia: "1.2 km",
    urgencia: "crítica",
    estado: "pendiente",
    fecha: "15 Mar 2026",
  },
  {
    id: "2",
    hospital: "Cruz Roja Oaxaca",
    tipo_sangre: "O+",
    distancia: "2.5 km",
    urgencia: "crítica",
    estado: "respondida",
    fecha: "10 Mar 2026",
  },
];

export const historialMedico = {
  // Signos vitales
  signos_vitales: {
    peso_kg: 72,
    estatura_cm: 175,
    tipo_sangre: "O-",
    presion_arterial: "120/80",
    hemoglobina: 14.5,
    ultima_actualizacion: "10 Mar 2026",
  },

  // Enfermedades crónicas
  enfermedades: [
    {
      id: "1",
      nombre: "Ninguna",
      activa: false,
    },
  ],

  // Alergias
  alergias: [
    { id: "1", nombre: "Penicilina", severidad: "moderada" },
    { id: "2", nombre: "Polen", severidad: "leve" },
  ],

  // Medicamentos actuales
  medicamentos: [
    {
      id: "1",
      nombre: "Ninguno",
      dosis: "-",
      frecuencia: "-",
    },
  ],

  // Historial de cirugías
  cirugias: [
    {
      id: "1",
      tipo: "Apendicectomía",
      fecha: "Mar 2019",
      hospital: "Hospital Civil de Oaxaca",
    },
  ],

  // Historial de transfusiones
  transfusiones: [
    {
      id: "1",
      tipo: "Ninguna",
      fecha: "-",
      hospital: "-",
    },
  ],
};

// Datos para la pantalla de mapa
export const hospitales = [
  {
    id: "1",
    nombre: "Hospital General de Oaxaca",
    direccion: "Calzada de la República 100, Centro",
    distancia: "1.2 km",
    urgencia: "critica",   // critica, necesita, suficiente
    abierto: true,
    tipo_sangre: "O-",
  },
  {
    id: "2",
    nombre: "Cruz Roja Oaxaca",
    direccion: "Av. Independencia 200",
    distancia: "2.5 km",
    urgencia: "critica",
    abierto: true,
    tipo_sangre: "O+",
  },
  {
    id: "3",
    nombre: "Hospital Civil",
    direccion: "Av. Universidad s/n",
    distancia: "3.8 km",
    urgencia: "necesita",
    abierto: true,
    tipo_sangre: "A-",
  },
  {
    id: "4",
    nombre: "Clínica IMSS",
    direccion: "Blvd. Vasconcelos 500",
    distancia: "4.0 km",
    urgencia: "suficiente",
    abierto: false,
    tipo_sangre: "B+",
  },
];

export const cuestionarioAptitud = [
  {
    id: "1",
    pregunta: "¿Te sientes bien de salud el día de hoy?",
    critica: true,
  },
  {
    id: "2",
    pregunta: "¿Has dormido al menos 6 horas la noche anterior?",
    critica: true,
  },
  {
    id: "3",
    pregunta: "¿Has comido algo en las últimas 4 horas?",
    critica: true,
  },
  {
    id: "4",
    pregunta: "¿Pesas más de 50 kg?",
    critica: true,
  },
  {
    id: "5",
    pregunta: "¿Tienes entre 18 y 65 años?",
    critica: true,
  },
  {
    id: "6",
    pregunta: "¿Has consumido alcohol en las últimas 24 horas?",
    critica: true,
    invertida: true,
  },
  {
    id: "7",
    pregunta: "¿Tomaste algún medicamento en los últimos 3 días?",
    critica: false,
    invertida: true,
  },
  {
    id: "8",
    pregunta: "¿Has tenido fiebre en los últimos 7 días?",
    critica: true,
    invertida: true,
  },
  {
    id: "9",
    pregunta: "¿Has recibido una vacuna en los últimos 30 días?",
    critica: false,
    invertida: true,
  },
  {
    id: "10",
    pregunta: "¿Has tenido alguna cirugía en los últimos 6 meses?",
    critica: true,
    invertida: true,
  },
];