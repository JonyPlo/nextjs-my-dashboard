export const dynamic = 'force-dynamic' // defaults to auto

// Aqui estamos creando el endpoint para realizar las peticiones http, por ejemplo si queremos que la peticion http llegue a este metodo get, la url seria igual que la ruta de archivos pero obviando la carpeta app ya que desde ahi comienza a contar el root, por lo tanto la url seria 'localhost:3000/api/counter', si realizamos una peticion get desde Postman a esa url se debería ejecutar esta peticion GET
export async function GET(request: Request) {
  console.log({ method: request.method })

  return Response.json({
    method: 'GET',
    count: 100,
  })
}

export async function POST(request: Request) {
  console.log({ method: request.method })

  return Response.json({
    method: 'POST',
    count: 100,
  })
}
