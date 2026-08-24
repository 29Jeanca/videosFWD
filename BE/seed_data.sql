-- =============================================================================
-- 29AprendeYa — datos de prueba para desarrollo local
-- =============================================================================
-- Base de datos objetivo: la misma que aparece en BE/aprendeya_be/settings.py
-- (DATABASES.default.NAME, hoy "videos29AprendeYa"). Correr con las tablas ya
-- creadas por las migraciones de Django:
--
--   cd BE && python manage.py migrate
--   mysql -u root -p --default-character-set=utf8mb4 videos29AprendeYa < seed_data.sql
--
-- El flag --default-character-set=utf8mb4 no es opcional: sin él, el cliente
-- de mysql en Windows suele conectar con un charset distinto (latin1/cp850)
-- y los nombres con tilde/ñ quedan guardados como bytes corruptos aunque la
-- base sea utf8mb4 — pasó de verdad al armar este archivo, no es preventivo
-- de sobra.
--
-- Las contraseñas van hasheadas con el mismo esquema que usa Django
-- (pbkdf2_sha256, generado con django.contrib.auth.hashers.make_password) —
-- estos usuarios pueden iniciar sesión de verdad en la app, no son un mock.
-- Las contraseñas en texto plano están en BE/CREDENCIALES_DEV.md (no lo subas
-- a ningún repo compartido — ver nota al final de ese archivo).
--
-- Todo corre dentro de una transacción: si algo falla a mitad de camino, no
-- queda la base a medio poblar.
-- =============================================================================

START TRANSACTION;

-- -----------------------------------------------------------------------------
-- USUARIOS
-- -----------------------------------------------------------------------------
INSERT INTO users_user
  (password, last_login, is_superuser, username, first_name, last_name, email,
   is_staff, is_active, date_joined, profile_picture, role)
VALUES
  ('pbkdf2_sha256$1000000$HKuyLuB3KtOiSYY8obZCwC$+MlVC05da3zWdaexzzay6cNW5V9Gnmm7BxZZIjzMbRE=',
   NULL, 0, 'ana.rojas', 'Ana', 'Rojas', 'ana.rojas@correo.com', 0, 1, NOW(), NULL, 'student');
SET @user_ana = LAST_INSERT_ID();

INSERT INTO users_user
  (password, last_login, is_superuser, username, first_name, last_name, email,
   is_staff, is_active, date_joined, profile_picture, role)
VALUES
  ('pbkdf2_sha256$1000000$kIVLoVeIFjEufjNvroK97J$3Gp9GHsl0/ZT5EA0X90QSlkxL7FJSiQ8N4h74qW5oTQ=',
   NULL, 0, 'carlos.mendez', 'Carlos', 'Méndez', 'carlos.mendez@correo.com', 0, 1, NOW(), NULL, 'student');
SET @user_carlos = LAST_INSERT_ID();

INSERT INTO users_user
  (password, last_login, is_superuser, username, first_name, last_name, email,
   is_staff, is_active, date_joined, profile_picture, role)
VALUES
  ('pbkdf2_sha256$1000000$LiHyOsos31W1Zy4ZWeGySO$8SUyEbrBQkSzfhVbsMGFc2SLMmD6MTH3YRp1Dd8sfXQ=',
   NULL, 0, 'sofia.vargas', 'Sofía', 'Vargas', 'sofia.vargas@correo.com', 0, 1, NOW(), NULL, 'student');
SET @user_sofia = LAST_INSERT_ID();

INSERT INTO users_user
  (password, last_login, is_superuser, username, first_name, last_name, email,
   is_staff, is_active, date_joined, profile_picture, role)
VALUES
  ('pbkdf2_sha256$1000000$zoUavQP9TCEBtkFuB0zpI4$lnpJOUko3SWrjD6e0x0OUkwRhylXnM593VNt7szdE1s=',
   NULL, 0, 'luis.fernandez', 'Luis', 'Fernández', 'luis.fernandez@correo.com', 0, 1, NOW(), NULL, 'teacher');
SET @user_luis = LAST_INSERT_ID();

INSERT INTO users_user
  (password, last_login, is_superuser, username, first_name, last_name, email,
   is_staff, is_active, date_joined, profile_picture, role)
VALUES
  ('pbkdf2_sha256$1000000$inm5ymy0eEXZgBWsOb9wd1$/x1uaFxAkgFntUZT2QtRdodRU1KJ1JDjNcZGeybIFRM=',
   NULL, 1, 'admin.29aprendeya', 'Admin', '29AprendeYa', 'admin@29aprendeya.com', 1, 1, NOW(), NULL, 'admin');
