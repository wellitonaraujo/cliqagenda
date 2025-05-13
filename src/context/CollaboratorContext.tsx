import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Collaborator } from '@/types/collaborator';

type CollaboratorContextType = {
  collaborators: Collaborator[];
  addCollaborator: (collaborator: Collaborator) => void;
};

const CollaboratorContext = createContext<CollaboratorContextType | undefined>(undefined);

export const CollaboratorProvider = ({ children }: { children: ReactNode }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  useEffect(() => {
    const storedCollaborators = localStorage.getItem('collaborators');
    if (storedCollaborators) {
      setCollaborators(JSON.parse(storedCollaborators));
    }
  }, []);

  const addCollaborator = (c: Collaborator) => {
    setCollaborators((prev) => {
      const updated = [...prev, c];
      localStorage.setItem('collaborators', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <CollaboratorContext.Provider value={{ collaborators, addCollaborator }}>
      {children}
    </CollaboratorContext.Provider>
  );
};

export const useCollaborators = () => {
  const context = useContext(CollaboratorContext);
  if (!context) throw new Error('useCollaborators must be used within a CollaboratorProvider');
  return context;
};
