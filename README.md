# Gestor de Tareas - Proyecto en Angular

Este es un proyecto de **gestión de tareas** desarrollado con **Angular** y **Firebase**. La aplicación permite a los usuarios registrar, editar, eliminar y organizar sus tareas diarias de manera sencilla y eficiente. Además, incluye la funcionalidad de autenticación y la conexión a la base de datos en tiempo real usando **Firebase**.

## Características

- **Autenticación de Usuario**: Los usuarios pueden registrarse, iniciar sesión y cerrar sesión usando Firebase Authentication.
- **Gestión de Tareas**: Los usuarios pueden agregar, editar, eliminar y organizar tareas.
- **Fecha de Creación y Vencimiento**: Cada tarea tiene una fecha de creación y vencimiento.
- **Interfaz Moderna**: Uso de componentes de **PrimeNG** para crear una interfaz limpia y atractiva.
- **Base de Datos**: Utiliza **Firestore** de Firebase para almacenar y sincronizar las tareas en tiempo real.

## Tecnologías Utilizadas

- **Angular** (Framework Frontend)
- **Firebase** (Autenticación, Firestore, Almacenamiento)
- **PrimeNG** (Componentes UI)
- **RxJS** (Manejo de operaciones asíncronas)
- **AngularFire** (Conexión entre Angular y Firebase)

## Instalación

### Requisitos previos

- Tener instalado **Node.js** (recomendado: versión 14 o superior).
- Tener una cuenta en **Firebase** y haber creado un proyecto en la consola de Firebase.

### Pasos para la instalación:

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/rmcabrera/proyectoAngular.git
   cd gestor-de-tareas

Para clonar el repositorio, usa el siguiente enlace:

2. **Instalar dependencias:**

   Una vez que tengas el repositorio clonado, instala las dependencias del proyecto con **npm**:

   ```bash
   npm install

3. **Configurar Firebase:**

   - Crea un proyecto en **Firebase**.
   - Habilita **Firestore** y **Firebase Authentication** en tu consola de Firebase.
   - Obtén las credenciales de tu proyecto de Firebase (puedes encontrarlas en la sección **Configuración del proyecto** > **Firebase SDK**).
   - Copia las credenciales de Firebase en el archivo **`src/environments/environment.ts`**:

     ```typescript
     export const environment = {
       production: false,
       firebase: {
         apiKey: 'TU_API_KEY',
         authDomain: 'TU_PROJECT_ID.firebaseapp.com',
         projectId: 'TU_PROJECT_ID',
         storageBucket: 'TU_PROJECT_ID.appspot.com',
         messagingSenderId: 'TU_MESSAGING_SENDER_ID',
         appId: 'TU_APP_ID'
       }
     };
     ```

4. **Ejecutar la aplicación:**

   Después de haber configurado Firebase y de haber instalado las dependencias, puedes ejecutar la aplicación de desarrollo:

   ```bash
   ng serve

Luego, abre tu navegador y navega a [http://localhost:4200/login](http://localhost:4200/login) para ver la aplicación en acción.

Para acceder a la aplicación, ingresa el siguiente usuario y contraseña:

- **Usuario**: rcabrerac@gmail.com
- **Contraseña**: sunatdevelop
