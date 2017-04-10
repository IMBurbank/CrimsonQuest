'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: stageSize, tileSize, hero, gameLevel, bgArr, playerArr, updatePlayerArr, floorCoords
var PlayerLayer = function (_React$Component) {
  _inherits(PlayerLayer, _React$Component);

  function PlayerLayer(props) {
    _classCallCheck(this, PlayerLayer);

    var _this = _possibleConstructorReturn(this, (PlayerLayer.__proto__ || Object.getPrototypeOf(PlayerLayer)).call(this, props));

    _this.getPlayerImages = _this.getPlayerImages.bind(_this);
    _this.initPaletteMap = _this.initPaletteMap.bind(_this);
    _this.setPalette = _this.setPalette.bind(_this);
    _this.pickPlayerStart = _this.pickPlayerStart.bind(_this);
    _this.drawPlayer = _this.drawPlayer.bind(_this);

    _this.state = {
      srcTileSize: 16,
      mageImg: null,
      rogueImg: null,
      paladinImg: null,
      warriorImg: null,
      playerPalette: null,
      playerPaletteMap: {}
    };
    return _this;
  }

  _createClass(PlayerLayer, [{
    key: 'getPlayerImages',
    value: function getPlayerImages() {
      var mageImg = new Image(),
          rogueImg = new Image(),
          paladinImg = new Image(),
          warriorImg = new Image(),
          that = this;

      var i = 0;

      var handleLoad = function handleImageLoad() {
        i++;
        if (i === 4) {
          that.setState({ mageImg: mageImg, rogueImg: rogueImg, paladinImg: paladinImg, warriorImg: warriorImg });

          //temporary palette assignment until start screen is created
          that.setPalette(that.props);
        }
      };

      mageImg.src = 'img/heroes/Mage.png';
      rogueImg.src = 'img/heroes/Rogue.png';
      paladinImg.src = 'img/heroes/Paladin.png';
      warriorImg.src = 'img/heroes/Warrior.png';
      mageImg.addEventListener('load', handleLoad);
      rogueImg.addEventListener('load', handleLoad);
      paladinImg.addEventListener('load', handleLoad);
      warriorImg.addEventListener('load', handleLoad);
    }
  }, {
    key: 'initPaletteMap',
    value: function initPaletteMap() {
      var ts = this.props.tileSize,
          w = 4;

      var playerPaletteMap = {},
          j = 0;

      ['down', 'left', 'right', 'up'].forEach(function (el, i) {
        for (j = 0; j < w; j++) {
          playerPaletteMap[el + (j + 1)] = [i * ts, j * ts];
        }
      });

      this.setState({ playerPaletteMap: playerPaletteMap });
    }
  }, {
    key: 'setPalette',
    value: function setPalette(nextProps) {
      var hero = nextProps.hero.toLowerCase(),
          srcImg = this.state[hero + 'Img'],
          srcTileSize = this.state.srcTileSize,
          gmTileSize = nextProps.tileSize,
          scale = gmTileSize / srcTileSize,
          w = 4 * gmTileSize,
          h = 4 * gmTileSize;

      var canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');

      canvas.width = w;
      canvas.height = h;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(srcImg, 0, 0, w / scale, h / scale, 0, 0, w, h);

      this.setState({ playerPalette: { canvas: canvas, ctx: ctx } });
    }
  }, {
    key: 'pickPlayerStart',
    value: function pickPlayerStart(nextProps) {
      var playerArr = nextProps.floorCoords[randInt(0, nextProps.floorCoords.length - 1)];
      nextProps.updatePlayerArr(playerArr);
    }
  }, {
    key: 'drawPlayer',
    value: function drawPlayer(nextProps, nextState) {
      var img = nextState.playerPalette.canvas,
          imgD = nextProps.tileSize,
          stageD = nextProps.stageSize,
          sCoord = [0, 0],
          //temp static
      dx = (stageD - imgD) / 2,
          dy = dx;

      var canvas = document.getElementById('player-layer'),
          ctx = canvas.getContext('2d');

      ctx.drawImage(img, sCoord[0], sCoord[1], imgD, imgD, dx, dy, imgD, imgD);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getPlayerImages();
      this.initPaletteMap();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.bgArr !== nextProps.bgArr) {
        this.pickPlayerStart(nextProps);
      }
      /*
      if (!this.state.playerPalette && nextProps.hero && this.state.mageImg) {
        this.setPalette(nextProps);
      }
      */
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      //stub rule
      if (this.state.playerPalette !== nextState.playerPalette) {
        this.drawPlayer(nextProps, nextState);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var size = this.props.stageSize;
      return React.createElement('canvas', {
        id: 'player-layer',
        className: 'player-layer',
        width: size,
        height: size });
    }
  }]);

  return PlayerLayer;
}(React.Component);