import './App.css';
import Button from './components/button/button';
import Card from './components/card/card';
import Search from './components/search/search';

function App() {
  return (
    <>
      <div className="top-controls">
        <Search />
        <Button btnName="Search"></Button>
      </div>
      <div>
        <div className="results">
          <Card></Card>
        </div>
        <Button btnName="Error Button"></Button>
      </div>
    </>
  );
}

export default App;
