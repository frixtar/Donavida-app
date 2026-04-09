export const donante = {
  nombre: "Eduardo el lider TOP",
  tipo_sangre: "O-",
  puntos: 620,
  donaciones: 7,
  vidas_salvadas: 21,
  apto: true,
  proxima_donacion: "15 Mar 2026",
};

export const historial = [
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

export const alertaActiva = {
  hospital: "Hospital Civil de Oaxaca",
  tipo_sangre: "O-",
  distancia: "1.2 km",
  urgencia: "crítica",
};

export const hospitales = [
  {
    id: "1",
    nombre: "Hospital Civil de Oaxaca",
    distancia: "1.2 km",
    urgencia: "critica",
    tipo_sangre: "O-",
    abierto: true,
    lat: 17.0732,
    lng: -96.7266,
  },
  {
    id: "2",
    nombre: "Cruz Roja Oaxaca",
    distancia: "3.4 km",
    urgencia: "suficiente",
    tipo_sangre: "A+",
    abierto: true,
    lat: 17.0612,
    lng: -96.7198,
  },
  {
    id: "3",
    nombre: "San lorenzo Cacaotepec",
    distancia: "5 km",
    urgencia: "suficiente",
    tipo_sangre: "B+",
    abierto: true,
    lat: 17.0612,
    lng: -96.7198,
  },
  {
    id: "4",
    nombre: "IMSS Oaxaca",
    distancia: "2.1 km",
    urgencia: "necesita",
    tipo_sangre: "B+",
    abierto: false,
    lat: 17.0698,
    lng: -96.7312,
  },
];

export const alertas = [
  {
    id: "1",
    hospital: "Hospital Civil de Oaxaca",
    tipo_sangre: "O-",
    fecha: "Hoy 09:14",
    estado: "pendiente",
    distancia: "1.2 km",
  },
  {
    id: "2",
    hospital: "Cruz Roja Oaxaca",
    tipo_sangre: "AB-",
    fecha: "Ayer 14:30",
    estado: "respondida",
    distancia: "3.4 km",
  },
  {
    id: "3",
    hospital: "IMSS Oaxaca",
    tipo_sangre: "B+",
    fecha: "12 Mar 15:00",
    estado: "ignorada",
    distancia: "2.1 km",
  },
];