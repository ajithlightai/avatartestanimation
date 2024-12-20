import { createContext, useContext, useState } from 'react';

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [showAvatar, setShowAvatar] = useState(true);

  return (
    <AvatarContext.Provider value={{ showAvatar, setShowAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};