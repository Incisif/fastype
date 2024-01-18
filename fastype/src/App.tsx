import React, { useEffect } from 'react';
import { initFirebase } from './firebaseConfig';  
import Router from "./router";


const App: React.FunctionComponent = () => {
  useEffect(() => {
    initFirebase();
  }, []);

  return <Router />;
};

export default App;
