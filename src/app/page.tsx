import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirect es una funcion propiamente de next y sirve para redireccionar a una pagina, recordar que esta funcion retorna "never" asi que todo lo que este debajo de esta funcion no se ejecutara
  redirect('/dashboard/counter')
}
