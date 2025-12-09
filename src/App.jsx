import Configurator from "./components/Configurator";

const App = () => {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-logo">3d Demo</div>
        <div className="app-header-right">
          <button className="header-btn">Request a Quote</button>
        </div>
      </header>

      <main className="app-main">
        <Configurator />
      </main>
    </div>
  );
};

export default App;
