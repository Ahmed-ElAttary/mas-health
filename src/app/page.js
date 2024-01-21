'use client'
import ViewerContainer from "./components/ViewerContainer.component.jsx";

import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/soho-light/theme.css';

export default  function Home() {

  return (
    <PrimeReactProvider>


      <ViewerContainer />

 
    </PrimeReactProvider>
  );
}



