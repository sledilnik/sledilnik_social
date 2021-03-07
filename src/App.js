import React from 'react';
import Posts from './components/Posts';
import { DataProvider } from './context/DataContext';
import { SocialProvider } from './context/SocialContext';
import { TimestampsProvider } from './context/TimestampsContext';
import Header from './components/Header';

import './App.css';
import Footer from './components/Footer';

function App() {
  const canHover = !matchMedia('(hover: none)').matches;
  if (canHover) {
    document.body.classList.add('can-hover');
  }
  return (
    <div className="App">
      <SocialProvider>
        <Header />
        <main>
          <TimestampsProvider>
            <DataProvider>
              <Posts />
            </DataProvider>
          </TimestampsProvider>
        </main>
        <Footer />
      </SocialProvider>
    </div>
  );
}
export default App;
