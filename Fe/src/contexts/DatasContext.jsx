import { createContext, useContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { ApiRequester } from '../utils/ApiRequester';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const DatasContext = createContext();

export function DatasProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [informations, setInformations] = useState({});

  const { onLoadDatas } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const responses = await Promise.all([
          ApiRequester.get('/projects'),
          ApiRequester.get('/technologies'),
          ApiRequester.get('/informations'),
        ]);

        const datas = responses.map((response) => response.data);

        setProjects(datas[0]);
        setTechnologies(datas[1]);
        setInformations(datas[2]);
      } catch {
        toast.error('Erro ao pegar os dados do servidor');
      }

      try {
        const { data: ProfileImageData } = await ApiRequester.get('/informations/profile_image', {
          responseType: 'blob'
        });

        const profile_image = new File([ProfileImageData], 'Profile_Image.jpg', { type: ProfileImageData.type });

        setInformations(PrevState => ({...PrevState, profile_image }));
      } catch {
        setInformations(PrevState => ({...PrevState, profile_image: null }));
      } finally {
        onLoadDatas();
      }
    })();
  }, []);

  function handleCreateProject(project) {
    setProjects(PrevState => PrevState.concat(project));
  }

  function handleDeleteProject(projectId) {
    setProjects(PrevState => PrevState.filter(project => project.id !== projectId));
  }

  function handleUpdateProject(project) {
    console.log(project);
    setProjects(PrevState => {
      const itemIndex = PrevState.findIndex(prevProject => prevProject.id === project.id);

      const newProjects = PrevState;
      newProjects[itemIndex] = project;

      return newProjects;
    });
  }

  function handleDeleteTechnology(technologyId) {
    setTechnologies(PrevState => PrevState.filter((technology) => technology.id !== technologyId));
  }

  function handleCreateTechnology(technology) {
    setTechnologies(PrevState => PrevState.concat(technology));
  }

  function handleUpdateInformation(information) {
    setInformations(PrevState => ({...PrevState, ...information}));
  }

  return (
    <DatasContext.Provider value={{
      projects,
      onCreateProject: handleCreateProject,
      onUpdateProject: handleUpdateProject,
      onDeleteProject: handleDeleteProject,
      technologies,
      onDeleteTechnology: handleDeleteTechnology, 
      onCreateTechnology: handleCreateTechnology,
      informations,
      onUpdateInformation: handleUpdateInformation,
    }}>
      {children}
    </DatasContext.Provider>
  );
}

DatasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
