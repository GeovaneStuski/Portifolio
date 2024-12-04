import { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

import { ThemeContext } from '../../../../contexts/ThemeContext';

import { BsFillMoonFill  } from 'react-icons/bs';

import HiImage from '../../../../assets/images/hi.png';

import { Button } from '../../../../components/Button';
import { Navigation } from './components/Navation';

import TypeWriter from 'typewriter-effect';

export function Apresentation() {
  const queryToRemoveImages = useMediaQuery({ query: '(min-width: 1024px)' });

  const { onChangeTheme } = useContext(ThemeContext);

  return (
    <div className='flex h-full justify-center lg:justify-between items-center'>   
      <div className='text-xl sm:text-2xl flex sm:items-center lg:items-start flex-col gap-4'>
        <h1 className='text-4xl sm:text-5xl font-bold'>Geovane Stuski</h1>

        <TypeWriter
          options={{
            autoStart: true,
            loop: true,
            delay: 30,
            strings: [
              '< FullStack Developer />',
              '< Desenvolvedor FullStack />',
            ],
          }}
        />

        <div className='flex gap-8 items-center py-2'>
          <Navigation/>

          <Button onClick={onChangeTheme} variant='icon-big'>
            <BsFillMoonFill  size={18} />
          </Button>
        </div>
      </div>

      {queryToRemoveImages && <img className='w-72 animate-float' src={HiImage}/>}
    </div>
  );
}