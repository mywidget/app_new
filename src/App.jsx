import { useEffect } from 'react';
import { checkForUpdates } from './services/updater';

function App() {
  useEffect(() => {
    // Cek update otomatis saat app dibuka
    if (window.NL_MODE) {
      checkForUpdates(false);
    }
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>PrintPro POS Desktop</h1>
      <p>Versi: v{window.NL_APPVERSION || '1.0.0'}</p>
      
      <button onClick={() => checkForUpdates(true)}>
        Cek Pembaruan Manual
      </button>
    </div>
  );
}

export default App;