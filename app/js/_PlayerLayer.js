'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: stageSize, tileSize, hero, heroFacing, gameLevel, bgArr, playerArr, updateGameClassState,
//floorCoords, bgLevelProcessed
var PlayerLayer = function (_React$Component) {
  _inherits(PlayerLayer, _React$Component);

  function PlayerLayer(props) {
    _classCallCheck(this, PlayerLayer);

    var _this = _possibleConstructorReturn(this, (PlayerLayer.__proto__ || Object.getPrototypeOf(PlayerLayer)).call(this, props));

    _this.getPlayerImages = _this.getPlayerImages.bind(_this);
    _this.initPaletteMap = _this.initPaletteMap.bind(_this);
    _this.setPalette = _this.setPalette.bind(_this);
    _this.setHeroIcon = _this.setHeroIcon.bind(_this);
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
          srcTS = this.state.srcTileSize,
          gmTS = nextProps.tileSize,
          scale = gmTS / srcTS,
          w = 4 * gmTS,
          h = 4 * gmTS;

      var canvas = document.createElement('canvas'),
          ctx = null;

      canvas.width = w;
      canvas.height = h;
      ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(srcImg, 0, 0, w / scale, h / scale, 0, 0, w, h);

      this.setState({ playerPalette: { canvas: canvas, ctx: ctx } }, this.setHeroIcon(canvas));
    }
  }, {
    key: 'setHeroIcon',
    value: function setHeroIcon(canvas) {
      var w = this.props.tileSize,
          h = w;

      var heroIcon = document.createElement('canvas'),
          hCtx = null;

      heroIcon.width = w;
      heroIcon.height = h;
      hCtx = heroIcon.getContext('2d');
      hCtx.imageSmoothingEnabled = false;
      hCtx.drawImage(canvas, 0, 0, w, h, 0, 0, w, h);
      this.props.updateGameClassState({ heroIcon: heroIcon });
    }
  }, {
    key: 'pickPlayerStart',
    value: function pickPlayerStart(nextProps) {
      var playerArr = nextProps.floorCoords[randInt(0, nextProps.floorCoords.length - 1)];
      nextProps.updateGameClassState({ playerArr: playerArr });
    }
  }, {
    key: 'drawPlayer',
    value: function drawPlayer(timestamp) {
      if (!timeRef) timeRef = timestamp;

      var img = this.state.playerPalette.canvas,
          imgD = this.props.tileSize,
          dir = this.props.heroFacing,
          dx = (this.props.stageSize - imgD) / 2,
          dy = dx,
          srcY = dir === 'down' ? 0 : dir === 'left' ? 1 : dir === 'right' ? 2 : 3,
          frameStep = Math.floor((timestamp - timeRef) % 1000 * .06 / 15);

      var canvas = document.getElementById('player-layer'),
          ctx = canvas.getContext('2d');

      ctx.clearRect(dx, dy, imgD, imgD);
      ctx.drawImage(img, frameStep * imgD, srcY * imgD, imgD, imgD, dx, dy, imgD, imgD);
      window.requestAnimationFrame(this.drawPlayer);
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
      if (this.props.bgLevelProcessed !== nextProps.bgLevelProcessed) {
        console.log('New Player Start');
        this.pickPlayerStart(nextProps);
      }
      /*
      if (!this.state.playerPalette && nextProps.hero && this.state.mageImg) {
        this.setPalette(nextProps);
      }
      */
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.playerPalette !== this.state.playerPalette) {
        window.requestAnimationFrame(this.drawPlayer);
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