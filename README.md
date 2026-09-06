# Estándares y Arquitectura de Proyectos ITP

Este documento define las reglas base, arquitectura y convenciones para los proyectos **ITP-BecasTalento** e **ITP-SemillerosCollab**. Debe ser usado como fuente de verdad (contexto) para cualquier desarrollo o interacción con la IA.

## 1. Resumen y Propósito del Proyecto

### Proyecto A: ITP-BecasTalento
**Objetivo:** Plataforma de Postulación y Calificación Automatizada de Estímulos Deportivos, Culturales y Monitorías.
**Dominio:** Arquitectura cliente-servidor enfocada en flujos de trabajo (workflows) de revisión. El sistema orquesta la recepción de evidencias (certificados, logros), la validación de requisitos, asignación de puntajes (automatizados y manuales) y la gestión de roles (Estudiante, Evaluador, Administrador).

### Proyecto B: ITP-SemillerosCollab
**Objetivo:** Plataforma de Producción Científica, Evaluación de Productos MinCiencias y Red de Semilleros del ITP.
**Dominio:** Sistema enfocado en la gestión documental y relaciones de investigación. Incluye rúbricas de evaluación estrictas basadas en el modelo de MinCiencias, perfiles públicos/privados de investigadores, trazabilidad de artículos y repositorios de evidencias científicas.

---

## 2. Stack Tecnológico y Versiones

- **Frontend:** React (v19+), React Router (v7+), Vite, TypeScript (v5+).
- **Backend:** NestJS (v10+), TypeScript (v5+).
- **Base de Datos:** PostgreSQL (v15+).
- **ORM:** TypeORM.
- **Estilos:** Tailwind CSS (v4).
- **Estado/Fetching:** TanStack Query (React Query) para estado del servidor; Zustand o Context para estado local.
- **Validaciones:** Zod (Frontend) y `class-validator` (Backend).

---

## 3. Arquitectura y Estructura de Carpetas

Se utilizará una arquitectura basada en un monorepositorio ligero o dos directorios claramente separados en la raíz del proyecto para asegurar la delimitación de responsabilidades:

```text
/
├── frontend/               # Aplicación React (Cliente)
│   ├── src/
│   │   ├── assets/         # Recursos estáticos (Imágenes, iconos)
│   │   ├── components/     # UI reutilizable (Botones, Modales, Cards)
│   │   ├── features/       # Módulos por dominio (ej. auth, postulaciones, productos)
│   │   ├── hooks/          # Custom hooks compartidos
│   │   ├── layouts/        # Estructuras de vista (Navbar, Sidebar)
│   │   ├── pages/          # Páginas enrutadas
│   │   ├── services/       # Clientes HTTP (Axios/Fetch)
│   │   ├── store/          # Estado global del cliente
│   │   └── types/          # Interfaces y tipos (idealmente compartidos con backend)
│   └── package.json
│
├── backend/                # API REST (Servidor NestJS)
│   ├── src/
│   │   ├── common/         # Decoradores, filtros, guardas e interceptores globales
│   │   ├── config/         # Configuración y variables de entorno
│   │   ├── modules/        # Módulos de dominio (Users, Applications, Evaluations)
│   │   │   └── [domain]/
│   │   │       ├── dto/    # Objetos de transferencia (Validaciones)
│   │   │       ├── entities/# Entidades/Modelos
│   │   │       ├── *.controller.ts
│   │   │       ├── *.service.ts
│   │   │       └── *.module.ts
│   │   └── prisma/         # Esquema de DB y migraciones (Si se usa Prisma)
│   └── package.json
```

---

## 4. Comandos de Desarrollo y Verificación

**Frontend (`/frontend`):**
- Instalar dependencias: `npm install`
- Servidor de desarrollo: `npm run dev`
- Linter y formato: `npm run lint` && `npm run format`
- Compilación de producción: `npm run build`

**Backend (`/backend`):**
- Instalar dependencias: `npm install`
- Servidor local (watch): `npm run start:dev`
- **Migraciones de BD:** `npx prisma migrate dev` (o el equivalente en TypeORM)
- Pruebas unitarias: `npm run test`
- Compilación: `npm run build`

---

## 5. Estándares y Convenciones de Frontend

