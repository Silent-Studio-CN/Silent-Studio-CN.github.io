// 文档页 i18n：7 语言切换 + 机器翻译提示横幅 + 远程 lang.json 扩展
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
     字典（简中 / 繁中 / 英 / 日 / 德 / 俄 / 西）
     正文描述默认只提供中英，其他语言回退中文，并显示机器翻译提示横幅
     ============================================================ */
  var I18N = {
    /* ---- 框架 ---- */
    nav_home:       ['首页', '首頁', 'Home', 'ホーム', 'Startseite', 'Главная', 'Inicio'],
    nav_docs_home:  ['文档首页', '文件首頁', 'Docs home', 'ドキュメントトップ', 'Dokumentation', 'Документы', 'Documentos'],
    nav_quickstart: ['快速开始', '快速開始', 'Quickstart', 'クイックスタート', 'Schnellstart', 'Быстрый старт', 'Inicio rápido'],
    theme_title:    ['切换主题', '切換主題', 'Toggle theme', 'テーマ切替', 'Design wechseln', 'Сменить тему', 'Cambiar tema'],
    crumb_docs:     ['Docs', 'Docs', 'Docs', 'Docs', 'Docs', 'Docs', 'Docs'],
    crumb_guide:    ['Guide', 'Guide', 'Guide', 'Guide', 'Guide', 'Guide', 'Guide'],
    crumb_quick:    ['Quickstart', 'Quickstart', 'Quickstart', 'Quickstart', 'Quickstart', 'Quickstart', 'Quickstart'],
    continue_reading: ['继续阅读', '繼續閱讀', 'Continue reading', '続きを読む', 'Weiterlesen', 'Читать дальше', 'Seguir leyendo'],
    feat_h:         ['功能特性', '功能特性', 'Features', '機能', 'Funktionen', 'Возможности', 'Características'],
    h_download:     ['下载', '下載', 'Download', 'ダウンロード', 'Download', 'Скачать', 'Descargar'],
    h_install:      ['安装', '安裝', 'Installation', 'インストール', 'Installation', 'Установка', 'Instalación'],
    h_usage:        ['使用', '使用', 'Usage', '使い方', 'Nutzung', 'Использование', 'Uso'],
    h_quickstart:   ['快速开始', '快速開始', 'Quickstart', 'クイックスタート', 'Schnellstart', 'Быстрый старт', 'Inicio rápido'],
    footer_page:    ['文档页', '文件頁', 'Docs', 'ドキュメント', 'Doku', 'Документы', 'Documentos'],
    footer_search:  ['文档搜索', '文件搜尋', 'Docs search', 'ドキュメント検索', 'Dokumentsuche', 'Поиск документов', 'Buscar documentos'],

    /* ---- 各项目 banner ---- */
    ss_banner: [
      '这是 <strong>SilentSafe</strong> 的文档首页。前往 GitHub 仓库获取源码、Star 与最新发布。',
      '這是 <strong>SilentSafe</strong> 的文件首頁。前往 GitHub 倉庫取得原始碼、Star 與最新發佈。',
      'This is the <strong>SilentSafe</strong> docs home. Visit the GitHub repo for source, stars and releases.',
      'これは <strong>SilentSafe</strong> のドキュメントトップです。',
      'Dies ist die <strong>SilentSafe</strong>-Dokumentationsseite.',
      'Это главная страница документации <strong>SilentSafe</strong>.',
      'Esta es la página de documentación de <strong>SilentSafe</strong>.'
    ],
    sm_banner: [
      '这是 <strong>SlimeMold</strong> 的文档首页。前往 GitHub 仓库获取源码、Star 与最新发布。',
      '這是 <strong>SlimeMold</strong> 的文件首頁。前往 GitHub 倉庫取得原始碼、Star 與最新發佈。',
      'This is the <strong>SlimeMold</strong> docs home. Visit the GitHub repo for source, stars and releases.',
      'これは <strong>SlimeMold</strong> のドキュメントトップです。',
      'Dies ist die <strong>SlimeMold</strong>-Dokumentationsseite.',
      'Это главная страница документации <strong>SlimeMold</strong>.',
      'Esta es la página de documentación de <strong>SlimeMold</strong>.'
    ],
    it_banner: [
      '这是 <strong>IntTest</strong> 的文档首页。已发布 v2.2.0，选择对应架构的 exe 直接运行，无需安装 Python。',
      '這是 <strong>IntTest</strong> 的文件首頁。已發佈 v2.2.0，選擇對應架構的 exe 直接執行，無需安裝 Python。',
      'This is the <strong>IntTest</strong> docs home. v2.2.0 is released — pick the exe for your architecture and run it directly, no Python needed.',
      'これは <strong>IntTest</strong> のドキュメントトップです。',
      'Dies ist die <strong>IntTest</strong>-Dokumentationsseite.',
      'Это главная страница документации <strong>IntTest</strong>.',
      'Esta es la página de documentación de <strong>IntTest</strong>.'
    ],
    sc_banner: [
      '这是 <strong>SilentCloud</strong> 的文档首页。SilentCloud 是 Web 云服务，访问官网即可开通使用。',
      '這是 <strong>SilentCloud</strong> 的文件首頁。SilentCloud 是 Web 雲服務，造訪官網即可開通使用。',
      'This is the <strong>SilentCloud</strong> docs home. SilentCloud is a web service — visit the website to get started.',
      'これは <strong>SilentCloud</strong> のドキュメントトップです。',
      'Dies ist die <strong>SilentCloud</strong>-Dokumentationsseite.',
      'Это главная страница документации <strong>SilentCloud</strong>.',
      'Esta es la página de documentación de <strong>SilentCloud</strong>.'
    ],
    sw_banner: [
      '这是 <strong>SilentStudioWebSite</strong> 的文档首页。前往 GitHub 仓库获取源码、Star 与最新发布。',
      '這是 <strong>SilentStudioWebSite</strong> 的文件首頁。前往 GitHub 倉庫取得原始碼、Star 與最新發佈。',
      'This is the <strong>SilentStudioWebSite</strong> docs home. Visit the GitHub repo for source, stars and releases.',
      'これは <strong>SilentStudioWebSite</strong> のドキュメントトップです。',
      'Dies ist die <strong>SilentStudioWebSite</strong>-Dokumentationsseite.',
      'Это главная страница документации <strong>SilentStudioWebSite</strong>.',
      'Esta es la página de documentación de <strong>SilentStudioWebSite</strong>.'
    ],
    ge_banner: [
      '这是 <strong>SilentGameEngine</strong> 的文档首页。前往 GitHub 仓库获取源码、Star 与最新发布。',
      '這是 <strong>SilentGameEngine</strong> 的文件首頁。前往 GitHub 倉庫取得原始碼、Star 與最新發佈。',
      'This is the <strong>SilentGameEngine</strong> docs home. Visit the GitHub repo for source, stars and releases.',
      'これは <strong>SilentGameEngine</strong> のドキュメントトップです。',
      'Dies ist die <strong>SilentGameEngine</strong>-Dokumentationsseite.',
      'Это главная страница документации <strong>SilentGameEngine</strong>.',
      'Esta es la página de documentación de <strong>SilentGameEngine</strong>.'
    ],

    /* ---- 机器翻译提示横幅（微软风格） ---- */
    trans_banner: [
      '此页面由机器翻译提供支持。由于机器翻译的特性，内容可能包含错误或不准确之处。',
      '此頁面由機器翻譯提供支援。由於機器翻譯的特性，內容可能包含錯誤或不準確之處。',
      'This page is translated by machine. Due to the nature of machine translation, the content may contain errors or inaccuracies.',
      'このページは機械翻訳によって提供されています。機械翻訳の性質上、内容に誤りや不正確な箇所が含まれる場合があります。',
      'Diese Seite wurde maschinell übersetzt. Aufgrund der Art der maschinellen Übersetzung kann der Inhalt Fehler oder Ungenauigkeiten enthalten.',
      'Эта страница переведена машинным способом. Из-за особенностей машинного перевода содержимое может содержать ошибки или неточности.',
      'Esta página se traduce mediante máquina. Debido a la naturaleza de la traducción automática, el contenido puede contener errores o imprecisiones.'
    ],
    trans_original: [
      '查看原始中文文档',
      '查看原始中文文件',
      'View the original Chinese document',
      '元の中国語ドキュメントを表示',
      'Originaldokument auf Chinesisch ansehen',
      'Просмотреть оригинал на китайском',
      'Ver el documento original en chino'
    ],
    trans_cancel:   ['收起', '收起', 'Dismiss', '閉じる', 'Schließen', 'Скрыть', 'Cerrar'],

    /* ---- 通用按钮 ---- */
    btn_gh:         ['GitHub', 'GitHub', 'GitHub', 'GitHub', 'GitHub', 'GitHub', 'GitHub'],
    btn_gh_repo:    ['前往 GitHub 仓库', '前往 GitHub 仓库', 'Go to the GitHub repo', 'GitHub リポジトリへ', 'Zum GitHub-Repo', 'Перейти в репозиторий', 'Ir al repositorio'],
    btn_website:    ['前往官网', '前往官網', 'Visit the website', '公式サイトへ', 'Zur Website', 'На сайт', 'Ir al sitio'],
    btn_download:   ['立即下载', '立即下載', 'Download now', '今すぐダウンロード', 'Jetzt herunterladen', 'Скачать', 'Descargar ahora'],

    /* ---- 各项目 hero 副标题 ---- */
    ss_sub: [
      '安全防护软件。防护默认全开，隐藏技术细节，只展示结果。威胁扫描、行为监控、启发式分析与隔离区联动。',
      '安全防護軟體。防護預設全開，隱藏技術細節，只展示結果。威脅掃描、行為監控、啟發式分析與隔離區聯動。',
      'Security software. Protection on by default, technical details hidden, results only. Threat scanning, behavior monitoring, heuristic analysis and quarantine working together.',
      'セキュリティソフト。保護はデフォルトで全開、技術的な詳細は隠し、結果だけを表示。',
      'Sicherheitssoftware. Schutz standardmäßig voll aktiviert, technische Details ausgeblendet, nur Ergebnisse.',
      'Программа безопасности. Защита включена по умолчанию, технические детали скрыты, только результаты.',
      'Software de seguridad. Protección activada por defecto, detalles técnicos ocultos, solo resultados.'
    ],
    sm_sub: [
      '黏菌启发的轻量级路径规划库。BFS 气味扩散 + 加权概率爬行，零依赖核心，Python 3.10+。',
      '黏菌啟發的輕量級路徑規劃庫。BFS 氣味擴散 + 加權機率爬行，零依賴核心，Python 3.10+。',
      'A lightweight slime-mold-inspired pathfinding library. BFS scent diffusion + weighted random crawl, zero-dependency core, Python 3.10+.',
      '粘菌に着想を得た軽量パスファインディングライブラリ。BFS 匂い拡散＋重み付きランダム探索。',
      'Eine leichte, vom Schleimpilz inspirierte Pfadfindungs-Bibliothek. BFS-Duftdiffusion + gewichtetes Zufallskriechen.',
      'Лёгкая библиотека поиска пути, вдохновлённая слизевиком. BFS-диффузия запаха + взвешенное случайное движение.',
      'Una biblioteca ligera de búsqueda de rutas inspirada en el moho mucilaginoso.'
    ],
    it_sub: [
      '网络连通性与速度测试工具。测速、实时监控、Ping 与网络信息一站式搞定。',
      '網路連通性與速度測試工具。測速、即時監控、Ping 與網路資訊一站式搞定。',
      'A network connectivity and speed test tool. Speed test, live monitoring, Ping and network info all in one.',
      'ネットワーク接続性・速度テストツール。速度測定、リアルタイム監視、Ping、ネットワーク情報を一括で。',
      'Tool für Netzwerk-Konnektivität und Geschwindigkeitstests. Speedtest, Live-Überwachung, Ping und Netzinformationen.',
      'Инструмент проверки сети и скорости. Тест скорости, мониторинг в реальном времени, Ping и информация о сети.',
      'Herramienta de prueba de red y velocidad. Test de velocidad, monitorización en vivo, Ping e información de red.'
    ],
    sc_sub: [
      '基于 PostgreSQL 的轻量云平台。官网、服务托管、可视化工作流与 API 密钥管理，一站式的数字基础设施。',
      '基於 PostgreSQL 的輕量雲平台。官網、服務託管、可視化工作流與 API 金鑰管理，一站式的數位基礎設施。',
      'A lightweight cloud platform built on PostgreSQL. Website hosting, service hosting, visual workflows and API key management in one place.',
      'PostgreSQL ベースの軽量クラウドプラットフォーム。',
      'Leichte Cloud-Plattform auf Basis von PostgreSQL.',
      'Лёгкая облачная платформа на базе PostgreSQL.',
      'Plataforma cloud ligera basada en PostgreSQL.'
    ],
    sw_sub: [
      'SilentStudio 的核心产品。多语言官网 + 可视化工作流编辑器 + 3D 建模流，让「工作流」不止工作，也成为创作的画布。',
      'SilentStudio 的核心產品。多語言官網 + 可視化工作流編輯器 + 3D 建模流，讓「工作流」不止工作，也成為創作的畫布。',
      'The core product of SilentStudio. Multilingual website + visual workflow editor + 3D modeling flows, making workflows more than work.',
      'SilentStudio の中核製品。多言語サイト＋ビジュアルワークフローエディタ＋3D モデリングフロー。',
      'Das Kernprodukt von SilentStudio. Mehrsprachige Website + visueller Workflow-Editor + 3D-Modellierungs-Flows.',
      'Ключевой продукт SilentStudio. Многоязычный сайт + визуальный редактор процессов + 3D-потоки.',
      'El producto central de SilentStudio. Sitio multilingüe + editor de flujos visual + flujos 3D.'
    ],
    ge_sub: [
      '跨语言游戏引擎：渲染、物理、音频与场景模块，一套代码多平台运行。',
      '跨語言遊戲引擎：渲染、物理、音訊與場景模組，一套程式碼多平台執行。',
      'A cross-language game engine: rendering, physics, audio and scene modules, one codebase for multiple platforms.',
      'クロス言語ゲームエンジン。レンダリング、物理、オーディオ、シーンモジュール。',
      'Cross-Language-Spieleengine: Rendering, Physik, Audio und Szenenmodule.',
      'Кросс-язычный игровой движок: рендеринг, физика, аудио и модули сцен.',
      'Motor de juego multilingüe: renderizado, física, audio y módulos de escena.'
    ],

    /* ---- 快速开始 hero ---- */
    quick_title_suffix: ['快速开始', '快速開始', 'Quickstart', 'クイックスタート', 'Schnellstart', 'Быстрый старт', 'Inicio rápido'],

    /* ---- SilentSafe 功能卡 ---- */
    ss_f1_t: ['威胁扫描', '威脅掃描', 'Threat scan', '脅威スキャン', 'Bedrohungsscan', 'Сканирование угроз', 'Escaneo de amenazas'],
    ss_f1_d: ['按需或定时扫描文件与进程，识别已知与未知威胁。', '按需或定時掃描檔案與程序，識別已知與未知威脅。', 'Scan files and processes on demand or on a schedule to detect known and unknown threats.'],
    ss_f2_t: ['行为监控', '行為監控', 'Behavior monitoring', '挙動監視', 'Verhaltensüberwachung', 'Мониторинг поведения', 'Monitorización de comportamiento'],
    ss_f2_d: ['实时监控进程行为，拦截异常动作。', '即時監控程序行為，攔截異常動作。', 'Monitor process behavior in real time and block abnormal actions.'],
    ss_f3_t: ['隔离区', '隔離區', 'Quarantine', '隔離', 'Quarantäne', 'Карантин', 'Cuarentena'],
    ss_f3_d: ['可疑文件自动隔离，可安全恢复或彻底清除。', '可疑檔案自動隔離，可安全恢復或徹底清除。', 'Suspicious files are quarantined automatically and can be safely restored or removed.'],
    ss_f4_t: ['启发式分析', '啟發式分析', 'Heuristic analysis', 'ヒューリスティック分析', 'Heuristische Analyse', 'Эвристический анализ', 'Análisis heurístico'],
    ss_f4_d: ['无需病毒库更新即可识别新型变种。', '無需病毒庫更新即可識別新型變種。', 'Identify new variants without waiting for signature updates.'],

    /* ---- SlimeMold 功能卡 ---- */
    sm_f1_t: ['气味场扩散', '氣味場擴散', 'Scent field', '匂い場の拡散', 'Duftfeld', 'Диффузия запаха', 'Campo de olor'],
    sm_f1_d: ['从终点 BFS 扩散化学信号，给每格标上最短步数，并自动缓存复用。', '從終點 BFS 擴散化學訊號，給每格標上最短步數，並自動快取重用。', 'BFS diffusion from the goal labels every cell with its shortest distance, cached for reuse.'],
    sm_f2_t: ['双策略爬行', '雙策略爬行', 'Two crawl strategies', '二つの探索戦略', 'Zwei Crawl-Strategien', 'Две стратегии', 'Dos estrategias'],
    sm_f2_d: ['shortest 严格最短；optimal 加权概率探索，路径更多样、更贴近真实黏菌。', 'shortest 嚴格最短；optimal 加權機率探索，路徑更多樣、更貼近真實黏菌。', 'shortest for strict shortest paths; optimal for weighted random crawl with more diverse routes.'],
    sm_f3_t: ['精确报错', '精確報錯', 'Precise errors', '正確なエラー', 'Präzise Fehler', 'Точные ошибки', 'Errores precisos'],
    sm_f3_d: ['参数类型、越界、障碍物……每个错误都在算法执行前被精确拦截，信息可操作。', '參數型別、越界、障礙物……每個錯誤都在演算法執行前被精確攔截，資訊可操作。', 'Wrong types, out-of-bounds, blocked cells… every error is intercepted before the algorithm runs.'],
    sm_f4_t: ['可视化窗口', '可視化窗口', 'Visualizer', '可視化ウィンドウ', 'Visualisierung', 'Визуализация', 'Visualizador'],
    sm_f4_d: ['内置 Qt 动画窗口，步进展示爬行过程，支持自定义样式与配色。', '內建 Qt 動畫視窗，步進展示爬行過程，支援自訂樣式與配色。', 'Built-in Qt animation window that steps through the crawl, with custom styles.'],

    /* ---- IntTest 功能卡 ---- */
    it_f1_t: ['速度测试', '速度測試', 'Speed test', '速度テスト', 'Speedtest', 'Тест скорости', 'Test de velocidad'],
    it_f1_d: ['6 路 HTTP Range 并发下载 + 4 路并发上传，15 秒实时测速并绘制趋势图。', '6 路 HTTP Range 並發下載 + 4 路並發上傳，15 秒即時測速並繪製趨勢圖。', '6-way HTTP Range parallel download + 4-way parallel upload, 15-second live speed test with trend chart.'],
    it_f2_t: ['实时监控', '即時監控', 'Live monitor', 'リアルタイム監視', 'Live-Überwachung', 'Мониторинг', 'Monitorización en vivo'],
    it_f2_d: ['当前网络接口上下行速率折线图，记录过去 60 秒变化与开机以来总流量。', '當前網路介面上下行速率折線圖，記錄過去 60 秒變化與開機以來總流量。', 'Line chart of current interface up/down rates, last 60 seconds plus total traffic since boot.'],
    it_f3_t: ['连通性测试', '連通性測試', 'Ping test', '接続性テスト', 'Ping-Test', 'Проверка связи', 'Prueba de conectividad'],
    it_f3_d: ['对多目标 Ping，延迟颜色分级（<100ms 优秀 / <300ms 一般 / ≥300ms 差），支持自动刷新。', '對多目標 Ping，延遲顏色分級（<100ms 優秀 / <300ms 一般 / ≥300ms 差），支援自動重新整理。', 'Ping multiple targets with latency color grades and auto refresh.'],
    it_f4_t: ['网络信息', '網路資訊', 'Network info', 'ネットワーク情報', 'Netzwerkinformationen', 'Информация о сети', 'Información de red'],
    it_f4_d: ['公网 IPv4/IPv6、ISP、地理位置与 ASN，DNS 解析与 HTTP 连通性检测。', '公網 IPv4/IPv6、ISP、地理位置與 ASN，DNS 解析與 HTTP 連通性檢測。', 'Public IPv4/IPv6, ISP, location and ASN, DNS resolution and HTTP connectivity checks.'],

    /* ---- SilentCloud 功能卡 ---- */
    sc_f1_t: ['多语言官网', '多語言官網', 'Multilingual site', '多言語サイト', 'Mehrsprachige Website', 'Многоязычный сайт', 'Sitio multilingüe'],
    sc_f1_d: ['中 / 英 / 日三语站点，IP 自动识别语言。', '中 / 英 / 日三語站點，IP 自動識別語言。', 'Chinese / English / Japanese site with automatic language detection by IP.'],
    sc_f2_t: ['工作流编辑器', '工作流編輯器', 'Workflow editor', 'ワークフローエディタ', 'Workflow-Editor', 'Редактор процессов', 'Editor de flujos'],
    sc_f2_d: ['可视化节点编辑 + 编程模式 + 3D 建模流。', '可視化節點編輯 + 程式模式 + 3D 建模流。', 'Visual node editing, coding mode and 3D modeling flows.'],
    sc_f3_t: ['API 管理', 'API 管理', 'API management', 'API 管理', 'API-Verwaltung', 'Управление API', 'Gestión de API'],
    sc_f3_d: ['服务 API 密钥一键生成与轮换。', '服務 API 金鑰一鍵生成與輪換。', 'One-click API key generation and rotation.'],
    sc_f4_t: ['服务托管', '服務託管', 'Service hosting', 'サービスホスティング', 'Service-Hosting', 'Хостинг сервисов', 'Alojamiento de servicios'],
    sc_f4_d: ['API / WebSocket / Webhook 等十余种服务类型。', 'API / WebSocket / Webhook 等十餘種服務類型。', 'A dozen service types: API, WebSocket, Webhook and more.'],

    /* ---- 继续阅读卡 ---- */
    read_quick_t: ['快速开始', '快速開始', 'Quickstart', 'クイックスタート', 'Schnellstart', 'Быстрый старт', 'Inicio rápido'],
    ss_read_d: ['几分钟内把 SilentSafe 跑起来。', '幾分鐘內把 SilentSafe 跑起來。', 'Get SilentSafe running in minutes.'],
    sm_read_d: ['安装、30 秒上手与策略调优。', '安裝、30 秒上手與策略調優。', 'Install, 30-second quickstart and strategy tuning.'],
    it_read_d: ['下载、运行与功能模块说明。', '下載、執行與功能模組說明。', 'Download, run and feature module guide.'],
    sc_read_d: ['注册账号，几分钟内用上 SilentCloud。', '註冊帳號，幾分鐘內用上 SilentCloud。', 'Sign up and start using SilentCloud in minutes.'],
    sw_read_d: ['启动后端并打开编辑器体验 3D 建模流。', '啟動後端並開啟編輯器體驗 3D 建模流。', 'Start the backend and open the editor to try 3D modeling flows.'],
    ge_read_d: ['创建引擎实例、添加场景并启动主循环。', '建立引擎實例、新增場景並啟動主迴圈。', 'Create an engine instance, add a scene and start the main loop.'],

    /* ---- SilentStudioWebSite 功能卡 ---- */
    sw_f1_t: ['多语言', '多語言', 'Multilingual', '多言語', 'Mehrsprachig', 'Многоязычность', 'Multilingüe'],
    sw_f1_d: ['中 / 英 / 日三语，自动语言识别。', '中 / 英 / 日三語，自動語言識別。', 'Chinese / English / Japanese with automatic language detection.'],
    sw_f2_t: ['工作流编辑器', '工作流編輯器', 'Workflow editor', 'ワークフローエディタ', 'Workflow-Editor', 'Редактор процессов', 'Editor de flujos'],
    sw_f2_d: ['节点式可视化编程，支持代码节点。', '節點式視覺化程式設計，支援程式碼節點。', 'Node-based visual programming with code nodes.'],
    sw_f3_t: ['3D 建模流', '3D 建模流', '3D modeling flows', '3D モデリングフロー', '3D-Modellierungs-Flows', '3D-потоки', 'Flujos 3D'],
    sw_f3_d: ['三参数节点连接同一 3D 视窗，实时控制模型。', '三參數節點連接同一 3D 視窗，即時控制模型。', 'Three-parameter nodes drive one shared 3D viewport in real time.'],
    sw_f4_t: ['文件节点', '檔案節點', 'File nodes', 'ファイルノード', 'Dateiknoten', 'Файловые узлы', 'Nodos de archivo'],
    sw_f4_d: ['上传 Word / PPT / Excel / 音视频 / 3D 模型，随工作流保存。', '上傳 Word / PPT / Excel / 音視訊 / 3D 模型，隨工作流儲存。', 'Upload Word/PPT/Excel/media/3D models and save them with the workflow.'],

    /* ---- SilentGameEngine 功能卡 ---- */
    ge_f1_t: ['模块化架构', '模組化架構', 'Modular architecture', 'モジュラーアーキテクチャ', 'Modulare Architektur', 'Модульная архитектура', 'Arquitectura modular'],
    ge_f1_d: ['渲染 / 物理 / 音频 / 场景独立模块，按需组合。', '渲染 / 物理 / 音訊 / 場景獨立模組，按需組合。', 'Independent rendering/physics/audio/scene modules, combined as needed.'],
    ge_f2_t: ['Rust 核心', 'Rust 核心', 'Rust core', 'Rust コア', 'Rust-Kern', 'Ядро Rust', 'Núcleo Rust'],
    ge_f2_d: ['引擎核心以 Rust 实现，性能与安全兼得。', '引擎核心以 Rust 實現，效能與安全兼得。', 'Engine core written in Rust for performance and safety.'],
    ge_f3_t: ['ECS 体系', 'ECS 體系', 'ECS architecture', 'ECS アーキテクチャ', 'ECS-Architektur', 'Архитектура ECS', 'Arquitectura ECS'],
    ge_f3_d: ['实体-组件-系统架构，构建复杂游戏逻辑。', '實體-元件-系統架構，建構複雜遊戲邏輯。', 'Entity-Component-System for complex game logic.'],
    ge_f4_t: ['编辑器集成', '編輯器整合', 'Editor integration', 'エディタ統合', 'Editor-Integration', 'Интеграция с редактором', 'Integración con editor'],
    ge_f4_d: ['配套 SgeEditor，可视化搭建场景与属性。', '配套 SgeEditor，視覺化搭建場景與屬性。', 'Ships with SgeEditor for visual scene and property setup.']
  };

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

  var currentLang = localStorage.getItem('ss_lang') || detectLang();

  function t(key) {
    var arr = I18N[key];
    if (!arr) return '';
    var idx = LANGS.indexOf(currentLang);
    return arr[idx >= 0 && arr[idx] ? idx : 0];
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* 语言菜单 */
  function buildLangMenu() {
    var list = $('#langList');
    if (!list) return;
    var q = $('#langSearch') ? ($('#langSearch').value || '').trim().toLowerCase() : '';
    var codes = LANGS.filter(function (code) {
      if (!q) return true;
      var name = (LANG_NAME[code] || code).toLowerCase();
      return name.indexOf(q) >= 0 || code.toLowerCase().indexOf(q) >= 0;
    });
    list.innerHTML = codes.map(function (code) {
      return '<button type="button" data-lang="' + code + '">' +
        '<span class="lang-name">' + escapeHtml(LANG_NAME[code] || code) + '</span>' +
        '<span class="lang-code">' + escapeHtml(code) + '</span>' +
      '</button>';
    }).join('');
    syncActive();
  }

  function syncActive() {
    $$('#langList button[data-lang]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === currentLang);
    });
  }

  /* 翻译横幅（微软风格：机器翻译提示） */
  function renderTransBanner() {
    var box = $('#transBanner');
    if (!box) return;
    var isOriginal = currentLang === 'zh-Hans';
    if (isOriginal) { box.innerHTML = ''; return; }
    box.innerHTML =
      '<div class="trans-banner">' +
        '<span class="trans-msg"><i class="fas fa-language"></i> ' + escapeHtml(t('trans_banner')) + '</span>' +
        '<span class="trans-actions">' +
          '<button type="button" class="trans-btn" id="transOriginal">' + escapeHtml(t('trans_original')) + '</button>' +
          '<button type="button" class="trans-btn" id="transCancel">' + escapeHtml(t('trans_cancel')) + '</button>' +
        '</span>' +
      '</div>';
    var orig = $('#transOriginal');
    var cancel = $('#transCancel');
    if (orig) orig.addEventListener('click', function () { setLang('zh-Hans'); });
    if (cancel) cancel.addEventListener('click', function () { box.innerHTML = ''; });
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
    var html = document.documentElement;
    html.lang = currentLang === 'zh-Hans' ? 'zh-CN' : currentLang === 'zh-Hant' ? 'zh-TW' : currentLang;
    try { localStorage.setItem('ss_lang', currentLang); } catch (e) {}
    syncActive();
    renderTransBanner();
  }

  function setLang(code) {
    currentLang = code;
    applyLang();
  }

  function init() {
    /* 语言选择器事件（DOM 就绪后绑定） */
    var langSel = $('#langSelect');
    var langBtn = $('#langBtn');
    var langSearch = $('#langSearch');
    var langList = $('#langList');
    if (langBtn) {
      langBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        langSel.classList.toggle('open');
        if (langSearch) { langSearch.value = ''; buildLangMenu(); }
      });
    }
    if (langSearch) {
      langSearch.addEventListener('click', function (e) { e.stopPropagation(); });
      langSearch.addEventListener('input', buildLangMenu);
    }
    if (langList) {
      langList.addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('button[data-lang]') : null;
        if (b) {
          setLang(b.getAttribute('data-lang'));
          langSel.classList.remove('open');
        }
      });
    }
    document.addEventListener('click', function () {
      if (langSel) langSel.classList.remove('open');
    });

    buildLangMenu();
    applyLang();
    loadRemoteLangs();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
/* 远程语言包：index 仓库 WebSite/lang.json */
  var LANG_SOURCES = [
    'https://cdn.jsdelivr.net/gh/Silent-Studio-CN/index@main/WebSite/lang.json',
    'https://raw.githubusercontent.com/Silent-Studio-CN/index/main/WebSite/lang.json'
  ];
  function loadRemoteLangs() {
    var tryNext = function (i) {
      if (i >= LANG_SOURCES.length) { applyLang(); return; }
      var ctrl = ('AbortController' in window) ? new AbortController() : null;
      var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 6000) : null;
      fetch(LANG_SOURCES[i], { cache: 'no-store', signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
        .then(function (data) {
          if (timer) clearTimeout(timer);
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
          applyLang();
        })
        .catch(function () {
          if (timer) clearTimeout(timer);
          tryNext(i + 1);
        });
    };
    tryNext(0);
  }
})();
