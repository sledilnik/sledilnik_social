import React, { createContext, useState } from 'react';

export const SocialContext = createContext();

export const SocialProvider = ({ children }) => {
  const [social, setSocial] = useState('FB');

  return (
    <SocialContext.Provider value={{ social, setSocial }}>
      {children}
    </SocialContext.Provider>
  );
};
