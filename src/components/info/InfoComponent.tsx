import { Code2, Github, Globe, Package, Terminal } from "lucide-react";

const InfoComponent = () => {
  return (
    <div className="container mx-auto">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-text mb-4">
        Technical Information
      </h1>

      {/* Introduction */}
      <div className="bg-background-light rounded-lg shadow p-6 border border-border mb-8">
        <p className="text-text-muted text-base leading-relaxed">
          This dashboard is built using modern web technologies and best
          practices. It leverages the FDA's public APIs to provide real-time
          drug recall and safety information. Below is a detailed breakdown of
          the technologies and tools used in this project.
        </p>
      </div>

      {/* Technology Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Frontend Framework */}
        <div className="bg-background-light rounded-lg shadow p-6 border border-border hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-primary/10 rounded-lg">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text">
              Frontend Framework
            </h3>
          </div>
          <p className="text-text-muted">
            Built with React 19 and TypeScript, using Vite as the build tool.
            Implements modern React patterns including hooks, context, and
            functional components.
          </p>
        </div>

        {/* State Management */}
        <div className="bg-background-light rounded-lg shadow p-6 border border-border hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-primary/10 rounded-lg">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text">
              State Management
            </h3>
          </div>
          <p className="text-text-muted">
            Redux Toolkit for global state management, with TypeScript
            integration for type-safe actions and reducers. Includes async
            thunks for API calls.
          </p>
        </div>

        {/* Styling & UI */}
        <div className="bg-background-light rounded-lg shadow p-6 border border-border hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-primary/10 rounded-lg">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text">Styling & UI</h3>
          </div>
          <p className="text-text-muted">
            Tailwind CSS for utility-first styling, with custom theme
            configuration. Lucide React for consistent iconography and Recharts
            for data visualization.
          </p>
        </div>
      </div>

      {/* Project Links */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GitHub Link */}
        <a
          href="https://github.com/Kushal-Shrestha/claros-frontend-assignment"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-background-light rounded-lg shadow p-6 border border-border hover:shadow-lg transition-all duration-300 flex items-center gap-4"
        >
          <div className="p-2.5 bg-primary/10 rounded-lg">
            <Github className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text">
              GitHub Repository
            </h3>
            <p className="text-text-muted">
              View the source code and documentation
            </p>
          </div>
        </a>

        {/* Live Demo Link */}
        <a
          href="https://comfy-frangollo-335705.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-background-light rounded-lg shadow p-6 border border-border hover:shadow-lg transition-all duration-300 flex items-center gap-4"
        >
          <div className="p-2.5 bg-primary/10 rounded-lg">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text">Live Demo</h3>
            <p className="text-text-muted">Try out the dashboard online</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default InfoComponent;
