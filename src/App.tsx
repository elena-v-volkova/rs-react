import './App.css';
import Button from './components/button/Button';
import CardList from './components/cardList/cardList';
import Search from './components/search/Search';

function App() {
  return (
    <>
      <div className="top-controls">
        <Search />
        <Button btnName="Search"></Button>
      </div>
      <div>
        <CardList />
        <Button btnName="Error Button"></Button>
      </div>
    </>
  );
}

export default App;
