import "./App.css";
import Portfolio from "./Portfolio";
import { Footer } from "./components/Footer";
import { projects } from "./data/projects";

const navItems = [
  { label: "Inicio", href: "#home" },
  { label: "Sobre mí", href: "#about" },
  { label: "Proyectos", href: "#experience" },
  { label: "Contacto", href: "#contact" },
];

function App() {
  return (
    <div className="App">
      <main>
        <Portfolio
          name="Erick Ramírez"
          role="Editor de Video"
          bio="Me gusta la edición de video. Empecé como un hobby y con el tiempo, cada vez que surgían proyectos personales o profesionales, fui perfeccionando y probando diferentes herramientas. Actualmente trabajo con DaVinci Resolve para edición más profesional y CapCut para contenido de redes sociales, principalmente TikTok."
          accentColor="#e74c3c"
          projects={projects}
          contactEmail="electrictiesto@gmail.com"
          navItems={navItems}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
