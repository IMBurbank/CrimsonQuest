"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
  *		@desc ActivityLog subcomponent renders each individual log row.
	*		@param {object} props - Component props.
	*		@param {string} props.key - React render property.
	*		@param {string} props.type - Log row activity type.
	*		@param {string} props.message - Displayed row message.
	*		@returns ActivityLog row.
  */

var ActivityLogRow = function (_React$Component) {
  _inherits(ActivityLogRow, _React$Component);

  function ActivityLogRow() {
    _classCallCheck(this, ActivityLogRow);

    return _possibleConstructorReturn(this, (ActivityLogRow.__proto__ || Object.getPrototypeOf(ActivityLogRow)).apply(this, arguments));
  }

  _createClass(ActivityLogRow, [{
    key: "render",
    value: function render() {

      return React.createElement(
        "p",
        { className: "log " + this.props.type },
        this.props.message
      );
    }
  }]);

  return ActivityLogRow;
}(React.Component);