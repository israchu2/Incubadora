import './App.css';

// Pages
import Dashboard from './pages/dashboard';
// MUI
import {
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";



const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#00695f",
      main: "##009688",
      dark: "#33ab9f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#8ab200",
      main: "#c6ff00",
      dark: "#d1ff33",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
