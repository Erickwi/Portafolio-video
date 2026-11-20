export interface ProjectVideo {
  src: string;
  label?: string;
}

export interface Project {
  title: string;
  description: string;
  year?: string | number;
  image?: string;
  video?: string;
  videos?: ProjectVideo[];
  tiktokProfile?: string;
  tiktokVideos?: string[];
}

export const projects: Project[] = [
  {
    title: "Pilas Oficial",
    description: "Proyecto personal de creación de contenido educativo. Videos tutoriales y entretenimiento con edición creativa y dinámica.",
    year: "2020",
    tiktokProfile: "https://www.tiktok.com/@pilasoficial",
    tiktokVideos: [
      "https://www.tiktok.com/@pilasoficial/video/7549616726246296888",
      "https://www.tiktok.com/@pilasoficial/video/7072377137767943430",
    ],
    videos: [
      { src: "Ponte_Pilas_video_no_watermark.mp4", label: "Ponte Pilas" },
      { src: "Ponte_Pilas_video_no_watermark (1).mp4", label: "Código Morse" },
    ],
  },
  {
    title: "Bocaditos la Guaragua",
    description: "Edición de videos promocionales para restaurante de bocaditos de sal y dulce. Contenido visual atractivo para redes sociales.",
    year: "Abr 2022",
    tiktokProfile: "https://www.tiktok.com/@debocadoenbocado",
    tiktokVideos: [
      "https://www.tiktok.com/@debocadoenbocado/video/7086934539632725253",
      "https://www.tiktok.com/@debocadoenbocado/video/7151155173971348741",
    ],
    videos: [
      { src: "De_Bocado_en_Bocado_video_no_watermark.mp4", label: "Promocional 1" },
      { src: "De_Bocado_en_Bocado_video_no_watermark (1).mp4", label: "Promocional 2" },
    ],
  },
  {
    title: "Minitas League",
    description: "Edición de videos para competición de fútbol. Contenido dinámico con narración y manejo de motion graphics.",
    year: "May 2022",
    tiktokProfile: "https://www.tiktok.com/@erick_.ramirez",
    tiktokVideos: [
      "https://www.tiktok.com/@erick_.ramirez/video/7102805846291123461",
      "https://www.tiktok.com/@erick_.ramirez/video/7100244437866974469",
    ],
    videos: [
      { src: "Minitas League 1.mp4", label: "Minitas League 1" },
      { src: "Minitas league 2.mp4", label: "Minitas League 2" },
    ],
  },
  {
    title: "Delayoni",
    description: "Contenido audiovisual para la marca Delayoni (artículos americanos). Videos promocionales y de producto para redes sociales, con edición dinámica, animaciones y storytelling cercano.",
    year: "2023",
    videos: [
      { src: "Delayoni Ahorrar tu dinerito en tus compras en línea.mp4", label: "Compras en línea" },
      { src: "Delayoni ¿Cuál es el costo por libra en DeLaYoni.mp4", label: "Costo por libra" },
      { src: "Delayoni El de marketing se tómo bien en serio lo de jefe temporal 😨.mp4", label: "El de marketing" },
      { src: "delayoni Zapatillas-PUMA-1.mp4", label: "Zapatillas PUMA" },
      { src: "Stories, Reels promos.mp4", label: "Stories y reels" },
      { src: "Stories, reels 2.mp4", label: "Stories y reels 2" },
      { src: "Ultimo paquete.mp4", label: "Último paquete" },
    ],
  },
  {
    title: "Grow With Me",
    description: "Contenido enfocado en estimulación temprana y educación inicial. Edición cálida y pedagógica para audiencia de padres y educadores.",
    year: "2024",
    tiktokProfile: "https://www.tiktok.com/@grow.with.me961",
    tiktokVideos: [
      "https://www.tiktok.com/@grow.with.me961/video/7441357138905156919",
    ],
    videos: [
      { src: "Grow_With_Me_video_no_watermark.mp4", label: "Los primeros años" },
    ],
  },
  {
    title: "Videos Explicativos - Programación",
    description: "Contenido educativo sobre programación con edición clara y visualmente atractiva. Código en pantalla, gráficos explicativos y transiciones suaves.",
    year: "Jun 2024",
    tiktokProfile: "https://www.tiktok.com/@erick_.ramirez",
    tiktokVideos: [
      "https://www.tiktok.com/@erick_.ramirez/video/7386402076063976709",
      "https://www.tiktok.com/@erick_.ramirez/video/7334395622289706245",
    ],
    videos: [
      { src: "Programacion 1.mp4", label: "Flet" },
      { src: "Programación 2.mp4", label: "Proyectos en React" },
    ],
  },
  {
    title: "Videos Explicativos - Series",
    description: "Edición de videos explicativos sobre series para TikTok. Narrativa ágil con ritmo de edición dinámico para mantener la atención.",
    year: "Sep 2024",
    tiktokProfile: "https://www.tiktok.com/@erick_.ramirez",
    tiktokVideos: [
      "https://www.tiktok.com/@erick_.ramirez/video/7419806077136473349",
    ],
    videos: [
      { src: "Series 1.mp4", label: "Series" },
    ],
  },
  {
    title: "Videos Promocionales - Flutter Conf Latam",
    description: "Edición de videos promocionales para la conferencia Flutter Conf Latam Perú. Contenido visual impactante con ritmo rápido y gráficos animados.",
    year: "Sep 2024",
    tiktokProfile: "https://www.tiktok.com/@erick_.ramirez",
    tiktokVideos: [
      "https://www.tiktok.com/@erick_.ramirez/video/7420188068029746437",
    ],
    videos: [
      { src: "Sorteo flutter.mp4", label: "Sorteo Flutter" },
    ],
  },
  {
    title: "Maceta Inteligente",
    description: "Video promocional sobre una maceta inteligente (Proyecto universitario). Edición con estilo moderno, uso de pantalla verde para incorporar la aplicación en el celular, rastreo de objetos usando Davinci Resolve",
    year: "Mar 2025",
    videos: [
      { src: "maceta-inteligente.mp4", label: "Maceta Inteligente" },
    ],
  },
];
