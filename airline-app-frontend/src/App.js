import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './components/home/HomePage';
import ItineraryCard from './components/cards/ItineraryCard';

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      
      <Footer />
    </div>
  );
}

export default App;