1. **Componentes:** Exclusivamente componentes funcionales usando Hooks. Separar lógica compleja en Custom Hooks (Container/Presentational pattern).
2. **Tipado:** Tipado estricto habilitado (`strict: true`). **Prohibido** el uso de `any`. Todo prop y estado debe tener su interfaz/tipo definido.
3. **Estilos:** Uso de clases utilitarias con Tailwind CSS.
4. **Formularios:** Construidos obligatoriamente con `react-hook-form` y validados contra esquemas de `Zod`. No depender del estado de React (`useState`) para inputs complejos.
5. **Rendimiento UI (Transiciones vs Animaciones):** Prohibido implementar animaciones pesadas o importar librerías complejas orientadas a animación (como Framer Motion o Lottie) para maximizar el rendimiento y ahorrar recursos del cliente. Se deben usar exclusivamente **transiciones CSS suaves y ligeras** a través de las utilidades nativas de Tailwind (ej. `transition-all duration-200 ease-in-out`) para micro-interacciones (hovers, apertura de modales, focus).

---

## 6. Estándares y Convenciones de Backend y API

1. **Arquitectura:** Estricto apego al patrón de Inyección de Dependencias de NestJS (Controlador maneja HTTP -> Servicio maneja lógica de negocio). Prohibido instanciar clases con `new` si pueden ser inyectadas.
2. **Diseño de Rutas:** API RESTful. Usar sustantivos en plural (ej. `GET /api/v1/applications/`).
3. **DTOs:** Toda data entrante debe validarse en la capa de entrada mediante DTOs decorados con `class-validator` y `class-transformer`.

---

## 7. Reglas de Base de Datos y ORM

1. **Cero SQL Manual (DDL):** **ESTRICTAMENTE PROHIBIDO** alterar tablas, agregar columnas o cambiar el esquema directamente en la base de datos.
2. **Migraciones Versionadas:** Todo cambio en el esquema debe generarse a través de una migración del ORM (`prisma migrate` / `typeorm migration:generate`) para asegurar la consistencia entre entornos.
3. **Nomenclatura:** Tablas en minúscula y plural (`users`, `evaluations`). Relaciones claramente definidas en el esquema.

---

## 8. Seguridad, Autenticación y Secretos

1. **Gestión de Secretos:** Nunca subir archivos `.env` al repositorio. Validar obligatoriamente la existencia de las variables de entorno al levantar el servidor (ej. con Joi o Zod en el `ConfigModule`).
2. **Autenticación:** Uso de JWT. Los tokens en el cliente deben almacenarse de forma segura, preferiblemente en cookies `HttpOnly` (para la web) o evitando exposición directa a XSS.
3. **Autorización:** Control de Acceso Basado en Roles (RBAC). Proteger endpoints usando `@Roles()` y `RolesGuard` en NestJS. Nadie sin autorización debe acceder a datos sensibles.
4. **Cero Credenciales:** Prohibido exponer tokens, contraseñas de BD o API Keys en el código del frontend.

---

## 9. Validaciones y Manejo de Errores

1. **Validación Perimetral:** Confianza cero en el input del usuario. Todo request debe ser limpiado y validado en el Controller.
2. **Respuesta Estándar de Errores:** Se debe implementar un `ExceptionFilter` global en NestJS para garantizar que todos los errores devuelvan una estructura uniforme:
   ```json
   {
     "statusCode": 400,
     "error": "Bad Request",
     "message": ["El correo electrónico no tiene un formato válido"],
     "timestamp": "2026-09-06T11:00:00.000Z",
     "path": "/api/v1/users"
   }
   ```

---

## 10. Protocolo y Restricciones Estrictas del Agente (IA)

