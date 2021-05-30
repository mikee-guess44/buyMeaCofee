import { Grommet } from "grommet";
import AppComponent from "./components/AppComponent";



const theme = {
  global: {
    colors: {
      brand: '#228BE6',
      dark: 'neutral-2',
      online: 'accent-1',
      offline: 'status-error'
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

function App() {

  return (
    <Grommet theme={theme} full>
      <AppComponent />
      
    </Grommet>
  )
}

export default App;
