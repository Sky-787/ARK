<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


# Requerimientos del sistema — ITP-BecasTalento

## 1. Descripción general

**ITP-BecasTalento** será una plataforma institucional para gestionar la **postulación, evaluación, calificación, selección y seguimiento de estímulos** dirigidos a estudiantes del Instituto Tecnológico del Putumayo.

La plataforma contemplará principalmente tres tipos de estímulos:

* **Estímulos deportivos**
* **Estímulos culturales**
* **Monitorías**

El sistema permitirá que los estudiantes registren sus postulaciones, adjunten los soportes requeridos y consulten su estado. A su vez, los administradores y evaluadores podrán revisar las postulaciones, validar requisitos, asignar calificaciones y determinar los beneficiarios.

---

# 2. Actores del sistema

Se recomienda trabajar inicialmente con los siguientes roles:

| Rol                    | Descripción                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| **Estudiante**         | Realiza y consulta sus postulaciones.                                  |
| **Evaluador**          | Revisa y califica las postulaciones asignadas.                         |
| **Administrador**      | Administra convocatorias, estímulos, usuarios, criterios y resultados. |
| **Superadministrador** | Gestiona configuraciones críticas y roles del sistema.                 |

Esto permitirá implementar claramente el **RBAC** que ya definiste para NestJS.

---

# 3. Requerimientos funcionales

## RF-01. Autenticación de usuarios

El sistema deberá permitir que los usuarios inicien sesión mediante credenciales institucionales.

El sistema deberá:

* validar usuario y contraseña;
* generar un token JWT después de una autenticación exitosa;
* gestionar la sesión de manera segura;
* impedir el acceso a recursos protegidos sin autenticación;
* permitir cerrar sesión.

---

## RF-02. Recuperación de contraseña

El sistema deberá permitir al usuario iniciar un proceso de recuperación de contraseña.

Debe contemplar:

* solicitud de recuperación;
* generación de token temporal;
* validación del token;
* establecimiento de una nueva contraseña;
* expiración del token de recuperación.

---

## RF-03. Gestión de usuarios

Los administradores deberán poder:

* registrar usuarios;
* consultar usuarios;
* editar información;
* activar o desactivar usuarios;
* asignar roles;
* consultar el historial relacionado con el usuario.

El sistema no deberá permitir eliminar físicamente usuarios que posean información histórica relevante. En esos casos se deberá utilizar un estado como `activo/inactivo`.

---

# RF-04. Gestión de roles y permisos

El sistema deberá manejar autorización mediante roles.

Cada usuario tendrá uno o varios roles.

Como mínimo:

```text
ESTUDIANTE
EVALUADOR
ADMINISTRADOR
SUPERADMIN
```

Los endpoints deberán validar los permisos correspondientes antes de ejecutar operaciones sensibles.

Ejemplo conceptual:

```http
GET /api/v1/applications
POST /api/v1/applications
PATCH /api/v1/applications/:id
```

Un estudiante no podrá acceder a funcionalidades administrativas aunque conozca directamente la URL del endpoint.

---

# RF-05. Gestión de convocatorias

El administrador deberá poder crear y administrar convocatorias.

Cada convocatoria deberá contener como mínimo:

* nombre;
* descripción;
* fecha de inicio;
* fecha de cierre;
* estado;
* requisitos;
* cupos;
* tipo de estímulo;
* información adicional.

Estados sugeridos:

```text
BORRADOR
ABIERTA
CERRADA
EN_EVALUACION
FINALIZADA
CANCELADA
```

El sistema deberá impedir nuevas postulaciones una vez finalizada la fecha de cierre.

---

# RF-06. Gestión de tipos de estímulo

El sistema deberá permitir administrar los diferentes tipos de estímulo.

Ejemplos:

```text
DEPORTE
CULTURA
MONITORIA
```

El administrador podrá:

* crear estímulos;
* modificar estímulos;
* activar/desactivar estímulos;
* configurar requisitos específicos;
* asociarlos a convocatorias.

---

# RF-07. Gestión de requisitos

Cada convocatoria podrá tener requisitos específicos.

Por ejemplo:

```text
Promedio académico mínimo
Estar matriculado
Pertenecer a determinado programa
Presentar certificado deportivo
Presentar certificación cultural
No tener sanciones disciplinarias
```

