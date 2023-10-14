import React, { useEffect } from 'react';
import { initFirebase } from './firebaseConfig';  // Assurez-vous que le chemin est correct
import Router from "./router";

const App: React.FunctionComponent = () => {
  useEffect(() => {
    initFirebase();
  }, []);

  return <Router />;
};

export default App;
