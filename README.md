# ShopMaster

ShopMaster es la página web de una tienda online falsa. Cuenta con un catálogo de productos creado con un JSON de prueba, el cual es consumido a través de una API de Flask.

Los productos se visualizan en un grid responsive, donde los usuarios pueden ver más detalles del producto o agregarlo al carrito de compras. El grid cuenta con dos selectores que permiten filtrar los productos por categorías y organizarlos alfabéticamente o por precio, de forma ascendente o descendente. Para manejar una gran cantidad de productos, estos se separan en diferentes páginas, teniendo 20 productos por página.

Al hacer clic en el ícono del carrito, se mostrará una vista de los productos agregados, su precio, la cantidad agregada por producto y un botón para remover productos. También se muestra el precio total de la compra y un botón "Complete Order" que envía los productos del carro a través de la API a un archivo JSON en el backend, donde se guarda un historial de los productos comprados en sus diferentes órdenes.

La página web se puede acceder en http://127.0.0.1:5000/. En http://127.0.0.1:5000/in_cart se puede encontrar el historial de compras creado con Jinja2.

# Instalación

Después de descargar el repositorio, navega hasta la carpeta raíz ShopMaster y ejecuta el archivo run.py

```bash
python run.py
```

Este archivo instalará las dependencias necesarias de React y Flask, compilará el código y ejecutará el servidor de Flask, el cual expone la API y servirá el build de React.

La página web se podrá acceder en http://127.0.0.1:5000/

# Requisitos no funcionales

Los requisitos no funcionales utilizados en este proyecto son:

- **Adecuación Funcional** - La página web tiene las funcionalidades principales de otras páginas de e-commerce: Listado de productos, carrito de compras, entre otras
- **Eficiencia de Desempeño** - Se utiliza paginación para reducir la dificultad de renderizar una gran cantidad de productos, además de técnicas de optimización en el código del frontend (lazy loading para imagenes, memoization)
- **Compatibilidad** - El frontend y el backend se comunican a través de un API RESTful y CORS para el renderizado de los productos y el envío del carrito al backend, además de utilizar tencologías estándar que facilitan la interacción con otros servicios
- **Capacidad de Interacción** - El UI es intuitivo, resaltando los elementos con los que se puede interactuar, además de que da feedback a los usuarios de las acciones que realizan y muestra mensajes de error cuando es necesario.
- **Fiabilidad** - Se simuló un fallo en el 30% de las ocasiones desde el backend a la hora de recibir productos y enviar el carrito de compras. En ambos casos, un mensaje se le muestra al usuario y se le da la opción de reintentar la operación sin necesidad de refrescar la página. Se evita el cierre inesperado de la aplicación
- **Mantenibilidad** - La página utiliza diferentes componentes, separando efectivamente las diferentes tareas que debe cumplir, permitiendo una mayor facilidad a la hora de modificarla o probarla
- **Flexibilidad** - Puede ejecutarse en cualquier sistema que utilice Node.js y Python/Flask. No está ligado a ningún sistema operativo

# Tech Stack

- Frontend: React.js con diferentes librerias como React Router y React Toastify, Vite
- Backend: Python y Flask
- Python para automatizar el proceso de ejecución de la página
