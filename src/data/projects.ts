export interface Project {
  title: string;
  description: string;
  year?: string | number;
  image?: string;
  video?: string;
  tiktokProfile?: string;
  tiktokVideos?: string[];
}

export const projects: Project[] = [
  {
    title: "Pilas Oficial",
    description: "Proyecto personal de creación de contenido diverso. Videos tutoriales y entretenimiento con edición creativa y dinámica.",
    year: "2020",
    tiktokProfile: "https://www.tiktok.com/@pilasoficial",
    tiktokVideos: [
      "https://www.tiktok.com/@pilasoficial/video/7549616726246296888",
      "https://www.tiktok.com/@pilasoficial/video/7072377137767943430",
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
  },
  {
    title: "Minitas League",
    description: "Edición de videos para competición de fútbol. Contenido dinámico con narración, repeticiones y gráficos en pantalla.",
    year: "May 2022",
    tiktokProfile: "https://www.tiktok.com/@erick_.ramirez",
    tiktokVideos: [
      "https://www.tiktok.com/@erick_.ramirez/video/7102805846291123461",
      "https://www.tiktok.com/@erick_.ramirez/video/7100244437866974469",
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
  },
  {
    title: "Videos Explicativos - Series",
    description: "Edición de videos explicativos sobre series para TikTok. Narrativa ágil con ritmo de edición dinámico para mantener la atención.",
    year: "Sep 2024",
    tiktokProfile: "https://www.tiktok.com/@erick_.ramirez",
    tiktokVideos: [
      "https://www.tiktok.com/@erick_.ramirez/video/7419806077136473349",
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
  },
  {
    title: "Maceta Inteligente",
    description: "Video promocional sobre una maceta inteligente (Proyecto universitario). Edición con estilo moderno, uso de pantalla verde para incorporar la aplicación en el celular, rastreo de objetos usando Davinci Resolve",
    year: "Mar 2025",
    video: "/maceta-inteligente.mp4",
  },
];
