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