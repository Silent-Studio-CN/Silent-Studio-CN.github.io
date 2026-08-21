/* ============================================================
   SilentStudio · 静态介绍站交互
   - 7 语言 i18n + localStorage 记忆
   - 明暗主题切换 + localStorage 记忆
   - 近期更新：拉取 GitHub io.json 实时渲染（多源回退 + 容错降级）
   - 技术栈横向滚动 / 滚动渐入 / 卡片 3D 倾斜 / 移动端菜单
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  var LANGS = ['zh-Hans', 'zh-Hant', 'en', 'ja', 'de', 'ru', 'es'];
  var LANG_LABEL = {
    'zh-Hans': '简中', 'zh-Hant': '繁中', en: 'EN',
    ja: '日本語', de: 'DE', ru: 'RU', es: 'ES'
  };
  var LANG_NAME = {
    'zh-Hans': '简体中文', 'zh-Hant': '繁體中文', en: 'English',
    ja: '日本語', de: 'Deutsch', ru: 'Русский', es: 'Español'
  };

  /* ============================================================
     i18n 字典（简中 / 繁中 / 英 / 日 / 德 / 俄 / 西）
     ============================================================ */
  var I18N = {
    nav_about:        ['关于', '關於', 'About', '概要', 'Über', 'О нас', 'Acerca de'],
    nav_updates:      ['近期更新', '近期更新', 'Updates', '更新情報', 'Updates', 'Обновления', 'Novedades'],
    nav_philosophy:   ['理念', '理念', 'Philosophy', '理念', 'Philosophie', 'Философия', 'Filosofía'],
    nav_latest:       ['最新项目', '最新項目', 'Projects', 'プロジェクト', 'Projekte', 'Проекты', 'Proyectos'],
    nav_star:         ['Star', 'Star', 'Star', 'Star', 'Star', 'Star', 'Star'],

    hero_sub: [
      '程序员与用户，都值得被好好对待',
      '程式設計師與使用者，都值得被好好對待',
      'Both programmers and users deserve to be treated well',
      'プログラマーもユーザーも、大切にされる価値がある',
      'Programmierer und Nutzer verdienen eine faire Behandlung',
      'И разработчики, и пользователи достойны хорошего отношения',
      'Tanto los programadores como los usuarios merecen un buen trato'
    ],
    hero_desc: [
      '从安全防护到路径算法，从云平台到图形引擎——<br class="hide-mobile" />不敷衍技术，不辜负用户，认真交付每一件工具。',
      '從安全防護到路徑演算法，從雲平台到圖形引擎——<br class="hide-mobile" />不敷衍技術，不辜負使用者，認真交付每一件工具。',
      'From security to pathfinding, from cloud to graphics engines —<br class="hide-mobile" />no shortcuts, no letting users down: every tool is delivered with care.',
      'セキュリティから経路探索、クラウドからグラフィックスエンジンまで——<br class="hide-mobile" />技術に手を抜かず、ユーザーを裏切らず、一つひとつ丁寧に届けます。',
      'Von Sicherheit bis Pfadfindung, von Cloud bis Grafik-Engines —<br class="hide-mobile" />keine Abkürzungen, keine Enttäuschungen: jedes Werkzeug entsteht mit Sorgfalt.',
      'От безопасности до алгоритмов пути, от облака до графических движков —<br class="hide-mobile" />без халтуры и без обмана пользователя: каждый инструмент сделан с заботой.',
      'De la seguridad a los algoritmos de ruta, de la nube a los motores gráficos —<br class="hide-mobile" />sin atajos ni decepciones: cada herramienta se entrega con esmero.'
    ],
    hero_btn1: ['近期更新', '近期更新', 'Updates', '更新情報', 'Updates', 'Обновления', 'Novedades'],
    hero_btn2: ['认识我们', '認識我們', 'About us', '私たちについて', 'Über uns', 'О нас', 'Sobre nosotros'],

    about_title: ['关于 SilentStudio', '關於 SilentStudio', 'About SilentStudio', 'SilentStudio について', 'Über SilentStudio', 'О SilentStudio', 'Acerca de SilentStudio'],
    about_desc: [
      'SilentStudio 坚持：工具应当为人们提供便利、高效的解决方案，而不是为了盈利而粗制滥造的"产品"。我们从自用项目出发，逐渐生长出一个横跨安全、算法、云与图形引擎的软件生态，并在 <a href="https://github.com/Silent-Studio-CN" target="_blank" rel="noopener">GitHub · Silent-Studio-CN</a> 分享我们的成果。',
      'SilentStudio 堅持：工具應為人們提供便利、高效的解決方案，而不是為了盈利而粗製濫造的「產品」。我們從自用專案出發，逐漸生長出一個橫跨安全、演算法、雲與圖形引擎的軟體生態，並在 <a href="https://github.com/Silent-Studio-CN" target="_blank" rel="noopener">GitHub · Silent-Studio-CN</a> 分享我們的成果。',
      'SilentStudio insists that tools should deliver convenient, efficient solutions — not shoddy "products" rushed out for profit. Starting from projects we made for ourselves, we grew an ecosystem spanning security, algorithms, cloud and graphics — shared under <a href="https://github.com/Silent-Studio-CN" target="_blank" rel="noopener">GitHub · Silent-Studio-CN</a>.',
      'SilentStudio は「ツールとは、便利で効率的な解決策を人に届けるものであり、利益のために作られた粗悪品であってはならない」と考えています。自分用のプロジェクトから、セキュリティ・アルゴリズム・クラウド・グラフィックスを横断するエコシステムへと成長し、<a href="https://github.com/Silent-Studio-CN" target="_blank" rel="noopener">GitHub · Silent-Studio-CN</a> で成果を共有しています。',
      'SilentStudio steht für Werkzeuge, die bequeme und effiziente Lösungen liefern — kein schlampiges "Produkt" nur für Profit. Aus eigenen Projekten wuchs ein Ökosystem aus Sicherheit, Algorithmen, Cloud und Grafik — geteilt unter <a href="https://github.com/Silent-Studio-CN" target="_blank" rel="noopener">GitHub · Silent-Studio-CN</a>.',
      'SilentStudio придерживается принципа: инструменты должны давать удобные и эффективные решения, а не быть небрежным «продуктом» ради прибыли. Из собственных проектов мы выросли в экосистему: безопасность, алгоритмы, облако и графика — и делимся результатами на <a href="https://github.com/Silent-Studio-CN" target="_blank" rel="noopener">GitHub · Silent-Studio-CN</a>.',
      'SilentStudio insiste en que las herramientas deben ofrecer soluciones cómodas y eficientes — no «productos» chapuceros hechos solo para lucrar. Desde proyectos propios crecimos hasta un ecosistema de seguridad, algoritmos, nube y gráficos — compartido en <a href="https://github.com/Silent-Studio-CN" target="_blank" rel="noopener">GitHub · Silent-Studio-CN</a>.'
    ],
    about_c1t: ['需求驱动', '需求驅動', 'Need-driven', 'ニーズ起点', 'Bedürfnisorientiert', 'От потребностей', 'Impulsado por necesidades'],
    about_c1d: [
      '每一个项目都源于真实问题：先解决自己的需求，再分享给同样需要它的人。',
      '每一個專案都源於真實問題：先解決自己的需求，再分享給同樣需要它的人。',
      'Every project starts from a real need: solve it for ourselves first, then share it with those who need it too.',
      'すべてのプロジェクトは実ニーズから始まります：まず自分の課題を解決し、同じように必要とする人へ共有します。',
      'Jedes Projekt entspringt einem echten Bedarf: erst für uns lösen, dann mit anderen teilen.',
      'Каждый проект рождается из реальной потребности: сначала решаем её для себя, затем делимся.',
      'Cada proyecto nace de una necesidad real: primero la resolvemos para nosotros, luego la compartimos.'
    ],
    about_c2t: ['跨域工程', '跨域工程', 'Cross-domain engineering', '領域横断エンジニアリング', 'Domainübergreifend', 'Междисциплинарная разработка', 'Ingeniería multidisciplinar'],
    about_c2d: [
      '安全、算法、云服务、图形引擎——领域不同，工程标准一致。',
      '安全、演算法、雲服務、圖形引擎——領域不同，工程標準一致。',
      'Security, algorithms, cloud and graphics — different domains, one engineering standard.',
      'セキュリティ、アルゴリズム、クラウド、グラフィックス——領域は違えど、エンジニアリングの基準は同じ。',
      'Sicherheit, Algorithmen, Cloud und Grafik — verschiedene Domänen, ein Standard.',
      'Безопасность, алгоритмы, облако и графика — разные области, единый инженерный стандарт.',
      'Seguridad, algoritmos, nube y gráficos — distintos ámbitos, un mismo estándar.'
    ],
    about_c3t: ['工程标准', '工程標準', 'Engineering standards', 'エンジニアリング基準', 'Ingenieursstandard', 'Инженерный стандарт', 'Estándar de ingeniería'],
    about_c3d: [
      '以交付标准要求每一个项目：稳定、可维护、经得起长期使用。',
      '以交付標準要求每一個專案：穩定、可維護、經得起長期使用。',
      'Every project is held to delivery standards: stable, maintainable, built to last.',
      'すべてのプロジェクトを納品基準で律します：安定、保守可能、長く使える。',
      'Jedes Projekt folgt Abgabestandards: stabil, wartbar, langlebig.',
      'Каждый проект держится стандартов релиза: стабильно, поддерживаемо, рассчитано на годы.',
      'Cada proyecto sigue estándares de entrega: estable, mantenible y duradero.'
    ],

    updates_title: ['近期更新', '近期更新', 'Recent updates', '最新情報', 'Aktuelle Updates', 'Последние обновления', 'Últimas novedades'],
    updates_desc: [
      '来自项目仓库的最新动态，实时同步于 GitHub 数据源。',
      '來自專案倉庫的最新動態，即時同步於 GitHub 資料來源。',
      'Latest activity from our repositories, synced live from the GitHub data source.',
      'プロジェクトリポジトリの最新情報を GitHub データソースからリアルタイム同期。',
      'Neueste Aktivitäten unserer Repositories, live von der GitHub-Datenquelle.',
      'Последние новости из репозиториев, синхронизировано с GitHub в реальном времени.',
      'Última actividad de nuestros repositorios, sincronizada en vivo desde GitHub.'
    ],
    updates_loading: ['正在同步更新…', '正在同步更新…', 'Syncing updates…', '更新を同期中…', 'Synchronisiere Updates…', 'Синхронизация…', 'Sincronizando…'],
    updates_empty:   ['暂无更新', '暫無更新', 'No updates yet', '更新はまだありません', 'Noch keine Updates', 'Пока нет обновлений', 'Aún sin novedades'],
    updates_fail:    ['更新同步失败，以下为默认内容', '更新同步失敗，以下為預設內容', 'Sync failed — showing defaults', '同期に失敗しました（既定表示）', 'Sync fehlgeschlagen — Standard', 'Ошибка синхронизации — по умолчанию', 'Error al sincronizar — contenido por defecto'],
    updates_more:    ['查看更多 ›', '查看更多 ›', 'View more ›', 'もっと見る ›', 'Mehr ›', 'Подробнее ›', 'Ver más ›'],
    fallback_0t: ['SilentSafe 公开仓库建立', 'SilentSafe 公開倉庫建立', 'SilentSafe public repo opened', 'SilentSafe 公開リポジトリ開設', 'SilentSafe öffentliches Repo eröffnet', 'Открыт публичный репозиторий SilentSafe', 'Repositorio público de SilentSafe abierto'],
    fallback_0d: ['项目概览与问题跟踪正式上线，即将发布可执行程序版本。', '專案概覽與問題追蹤正式上線，即將發布可執行程式版本。', 'Project overview and issue tracker launched; executable release coming soon.', '概要と Issue トラッカーを開設。実行ファイル版も近日公開。', 'Übersicht und Issue-Tracker gestartet; ausführbare Version folgt.', 'Запущены обзор и трекер проблем; скоро выйдет исполняемая версия.', 'Lanzados la descripción y el seguimiento; pronto versión ejecutable.'],
    fallback_1t: ['SlimeMold 更新', 'SlimeMold 更新', 'SlimeMold updated', 'SlimeMold 更新', 'SlimeMold aktualisiert', 'SlimeMold обновлён', 'SlimeMold actualizado'],
    fallback_1d: ['黏菌启发路径规划库保持活跃迭代，欢迎试用与反馈。', '黏菌啟發路徑規劃函式庫保持活躍迭代，歡迎試用與回饋。', 'The slime-mold pathfinding library is under active iteration — try it and share feedback.', '粘菌由来の経路探索ライブラリを継続改善中。お試しとフィードバックを歓迎します。', 'Die Pathfinding-Bibliothek wird aktiv weiterentwickelt — ausprobieren und Feedback geben.', 'Библиотека поиска пути активно развивается — пробуйте и делитесь отзывами.', 'La librería de rutas se desarrolla activamente: pruébala y comparte tu opinión.'],
    fallback_2t: ['项目列表索引更新', '專案列表索引更新', 'Project index updated', 'プロジェクト索引を更新', 'Projektindex aktualisiert', 'Индекс проектов обновлён', 'Índice de proyectos actualizado'],
    fallback_2d: ['公开项目列表、简介与索引持续维护，覆盖全部产品线。', '公開專案列表、簡介與索引持續維護，覆蓋全部產品線。', 'The public project index keeps covering every product line with briefs and updates.', '全プロダクトを網羅する公開索引を継続的に更新しています。', 'Der öffentliche Projektindex wird stetig über alle Produktlinien gepflegt.', 'Публичный индекс проектов постоянно пополняется по всем продуктовым линиям.', 'El índice público de proyectos se mantiene actualizado en todas las líneas.'],
    fallback_3t: ['本网站上线', '本網站上線', 'Website launched', 'ウェブサイト公開', 'Website gestartet', 'Сайт запущен', 'Sitio web lanzado'],
    fallback_3d: ['七语言支持与明暗主题，欢迎访问本仓库提出建议。', '七語言支援與明暗主題，歡迎造訪本倉庫提出建議。', 'Seven languages and light/dark themes — visit the repo and suggest improvements.', '7言語対応・明暗テーマ対応。リポジトリで改善提案をお待ちしています。', 'Sieben Sprachen und Hell/Dunkel-Design — besuche das Repo und schlage Verbesserungen vor.', 'Семь языков и темы оформления — загляните в репозиторий и предложите улучшения.', 'Siete idiomas y temas claro/oscuro: visita el repositorio y sugiere mejoras.'],

    philo_title: ['设计理念', '設計理念', 'Philosophy', '設計理念', 'Philosophie', 'Философия', 'Filosofía'],
    philo_desc: [
      '我们不追求功能的堆砌，只在意工具与人的关系。',
      '我們不追求功能的堆砌，只在意工具與人的關係。',
      'We do not chase feature bloat — we care about the relationship between tools and people.',
      '機能の積み上げは追いません。大切なのはツールと人との関係です。',
      'Wir jagen keinem Feature-Wahn hinterher — uns interessiert die Beziehung zwischen Werkzeug und Mensch.',
      'Мы не гонимся за обилием функций — нам важна связь между инструментом и человеком.',
      'No perseguimos acumular funciones: nos importa la relación entre las herramientas y las personas.'
    ],
    philo1_t: ['静默设计 <em>Silence</em>', '靜默設計 <em>Silence</em>', 'Quiet design <em>Silence</em>', '静かな設計 <em>Silence</em>', 'Leises Design <em>Silence</em>', 'Тихий дизайн <em>Silence</em>', 'Diseño silencioso <em>Silence</em>'],
    philo1_d: [
      '防护默认全开，细节自动处理。用户不需要知道背后发生了什么，只需要知道一切安好。',
      '防護預設全開，細節自動處理。使用者不需要知道背後發生了什麼，只需要知道一切安好。',
      'Protections are on by default; the details are handled for you. You do not need to know what happens behind the scenes — only that all is well.',
      '防御はデフォルトで全開、細部は自動処理。裏で何が起きているか知る必要はありません。ただ「大丈夫」と分かればいい。',
      'Schutz ist standardmäßig aktiv; die Details werden erledigt. Du musst nicht wissen, was im Hintergrund passiert — nur dass alles in Ordnung ist.',
      'Защита включена по умолчанию, детали обрабатываются автоматически. Вам не нужно знать, что происходит за кулисами — только что всё в порядке.',
      'La protección está activada por defecto; los detalles se gestionan solos. No necesitas saber qué pasa entre bastidores, solo que todo va bien.'
    ],
    philo2_t: ['原生质感 <em>Craft</em>', '原生質感 <em>Craft</em>', 'Native craft <em>Craft</em>', '素材の質感 <em>Craft</em>', 'Echtes Handwerk <em>Craft</em>', 'Мастерство <em>Craft</em>', 'Artesanía nativa <em>Craft</em>'],
    philo2_d: [
      '每一个像素、每一帧动画都值得被认真对待。精致不是装饰，是尊重用户的时间。',
      '每一個像素、每一幀動畫都值得被認真對待。精緻不是裝飾，是尊重使用者的時間。',
      'Every pixel and every frame of animation deserves care. Refinement is not decoration — it is respect for your time.',
      'すべてのピクセル、すべてのアニメーションに敬意を。精緻さは飾りではなく、ユーザーの時間への敬意です。',
      'Jedes Pixel und jede Animation verdient Sorgfalt. Verfeinerung ist keine Deko — sie ist Respekt vor deiner Zeit.',
      'Каждый пиксель и каждый кадр анимации заслуживают внимания. Отточенность — это не украшение, а уважение к вашему времени.',
      'Cada píxel y cada fotograma merecen cuidado. El refinamiento no es decoración: es respeto por tu tiempo.'
    ],
    philo3_t: ['成品交付 <em>Deliverables</em>', '成品交付 <em>Deliverables</em>', 'Deliverables <em>Deliverables</em>', '成果物の納品 <em>Deliverables</em>', 'Lieferung <em>Deliverables</em>', 'Готовый продукт <em>Deliverables</em>', 'Entregables <em>Deliverables</em>'],
    philo3_d: [
      '面向 Windows 用户的工具以可执行程序交付，开箱即用；面向开发者的库则以简洁 API 呈现。',
      '面向 Windows 使用者的工具以可執行程式交付，開箱即用；面向開發者的函式庫則以簡潔 API 呈現。',
      'Tools for Windows users ship as ready-to-run executables; libraries for developers come as clean APIs.',
      'Windows ユーザー向けツールは実行ファイルとして開封即使用。開発者向けライブラリは簡潔な API として提供します。',
      'Windows-Werkzeuge werden als fertige Programme ausgeliefert; Bibliotheken für Entwickler kommen als saubere APIs.',
      'Инструменты для Windows поставляются как готовые программы; библиотеки для разработчиков — как чистые API.',
      'Las herramientas para Windows se entregan como ejecutables listos para usar; las librerías para desarrolladores, como APIs limpias.'
    ],
    stack_label: ['技术栈', '技術棧', 'Tech stack', '技術スタック', 'Tech-Stack', 'Технологии', 'Stack técnico'],

    latest_eyebrow: ['Projects', 'Projects', 'Projects', 'プロジェクト', 'Projekte', 'Проекты', 'Proyectos'],
    latest_title: ['最新项目列表', '最新專案列表', 'Latest projects', '最新プロジェクト', 'Neueste Projekte', 'Последние проекты', 'Últimos proyectos'],
    latest_desc: [
      '访问我们的 GitHub 组织，查看最新公开项目、更新与进展。',
      '造訪我們的 GitHub 組織，查看最新公開專案、更新與進展。',
      'Visit our GitHub organization to see the newest public projects, updates and progress.',
      'GitHub 組織を訪れて、最新の公開プロジェクトや進捗をご覧ください。',
      'Besuche unsere GitHub-Organisation für die neuesten öffentlichen Projekte, Updates und Fortschritte.',
      'Посетите нашу GitHub-организацию, чтобы увидеть новые проекты, обновления и прогресс.',
      'Visita nuestra organización de GitHub para ver los proyectos públicos, novedades y progresos.'
    ],
    latest_btn1: ['查看最新项目列表', '查看最新專案列表', 'View latest projects', '最新プロジェクトを見る', 'Neueste Projekte ansehen', 'Смотреть проекты', 'Ver proyectos'],
    latest_btn2: ['访问组织主页', '造訪組織主頁', 'Visit organization', '組織ホームへ', 'Organisation besuchen', 'На сайт организации', 'Visitar organización'],
    latest_note: [
      '组织下所有公开仓库均可在 repositories 页面一览。',
      '組織下所有公開倉庫均可在 repositories 頁面一覽。',
      'All public repositories of the organization are listed on the repositories page.',
      '組織の公開リポジトリは repositories ページで一覧できます。',
      'Alle öffentlichen Repositories der Organisation findest du auf der Repositories-Seite.',
      'Все публичные репозитории организации — на странице repositories.',
      'Todos los repositorios públicos de la organización se listan en la página de repositories.'
    ],

    footer_slogan: ['把复杂藏起来，把结果交给你。', '把複雜藏起來，把結果交給你。', 'Hide the complexity, hand you the result.', '複雑さを隠し、結果をあなたに。', 'Verberge die Komplexität, gib dir das Ergebnis.', 'Скрыть сложность, отдать результат.', 'Esconde la complejidad, dale el resultado.'],
    footer_docs: [
      '产品文档：<a href="docs/silent-safe/">SilentSafe</a> · <a href="docs/silentstudio-website/">SilentStudioWebSite</a> · <a href="docs/slime-mold/">SlimeMold</a> · <a href="docs/inttest/">IntTest</a>',
      '產品文件：<a href="docs/silent-safe/">SilentSafe</a> · <a href="docs/silentstudio-website/">SilentStudioWebSite</a> · <a href="docs/slime-mold/">SlimeMold</a> · <a href="docs/inttest/">IntTest</a>',
      'Docs: <a href="docs/silent-safe/">SilentSafe</a> · <a href="docs/silentstudio-website/">SilentStudioWebSite</a> · <a href="docs/slime-mold/">SlimeMold</a> · <a href="docs/inttest/">IntTest</a>',
      'ドキュメント：<a href="docs/silent-safe/">SilentSafe</a> · <a href="docs/silentstudio-website/">SilentStudioWebSite</a> · <a href="docs/slime-mold/">SlimeMold</a> · <a href="docs/inttest/">IntTest</a>',
      'Dokumente: <a href="docs/silent-safe/">SilentSafe</a> · <a href="docs/silentstudio-website/">SilentStudioWebSite</a> · <a href="docs/slime-mold/">SlimeMold</a> · <a href="docs/inttest/">IntTest</a>',
      'Документация: <a href="docs/silent-safe/">SilentSafe</a> · <a href="docs/silentstudio-website/">SilentStudioWebSite</a> · <a href="docs/slime-mold/">SlimeMold</a> · <a href="docs/inttest/">IntTest</a>',
      'Docs: <a href="docs/silent-safe/">SilentSafe</a> · <a href="docs/silentstudio-website/">SilentStudioWebSite</a> · <a href="docs/slime-mold/">SlimeMold</a> · <a href="docs/inttest/">IntTest</a>'
    ],
    footer_rights: ['保留所有权利', '保留所有權利', 'All rights reserved', 'All rights reserved', 'Alle Rechte vorbehalten', 'Все права защищены', 'Todos los derechos reservados'],
    footer_search: ['文档搜索', '文件搜尋', 'Docs search', 'ドキュメント検索', 'Dokumentsuche', 'Поиск документов', 'Buscar documentos']
  };

  /* ============================================================
     语言
     ============================================================ */
  var currentLang = localStorage.getItem('ss_lang') || detectLang();

  function detectLang() {
    var nav = (navigator.language || 'zh-CN').toLowerCase();
    if (nav.indexOf('zh') >= 0 && nav.indexOf('tw') >= 0) return 'zh-Hant';
    if (nav.indexOf('zh') >= 0) return 'zh-Hans';
    if (nav.indexOf('ja') >= 0) return 'ja';
    if (nav.indexOf('de') >= 0) return 'de';
    if (nav.indexOf('ru') >= 0) return 'ru';
    if (nav.indexOf('es') >= 0) return 'es';
    if (nav.indexOf('en') >= 0) return 'en';
    return 'zh-Hans';
  }

  function t(key) {
    var arr = I18N[key];
    if (!arr) return '';
    var idx = LANGS.indexOf(currentLang);
    return arr[idx >= 0 ? idx : 0];
  }

  function applyLang() {
    if (LANGS.indexOf(currentLang) < 0) currentLang = 'zh-Hans';
    $$('[data-i18n]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n'));
      if (v === '') return;
      if (v.indexOf('<') >= 0) el.innerHTML = v;
      else el.textContent = v;
    });
    var cur = $('#langCurrent');
    if (cur) cur.textContent = LANG_LABEL[currentLang] || currentLang;
    var langList = $('#langList');
    if (langList) {
      $$('button[data-lang]', langList).forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-lang') === currentLang);
      });
    }
    var html = document.documentElement;
    html.lang = currentLang === 'zh-Hans' ? 'zh-CN' : currentLang === 'zh-Hant' ? 'zh-TW' : currentLang;
    try { localStorage.setItem('ss_lang', currentLang); } catch (e) {}
    renderUpdatesIfReady();
  }

  /* ============================================================
     主题
     ============================================================ */
  var themeBtn = $('#themeBtn');
  var themeIcon = $('#themeIcon');
  var currentTheme = localStorage.getItem('ss_theme') || 'dark';

  function applyTheme() {
    var html = document.documentElement;
    html.setAttribute('data-theme', currentTheme);
    if (themeIcon) themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    try { localStorage.setItem('ss_theme', currentTheme); } catch (e) {}
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme();
    });
  }

  /* ============================================================
     近期更新：拉取 GitHub io.json
     数据源（按顺序尝试）：
       1) https://cdn.jsdelivr.net/gh/Silent-Studio-CN/index@main/WebSite/io.json
       2) https://raw.githubusercontent.com/Silent-Studio-CN/index/main/WebSite/io.json
     io.json 格式约定（宽松解析）：
       [ { "date":"2026-08-20", "title":"...", "desc":"...", "link":"...", "tags":["..."] }, ... ]
       或 { "updates": [...] } / { "items": [...] }
       字段：title 必填；desc/date/link/tags 可选；link 缺省时按标题匹配本地文档页，否则指向组织页。
     ============================================================ */
  var UPDATES_SOURCES = [
    'https://cdn.jsdelivr.net/gh/Silent-Studio-CN/index@main/WebSite/io.json',
    'https://raw.githubusercontent.com/Silent-Studio-CN/index/main/WebSite/io.json'
  ];
  var DOC_MAP = {
    silent_safe: { re: /silentsafe|安全/i, link: 'docs/silent-safe/' },
    silent_cloud: { re: /silent.?cloud|云/i, link: 'docs/silent-cloud/' },
    slime_mold: { re: /slime.?mold/i, link: 'docs/slime-mold/' },
    project_list: { re: /project.?list/i, link: 'docs/' },
    website: { re: /website|官网|web|网站/i, link: 'docs/silentstudio-website/' }
  };
  var updatesCache = null;   // 拉取到的原始条目
  var updatesFailed = false; // 是否已降级

  function fallbackUpdates() {
    return [
      { date: '2026-08', title: t('fallback_0t'), desc: t('fallback_0d'), tags: ['SilentSafe'] },
      { date: '2026-07', title: t('fallback_1t'), desc: t('fallback_1d'), tags: ['SlimeMold'] },
      { date: '2026-07', title: t('fallback_2t'), desc: t('fallback_2d'), tags: ['Index'] },
      { date: '2026-08', title: t('fallback_3t'), desc: t('fallback_3d'), tags: ['Website'] }
    ];
  }

  // 点击统一进入文档（无显式 link 时按标题匹配本地文档页，兜底到文档搜索页）
  function guessLink(title) {
    for (var k in DOC_MAP) {
      if (DOC_MAP[k].re.test(title || '')) return DOC_MAP[k].link;
    }
    return 'docs/';
  }

  function normalize(data) {
    var arr = Array.isArray(data) ? data : (data && (data.updates || data.items));
    if (!Array.isArray(arr)) return [];
    return arr.map(function (it) {
      if (!it || typeof it !== 'object') return null;
      return {
        date: it.date || it.time || '',
        title: it.title || it.name || '',
        desc: it.desc || it.description || '',
        link: it.link || it.url || '',
        tags: it.tags || (it.tag ? [it.tag] : [])
      };
    }).filter(function (it) { return it && it.title; });
  }

  function renderUpdatesList() {
    var box = $('#updatesList');
    if (!box) return;
    var items = updatesCache ? normalize(updatesCache) : [];
    var useFallback = updatesFailed || items.length === 0;

    if (items.length === 0 && !useFallback) {
      box.innerHTML = '<div class="updates-empty" data-i18n="updates_empty">暂无更新</div>';
      var e = box.querySelector('[data-i18n]');
      if (e) e.textContent = t('updates_empty');
      return;
    }
    if (useFallback) {
      if (updatesFailed) {
        box.innerHTML = '<div class="updates-fail">' + escapeHtml(t('updates_fail')) + '</div>';
      }
      items = fallbackUpdates();
    }
    var html = items.map(function (it) {
      var link = it.link || guessLink(it.title);
      var tags = (it.tags || []).map(function (x) { return '<span>' + escapeHtml(String(x)) + '</span>'; }).join('');
      return '<a class="update-item" href="' + escapeHtml(link) + '"' + (link.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<span class="update-date">' + escapeHtml(it.date || '') + '</span>' +
        '<span class="update-main">' +
          '<span class="update-title">' + escapeHtml(it.title) + ' <i class="fas fa-arrow-right"></i></span>' +
          (it.desc ? '<span class="update-desc">' + escapeHtml(it.desc) + '</span>' : '') +
          (tags ? '<span class="update-tags">' + tags + '</span>' : '') +
        '</span>' +
      '</a>';
    }).join('');
    box.innerHTML = html;
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var updatesReady = false;
  function renderUpdatesIfReady() {
    if (updatesReady) renderUpdatesList();
  }

  function loadUpdates() {
    var box = $('#updatesList');
    var tryNext = function (i) {
      if (i >= UPDATES_SOURCES.length) {
        updatesFailed = true;
        updatesReady = true;
        renderUpdatesList();
        return;
      }
      fetch(UPDATES_SOURCES[i], { cache: 'no-store' })
        .then(function (r) {
          if (!r.ok) throw new Error('http ' + r.status);
          return r.json();
        })
        .then(function (data) {
          updatesCache = data;
          updatesFailed = false;
          updatesReady = true;
          renderUpdatesList();
        })
        .catch(function () { tryNext(i + 1); });
    };
    tryNext(0);
  }

  /* ============================================================
     GitHub Star 数：拉取仓库 Star 数，并绑定点击直达仓库（便于用户顺手点亮 Star）
     ============================================================ */
  var STAR_REPO = 'Silent-Studio-CN/Silent-Studio-CN.github.io';
  var starCountEl = $('#starCount');
  function fmtStars(n) {
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k';
    return String(n);
  }
  function loadStars() {
    if (!starCountEl) return;
    fetch('https://api.github.com/repos/' + STAR_REPO, { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function (d) {
        var n = d && typeof d.stargazers_count === 'number' ? d.stargazers_count : null;
        if (n !== null) starCountEl.textContent = fmtStars(n);
      })
      .catch(function () { /* 静默降级，保留占位符 */ });
  }

  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var nav = $('#nav');
  var onScroll = function () {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== 语言菜单：动态构建 + 搜索过滤 + 远程语言包 =====
  var langSel = $('#langSelect');
  var langBtn = $('#langBtn');
  var langList = $('#langList');
  var langSearch = $('#langSearch');

  function buildLangMenu() {
    if (!langList) return;
    var q = langSearch ? (langSearch.value || '').trim().toLowerCase() : '';
    var codes = LANGS.filter(function (code) {
      if (!q) return true;
      var name = (LANG_NAME[code] || code).toLowerCase();
      return name.indexOf(q) >= 0 || code.toLowerCase().indexOf(q) >= 0;
    });
    langList.innerHTML = codes.map(function (code) {
      return '<button type="button" data-lang="' + code + '">' +
        '<span class="lang-name">' + escapeHtml(LANG_NAME[code] || code) + '</span>' +
        '<span class="lang-code">' + escapeHtml(code) + '</span>' +
      '</button>';
    }).join('');
    applyLang();
  }

  if (langBtn) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      langSel.classList.toggle('open');
      if (langSearch) { langSearch.value = ''; buildLangMenu(); }
    });
  }
  if (langSearch) {
    // 阻止点击搜索框冒泡到 document，避免菜单被当成“点击外部”关闭
    langSearch.addEventListener('click', function (e) { e.stopPropagation(); });
    langSearch.addEventListener('input', buildLangMenu);
  }
  if (langList) {
    langList.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button[data-lang]') : null;
      if (b) {
        currentLang = b.getAttribute('data-lang');
        applyLang();
        langSel.classList.remove('open');
      }
    });
  }
  document.addEventListener('click', function () { langSel.classList.remove('open'); });

  // 远程语言包：用户后续把翻译提交到 index 仓库 WebSite/lang.json 即自动生效
  var LANG_SOURCES = [
    'https://cdn.jsdelivr.net/gh/Silent-Studio-CN/index@main/WebSite/lang.json',
    'https://raw.githubusercontent.com/Silent-Studio-CN/index/main/WebSite/lang.json'
  ];
  function loadRemoteLangs() {
    var tryNext = function (i) {
      if (i >= LANG_SOURCES.length) { buildLangMenu(); return; }
      fetch(LANG_SOURCES[i], { cache: 'no-store' })
        .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
        .then(function (data) {
          if (data && typeof data === 'object') {
            Object.keys(data).forEach(function (code) {
              var pack = data[code];
              if (!pack || typeof pack !== 'object') return;
              if (LANGS.indexOf(code) < 0) LANGS.push(code);
              if (pack.short) LANG_LABEL[code] = pack.short;
              if (pack.name) LANG_NAME[code] = pack.name;
              Object.keys(pack).forEach(function (k) {
                if (k === 'name' || k === 'short') return;
                if (!I18N[k]) I18N[k] = [];
                var arr = I18N[k];
                var idx = LANGS.indexOf(code);
                while (arr.length <= idx) arr.push(arr[0] || '');
                arr[idx] = pack[k];
              });
            });
          }
          buildLangMenu();
        })
        .catch(function () { tryNext(i + 1); });
    };
    tryNext(0);
  }

  var burger = $('#burger');
  var links = $('.nav-links');
  if (burger) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
      var open = links.classList.contains('open');
      burger.innerHTML = open ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    $$('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        burger.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // 技术栈横向滚动：克隆一份 group 实现无缝循环（克隆整个 track 会嵌套导致重叠）
  var techTrack = $('#techTrack');
  if (techTrack) {
    var group = techTrack.querySelector('.tech-group');
    if (group) techTrack.appendChild(group.cloneNode(true));
  }

  // 滚动渐入
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el, i) {
      el.style.setProperty('--d', (i % 3) * 0.08 + 's');
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // 启动
  applyTheme();
  applyLang();
  loadRemoteLangs();
  loadUpdates();
})();
