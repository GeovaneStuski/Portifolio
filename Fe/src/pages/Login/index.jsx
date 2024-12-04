import { Link } from 'react-router-dom';

import { useLogin } from './useLogin';

import { BsFillMoonFill, BsChevronLeft } from 'react-icons/bs';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Loader } from '../../components/Loader';

import cn from '../../utils/cn';

export function Login() {
  const {
    onChangePassword,
    onChangeUsername,
    onSubmit,
    password,
    username,
    loading,
    isFormValid,
    loginIsLoading,
    onChangeTheme,
    theme
  } = useLogin();
  return (
    <div className={cn('flex h-full justify-center items-center', {
      'bg-radial-gradient': theme === 'dark'
    })}>
      <Loader isVisible={loading} />

      {!loading && (
        <>
          <div className='top-6 left-6 absolute flex gap-2 items-center hover:text-emerald-main duration-300'>
            <Link to='/'>
              <BsChevronLeft size={32}/>
            </Link>

            <Button onClick={onChangeTheme} variant='icon'>
              <BsFillMoonFill size={24} />
            </Button>
          </div>

          <div className='w-full max-w-[440px]'>
            <header className='w-full flex flex-col items-center'>
              <span className='text-base'>Bem-vindo(a) ao</span>

              <strong className='text-2xl'>Portfólio</strong>
            </header>

            <form className='mt-10' onSubmit={onSubmit}>
              <div className='flex flex-col gap-4 mb-10'>
                <Input value={username} onChange={onChangeUsername} label="Nome de usuário" />

                <Input value={password} onChange={onChangePassword} label="Senha" type='password'/>
              </div>

              <Button loading={loginIsLoading} disabled={!isFormValid} type='submit' variant='default'>Logar</Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}