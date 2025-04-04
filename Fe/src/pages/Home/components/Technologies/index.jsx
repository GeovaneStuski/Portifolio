import { useTechnologies } from './useTechnologies';

import { DeleteTechnologyModal } from './components/DeleteTechnologyModal';
import { AddButtonTechnology } from '../../../../components/AddButtonTechnology';
import { Technology } from './components/Technology';

import { EmptyTechnologyList } from './components/EmptyTechnologyList';
import cn from '../../../../utils/cn';

export function Technologies() {
  const { 
    technologies,
    isModalVisible,
    onCloseModal,
    onOpenModal,
    authenticated,
    technologyToBeDeleted,
    onDelete,
    technologyToBeEdit,
    onCreate
  } = useTechnologies();

  console.log(technologies);

  return (
    <div className="flex items-center">
      <DeleteTechnologyModal
        isVisible={isModalVisible}
        onClose={onCloseModal}
        technology={technologyToBeDeleted}
        onDelete={onDelete}
      />

      <div className='w-full flex flex-col items-center md:items-start'>
        <h1 className="text-2xl sm:text-3xl font-bold">Linguagens e tecnologias</h1>

        <div className={cn('mt-8 w-full flex justify-center items-center', {
          'justify-start': technologies.length < 1 && !authenticated
        })}>
          {technologies.length > 0 ? (
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
              {technologies.map((technology) => (
                <Technology
                  key={technology.id}
                  technology={technology}
                  authenticated={authenticated}
                  technologyToBeEdit={technologyToBeEdit}
                  onDeleteModal={onOpenModal}
                />
              ))}

              {authenticated && <AddButtonTechnology onCreate={onCreate} />}
            </div>
          ) : (
            authenticated ? (
              <EmptyTechnologyList onCreate={onCreate} />
            ) : (
              <span>Nenhuma technologia!</span>
            )
          )}
        </div>
      </div>
    </div>
  );
}