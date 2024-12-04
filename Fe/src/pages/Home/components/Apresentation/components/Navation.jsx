export function Navigation() {
  return (
    <nav className='flex gap-8 text-base *:cursor-pointer'>
      <a href='#about' className='hover:after:w-3/4 hover-side'>Sobre</a>

      <a href='#projects' className='hover:after:w-3/4 hover-side'>Projetos</a>

      <a href="#contato" className='hover:after:w-3/4 hover-side'>Contato</a>
    </nav>
  );
}