Los requisitos deben poder clasificarse como:

```text
OBLIGATORIO
OPCIONAL
```

También se deberá poder establecer el tipo de dato esperado:

```text
BOOLEAN
NUMBER
TEXT
DATE
FILE
```

---

# RF-08. Registro de postulación

El estudiante podrá crear una postulación para una convocatoria abierta.

La postulación deberá almacenar:

* estudiante;
* convocatoria;
* tipo de estímulo;
* fecha de creación;
* información suministrada;
* estado;
* documentación adjunta.

Estados sugeridos:

```text
BORRADOR
ENVIADA
EN_REVISION
EN_EVALUACION
APROBADA
RECHAZADA
DESCALIFICADA
CANCELADA
```

---

# RF-09. Guardado como borrador

El estudiante podrá comenzar una postulación y guardarla como borrador.

Mientras permanezca en estado `BORRADOR`, podrá:

* modificar información;
* cargar documentos;
* eliminar documentos;
* completar requisitos.

Una vez enviada, deberá quedar bloqueada para modificaciones ordinarias.

---

# RF-10. Validación de requisitos

El sistema deberá validar automáticamente los requisitos configurados para la convocatoria.

Por ejemplo:

```text
¿Está matriculado?       ✓
¿Promedio >= 3.5?        ✓
¿Documento obligatorio?  ✓
¿Edad requerida?         ✓
```

La plataforma deberá indicar qué requisitos están:

```text
CUMPLIDOS
NO_CUMPLIDOS
PENDIENTES
```

---

# RF-11. Carga y gestión de documentos

El estudiante podrá adjuntar documentos requeridos.

El sistema deberá:

* validar formato;
* validar tamaño;
* almacenar el archivo;
* relacionarlo con la postulación;
* registrar fecha de carga;
* identificar qué requisito satisface;
* permitir su consulta según los permisos.

Formatos iniciales sugeridos:

```text
PDF
JPG
JPEG
PNG
```

---

# RF-12. Validación documental

El evaluador o administrador podrá revisar cada documento.

Cada documento podrá clasificarse como:

```text
PENDIENTE
VALIDADO
RECHAZADO
```

Cuando sea rechazado deberá registrarse una observación.

---

# RF-13. Envío de postulación

El estudiante deberá poder enviar formalmente una postulación.

Antes de enviarla, el sistema deberá comprobar:

* que la convocatoria esté abierta;
* que todos los campos obligatorios estén completos;
* que los documentos obligatorios estén cargados;
* que los requisitos críticos hayan sido cumplidos.

Una vez enviada, deberá registrarse:

```text
fecha_envio
usuario
estado
```

---

# RF-14. Consulta de postulaciones

El estudiante deberá poder visualizar sus postulaciones.

La consulta deberá mostrar:

* convocatoria;
* tipo de estímulo;
* fecha;
* estado;
* calificación, cuando corresponda;
* resultado;
* observaciones disponibles.

---

# RF-15. Consulta administrativa de postulaciones

Los administradores deberán poder consultar todas las postulaciones.

Deberá ser posible filtrar por:

* convocatoria;
* tipo de estímulo;
* estado;
* estudiante;
* programa académico;
* fecha;
* resultado.

---

# RF-16. Asignación de evaluadores

El administrador podrá asignar evaluadores a las postulaciones.

La asignación deberá registrar:

* evaluador;
* postulación;
* fecha;
* estado de asignación.

Se recomienda permitir más de un evaluador por postulación si posteriormente se requiere evaluación independiente.

---

# RF-17. Gestión de criterios de evaluación

El administrador podrá crear criterios de evaluación.

Por ejemplo:

| Criterio              | Peso |
| --------------------- | ---: |
| Rendimiento           |  30% |
| Experiencia           |  25% |
| Logros                |  25% |
| Impacto institucional |  20% |

Cada criterio tendrá:

* nombre;
* descripción;
* peso;
* puntaje mínimo;
* puntaje máximo;
* estado.

---

# RF-18. Evaluación de postulaciones

El evaluador podrá revisar una postulación asignada y registrar las calificaciones correspondientes.

Cada criterio podrá ser evaluado mediante una escala, por ejemplo:

```text
0 - 100
```

El sistema deberá impedir:

