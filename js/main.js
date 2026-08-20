/* ============================================================
   SilentStudio · 静态介绍站交互
   - 7 语言 i18n（简中/繁中/英/日/德/俄/西）+ localStorage 记忆
   - 明暗主题切换 + localStorage 记忆
   - 滚动渐入 / 卡片 3D 倾斜 / 移动端菜单
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

  /* ============================================================
     i18n 字典
     ============================================================ */
  var I18N = {
    nav_about:        ['关于', '關於', 'About', '概要', 'Über', 'О нас', 'Acerca de'],
    nav_projects:     ['项目', '項目', 'Projects', 'プロジェクト', 'Projekte', 'Проекты', 'Proyectos'],
    nav_philosophy:   ['理念', '理念', 'Philosophy', '理念', 'Philosophie', 'Философия', 'Filosofía'],
    nav_latest:       ['最新项目', '最新項目', 'Latest', '最新', 'Neueste', 'Последнее', 'Novedades'],

    hero_sub: [
      '静默工作室 · 一个自用起步的软件家园',
      '靜默工作室 · 一個自用起步的軟體家園',
      'A quiet studio · a software home that started for ourselves',
      '静かなスタジオ · 自分用から始まったソフトウェアの家',
      'Ein leises Studio · eine Software-Heimat, die für uns selbst begann',
      'Тихая студия · программный дом, начавшийся для себя',
      'Un estudio silencioso · un hogar de software que empezó para nosotros'
    ],
    hero_desc: [
      '从安全防护到路径算法，从云平台到游戏引擎——<br class="hide-mobile" />我们相信：最好的工具，是把复杂藏起来，把结果交给你。',
      '從安全防護到路徑演算法，從雲平台到遊戲引擎——<br class="hide-mobile" />我們相信：最好的工具，是把複雜藏起來，把結果交給你。',
      'From security to pathfinding, from cloud to game engines —<br class="hide-mobile" />we believe the best tools hide the complexity and hand you the result.',
      'セキュリティから経路探索、クラウドからゲームエンジンまで——<br class="hide-mobile" />最高のツールは複雑さを隠し、結果をあなたに渡すものです。',
      'Von Sicherheit bis Pfadfindung, von Cloud bis Game-Engines —<br class="hide-mobile" />wir glauben: Die besten Werkzeuge verbergen die Komplexität und geben dir das Ergebnis.',
      'От безопасности до алгоритмов пути, от облака до игровых движков —<br class="hide-mobile" />лучшие инструменты скрывают сложность и отдают результат вам.',
      'De la seguridad a los algoritmos de ruta, de la nube a los motores de juego —<br class="hide-mobile" />los mejores programas esconden la complejidad y te dan el resultado.'
    ],
    hero_btn1: ['探索项目', '探索項目', 'Explore', 'プロジェクト', 'Projekte', 'Проекты', 'Explorar'],
    hero_btn2: ['认识我们', '認識我們', 'About us', '私たちについて', 'Über uns', 'О нас', 'Sobre nosotros'],

    about_title: ['关于 SilentStudio', '關於 SilentStudio', 'About SilentStudio', 'SilentStudio について', 'Über SilentStudio', 'О SilentStudio', 'Acerca de SilentStudio'],
    about_desc: [
      'SilentStudio 起源于一个朴素的想法：工具应该安静地工作，而不是制造噪音。我们从自用项目出发，逐渐生长出一个横跨安全、算法、云与引擎的软件生态，并在 <a href="https://github.com/Silent-Studio-CN" target="_blank" rel="noopener">GitHub · Silent-Studio-CN</a> 分享我们的成果。',
      'SilentStudio 起源於一個樸素的想法：工具應該安靜地工作，而不是製造噪音。我們從自用專案出發，逐漸生長出一個橫跨安全、演算法、雲與引擎的軟體生態，並在 <a href="https://github.com/Silent-Studio-CN" target="_blank" rel="noopener">GitHub · Silent-Studio-CN</a> 分享我們的成果。',
      'SilentStudio began with a simple idea: tools should work quietly instead of making noise. Starting from projects we made for ourselves, we grew an ecosystem spanning security, algorithms, cloud and engines — shared under <a href="https://github.com/Silent-Studio-CN" target="_blank" rel="noopener">GitHub · Silent-Studio-CN</a>.',
      'SilentStudio は「ツールは静かに働き、騒音を立てない」という素朴な考えから始まりました。自分用のプロジェクトから、セキュリティ・アルゴリズム・クラウド・エンジンを横断するエコシステムへと成長し、<a href="https://github.com/Silent-Studio-CN" target="_blank" rel="noopener">GitHub · Silent-Studio-CN</a> で成果を共有しています。',
      'SilentStudio begann mit einer einfachen Idee: Werkzeuge sollen leise arbeiten statt Lärm zu machen. Aus Projekten für uns selbst wuchs ein Ökosystem aus Sicherheit, Algorithmen, Cloud und Engines — geteilt unter <a href="https://github.com/Silent-Studio-CN" target="_blank" rel="noopener">GitHub · Silent-Studio-CN</a>.',
      'SilentStudio начался с простой идеи: инструменты должны работать тихо, а не создавать шум. Из проектов для себя мы выросли в экосистему, охватывающую безопасность, алгоритмы, облако и движки — и делимся результатами на <a href="https://github.com/Silent-Studio-CN" target="_blank" rel="noopener">GitHub · Silent-Studio-CN</a>.',
      'SilentStudio comenzó con una idea sencilla: las herramientas deben trabajar en silencio, no hacer ruido. Desde proyectos hechos para nosotros, crecimos hasta un ecosistema de seguridad, algoritmos, nube y motores — compartido en <a href="https://github.com/Silent-Studio-CN" target="_blank" rel="noopener">GitHub · Silent-Studio-CN</a>.'
    ],
    about_c1t: ['从自用起步', '從自用起步', 'Made for ourselves', '自分用から', 'Für uns selbst', 'Для себя', 'Hecho para nosotros'],
    about_c1d: [
      '每个项目都先解决自己的真实问题，打磨好用之后，再分享给同样需要它的人。',
      '每個專案都先解決自己的真實問題，打磨好用之後，再分享給同樣需要它的人。',
      'Every project first solves a real problem of our own; once polished, it is shared with those who need it too.',
      'すべてのプロジェクトはまず自分たちの実問題を解決します。磨き上げた後、同じように必要とする人へ共有します。',
      'Jedes Projekt löst zuerst ein echtes eigenes Problem; sobald es ausgereift ist, teilen wir es mit allen, die es brauchen.',
      'Каждый проект сначала решает нашу реальную проблему, а после доводки — делится с теми, кому он нужен.',
      'Cada proyecto resuelve primero un problema real nuestro; una vez pulido, se comparte con quienes lo necesitan.'
    ],
    about_c2t: ['跨领域深耕', '跨領域深耕', 'Depth across domains', '領域横断', 'Tiefe über Bereiche', 'Глубина в разных областях', 'Profundidad en varios ámbitos'],
    about_c2d: [
      '安全、算法、云服务、游戏引擎——看似分散，内核一致：认真对待每一行代码与每一个细节。',
      '安全、演算法、雲服務、遊戲引擎——看似分散，內核一致：認真對待每一行程式碼與每一個細節。',
      'Security, algorithms, cloud and game engines — seemingly scattered, but with one core: taking every line of code and every detail seriously.',
      'セキュリティ、アルゴリズム、クラウド、ゲームエンジン——一見バラバラでも、核は同じ：一行一行的確に、細部まで真剣に。',
      'Sicherheit, Algorithmen, Cloud und Game-Engines — scheinbar verstreut, doch mit einem Kern: jede Zeile Code und jedes Detail ernst nehmen.',
      'Безопасность, алгоритмы, облако и игровые движки — на первый взгляд разные, но ядро одно: серьёзно относиться к каждой строке кода и каждой детали.',
      'Seguridad, algoritmos, nube y motores — aparentemente dispersos, con un mismo núcleo: tomarse en serio cada línea y cada detalle.'
    ],
    about_c3t: ['作品而非玩具', '作品而非玩具', 'Crafted, not toys', '作品であり玩具でない', 'Werke, kein Spielzeug', 'Работы, а не игрушки', 'Obras, no juguetes'],
    about_c3d: [
      '每一个项目都以"交付作品"的标准要求自己：稳定、精致、经得起长期使用。',
      '每一個專案都以「交付作品」的標準要求自己：穩定、精緻、經得起長期使用。',
      'Every project holds itself to the standard of a finished work: stable, refined, and built to last.',
      'すべてのプロジェクトは「作品を納品する」基準で自分を律します：安定、精巧、長期使用に耐える。',
      'Jedes Projekt hält sich an den Anspruch eines fertigen Werks: stabil, verfeinert, langlebig.',
      'Каждый проект держит планку «готовой работы»: стабильно, отточено, рассчитано на долгую жизнь.',
      'Cada proyecto se exige el nivel de una obra terminada: estable, refinada y duradera.'
    ],

    projects_title: ['精选项目', '精選專案', 'Featured projects', '代表プロジェクト', 'Ausgewählte Projekte', 'Избранные проекты', 'Proyectos destacados'],
    projects_desc: [
      '点击卡片，前往对应仓库了解详情。',
      '點擊卡片，前往對應倉庫了解詳情。',
      'Click a card to visit its repository.',
      'カードをクリックしてリポジトリへ。',
      'Klicke auf eine Karte, um das Repository zu besuchen.',
      'Нажмите на карточку, чтобы открыть репозиторий.',
      'Haz clic en una tarjeta para visitar su repositorio.'
    ],
    proj1_tag: ['Security', 'Security', 'Security', 'セキュリティ', 'Sicherheit', 'Безопасность', 'Seguridad'],
    proj1_desc: [
      '智能安全防护工具。防护默认全开，隐藏技术细节，只展示结果。已发布版本将打包为可执行程序交付，仓库提供项目概览与问题跟踪。',
      '智慧安全防護工具。防護預設全開，隱藏技術細節，只展示結果。已發布版本將打包為可執行程式交付，倉庫提供專案概覽與問題追蹤。',
      'A smart security protection tool. Protections are on by default; technical details stay hidden; only results are shown. Released builds ship as packaged executables; the repository hosts the overview and issue tracker.',
      'スマートなセキュリティ保護ツール。防御はデフォルトで全開、技術詳細は隠し、結果だけを表示。リリース版は実行ファイルとして配布され、リポジトリは概要と Issue 管理を提供します。',
      'Ein intelligentes Sicherheitstool. Schutz ist standardmäßig aktiv; technische Details bleiben verborgen; nur Ergebnisse werden gezeigt. Veröffentlichungen werden als ausführbare Programme geliefert; das Repository bietet Übersicht und Issue-Tracking.',
      'Умный инструмент защиты. Защита включена по умолчанию, технические детали скрыты, показываются только результаты. Релизы поставляются как исполняемые файлы; в репозитории — обзор и трекер проблем.',
      'Una herramienta de protección inteligente. Protección activada por defecto; los detalles técnicos quedan ocultos; solo se muestran resultados. Las versiones se entregan como ejecutables; el repositorio aloja la descripción y el seguimiento de incidencias.'
    ],
    proj2_tag: ['Algorithm', 'Algorithm', 'Algorithm', 'アルゴリズム', 'Algorithmus', 'Алгоритм', 'Algoritmo'],
    proj2_desc: [
      '受黏菌启发的轻量级路径规划库。BFS 与加权概率爬行的结合，为寻路与探索问题提供简洁的 Python 实现。',
      '受黏菌啟發的輕量級路徑規劃函式庫。BFS 與加權機率爬行的結合，為尋路與探索問題提供簡潔的 Python 實作。',
      'A lightweight pathfinding library inspired by slime mold — combining BFS with weighted probabilistic crawl in a clean Python implementation.',
      '粘菌に着想を得た軽量パスファインディングライブラリ。BFS と重み付き確率クロールを組み合わせた、簡潔な Python 実装。',
      'Eine schlanke Pathfinding-Bibliothek, inspiriert von Schleimpilzen — BFS kombiniert mit gewichtetem probabilistischem Kriechen in sauberem Python.',
      'Лёгкая библиотека поиска пути, вдохновлённая слизевиками — сочетание BFS и взвешенного вероятностного поиска в чистом Python.',
      'Una librería ligera de búsqueda de caminos inspirada en el moho — BFS combinado con rastreo probabilístico ponderado en Python.'
    ],
    proj3_tag: ['Index', 'Index', 'Index', 'インデックス', 'Index', 'Индекс', 'Índice'],
    proj3_desc: [
      'SilentStudio 的公开项目列表：简介、索引与最新动态。想了解我们正在做什么，从这里开始。',
      'SilentStudio 的公開專案列表：簡介、索引與最新動態。想了解我們正在做什麼，從這裡開始。',
      'The public project list of SilentStudio: briefs, index and the latest updates. Start here to see what we are working on.',
      'SilentStudio の公開プロジェクト一覧：紹介・索引・最新情報。私たちが何をしているか知りたければ、ここから。',
      'Die öffentliche Projektliste von SilentStudio: Kurzvorstellungen, Index und die neuesten Updates. Hier erfährst du, woran wir arbeiten.',
      'Публичный список проектов SilentStudio: описания, индекс и последние обновления. Начните здесь, чтобы узнать, над чем мы работаем.',
      'La lista pública de proyectos de SilentStudio: resúmenes, índice y novedades. Empieza aquí para ver en qué trabajamos.'
    ],
    proj4_tag: ['Website', 'Website', 'Website', 'ウェブサイト', 'Website', 'Сайт', 'Sitio web'],
    proj4_desc: [
      '本站点：静态介绍官网，支持七种语言与明暗主题。同时是 SilentStudio 全系列产品与工作流编辑器的展示门户。',
      '本站點：靜態介紹官網，支援七種語言與明暗主題。同時是 SilentStudio 全系列產品與工作流編輯器的展示入口。',
      'This site: a static intro website with seven languages and light/dark themes, and the showcase portal for the whole SilentStudio family.',
      '本サイト：7言語とライト/ダークテーマを備えた静的紹介サイト。SilentStudio ファミリー全体のショーケースポータルでもあります。',
      'Diese Seite: eine statische Vorstellungsseite mit sieben Sprachen und Hell/Dunkel-Design, zugleich das Schaufenster für die ganze SilentStudio-Familie.',
      'Этот сайт: статичная витрина с семью языками и светлой/тёмной темами, а также портал для всей семьи SilentStudio.',
      'Este sitio: web introductoria estática con siete idiomas y temas claro/oscuro, y el escaparate de toda la familia SilentStudio.'
    ],
    proj_go: ['前往仓库 →', '前往倉庫 →', 'Visit repo →', 'リポジトリへ →', 'Zum Repo →', 'В репозиторий →', 'Ver repositorio →'],

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
      'Jedes Pixel und jede Animationssequenz verdient Sorgfalt. Verfeinerung ist keine Deko — sie ist Respekt vor deiner Zeit.',
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
      'Las herramientas para Windows se entregan como ejecutivos listos para usar; las librerías para desarrolladores, como APIs limpias.'
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
      'Посетите наш GitHub-организацию, чтобы увидеть новые проекты, обновления и прогресс.',
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
      '产品文档：<a href="docs/silent-safe/">SilentSafe</a> · <a href="docs/silentstudio-website/">SilentStudioWebSite</a>',
      '產品文件：<a href="docs/silent-safe/">SilentSafe</a> · <a href="docs/silentstudio-website/">SilentStudioWebSite</a>',
      'Docs: <a href="docs/silent-safe/">SilentSafe</a> · <a href="docs/silentstudio-website/">SilentStudioWebSite</a>',
      'ドキュメント：<a href="docs/silent-safe/">SilentSafe</a> · <a href="docs/silentstudio-website/">SilentStudioWebSite</a>',
      'Dokumente: <a href="docs/silent-safe/">SilentSafe</a> · <a href="docs/silentstudio-website/">SilentStudioWebSite</a>',
      'Документация: <a href="docs/silent-safe/">SilentSafe</a> · <a href="docs/silentstudio-website/">SilentStudioWebSite</a>',
      'Docs: <a href="docs/silent-safe/">SilentSafe</a> · <a href="docs/silentstudio-website/">SilentStudioWebSite</a>'
    ],
    footer_rights: ['保留所有权利', '保留所有權利', 'All rights reserved', 'All rights reserved', 'Alle Rechte vorbehalten', 'Все права защищены', 'Todos los derechos reservados']
  };

  /* ============================================================
     语言初始化与切换
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
    $$('.lang-menu button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === currentLang);
    });
    var html = document.documentElement;
    html.lang = currentLang === 'zh-Hans' ? 'zh-CN' : currentLang === 'zh-Hant' ? 'zh-TW' : currentLang;
    try { localStorage.setItem('ss_lang', currentLang); } catch (e) {}
  }

  /* ============================================================
     主题切换
     ============================================================ */
  var themeBtn = $('#themeBtn');
  var themeIcon = $('#themeIcon');
  var currentTheme = localStorage.getItem('ss_theme') || 'dark';

  function applyTheme() {
    var html = document.documentElement;
    html.setAttribute('data-theme', currentTheme);
    if (themeIcon) {
      themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    try { localStorage.setItem('ss_theme', currentTheme); } catch (e) {}
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme();
    });
  }

  /* ============================================================
     其余交互
     ============================================================ */
  // 年份
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 导航滚动态
  var nav = $('#nav');
  var onScroll = function () {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 语言菜单
  var langSel = $('#langSelect');
  var langBtn = $('#langBtn');
  if (langBtn) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      langSel.classList.toggle('open');
    });
    $$('.lang-menu button').forEach(function (b) {
      b.addEventListener('click', function () {
        currentLang = b.getAttribute('data-lang');
        applyLang();
        langSel.classList.remove('open');
      });
    });
    document.addEventListener('click', function () { langSel.classList.remove('open'); });
  }

  // 移动端菜单
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

  // 卡片 3D 倾斜
  if (window.matchMedia('(hover: hover)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $$('[data-tilt]').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        card.style.transform = 'perspective(900px) rotateX(' + ((0.5 - py) * 10) + 'deg) rotateY(' + ((px - 0.5) * 10) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // 启动
  applyTheme();
  applyLang();
})();
