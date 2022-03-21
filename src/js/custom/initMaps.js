import loadApi from "./loadAPI";
import initMapOverlay from "./initMapOverlay";

export default function initMaps() {
  const urlElement = document.querySelector('#mapUrl');
  if (!urlElement) return;

  const url = urlElement.dataset.url;

  const maps = Array.from(document.querySelectorAll('.js-init-map'));
  if (maps) {
    loadApi('yandex', url,() => { ymaps.ready(init); });
  }

  initMapOverlay('.js-init-overlay', 'js-init-overlay-map-container');

  function init() {
    // Это шаблон баллуна
    const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
      `
      <div class="balloon">
        <h3 class="balloon__title">{{properties.address}}</h3>
        <ul class="balloon__list">
          {% for item in properties.time %}
            <li class="balloon__list-item">
              <span class="balloon__list-item-label">{{item}}</span>
            </li>
          {% endfor %}
        </ul>
      </div>
      `
    );

    // Эту фигню вообще трогать не надо
    const MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="popover right">' +
      '<div class="arrow"></div>' +
      '<div class="popover-inner">' +
      '$[[options.contentLayout observeSize minWidth=150 maxWidth=300 maxHeight=450]]' +
      '</div>' +
      '</div>',
      {
        build: function () {
          this.constructor.superclass.build.call(this);
          this._$element = $('.popover', this.getParentElement());
          this.applyElementOffset();
          this._$element.find('.close').on('click', $.proxy(this.onCloseClick, this));
        },
    
        clear: function () {
          this._$element.find('.close').off('click');
          this.constructor.superclass.clear.call(this);
        },
    
        onSublayoutSizeChange: function () {
          MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
          if (!this._isElement(this._$element)) {
            return;
          }
    
          this.applyElementOffset();
          this.events.fire('shapechange');
        },
        applyElementOffset: function () {
          this._$element.css({
            right: -(this._$element[0].offsetWidth),
            top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
          });
        },
    
        onCloseClick: function (e) {
          e.preventDefault();
          this.events.fire('userclose');
        },
    
        getShape: function () {
          if (!this._isElement(this._$element)) {
            return MyBalloonLayout.superclass.getShape.call(this);
          }
    
          const position = this._$element.position();
          return new ymaps.shape.Rectangle(
            new ymaps.geometry.pixel.Rectangle([
              [position.left, position.top],
              [
                position.left + this._$element[0].offsetWidth,
                position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
              ]
            ])
          );
        },
    
        _isElement: function (element) {
          return element && element[0] && element.find('.arrow')[0];
        }
      }
    );

    maps.forEach(mapElement => {
      const map = new ymaps.Map(mapElement, {
        center: [mapElement.dataset.initialLongitude, mapElement.dataset.initialLatitude],
        zoom: mapElement.dataset.initialZoom,
        controls: []
      });
      
      const placemark = addPlace(map, {
        coords: [mapElement.dataset.initialLongitude, mapElement.dataset.initialLatitude],
        image: mapElement.dataset.image
      },{
        address: mapElement.dataset.address,
        time: mapElement.dataset.time.split(';'),
      },{
        balloonLayout: MyBalloonLayout,
        balloonContentLayout: MyBalloonContentLayout
      });

      placemark.balloon.open();

      if (window.matchMedia("(max-width: 640px)").matches) {
        // Сдвинем карту на 50 пикселей влево
        const position = map.getGlobalPixelCenter();
        map.setGlobalPixelCenter([ position[0] + 100, position[1] ]);
      }
    });
  }
}

function addPlace(map, {coords, image}, {address, time}, {balloonLayout, balloonContentLayout}) {
  const placemarkProperties = {
    address,
    time
  };

  const placemarkOptions = {
      iconLayout: 'default#image',
      iconImageHref: image,
      iconImageSize: [50, 50],
      iconImageOffset: [-25, -45],
      balloonLayout,
      balloonContentLayout,
      balloonPanelMaxMapArea: 0,
      hideIconOnBalloonOpen: false,
      balloonOffset: [30, -64]
  };

  const placemark = new ymaps.Placemark(coords, placemarkProperties, placemarkOptions);

  map.geoObjects.add(placemark);

  return placemark;
}