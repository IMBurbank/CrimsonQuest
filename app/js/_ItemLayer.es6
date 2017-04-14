//props: boardSize, stageSize, tileSize, itemPalettes, updateItemPalettes
class ItemLayer extends React.Component {
  constructor(props) {
    super(props);
    this.initItemArr = this.initItemArr.bind(this);
    this.initTempCanvas = this.initTempCanvas.bind(this);
    this.getItemImages = this.getItemImages.bind(this);
    this.setPalettes = this.setPalettes.bind(this);
    this.setPaletteArrMap = this.setPaletteArrMap.bind(this);
    this.setItemArr = this.setItemArr.bind(this);
    this.drawItems = this.drawItems.bind(this);

    this.state = ({
      srcTileSize: 16,
      itemArr: [],
      images: {},
      paletteArrMap: {},
      tempCanv: null,
    });
  }

  initItemArr() {
    const len = this.props.boardSize,
      itemArr = initZeroArray(len);

    this.setState({ itemArr });
  }

  getItemImages() {
    const path = 'img/items/',
      type = '.png',
      that = this;

    let amuletImg,
      armorImg,
      bookImg,
      bootImg,
      gloveImg,
      hatImg,
      longWepImg,
      medWepImg,
      moneyImg,
      potionImg,
      ringImg,
      shieldImg,
      shortWepImg,
      wandImg,
      images = {
        amuletImg,
        armorImg,
        bookImg,
        bootImg,
        gloveImg,
        hatImg,
        longWepImg,
        medWepImg,
        moneyImg,
        potionImg,
        ringImg,
        shieldImg,
        shortWepImg,
        wandImg
      },
      el,
      iLen = 0,
      i = 0;

    const handleItemLoad = function handleItemImageLoad() {
      i++;
      if (i === iLen) {
        that.setState({ images });
        that.setPalettes(images);
      }
    }

    for (el in images) {
      images[el] = new Image();
      images[el].src = path + el[0].toUpperCase() + el.slice(1, -3) + type;
      el.addEventListener('load', handleItemLoad);
      iLen++;
    }
  }

  initTempCanvas() {
    const size = this.props.stageSize,
      smoothRender = false,
      tempCanv = initMemCanvas(size, size, smoothRender);

    this.setState({ tempCanv });
  }

  setPalettes(images) {
    const ts = this.props.tileSize,
      srcTs = this.state.srcTs,
      scale = ts / srcTs,
      renderSmoothing = false;

    let itemPalettes = {},
      p = null,
      el = null,
      ctx = null,
      img = null,
      name = '',
      w = 0,
      h = 0;

    for (el in images) {
      img = images[el];
      name = el.slice(0, -3) + 'Palette';
      w = img.width;
      h = img.height;
      p = itemPalettes;
      p[name] = document.createElement('canvas');
      p[name].width = scale * w;
      p[name].height = scale * h;
      ctx = p[name].getContext('2d');
      ctx.imageSmoothingEnabled = renderSmoothing;
      ctx.drawImage(img, 0, 0, w, h, 0, 0, p[name].width, p[name].height);
    }

    this.props.updateItemPalettes(itemPalettes);
  }

  setPaletteArrMap() {
    const items = [
      itemAmulets,
      itemArmors,
      itemFeet,
      itemGloves,
      itemHelmets,
      itemRings,
      itemShields,
      itemWeapons,
      itemConsumables
    ];

    let paletteArrMap = {},
      i = 101,
      name = '',
      width = 0,
      height = 0,
      palette = null,
      coord = [0,0],
      props = null;

    items.forEach( el => {
      for (props in el) {
        name = el[props].name;
        palette = el[props].palette;
        [coord[0], coord[1], width, height] = el[props].iconLoc;
        paletteArrMap[`${i}`] = {name, palette, coord, width, height};
        i++;
      }
    });

    this.setState({ paletteArrMap });
  }

  setItemArr() {

  }

  componentWillMount() {
    this.getItemImages();
    this.initItemArr();
    this.initTempCanvas();
    this.setPaletteArrMap();
  }

  render() {
    return (
      <a></a>
    );
  }
}