SET @user_admin = LAST_INSERT_ID();

-- -----------------------------------------------------------------------------
-- CURSOS (courses_course)
-- -----------------------------------------------------------------------------
INSERT INTO courses_course (title, description, teacher, module, created_at, tags, video_url, thumbnail_img) VALUES
  ('React desde cero',
   'Componentes, estado y consumo de APIs. Cada tema cierra con un ejercicio y su solución comentada.',
   'Luis Fernández', 'frontend', NOW(),
   '["react", "hooks", "principiante"]',
   'https://www.w3schools.com/html/mov_bbb.mp4',
   'https://placehold.co/640x360/1F4BD8/FFFFFF?text=React+desde+cero'),

  ('CSS Grid y Layouts modernos',
   'Grid, flexbox y diseño responsivo aplicados a interfaces reales.',
   'Karla Jiménez', 'frontend', NOW(),
   '["css", "grid", "intermedio"]',
   'https://www.w3schools.com/html/mov_bbb.mp4',
   'https://placehold.co/640x360/E85A20/FFFFFF?text=CSS+Grid'),

  ('Testing de componentes con Vitest',
   'Pruebas de UI con Vitest y Testing Library sobre un proyecto en curso.',
   'Karla Jiménez', 'frontend', NOW(),
   '["testing", "vitest", "avanzado"]',
   'https://www.w3schools.com/html/mov_bbb.mp4',
   'https://placehold.co/640x360/1F4BD8/FFFFFF?text=Testing'),

  ('Node.js y APIs REST',
   'Construcción de APIs con Express, autenticación y manejo de errores.',
   'Diego Solís', 'backend', NOW(),
   '["node", "api", "intermedio"]',
   'https://www.w3schools.com/html/mov_bbb.mp4',
   'https://placehold.co/640x360/263043/FFFFFF?text=Node.js'),

  ('Bases de datos con MySQL',
   'Modelado relacional, índices y consultas eficientes desde cero.',
   'Diego Solís', 'backend', NOW(),
   '["mysql", "sql", "principiante"]',
   'https://www.w3schools.com/html/mov_bbb.mp4',
   'https://placehold.co/640x360/263043/FFFFFF?text=MySQL'),

  ('Proyecto Full Stack: Blog con React y Django',
   'Un blog completo de punta a punta: API en Django, front en React, deploy incluido.',
   'Luis Fernández', 'fullstack', NOW(),
   '["fullstack", "react", "django"]',
   'https://www.w3schools.com/html/mov_bbb.mp4',
   'https://placehold.co/640x360/14663A/FFFFFF?text=Full+Stack');

-- -----------------------------------------------------------------------------
-- COMUNIDAD — categorías
-- -----------------------------------------------------------------------------
INSERT INTO community_categorypost (name, created_at) VALUES ('Frontend', NOW());
SET @cat_frontend = LAST_INSERT_ID();

INSERT INTO community_categorypost (name, created_at) VALUES ('Backend', NOW());
SET @cat_backend = LAST_INSERT_ID();

INSERT INTO community_categorypost (name, created_at) VALUES ('Bases de datos', NOW());
SET @cat_bd = LAST_INSERT_ID();

INSERT INTO community_categorypost (name, created_at) VALUES ('Carrera', NOW());
SET @cat_carrera = LAST_INSERT_ID();

INSERT INTO community_categorypost (name, created_at) VALUES ('General', NOW());
SET @cat_general = LAST_INSERT_ID();

-- -----------------------------------------------------------------------------
-- COMUNIDAD — temas (posts)
-- -----------------------------------------------------------------------------
INSERT INTO community_post (user_id, category_id, title, content, created_at, anonymous) VALUES
  (@user_carlos, @cat_frontend,
   '¿Cómo evito re-renders innecesarios en React?',
   'Tengo un componente que se re-renderiza cada vez que cambia cualquier prop del padre, aunque a este componente no le importe ese cambio. Ya probé con React.memo pero no veo diferencia. ¿Qué se me puede estar pasando?',
   DATE_SUB(NOW(), INTERVAL 2 DAY), 0);
SET @post_rerenders = LAST_INSERT_ID();

INSERT INTO community_post (user_id, category_id, title, content, created_at, anonymous) VALUES
  (@user_sofia, @cat_backend,
   'Error 500 al conectar Django con MySQL',
   'Al correr "python manage.py migrate" me tira OperationalError: (2002, "Can\'t connect to MySQL server"). Ya revisé que el servicio de MySQL esté arriba. ¿Alguien se topó con esto en Windows?',
   DATE_SUB(NOW(), INTERVAL 5 DAY), 0);
