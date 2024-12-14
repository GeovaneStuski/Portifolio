import { useContext, useEffect, useState } from 'react';

import { ApiRequester } from '../../../../../../utils/ApiRequester';
import { DatasContext } from '../../../../../../contexts/DatasContext';
import { toast } from 'react-toastify';

export function useProjectModal({ onCreate, onUpdate, isVisible, project, onClose }) {
  const [image, setImage] = useState(null);
  const [technologiesList, setTechnologiesList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [repositoryLink, setRepositoryLink] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormValid = !!(image && technologiesList.length > 0 && title && repositoryLink && description);
  const { technologies, onCreateTechnology } = useContext(DatasContext);

  useEffect(() => {
    setImage(project?.imagepath || '');
    setTitle(project?.title || '');
    setDescription(project?.description || '');
    setRepositoryLink(project?.repositorylink || '');
    setTechnologiesList(project?.technologies.map(technology => technology.id) || []);
  }, [isVisible]);

  function handleChangeImage(image) {
    setImage(image);
  }

  function handleChangeTitle(title) {
    setTitle(title);
  }

  function handleChangeDescription(description) {
    setDescription(description);
  }

  function handleChangeRepositoryLink(repositoryLink) {
    setRepositoryLink(repositoryLink);
  }

  function handleTechnologyList(techId) {
    setTechnologiesList(PrevState => {
      const techIndex = PrevState.findIndex((tech) => tech === techId);

      if(techIndex < 0) {
        return PrevState.concat(techId);
      } else {
        return PrevState.filter((tech) => tech !== techId);
      }
    });
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const body = {
        image,
        title,
        description,
        repositorylink: repositoryLink,
        technologies: JSON.stringify(technologiesList),
      };

      const formData = new FormData();

      Object.entries(body).map(([key, value]) => {
        formData.append(key, value);
      });

      if(!project) {
        const { data } = await ApiRequester.post('/projects', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
  
        onCreate(data);
        toast.success('Projeto cadastrado!');
      } else {
        const {data} = await ApiRequester.put(`/projects/${project.id}`, typeof image === 'string' ? body : formData, {
          headers: {
            'Content-Type': typeof image === 'string' ? 'application/json' : 'multipart/form-data',
          }
        });

        onUpdate(data);
        toast.success('Projeto editado!');
      }
    } catch {
      toast.error('Erro ao cadastrar o projeto');
    } finally {
      onClose();
      setLoading(false);
    }
  }

  return {
    technologies,
    technologiesList,
    onChangeTechnology: handleTechnologyList,
    title,
    description,
    repositoryLink,
    onChangeTitle: handleChangeTitle,
    onChangeDescription: handleChangeDescription,
    onChangeRepotoryLink: handleChangeRepositoryLink,
    image,
    onChangeImage: handleChangeImage,
    onSubmit: handleSubmit,
    onCreateTechnology,
    isFormValid,
    loading,
  };
}