* evaluar postulaciones no asignadas;
* registrar valores fuera del rango;
* modificar evaluaciones finalizadas sin autorización.

---

# RF-19. Cálculo automático de calificación

La plataforma deberá calcular automáticamente la puntuación final.

Ejemplo:

```text
Criterio 1: 80 × 30% = 24
Criterio 2: 90 × 25% = 22.5
Criterio 3: 70 × 25% = 17.5
Criterio 4: 95 × 20% = 19

Puntaje final = 83
```

De esta manera se evita realizar manualmente los cálculos.

---

# RF-20. Ranking automático

Una vez evaluadas las postulaciones, el sistema deberá generar un ranking automáticamente.

El ranking deberá permitir ordenar por:

```text
Puntaje final DESC
```

En caso de empate, deberán definirse reglas de desempate configurables.

Por ejemplo:

```text
1. Mayor promedio académico
2. Mayor puntuación en criterio principal
3. Fecha de postulación
```

---

# RF-21. Selección de beneficiarios

El administrador podrá establecer el número de beneficiarios disponibles.

El sistema deberá seleccionar automáticamente los primeros puestos según:

```text
cupo disponible
+
puntaje
+
criterios de desempate
```

El administrador podrá revisar y confirmar el resultado antes de publicarlo.

---

# RF-22. Publicación de resultados

Una vez finalizado el proceso, el administrador podrá publicar los resultados.

Los estudiantes podrán consultar:

```text
SELECCIONADO
NO_SELECCIONADO
```

Dependiendo de las políticas institucionales, se podrá mostrar también la puntuación obtenida.

---

# RF-23. Notificaciones

El sistema deberá generar notificaciones para eventos importantes.

Ejemplos:

```text
Postulación enviada
Postulación rechazada
Documento rechazado
Postulación evaluada
Resultados publicados
```

Inicialmente pueden almacenarse dentro del sistema.

Posteriormente podrían enviarse mediante correo electrónico.

---

# RF-24. Historial y auditoría

El sistema deberá registrar las acciones importantes realizadas por usuarios.

Por ejemplo:

```text
Usuario X creó convocatoria
Usuario Y modificó criterio
Usuario Z calificó postulación
Administrador publicó resultados
```

La auditoría deberá registrar como mínimo:

```text
usuario
acción
recurso
fecha
IP
datos relevantes
```

---

# RF-25. Dashboard administrativo

El administrador deberá disponer de un panel con información resumida.

Por ejemplo:

```text
Convocatorias activas
Postulaciones recibidas
Postulaciones pendientes
Postulaciones aprobadas
Postulaciones rechazadas
Número de beneficiarios
```

También sería útil mostrar estadísticas por tipo de estímulo.

---

# RF-26. Dashboard del estudiante

El estudiante deberá poder visualizar:

```text
Convocatorias disponibles
Mis postulaciones
Estados de mis postulaciones
Notificaciones
Resultados
```

---

# RF-27. Reportes

El administrador deberá poder generar reportes de:

* postulantes;
* evaluaciones;
* beneficiarios;
* convocatorias;
* puntajes;
* resultados.

Inicialmente se pueden implementar como:

```text
CSV
Excel
PDF
```

aunque esta funcionalidad puede dejarse para una segunda fase.

---

# RF-28. Prevención de postulaciones duplicadas

El sistema deberá impedir que un estudiante envíe más de una postulación para la misma convocatoria, salvo que la convocatoria permita explícitamente múltiples postulaciones.

Esto debería garantizarse tanto:

* en la lógica de negocio;
* como mediante una restricción en la base de datos.

---

# RF-29. Control del ciclo de vida

El sistema deberá controlar las transiciones válidas.

Por ejemplo:

```text
BORRADOR
   ↓
ENVIADA
   ↓
EN_REVISION
   ↓
EN_EVALUACION
   ↓
APROBADA / RECHAZADA
```

No deberá ser posible realizar transiciones arbitrarias.

---

# RF-30. Gestión de información académica

El sistema podrá almacenar información básica del estudiante necesaria para la evaluación:

```text
programa académico
semestre
promedio
estado de matrícula
```

Esta información podrá posteriormente integrarse con sistemas institucionales.

---

# 4. Requerimientos no funcionales

## RNF-01. Arquitectura

