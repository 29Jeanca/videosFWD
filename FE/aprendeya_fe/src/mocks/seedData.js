// Dataset "quemado" para el modo mock (ver src/mocks/README.md).
//
// Es el mismo contenido que BE/seed_data.sql / BE/CREDENCIALES_DEV.md, así
// cualquiera que ya conozca esas credenciales de desarrollo puede loguearse
// igual en el deploy solo-FE. Los ids son secuenciales y arrancan en 1, como
// lo haría un AUTOINCREMENT real.
//
// createSeedData() siempre devuelve una copia nueva (JSON round-trip) para
// que nadie pueda mutar por accidente el dataset "de fábrica" desde afuera —
// solo db.js debe tocar el objeto vivo, y solo éste es lo que se persiste en
// localStorage.

const SEED = {
  // ---------------------------------------------------------------------
  // USUARIOS — mismas 5 cuentas que BE/CREDENCIALES_DEV.md. La contraseña
  // va en texto plano a propósito: esto no es un backend real, es un mock
  // 100% cliente, no hay nada que "hashear" ni proteger acá.
  // ---------------------------------------------------------------------
  users: [
    {
      id: 1,
      username: "ana.rojas",
      email: "ana.rojas@correo.com",
      password: "Ana29Aprende!",
      first_name: "Ana",
      last_name: "Rojas",
      profile_picture: null,
      role: "student",
    },
    {
      id: 2,
      username: "carlos.mendez",
      email: "carlos.mendez@correo.com",
      password: "Carlos29Aprende!",
      first_name: "Carlos",
      last_name: "Méndez",
      profile_picture: null,
      role: "student",
    },
    {
      id: 3,
      username: "sofia.vargas",
      email: "sofia.vargas@correo.com",
      password: "Sofia29Aprende!",
      first_name: "Sofía",
      last_name: "Vargas",
      profile_picture: null,
      role: "student",
    },
    {
      id: 4,
      username: "luis.fernandez",
      email: "luis.fernandez@correo.com",
      password: "Luis29Aprende!",
      first_name: "Luis",
      last_name: "Fernández",
      profile_picture: null,
      role: "teacher",
    },
    {
      id: 5,
      username: "admin.29aprendeya",
      email: "admin@29aprendeya.com",
      password: "Admin29Aprende!",
      first_name: "Admin",
      last_name: "29AprendeYa",
      profile_picture: null,
      role: "admin",
    },
  ],

  recoverCodes: [],

  // ---------------------------------------------------------------------
  // CURSOS
  // ---------------------------------------------------------------------
  courses: [
    {
      id: 1,
      title: "React desde cero",
      description:
        "Componentes, estado y consumo de APIs. Cada tema cierra con un ejercicio y su solución comentada.",
      teacher: "Luis Fernández",
      module: "frontend",
      created_at: "2026-07-01T09:00:00Z",
      tags: ["react", "hooks", "principiante"],
      video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail_img: "https://placehold.co/640x360/1F4BD8/FFFFFF?text=React+desde+cero",
    },
    {
      id: 2,
      title: "CSS Grid y Layouts modernos",
      description: "Grid, flexbox y diseño responsivo aplicados a interfaces reales.",
      teacher: "Karla Jiménez",
      module: "frontend",
      created_at: "2026-07-03T09:00:00Z",
      tags: ["css", "grid", "intermedio"],
      video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail_img: "https://placehold.co/640x360/E85A20/FFFFFF?text=CSS+Grid",
    },
    {
      id: 3,
      title: "Testing de componentes con Vitest",
      description: "Pruebas de UI con Vitest y Testing Library sobre un proyecto en curso.",
      teacher: "Karla Jiménez",
      module: "frontend",
      created_at: "2026-07-05T09:00:00Z",
      tags: ["testing", "vitest", "avanzado"],
      video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail_img: "https://placehold.co/640x360/1F4BD8/FFFFFF?text=Testing",
    },
    {
      id: 4,
      title: "Node.js y APIs REST",
      description: "Construcción de APIs con Express, autenticación y manejo de errores.",
      teacher: "Diego Solís",
      module: "backend",
      created_at: "2026-07-08T09:00:00Z",
      tags: ["node", "api", "intermedio"],
      video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail_img: "https://placehold.co/640x360/263043/FFFFFF?text=Node.js",
    },
    {
      id: 5,
      title: "Bases de datos con MySQL",
      description: "Modelado relacional, índices y consultas eficientes desde cero.",
      teacher: "Diego Solís",
      module: "backend",
      created_at: "2026-07-10T09:00:00Z",
      tags: ["mysql", "sql", "principiante"],
      video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail_img: "https://placehold.co/640x360/263043/FFFFFF?text=MySQL",
    },
    {
      id: 6,
      title: "Proyecto Full Stack: Blog con React y Django",
      description:
        "Un blog completo de punta a punta: API en Django, front en React, deploy incluido.",
      teacher: "Luis Fernández",
      module: "fullstack",
      created_at: "2026-07-12T09:00:00Z",
      tags: ["fullstack", "react", "django"],
      video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail_img: "https://placehold.co/640x360/14663A/FFFFFF?text=Full+Stack",
    },
  ],

  // ---------------------------------------------------------------------
  // COMUNIDAD — categorías
  // ---------------------------------------------------------------------
  categories: [
    { id: 1, name: "Frontend", created_at: "2026-06-01T09:00:00Z" },
    { id: 2, name: "Backend", created_at: "2026-06-01T09:00:00Z" },
    { id: 3, name: "Bases de datos", created_at: "2026-06-01T09:00:00Z" },
    { id: 4, name: "Carrera", created_at: "2026-06-01T09:00:00Z" },
    { id: 5, name: "General", created_at: "2026-06-01T09:00:00Z" },
  ],

  // ---------------------------------------------------------------------
  // COMUNIDAD — temas (posts). user/category son ids de arriba.
  // ---------------------------------------------------------------------
  posts: [
    {
      id: 1,
      user: 2, // carlos
      category: 1, // Frontend
      title: "¿Cómo evito re-renders innecesarios en React?",
      content:
        "Tengo un componente que se re-renderiza cada vez que cambia cualquier prop del padre, aunque a este componente no le importe ese cambio. Ya probé con React.memo pero no veo diferencia. ¿Qué se me puede estar pasando?",
      created_at: "2026-08-21T18:00:00Z",
      anonymous: false,
    },
    {
      id: 2,
      user: 3, // sofia
      category: 2, // Backend
      title: "Error 500 al conectar Django con MySQL",
      content:
        'Al correr "python manage.py migrate" me tira OperationalError: (2002, "Can\'t connect to MySQL server"). Ya revisé que el servicio de MySQL esté arriba. ¿Alguien se topó con esto en Windows?',
      created_at: "2026-08-18T18:00:00Z",
      anonymous: false,
    },
    {
      id: 3,
      user: 1, // ana
      category: 4, // Carrera
      title: "¿Vale la pena hacer un bootcamp full stack en 2026?",
      content:
        "Estoy en el módulo de frontend y me está gustando mucho, pero no sé si tirarme de lleno a full stack o especializarme. ¿Cómo lo decidieron ustedes?",
      created_at: "2026-08-22T18:00:00Z",
      anonymous: false,
    },
    {
      id: 4,
      user: 2, // carlos
      category: 3, // Bases de datos
      title: "Diferencia real entre INNER JOIN y LEFT JOIN",
      content:
        "Entiendo la teoría pero cuando tengo que escribir la query se me olvida cuál usar. ¿Tienen algún truco mental para acordarse?",
      created_at: "2026-08-20T18:00:00Z",
      anonymous: false,
    },
    {
      id: 5,
      user: 3, // sofia
      category: 5, // General
      title: "Me trabé con un ejercicio de CSS Grid, ¿alguien más?",
      content:
        "Llevo dos días con el ejercicio de la cuadrícula de tarjetas responsiva y no logro que las columnas se acomoden bien en mobile. Prefiero preguntar sin que sepan quién soy jaja.",
      created_at: "2026-08-23T12:00:00Z",
      anonymous: true,
    },
    {
      id: 6,
      user: 1, // ana
      category: 1, // Frontend
      title: "Comparto mi proyecto: clon de Trello con React",
      content:
        "Terminé mi proyecto del módulo 4, un tablero estilo Trello con drag and drop. Cualquier feedback es bienvenido.",
      created_at: "2026-08-23T06:00:00Z",
      anonymous: false,
    },
  ],

  // ---------------------------------------------------------------------
  // COMUNIDAD — likes (post, user)
  // ---------------------------------------------------------------------
  likes: [
    { id: 1, post: 1, user: 3, created_at: "2026-08-21T19:00:00Z" }, // sofia -> rerenders
    { id: 2, post: 1, user: 1, created_at: "2026-08-21T20:00:00Z" }, // ana -> rerenders
    { id: 3, post: 6, user: 2, created_at: "2026-08-23T07:00:00Z" }, // carlos -> trello
    { id: 4, post: 6, user: 3, created_at: "2026-08-23T08:00:00Z" }, // sofia -> trello
    { id: 5, post: 6, user: 4, created_at: "2026-08-23T09:00:00Z" }, // luis -> trello
    { id: 6, post: 3, user: 2, created_at: "2026-08-22T19:00:00Z" }, // carlos -> bootcamp
  ],

  // ---------------------------------------------------------------------
  // COMUNIDAD — comentarios
  // ---------------------------------------------------------------------
  comments: [
    {
      id: 1,
      post: 1,
      user: 3, // sofia
      content:
        "Revisá si le estás pasando una función o un objeto inline como prop (ej. onClick={() => algo}) — eso crea una referencia nueva en cada render y React.memo no ayuda ahí. Probá useCallback/useMemo.",
      created_at: "2026-08-21T19:30:00Z",
      anonymous: false,
      thumbs_up: 4,
    },
    {
      id: 2,
      post: 1,
      user: 4, // luis
      content:
        'Sumando a lo de Sofía: instalá la extensión de React DevTools y activá "Highlight updates when components render" — ahí vas a ver exactamente qué se re-renderiza y por qué.',
      created_at: "2026-08-22T09:00:00Z",
      anonymous: false,
      thumbs_up: 6,
    },
    {
      id: 3,
      post: 2,
      user: 4, // luis
      content:
        'En Windows normalmente es que el servicio se llama "MySQL80" y no "mysql" a secas. Revisá con "services.msc" que esté corriendo, y que el puerto en tu .env coincida con el de tu instalación.',
      created_at: "2026-08-19T18:00:00Z",
      anonymous: false,
      thumbs_up: 3,
    },
    {
      id: 4,
      post: 3,
      user: 2, // carlos
      content:
        "Yo arranqué queriendo hacer todo y acabé especializándome en frontend porque era lo que más disfrutaba. No hay una respuesta correcta, seguí lo que te dé más energía las primeras semanas.",
      created_at: "2026-08-22T22:00:00Z",
      anonymous: false,
      thumbs_up: 2,
    },
    {
      id: 5,
      post: 5,
      user: 1, // ana
      content:
        'Probá con "grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))" en vez de fijar el número de columnas — se acomoda solo según el ancho disponible.',
      created_at: "2026-08-23T13:00:00Z",
      anonymous: false,
      thumbs_up: 5,
    },
  ],

  // No expuesto por ningún endpoint que consuma el FE hoy (ver
  // AnswerComment en BE/community): se deja vacío, listo por si se conecta
  // más adelante.
  answerComments: [],

  savedPosts: [],

  // ---------------------------------------------------------------------
  // CALENDARIO — eventos globales (sin dueño)
  // ---------------------------------------------------------------------
  events: [
    {
      id: 1,
      title: "Code review en vivo",
      description: "Revisión abierta de proyectos del módulo de Frontend con mentores.",
      date: "2026-08-21T19:00:00",
      created_at: "2026-08-01T09:00:00Z",
      color: "#3b82f6",
      fecha_inicio: "2026-08-21T19:00:00",
      fecha_fin: "2026-08-21T20:00:00",
    },
    {
      id: 2,
      title: "Entrega Proyecto Módulo 3",
      description: "Fecha límite para subir el proyecto final del módulo de React.",
      date: "2026-08-24T23:59:00",
      created_at: "2026-08-01T09:00:00Z",
      color: "#ef4444",
      fecha_inicio: null,
      fecha_fin: null,
    },
    {
      id: 3,
      title: "Charla: primer empleo tech",
      description: "Charla abierta con una reclutadora invitada sobre cómo armar el CV.",
      date: "2026-08-27T18:30:00",
      created_at: "2026-08-01T09:00:00Z",
      color: "#a855f7",
      fecha_inicio: "2026-08-27T18:30:00",
      fecha_fin: "2026-08-27T19:30:00",
    },
    {
      id: 4,
      title: "Inicio cohorte Backend",
      description: "Arranca la nueva cohorte del módulo de Backend.",
      date: "2026-09-02T09:00:00",
      created_at: "2026-08-01T09:00:00Z",
      color: "#22c55e",
      fecha_inicio: null,
      fecha_fin: null,
    },
    {
      id: 5,
      title: "Mantenimiento programado de la plataforma",
      description: "La plataforma no estará disponible por trabajos de mantenimiento.",
      date: "2026-08-29T02:00:00",
      created_at: "2026-08-01T09:00:00Z",
      color: "#f97316",
      fecha_inicio: "2026-08-29T02:00:00",
      fecha_fin: "2026-08-29T04:00:00",
    },
  ],

  // ---------------------------------------------------------------------
  // CALENDARIO — eventos personales (uno por usuario)
  // ---------------------------------------------------------------------
  userEvents: [
    {
      id: 1,
      user: 1, // ana
      title: "Repasar hooks de React",
      description: "Repasar useEffect y useCallback antes del ejercicio del jueves.",
      date: "2026-08-22T00:00:00",
      is_active: true,
      color: "#22c55e",
      fecha_inicio: null,
      fecha_fin: null,
      created_at: "2026-08-01T09:00:00Z",
    },
    {
      id: 2,
      user: 2, // carlos
      title: "Entrega ejercicio de Node",
      description: "Terminar y subir el ejercicio de la API de tareas.",
      date: "2026-08-23T00:00:00",
      is_active: true,
      color: "#ef4444",
      fecha_inicio: null,
      fecha_fin: null,
      created_at: "2026-08-01T09:00:00Z",
    },
    {
      id: 3,
      user: 3, // sofia
      title: "Sesión de mentoría",
      description: "Sesión 1:1 con mentor para resolver dudas de bases de datos.",
      date: "2026-08-25T00:00:00",
      is_active: true,
      color: "#3b82f6",
      fecha_inicio: "2026-08-25T16:00:00",
      fecha_fin: "2026-08-25T16:45:00",
      created_at: "2026-08-01T09:00:00Z",
    },
    {
      id: 4,
      user: 4, // luis
      title: "Preparar clase de CSS Grid",
      description: "Armar los ejemplos en vivo para la clase del viernes.",
      date: "2026-08-21T00:00:00",
      is_active: true,
      color: "#f97316",
      fecha_inicio: null,
      fecha_fin: null,
      created_at: "2026-08-01T09:00:00Z",
    },
  ],

  // Sesión simulada: qué usuario "está logueado" — hace las veces de las
  // cookies httpOnly (access_token/refresh_token) que pone el BE real.
  session: { userId: null },

  // Contadores para simular AUTOINCREMENT al crear filas nuevas.
  _seq: {
    users: 5,
    courses: 6,
    categories: 5,
    posts: 6,
    comments: 5,
    answerComments: 0,
    likes: 6,
    savedPosts: 0,
    events: 5,
    userEvents: 4,
  },
};

export function createSeedData() {
  return JSON.parse(JSON.stringify(SEED));
}

// Etiquetas en español para el rol de cada cuenta demo (ver DEMO_ACCOUNTS
// más abajo) — el modelo real usa 'student'/'teacher'/'admin' en inglés
// (BE/users/models.py ROLE_CHOICES).
const ROLE_LABEL = {
  student: "Estudiante",
  teacher: "Docente",
  admin: "Admin",
};

// Cuentas de prueba para mostrar en el login (ver DemoCredentialsMenu.jsx) —
// derivadas de SEED.users para que nunca queden desincronizadas de los
// datos con los que de verdad se puede loguear. Ninguna es sensible: es la
// misma info en texto plano que ya vive en BE/CREDENCIALES_DEV.md.
export const DEMO_ACCOUNTS = SEED.users.map((u) => ({
  name: `${u.first_name} ${u.last_name}`,
  email: u.email,
  password: u.password,
  roleLabel: ROLE_LABEL[u.role] ?? u.role,
}));
