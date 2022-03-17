# Сайт Money Help

Финансовая помощь, займы

## Страницы

* [Главная](https://melentq.github.io/money-help/index)
* [Займ для бизнеса](https://melentq.github.io/money-help/entity)
* [Под ПТС](https://melentq.github.io/money-help/transport)
* [Под залог недвижимости](https://melentq.github.io/money-help/realty)
* [О компании](https://melentq.github.io/money-help/about)
* [Калькулятор](https://melentq.github.io/money-help/calculator)
* [Документы](https://melentq.github.io/money-help/documents)
* [FAQ](https://melentq.github.io/money-help/faq)
* [Контакты](https://melentq.github.io/money-help/contacts)
* [404](https://melentq.github.io/money-help/404)
* [Текстовая страница](https://melentq.github.io/money-help/policy)

## Handlebars Boilerplate

Бойлерплейт на основе связки Gulp + Webpack с поддержкой SVG спрайтов и SCSS

HTML-препроцессор, шаблонизатор - [Handlebars](https://handlebarsjs.com/)

CSS-препроцессор - [SCSS](https://sass-scss.ru/)

## Предустановленные библиотеки и плагины

* [jQuery](https://jquery.com/)
* [GSAP](https://greensock.com/gsap/)
* [Swiper](https://swiperjs.com/swiper-api)
* [lazysizes](https://afarkas.github.io/lazysizes/index.html)
* [parsley.js](https://parsleyjs.org/)
* [day.js](https://day.js.org/)
* [choices.js](https://mohistory.org/node_modules/choices.js/)
* [inputmask](https://github.com/RobinHerbots/Inputmask)
* [plyr](https://plyr.io/)
* [bootstrap-datepicker](https://bootstrap-datepicker.readthedocs.io/en/latest/)
* [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock)
* [detect-it](https://www.npmjs.com/package/detect-it)

## Установка

Установить Node JS, затем выполнить команду:

```bash
npm install
```

## NPM

### В режиме разработки

```bash
npm run dev
```

### В продакшен режиме

```bash
npm run build
```

### Оптимизировать изображения + конвертировать в webp

```bash
npm run squoosh
```

### Загрузить сборку на gh-pages

(Нужно добавить ссылку на репозиторий в package.json)

```bash
npm run ghp
```

### Загрузить сборку на хостинг по FTP

(Нужно переименовать файл _ftp-settings.json в ftp-settings.json)

```bash
npm run ftp
```

## Использование

### Handlebars

В проекте используются [build-in-helpers](https://handlebarsjs.com/guide/builtin-helpers.html)

Основные используемые фичи шаблонизатора:

* [Partials](https://handlebarsjs.com/guide/partials.html#basic-partials)
* [#if](https://handlebarsjs.com/guide/builtin-helpers.html#if)
* [#each](https://handlebarsjs.com/guide/builtin-helpers.html#each)

Как пользоваться:

* Страницы генерируются на основе шаблонов. Шаблон хранится в папке src\partials\layouts
* Страницы, которые наследуются от шаблона, хранятся в папке pages
* В папке pages есть папка data с json-файлами. В них хранятся данные для страниц. Эти файлы принадлежат одноименным страницам, а данные в них сразу доступны для использования (попадают в контекст). Эти файлы создаются вручную
* Какие-то повторяющиеся куски разметки можно выносить в отдельные файлы - partials. Они хранятся в одноименной папке и вызываются в нужном месте

### JS

* Есть какие-то плагины из коробки, смотри внимательно
* Есть jQuery, GSAP, Swiper и пр.
* Основной файл - main.js, находится в папке js
* Есть файл src\assets\backend\backend.js, в нем прописываются, например, обработчики сабмита формы (для бекендера на PHP)
* Для пользовательских функций создал отдельную папку src\js\custom
* Объекты можно засунуть в объект window, чтобы получить к ним доступ из файла backend.js

### CSS

* SCSS
* Легко самому разобраться в структуре
* Все файлы стилей импортятся в styles.scss вручную

### Изображения и иконки

* Изображения перед заливкой на гитхаб лучше сразу оптимизировать и переводить в формат webp ([Squoosh](https://squoosh.app/))
* Иконки лучше оптимизировать через сервис [SVG.OMG](https://jakearchibald.github.io/svgomg/)
* Все svg, помещенные в папку src\img\icons сборщик автоматически собирает в инлайновый спрайт, который доступен на любой странице.

## Советы для вёрстки под CMS на PHP

### 1. Контейнер для пользовательского текста

Задать стили контейнеру для его дочерних элементов:

- Заголовки `h1, h2, h3, h4, h5, h6`
- Абзацы `p`
- Списки `ul, ol, li` , и лучше для тега `ol` сохранить вид нумерованного списка. Можно задать свои стили для нумерации через [CSS-counter](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_Counter_Styles/Using_CSS_counters).
- Изображения, иконки `max-width: 100%; height: auto;`
- Ссылки `a`
- Жирное выделение `b`
- Таблицы по желанию

Вообще есть идея: любым текстовым тегам (`<p>`, `<h3>`, `<a>`, `<ul>, <ol>, <li>` - если внутри текст, `<span>` и т.д.) и иконкам `<svg>` и изображениям `<img>` не задавать классы. Всегда наследоваться от родительского контейнера.

Любой текстовый контент лучше оборачивать в div. Так как может получиться ситуация, когда клиент засунет параграф внутрь существующего параграфа - текстового контейнера.

### 2. Учесть отсутствие картинки у карточки или предусмотреть дефолтную картинку - заглушку

### 3. Изображения лучше помещать в обёртку, используя CSS-trick с padding-bottom и абсолютным позиционированием.

### 4. Сложные grid-сетки в идеале автоматизировать. Элементы должны вставать на свои ячейки без дополнительных mod-классов.

[Ключевое слово span](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_Grid_Layout/Line-based_Placement_with_CSS_Grid#%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B2%D0%BE%D0%B3%D0%BE_%D1%81%D0%BB%D0%BE%D0%B2%D0%B0_span)

### 5. Учесть отсутствие необязательных атрибутов карточки (теги, подписи и т.д.). Их отсутствие не должно ломать верстку. Например, если не показывать подзаголовок, то у заголовка не должен оставаться `margin-bottom`.

### 6. Уведомление об успешной отправке формы как минимум. В идеале создать классы для блокировки кнопки после клика (чтобы случайно не отправить 2 формы подряд). UX!

Можно еще [reCAPTCHA](https://www.google.com/recaptcha/about/) прифигачить на сабмит

### 7. Добавлять и заполнять атрибуты. `href`, `alt`, `title`, `download`, `target`, `rel` и т.д.

### 8. JS — сделать автоматическую инициализацию различных слайдеров, выпадающих меню, селектов и т.п. Чтобы бекендер мог, например, добавить еще один селект в форму.

### 9. Модалки. Модалки в идеале должны инициализироваться автоматически. Например, открываться при клике на ссылку с id модалки. [Вот готовое решение](https://addmorescripts.github.io/hystModal/index_ru.html).

До сих пор не придумал нормального решения для открытия модалки на успешную / неуспешную отправку формы. Один из вариантов: дать бекендеру возможность самому открывать модалку. Это можно сделать, поместив объект модалки внутрь window.

Ещё вариант: пусть бекендер пишет обработчик (имя функции заранее известно, например, `feedbackFormHandler`) на success формы прямо внутри тега `<script>`. Эту функцию подхватывает фронт и выполняет. Если функция не задана, то ничего не происходит. Можно еще в эту функцию передать значения всех инпутов, бекендеру иногда они пригождаются.

### 10. Пагинация и кнопка “Показать еще” верстаются ссылками `<a>`

### 11. Фильтр списка элементов верстается через форму и селекты `<form>` + `<select>`

### 12. Вставки контента внутри текстового контейнера (п. 1) делать через свойство float. Самое главное отделить наборный текст из админки от остального контента в контейнере.