import Header from './components/Header'; 
import { AllRoutes } from './routes/AllRoutes';

function App() {
  return (
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1">
          <AllRoutes />
        </div>
      </div>
  );
}

export default App;
