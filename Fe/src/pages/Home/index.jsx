import { useHome } from './useHome';

import { Loader } from '../../components/Loader';
import { About } from './components/About';
import { Apresentation } from './components/Apresentation';
import { Contact } from './components/Contact';
import { Projects } from './components/Projects';
import { Technologies } from './components/Technologies';
import { Header } from './components/Header';

import cn from '../../utils/cn';

export function Home() {
  const { loading, theme } = useHome();
  
  return (
    <div className={cn('h-full px-4 sm:px-8 xsm:px-20 md:px-20 lg:px-24 xl:px-40', {
      'bg-radial-gradient': theme === 'dark',
    })}>
      <Loader isVisible={loading} />

      {!loading && (
        <>
          <Header/>

          <Apresentation />

          <div className='flex flex-col gap-96'>
            <About />

            <Technologies/>

            <Projects/>

            <div>
              <Contact/>

              <footer className='text-center mt-24 text-xl'>© Geovane Stuski</footer>
            </div>
          </div>
        </>
      )}
    </div>
  );  
}