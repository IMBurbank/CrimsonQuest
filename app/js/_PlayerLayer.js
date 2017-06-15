'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//props: stageSize, tileSize, hero, heroFacing, gameLevel, bgArr, playerArr, updateGameClassState,
//floorCoords, bgLevelProcessed, playerPalettes
var PlayerLayer = function (_React$Component) {
  _inherits(PlayerLayer, _React$Component);

  function PlayerLayer(props) {
    _classCallCheck(this, PlayerLayer);

    var _this = _possibleConstructorReturn(this, (PlayerLayer.__proto__ || Object.getPrototypeOf(PlayerLayer)).call(this, props));

    _this.getPlayerImages = _this.getPlayerImages.bind(_this);
    _this.setPalettes = _this.setPalettes.bind(_this);
    _this.setHeroIcon = _this.setHeroIcon.bind(_this);
    _this.pickPlayerStart = _this.pickPlayerStart.bind(_this);
    _this.drawPlayer = _this.drawPlayer.bind(_this);

    _this.drawingStart = false;
    _this.startHeroIcon = false;

    _this.state = {
      srcTileSize: 16,
      mageImg: null,
      rogueImg: null,
      paladinImg: null,
      warriorImg: null,
      images: {}
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

      var images = {},
          i = 0;

      var handleLoad = function handleImageLoad() {
        i++;
        if (i === 4) {
          images = { mageImg: mageImg, rogueImg: rogueImg, paladinImg: paladinImg, warriorImg: warriorImg };
          that.setState(images, that.setPalettes(images));
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
    key: 'setPalettes',
    value: function setPalettes(images) {
      var srcTS = this.state.srcTileSize,
          gmTS = this.props.tileSize,
          scale = gmTS / srcTS,
          w = 4 * gmTS,
          h = 4 * gmTS;

      var playerPalettes = {},
          canvas = null,
          ctx = null,
          img = null;

      for (img in images) {
        canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;

        ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(images[img], 0, 0, w / scale, h / scale, 0, 0, w, h);

        playerPalettes[img] = canvas;
      }

      this.props.updateGameClassState({ playerPalettes: playerPalettes });
    }
  }, {
    key: 'setHeroIcon',
    value: function setHeroIcon() {
      var playerPalettes = this.props.playerPalettes,
          heroImageKey = this.props.hero.toLowerCase() + 'Img',
          w = this.props.tileSize,
          h = w;


      var heroIcon = document.createElement('canvas'),
          hCtx = null;

      heroIcon.width = w;
      heroIcon.height = h;
      hCtx = heroIcon.getContext('2d');
      hCtx.imageSmoothingEnabled = false;
      hCtx.drawImage(playerPalettes[heroImageKey], 0, 0, w, h, 0, 0, w, h);
      this.props.updateGameClassState({ heroIcon: heroIcon });
    }
  }, {
    key: 'pickPlayerStart',
    value: function pickPlayerStart(nextProps) {
      var floorCoords = nextProps.floorCoords;


      var index = randInt(0, nextProps.floorCoords.length - 1),
          playerArr = floorCoords[index],
          filterDistance = 8;

      floorCoords = floorCoords.filter(function (a) {
        return Math.abs(a[0] - playerArr[0]) + Math.abs(a[1] - playerArr[1]) > filterDistance;
      });

      this.props.updateGameClassState({ playerArr: playerArr, floorCoords: floorCoords });
    }
  }, {
    key: 'drawPlayer',
    value: function drawPlayer(timestamp) {
      if (!timeRef) timeRef = timestamp;

      var img = this.props.playerPalettes[this.props.hero.toLowerCase() + 'Img'],
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
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.bgLevelProcessed !== nextProps.bgLevelProcessed) {
        console.log('New Player Start');
        this.pickPlayerStart(nextProps);
      }
      /*?
      if (!this.state.playerPalettes && nextProps.hero && this.state.mageImg) {
        this.setPalettes(nextProps);
      }
      */
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      //REDO
      if (!this.drawingStart && this.props.hero && this.props.playerPalettes[this.props.hero.toLowerCase() + 'Img']) {

        this.drawingStart = true;
        window.requestAnimationFrame(this.drawPlayer);
      }
      if (!this.props.heroIcon && !this.startHeroIcon && this.props.hero && this.props.playerPalettes[this.props.hero.toLowerCase() + 'Img']) {

        this.startHeroIcon = true;
        this.setHeroIcon();
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