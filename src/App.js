import { Button, TextField } from '@material-ui/core';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="search_container">
        <TextField
          // {...params}
          label="Search Pokemon"
          margin="normal"
          variant="filled"
          // InputProps={{ ...params.InputProps, type: 'search' }}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: '#e3350f', color: 'white', marginLeft: 20 }}
        >
          Search
        </Button>
      </div>
    </div>
  );
}

export default App;