El backend deberá desarrollarse utilizando **NestJS**, siguiendo una arquitectura modular.

Se recomienda:

```text
Controller
    ↓
Service
    ↓
Repository / ORM
    ↓
Database
```

La lógica de negocio no deberá estar directamente dentro de los controladores.

---

## RNF-02. Inyección de dependencias

Las dependencias deberán ser administradas por el sistema de **Dependency Injection de NestJS**.

Se deberá evitar:

```typescript
const service = new Service();
```

cuando la dependencia pueda ser inyectada.

---

# RNF-03. API REST

La API deberá seguir principios REST.

Las rutas deberán utilizar sustantivos en plural.

Ejemplo:

```http
/api/v1/users
/api/v1/applications
/api/v1/evaluations
/api/v1/calls
/api/v1/criteria
```

---

# RNF-04. Versionamiento

La API deberá versionarse.

Ejemplo:

```text
/api/v1/...
```

Esto permitirá crear posteriormente:

```text
/api/v2/...
```

sin romper clientes existentes.

---

# RNF-05. Validación de entrada

Toda información recibida desde el cliente deberá validarse mediante:

```text
class-validator
class-transformer
DTOs
```

No se deberá confiar en la validación realizada únicamente por el frontend.

---

# RNF-06. Seguridad

El sistema deberá aplicar como mínimo:

* JWT;
* RBAC;
* hashing seguro de contraseñas;
* protección contra acceso no autorizado;
* validación de entrada;
* sanitización;
* protección contra ataques comunes;
* rate limiting en endpoints sensibles.

---

# RNF-07. Gestión de secretos

Las credenciales y secretos deberán gestionarse mediante variables de entorno.

Nunca deberán almacenarse en:

```text
Git
Frontend
Código fuente
Archivos públicos
```

El servidor deberá comprobar que las variables obligatorias existan al arrancar.

---

# RNF-08. Protección de credenciales

Las contraseñas nunca deberán almacenarse en texto plano.

Se deberá utilizar un algoritmo de hashing apropiado, por ejemplo:

```text
Argon2
```

o una alternativa equivalente.

---

# RNF-09. Almacenamiento del JWT

Para aplicación web, el mecanismo preferido será utilizar cookies:

```text
HttpOnly
Secure
SameSite
```

para reducir la exposición del token ante XSS.

---

# RNF-10. CORS

El backend deberá configurar explícitamente los orígenes autorizados.

No se deberá utilizar una configuración abierta en producción.

---

# RNF-11. HTTPS

En producción toda comunicación deberá realizarse mediante:

```text
HTTPS
```

---

# RNF-12. Rendimiento

Las operaciones habituales deberán responder en tiempos razonables.

Como referencia inicial:

```text
Consultas simples: < 500 ms
Operaciones comunes: < 1 s
```

sin considerar operaciones pesadas como generación de reportes.

---

# RNF-13. Escalabilidad

La arquitectura deberá permitir aumentar el número de:

* usuarios;
* convocatorias;
* postulaciones;
* evaluaciones.

sin requerir una reescritura completa del sistema.

---

# RNF-14. Disponibilidad

El sistema deberá diseñarse para minimizar interrupciones durante períodos de convocatoria, que pueden concentrar gran cantidad de solicitudes.

---

# RNF-15. Integridad de datos

Las operaciones críticas deberán utilizar transacciones cuando corresponda.

Por ejemplo:

```text
Finalizar evaluación
↓
Guardar puntuaciones
↓
Calcular resultado
↓
Actualizar estado
```

Todo el proceso debe completarse correctamente o revertirse.

---

# RNF-16. Trazabilidad

Las modificaciones importantes deberán quedar registradas mediante auditoría.

---

# RNF-17. Mantenibilidad

El código deberá seguir convenciones consistentes de:

* nombres;
* estructura de carpetas;
* DTOs;
* servicios;
* entidades;
* excepciones;
* respuestas HTTP.

---

# RNF-18. Documentación de API

La API deberá documentarse utilizando **Swagger / OpenAPI**.

Por ejemplo:

```text
/api/docs
```

La documentación deberá incluir:

* endpoints;
* parámetros;
* DTOs;
* respuestas;
* códigos HTTP;
* autenticación.

---

# RNF-19. Manejo de errores

El backend deberá utilizar respuestas HTTP apropiadas.