1. **PROHIBICIÓN ABSOLUTA DE PLACEHOLDERS (COMPLETITUD):** Jamás usar comentarios como `// TODO: Implementar lógica` o `// ... resto del código`. Cada bloque de código entregado debe ser 100% completo, funcional y listo para producción. Si el código es demasiado extenso, detenerse y pedir autorización para dividir la tarea en fases.
2. **CERO ALUCINACIONES (BÚSQUEDA OBLIGATORIA):** Está **prohibido inventar** nombres de archivos, rutas, o estructuras de base de datos. Si falta contexto, es obligatorio usar herramientas de búsqueda en el sistema de archivos (ej. grep) o leer los esquemas existentes ANTES de proponer o escribir cualquier código.
3. **CERO DAÑO COLATERAL Y NO REFACTORIZAR SIN PERMISO:** Alterar **exclusivamente** los archivos necesarios para cumplir el requerimiento. Está estrictamente prohibido hacer refactorizaciones "preventivas" o cambiar estilos en código aledaño. Si se detecta deuda técnica o un error grave en otro módulo, se debe reportar al usuario, pero **NO** tocarlo sin permiso explícito.
4. **CONTRATO DE TIPOS INQUEBRANTABLE:** Si se modifica un endpoint o un modelo en el Backend (NestJS / Prisma / DTOs), es **obligatorio** modificar en paralelo y de forma coherente la interfaz TypeScript y el esquema de Zod correspondientes en el Frontend. El sistema no se da por finalizado si hay desajustes en la red.
5. **VALIDACIÓN PREVENTIVA (NO ROMPER EL BUILD):** No proponer código que contenga errores de sintaxis o rompa las reglas del linter. Asegurar siempre que el código entregado sea compatible con el proceso de compilación (`build`) del proyecto.
6. **PROHIBICIÓN DE SQL MANUAL Y COMANDOS DESTRUCTIVOS:** Todo cambio estructural de base de datos se hace **únicamente** vía migraciones del ORM (`prisma migrate` / `typeorm`). Prohibido ejecutar comandos destructivos (DROP, DELETE masivo) sin triple confirmación del usuario.
7. **ESTÁNDAR DE IDIOMA DIVIDIDO:** Variables, funciones, clases, tablas, ramas y commits van obligatoriamente en **Inglés Técnico Estricto** (ej. `getStudentApplications`). Las interacciones, documentación técnica, explicaciones y PRs van siempre en **Español**.
8. **SEGURIDAD ABSOLUTA (SECRETS):** Está tajantemente prohibido escribir, inferir o hardcodear tokens, contraseñas, o API Keys en el código fuente, la consola o la interfaz de chat. Utilizar siempre `process.env`.
9. **TAMAÑO DE PASO LIMITADO (ATOMICIDAD):** No intentar implementar un sistema completo o una característica masiva en una sola ejecución. Dividir tareas complejas en pasos atómicos y pedir validación del usuario por cada módulo crítico completado.
10. **RENDIMIENTO INNEGOCIABLE (ANTI N+1):** Prohibido crear consultas de base de datos ineficientes dentro de bucles (El problema N+1). Al relacionar entidades, usar explícitamente Joins, Includes (en Prisma) o herramientas como DataLoaders.
11. **VERIFICACIÓN DE DEPENDENCIAS:** Antes de utilizar una librería de terceros para resolver un problema, el agente debe verificar en el `package.json` si ya existe una instalada que cumpla el mismo propósito, o si se puede resolver con JavaScript/TypeScript nativo para evitar inflar el bundle.
12. **INMUTABILIDAD ESTRICTA DEL ESTADO:** En el frontend, jamás mutar el estado directamente (`state.prop = X`). Usar de manera obligatoria las funciones de actualización provistas por React (setters) o el gestor de estado (Zustand).
13. **MANEJO DE ERRORES EXPLÍCITO Y TIPADO:** Ningún bloque `try/catch` puede quedar con un `catch` vacío o con un simple `console.log`. Los errores deben formatearse correctamente mediante ExceptionFilters (Backend) y mostrarse de forma amigable al usuario (Frontend).
14. **COMPATIBILIDAD ARQUITECTÓNICA OBLIGATORIA:** Si el proyecto o módulo ya utiliza un patrón de diseño específico (ej. Repository, CQRS, Custom Hooks), el código nuevo DEBE imitar y respetar ese patrón. Prohibido introducir paradigmas estructurales nuevos sin autorización explícita.
15. **PARIDAD DE ENTORNO ANTES DE CIERRE:** Antes de emitir el mensaje de "Tarea completada", el agente debe realizar una verificación mental de extremo a extremo: asegurarse de que el Frontend envía los datos correctos, el API los valida, la Base de Datos los persiste adecuadamente, y la respuesta se procesa sin errores.
