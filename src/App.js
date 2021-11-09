import React from 'react';
import Posts from './components/Posts';
import { DataProvider } from './context/DataContext';
import { SocialProvider } from './context/SocialContext';
import { TimestampsProvider } from './context/TimestampsContext';

import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const canHover = !matchMedia('(hover: none)').matches;
  if (canHover) {
    document.body.classList.add('can-hover');
  }
  return (
    <div className="App">
      <Header />
      <main>
        <TimestampsProvider>
          <DataProvider>
            <SocialProvider>
              <Posts />
            </SocialProvider>
          </DataProvider>
        </TimestampsProvider>
      </main>
      <Footer />
    </div>
  );
}
export default App;