SET @post_error500 = LAST_INSERT_ID();

INSERT INTO community_post (user_id, category_id, title, content, created_at, anonymous) VALUES
  (@user_ana, @cat_carrera,
   '¿Vale la pena hacer un bootcamp full stack en 2026?',
   'Estoy en el módulo de frontend y me está gustando mucho, pero no sé si tirarme de lleno a full stack o especializarme. ¿Cómo lo decidieron ustedes?',
   DATE_SUB(NOW(), INTERVAL 1 DAY), 0);
SET @post_bootcamp = LAST_INSERT_ID();

INSERT INTO community_post (user_id, category_id, title, content, created_at, anonymous) VALUES
  (@user_carlos, @cat_bd,
   'Diferencia real entre INNER JOIN y LEFT JOIN',
   'Entiendo la teoría pero cuando tengo que escribir la query se me olvida cuál usar. ¿Tienen algún truco mental para acordarse?',
   DATE_SUB(NOW(), INTERVAL 3 DAY), 0);
SET @post_joins = LAST_INSERT_ID();

INSERT INTO community_post (user_id, category_id, title, content, created_at, anonymous) VALUES
  (@user_sofia, @cat_general,
   'Me trabé con un ejercicio de CSS Grid, ¿alguien más?',
   'Llevo dos días con el ejercicio de la cuadrícula de tarjetas responsiva y no logro que las columnas se acomoden bien en mobile. Prefiero preguntar sin que sepan quién soy jaja.',
   DATE_SUB(NOW(), INTERVAL 6 HOUR), 1);
SET @post_gridanon = LAST_INSERT_ID();

INSERT INTO community_post (user_id, category_id, title, content, created_at, anonymous) VALUES
  (@user_ana, @cat_frontend,
   'Comparto mi proyecto: clon de Trello con React',
   'Terminé mi proyecto del módulo 4, un tablero estilo Trello con drag and drop. Cualquier feedback es bienvenido.',
   DATE_SUB(NOW(), INTERVAL 12 HOUR), 0);
SET @post_trello = LAST_INSERT_ID();

-- -----------------------------------------------------------------------------
-- COMUNIDAD — likes
-- -----------------------------------------------------------------------------
INSERT INTO community_likepost (post_id, user_id, created_at) VALUES
  (@post_rerenders, @user_sofia, NOW()),
  (@post_rerenders, @user_ana, NOW()),
  (@post_trello, @user_carlos, NOW()),
  (@post_trello, @user_sofia, NOW()),
  (@post_trello, @user_luis, NOW()),
  (@post_bootcamp, @user_carlos, NOW());

-- -----------------------------------------------------------------------------
-- COMUNIDAD — comentarios
-- -----------------------------------------------------------------------------
INSERT INTO community_commentpost (post_id, user_id, content, created_at, anonymous, thumbs_up) VALUES
  (@post_rerenders, @user_sofia,
   'Revisá si le estás pasando una función o un objeto inline como prop (ej. onClick={() => algo}) — eso crea una referencia nueva en cada render y React.memo no ayuda ahí. Probá useCallback/useMemo.',
   DATE_SUB(NOW(), INTERVAL 2 DAY), 0, 4);
SET @comment_rerenders_1 = LAST_INSERT_ID();

INSERT INTO community_commentpost (post_id, user_id, content, created_at, anonymous, thumbs_up) VALUES
  (@post_rerenders, @user_luis,
   'Sumando a lo de Sofía: instalá la extensión de React DevTools y activá "Highlight updates when components render" — ahí vas a ver exactamente qué se re-renderiza y por qué.',
   DATE_SUB(NOW(), INTERVAL 1 DAY), 0, 6);
SET @comment_rerenders_2 = LAST_INSERT_ID();

INSERT INTO community_commentpost (post_id, user_id, content, created_at, anonymous, thumbs_up) VALUES
  (@post_error500, @user_luis,
   'En Windows normalmente es que el servicio se llama "MySQL80" y no "mysql" a secas. Revisá con "services.msc" que esté corriendo, y que el puerto en tu .env coincida con el de tu instalación.',
   DATE_SUB(NOW(), INTERVAL 4 DAY), 0, 3);
SET @comment_error500_1 = LAST_INSERT_ID();

