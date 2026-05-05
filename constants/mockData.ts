// constants/mockData.ts
export const donante = {
  nombre: "Carlos Martínez",
  tipo_sangre: "O+",
  donaciones: 4,
  puntos: 450,
  proxima_donacion: "12 mayo 2025",
  apto: true,
  vidas_salvadas: 12,
};

export const historialDonaciones = [
  {
    id: "1",
    fecha: "15/03/2026",
    lugar: "Hospital General de Oaxaca",
    cantidad: "500 ml",
    tipo: "Sangre completa",
  },
  {
    id: "2",
    fecha: "10/12/2025",
    lugar: "Cruz Roja",
    cantidad: "450 ml",
    tipo: "Glóbulos rojos",
  },
  {
    id: "3",
    fecha: "05/08/2025",
    lugar: "Centro de Salud",
    cantidad: "500 ml",
    tipo: "Sangre completa",
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

export const alertas = [
  {
    id: "1",
    hospital: "Hospital General de Oaxaca",
    tipo_sangre: "O-",
    distancia: "1.2 km",
    fecha: "Hace 30 min",
    estado: "pendiente",
  }

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