Ejemplos:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
500 Internal Server Error
```

Los mensajes no deberán exponer información sensible.

---

# RNF-20. Logs

El sistema deberá contar con logging estructurado para facilitar:

* diagnóstico;
* monitoreo;
* auditoría técnica.

Los logs no deberán almacenar contraseñas, tokens ni secretos.

---

# RNF-21. Pruebas

El backend deberá contar con:

```text
Unit Tests
Integration Tests
E2E Tests
```

especialmente para:

* autenticación;
* autorización;
* postulaciones;
* evaluación;
* cálculo de puntajes.

---

# RNF-22. Control de versiones

El proyecto deberá utilizar Git.

Se recomienda mantener una estrategia de ramas consistente y commits descriptivos.

---

# RNF-23. Compatibilidad

La API deberá funcionar correctamente con el frontend desarrollado en React.

---

# RNF-24. Accesibilidad

La interfaz deberá considerar buenas prácticas de accesibilidad:

```text
contraste
navegación por teclado
etiquetas
mensajes de error claros
```

---

# RNF-25. Usabilidad

Los formularios de postulación deberán presentar claramente:

* campos obligatorios;
* errores;
* documentos pendientes;
* estado de la postulación;
* avance del formulario.

---

# 5. Restricciones del sistema

Las restricciones son especialmente importantes porque delimitan **lo que el proyecto no podrá hacer o las condiciones bajo las que debe funcionar**.

## RE-01. Tecnologías obligatorias

El proyecto deberá utilizar:

### Frontend

```text
React
Vite
React Router
```

### Backend

```text
NestJS
TypeScript
```

### Base de datos

Se recomienda:

```text
PostgreSQL
```

con:

```text
TypeORM
```

dado que están trabajando con NestJS + TypeORM.

---

# RE-02. Arquitectura obligatoria

No se permitirá colocar lógica de negocio compleja directamente dentro de los controladores.

La responsabilidad será:

```text
Controller → HTTP
Service → negocio
Repository/ORM → persistencia
```

---

# RE-03. No se permitirá acceso directo del frontend a la base de datos

La comunicación deberá ser:

```text
React
   ↓
REST API
   ↓
NestJS
   ↓
TypeORM
   ↓
PostgreSQL
```

---

# RE-04. No se podrán almacenar secretos en el frontend

Está prohibido incluir:

```text
contraseñas
JWT secretos
credenciales de BD
API Keys privadas
```

en el código React.

---

# RE-05. No se podrá confiar en las validaciones del frontend

Toda validación importante deberá repetirse en backend.

---

# RE-06. No se permitirá acceso sin autorización

Cada endpoint protegido deberá comprobar:

```text
Autenticación
+
Rol
+
Permiso
```

cuando corresponda.

---

# RE-07. No se permitirá modificar evaluaciones finalizadas

Una evaluación cerrada no podrá modificarse directamente.

Solo usuarios con permisos administrativos especiales podrán corregirla, dejando registro de auditoría.

---

# RE-08. No se podrán eliminar registros críticos

No se deberán eliminar físicamente:

```text
postulaciones
evaluaciones
resultados
auditorías
```

que tengan relevancia histórica.

Se recomienda utilizar estados o eliminación lógica.

---

# RE-09. Fechas de convocatoria

Una postulación no podrá registrarse después de:

```text
fecha_cierre
```

aunque el frontend permita enviar la solicitud manualmente.

---

# RE-10. Archivos

Los documentos cargados deberán cumplir límites de:

```text
tipo
tamaño
cantidad
```

Los tipos permitidos deberán ser definidos por configuración.

---

# RE-11. Unicidad

No podrá existir más de una postulación activa para la combinación:

```text
estudiante + convocatoria
```

cuando la convocatoria no permita múltiples postulaciones.

---

# RE-12. Puntajes

Los puntajes deberán respetar los límites establecidos por cada criterio.

Ejemplo:

```text
mínimo = 0
máximo = 100
```

---

# RE-13. Modificación posterior al envío

Una postulación enviada no podrá ser modificada libremente por el estudiante.

Cualquier corrección deberá pasar por un mecanismo controlado.

---

# RE-14. Dependencia institucional

La plataforma depende de que la institución proporcione información correcta sobre:

* estudiantes;
* programas académicos;
* matrícula;
* convocatorias;
* reglas de evaluación.

---

# 6. Requisitos específicos para la base de datos

Para que el proyecto pueda empezar a implementarse, recomiendo como mínimo estas entidades:

```text
users
roles
permissions
user_roles