INSERT INTO community_commentpost (post_id, user_id, content, created_at, anonymous, thumbs_up) VALUES
  (@post_bootcamp, @user_carlos,
   'Yo arranqué queriendo hacer todo y acabé especializándome en frontend porque era lo que más disfrutaba. No hay una respuesta correcta, seguí lo que te dé más energía las primeras semanas.',
   DATE_SUB(NOW(), INTERVAL 20 HOUR), 0, 2);
SET @comment_bootcamp_1 = LAST_INSERT_ID();

INSERT INTO community_commentpost (post_id, user_id, content, created_at, anonymous, thumbs_up) VALUES
  (@post_gridanon, @user_ana,
   'Probá con "grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))" en vez de fijar el número de columnas — se acomoda solo según el ancho disponible.',
   DATE_SUB(NOW(), INTERVAL 5 HOUR), 0, 5);
SET @comment_grid_1 = LAST_INSERT_ID();

-- -----------------------------------------------------------------------------
-- COMUNIDAD — respuestas anidadas a comentarios
-- -----------------------------------------------------------------------------
INSERT INTO community_answercomment (comment_id, user_id, content, created_at, anonymous, thumbs_up) VALUES
  (@comment_rerenders_1, @user_carlos,
   'Era justo eso, tenía un onClick inline. Lo pasé a useCallback y dejó de re-renderizarse. ¡Gracias!',
   DATE_SUB(NOW(), INTERVAL 1 DAY), 0, 1),
  (@comment_grid_1, @user_sofia,
   'Funcionó perfecto, no sabía que existía auto-fit. Gracias totales.',
   DATE_SUB(NOW(), INTERVAL 4 HOUR), 1, 2);

-- -----------------------------------------------------------------------------
-- CALENDARIO — eventos globales (events_event)
-- -----------------------------------------------------------------------------
INSERT INTO events_event (title, description, date, created_at, color, fecha_inicio, fecha_fin) VALUES
  ('Code review en vivo', 'Revisión abierta de proyectos del módulo de Frontend con mentores.',
   '2026-08-21 19:00:00', NOW(), '#3b82f6', '2026-08-21 19:00:00', '2026-08-21 20:00:00'),
  ('Entrega Proyecto Módulo 3', 'Fecha límite para subir el proyecto final del módulo de React.',
   '2026-08-24 23:59:00', NOW(), '#ef4444', NULL, NULL),
  ('Charla: primer empleo tech', 'Charla abierta con una reclutadora invitada sobre cómo armar el CV.',
   '2026-08-27 18:30:00', NOW(), '#a855f7', '2026-08-27 18:30:00', '2026-08-27 19:30:00'),
  ('Inicio cohorte Backend', 'Arranca la nueva cohorte del módulo de Backend.',
   '2026-09-02 09:00:00', NOW(), '#22c55e', NULL, NULL),
  ('Mantenimiento programado de la plataforma', 'La plataforma no estará disponible por trabajos de mantenimiento.',
   '2026-08-29 02:00:00', NOW(), '#f97316', '2026-08-29 02:00:00', '2026-08-29 04:00:00');

-- -----------------------------------------------------------------------------
-- CALENDARIO — eventos personales (events_userevent, uno por usuario)
-- -----------------------------------------------------------------------------
INSERT INTO events_userevent (user_id, title, description, date, is_active, color, fecha_inicio, fecha_fin, created_at) VALUES
  (@user_ana, 'Repasar hooks de React', 'Repasar useEffect y useCallback antes del ejercicio del jueves.',
   '2026-08-22 00:00:00', 1, '#22c55e', NULL, NULL, NOW()),
  (@user_carlos, 'Entrega ejercicio de Node', 'Terminar y subir el ejercicio de la API de tareas.',
   '2026-08-23 00:00:00', 1, '#ef4444', NULL, NULL, NOW()),
  (@user_sofia, 'Sesión de mentoría', 'Sesión 1:1 con mentor para resolver dudas de bases de datos.',
   '2026-08-25 00:00:00', 1, '#3b82f6', '2026-08-25 16:00:00', '2026-08-25 16:45:00', NOW()),
  (@user_luis, 'Preparar clase de CSS Grid', 'Armar los ejemplos en vivo para la clase del viernes.',
   '2026-08-21 00:00:00', 1, '#f97316', NULL, NULL, NOW());

COMMIT;

-- =============================================================================
-- Listo. Quedaron insertados: 5 usuarios, 6 cursos, 5 categorías de comunidad,
-- 6 temas, 6 likes, 5 comentarios, 2 respuestas anidadas, 5 eventos globales
-- y 4 eventos personales. Credenciales de login en BE/CREDENCIALES_DEV.md.
-- =============================================================================
