import React, { createContext, useState, useContext } from 'react';

type EmailContextType = {
    email: string;
    setEmail: (email: string) => void;
};

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export function EmailProvider({ children }: { children: React.ReactNode }) {
    const [email, setEmail] = useState<string>("");
  
    return (
      <EmailContext.Provider value={{ email, setEmail }}>
        {children}
      </EmailContext.Provider>
    );
  }
  
  export function useEmailContext() {
    const context = useContext(EmailContext);
    if (context === undefined) {
      throw new Error('useEmailContext must be used within an EmailProvider');
    }
    return context;
  }  