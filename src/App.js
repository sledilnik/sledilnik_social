import React, { useContext } from 'react';
import Posts from './components/Posts';
import { DataProvider } from './context/DataContext';
import { SocialProvider, SocialContext } from './context/SocialContext';
import { TimestampsProvider } from './context/TimestampsContext';

// import './App.css';

const SocialChanger = () => {
  const context = useContext(SocialContext);

  const socialHandler = () => {
    const button = document.getElementById('social-changer');
    if (context.social === 'FB') {
      button.innerText = 'Prikaži FB ikone';
      context.setSocial('TW');
      return;
    }
    button.innerText = 'Prikaži TW ikone';
    context.setSocial('FB');
  };

  return (
    <button id="social-changer" onClick={socialHandler}>
      Prikaži TW ikone
    </button>
  );
};

function App() {
  return (
    <div className="App">
      <header>Header</header>
      <main>
        <TimestampsProvider>
          <SocialProvider>
            <SocialChanger />
            <DataProvider>
              <Posts />
            </DataProvider>
          </SocialProvider>
        </TimestampsProvider>
      </main>
      <footer>Footer</footer>
    </div>
  );
}
export default App;