students
academic_programs

calls
scholarship_types
call_requirements

applications
application_requirements
application_documents

evaluators
application_evaluators

evaluation_criteria
evaluations
evaluation_scores

rankings
beneficiaries

notifications
audit_logs
```

Una estructura conceptual más completa sería:

```text
                    ┌───────────────┐
                    │     Users     │
                    └───────┬───────┘
                            │
                       ┌────▼────┐
                       │  Roles  │
                       └─────────┘

                    ┌───────────────┐
                    │   Students    │
                    └───────┬───────┘
                            │
                            │
                    ┌───────▼────────┐
                    │ Applications   │
                    └───────┬────────┘
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
      Documents       Evaluators      Requirements
                           │
                           ▼
                     Evaluations
                           │
                           ▼
                     Scores/Criteria
                           │
                           ▼
                       Ranking
                           │
                           ▼
                      Beneficiary
```

---

# 7. Módulos recomendados para NestJS

La estructura del backend podría partir de:

```text
src/
├── auth/
├── users/
├── roles/
├── students/
├── academic-programs/
├── calls/
├── scholarship-types/
├── requirements/
├── applications/
├── documents/
├── evaluators/
├── evaluations/
├── criteria/
├── rankings/
├── beneficiaries/
├── notifications/
├── audit/
├── common/
└── config/
```

Y cada módulo podría seguir:

```text
applications/
├── applications.controller.ts
├── applications.service.ts
├── applications.module.ts
├── dto/
├── entities/
├── repositories/
└── ...
```

---

# 8. Reglas de negocio fundamentales

Estas reglas te recomiendo convertirlas posteriormente en casos de uso y pruebas automatizadas:

**RN-01.** Un estudiante no podrá postularse a una convocatoria cerrada.

**RN-02.** Un estudiante deberá cumplir todos los requisitos obligatorios antes de enviar la postulación.

**RN-03.** No se permitirá una postulación duplicada para la misma convocatoria cuando esta no lo permita.

**RN-04.** Solo los evaluadores asignados podrán evaluar una postulación.

**RN-05.** Una evaluación deberá utilizar únicamente criterios pertenecientes a la convocatoria correspondiente.

**RN-06.** La puntuación final se calculará automáticamente según los pesos configurados.

**RN-07.** La suma de los pesos de los criterios deberá ser igual al 100 %.

**RN-08.** Una evaluación finalizada no podrá modificarse sin autorización administrativa.

**RN-09.** El ranking deberá calcularse utilizando exclusivamente postulaciones válidas y evaluadas.

**RN-10.** El número de beneficiarios seleccionados no podrá superar el número de cupos disponibles.

**RN-11.** Una convocatoria finalizada no podrá recibir nuevas postulaciones.

**RN-12.** Toda acción administrativa crítica deberá quedar registrada en auditoría.

**RN-13.** Un usuario solo podrá acceder a los recursos permitidos por su rol.

**RN-14.** Los documentos rechazados deberán tener una observación asociada cuando la política institucional lo requiera.

**RN-15.** La publicación de resultados deberá ser una operación explícita del administrador.

---

# 9. Priorización para desarrollar el proyecto

Para evitar que el proyecto se vuelva demasiado grande desde el inicio, yo lo dividiría así:

### Fase 1 — Base del sistema

```text
Usuarios
Roles
Autenticación
JWT
RBAC
Configuración
Base de datos
Swagger
```

### Fase 2 — Convocatorias

```text
Tipos de estímulo
Convocatorias
Requisitos
Cupos
Estados
```

### Fase 3 — Postulación

```text
Aplicaciones
Formularios
Documentos
Validación
Borradores
Envío
```

### Fase 4 — Evaluación

```text
Criterios
Evaluadores
Asignación
Calificaciones
Cálculo automático
```

### Fase 5 — Selección

```text
Ranking
Desempates
Beneficiarios
Publicación
```

### Fase 6 — Complementos

```text
Notificaciones
Auditoría
Dashboard
Reportes
Estadísticas
```