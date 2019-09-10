"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MIN_ZOOM_SCALE = 0;
var MAX_ZOOM_SCALE = 1;

var ScrollTransition =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ScrollTransition, _React$Component);

  function ScrollTransition(props) {
    var _this;

    _classCallCheck(this, ScrollTransition);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ScrollTransition).call(this, props));
    _this.getListStyles = _this.getListStyles.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ScrollTransition, [{
    key: "getSlideDirection",
    value: function getSlideDirection(start, end, isWrapping) {
      var direction = 0;
      if (start === end) return direction;

      if (isWrapping) {
        direction = start < end ? -1 : 1;
      } else {
        direction = start < end ? 1 : -1;
      }

      return direction;
    }
    /* eslint-disable complexity */

  }, {
    key: "getSlideTargetPosition",
    value: function getSlideTargetPosition(index, positionValue) {
      var targetPosition = (this.props.slideWidth + this.props.cellSpacing) * index;
      var startSlide = Math.min(Math.abs(Math.floor(positionValue / this.props.slideWidth)), this.props.slideCount - 1);
      var offset = 0;

      if (this.props.animation === 'zoom' && (this.props.currentSlide === index + 1 || this.props.currentSlide === 0 && index === this.props.children.length - 1)) {
        offset = this.props.slideOffset;
      } else if (this.props.animation === 'zoom' && (this.props.currentSlide === index - 1 || this.props.currentSlide === this.props.children.length - 1 && index === 0)) {
        offset = -this.props.slideOffset;
      }

      if (this.props.wrapAround && index !== startSlide) {
        var direction = this.getSlideDirection(startSlide, this.props.currentSlide, this.props.isWrappingAround);
        var slidesBefore = Math.floor((this.props.slideCount - 1) / 2);
        var slidesAfter = this.props.slideCount - slidesBefore - 1;

        if (direction < 0) {
          var temp = slidesBefore;
          slidesBefore = slidesAfter;
          slidesAfter = temp;
        }

        var distanceFromStart = Math.abs(startSlide - index);

        if (index < startSlide) {
          if (distanceFromStart > slidesBefore) {
            targetPosition = (this.props.slideWidth + this.props.cellSpacing) * (this.props.slideCount + index);
          }
        } else if (distanceFromStart > slidesAfter) {
          targetPosition = (this.props.slideWidth + this.props.cellSpacing) * (this.props.slideCount - index) * -1;
        }
      }

      return targetPosition + offset;
    }
    /* eslint-enable complexity */

  }, {
    key: "formatChildren",
    value: function formatChildren(children) {
      var _this2 = this;

      var _this$props = this.props,
          top = _this$props.top,
          left = _this$props.left,
          currentSlide = _this$props.currentSlide,
          slidesToShow = _this$props.slidesToShow;
      var positionValue = this.props.vertical ? top : left;
      return _react["default"].Children.map(children, function (child, index) {
        var visible = index >= currentSlide && index < currentSlide + slidesToShow;
        return _react["default"].createElement("li", {
          className: "slider-slide".concat(visible ? ' slide-visible' : ''),
          style: _this2.getSlideStyles(index, positionValue),
          key: index
        }, child);
      });
    }
  }, {
    key: "getSlideStyles",
    value: function getSlideStyles(index, positionValue) {
      var targetPosition = this.getSlideTargetPosition(index, positionValue);
      var transformScale = this.props.animation === 'zoom' && this.props.currentSlide !== index ? Math.max(Math.min(this.props.zoomScale, MAX_ZOOM_SCALE), MIN_ZOOM_SCALE) : 1.0;
      return {
        boxSizing: 'border-box',
        display: this.props.vertical ? 'block' : 'inline-block',
        height: 'auto',
        left: this.props.vertical ? 0 : targetPosition,
        listStyleType: 'none',
        marginBottom: this.props.vertical ? this.props.cellSpacing / 2 : 'auto',
        marginLeft: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
        marginRight: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
        marginTop: this.props.vertical ? this.props.cellSpacing / 2 : 'auto',
        MozBoxSizing: 'border-box',
        position: 'absolute',
        top: this.props.vertical ? targetPosition : 0,
        transform: "scale(".concat(transformScale, ")"),
        transition: 'transform .4s linear',
        verticalAlign: 'top',
        width: this.props.vertical ? '100%' : this.props.slideWidth
      };
    }
  }, {
    key: "getListStyles",
    value: function getListStyles(styles) {
      var deltaX = styles.deltaX,
          deltaY = styles.deltaY;

      var listWidth = this.props.slideWidth * _react["default"].Children.count(this.props.children);

      var spacingOffset = this.props.cellSpacing * _react["default"].Children.count(this.props.children);

      var transform = "translate3d(".concat(deltaX, "px, ").concat(deltaY, "px, 0)");
      return {
        transform: transform,
        WebkitTransform: transform,
        msTransform: "translate(".concat(deltaX, "px, ").concat(deltaY, "px)"),
        position: 'relative',
        display: 'block',
        margin: this.props.vertical ? "".concat(this.props.cellSpacing / 2 * -1, "px 0px") : "0px ".concat(this.props.cellSpacing / 2 * -1, "px"),
        padding: 0,
        height: this.props.vertical ? listWidth + spacingOffset : this.props.slideHeight,
        width: this.props.vertical ? 'auto' : listWidth + spacingOffset,
        cursor: this.props.dragging === true ? 'pointer' : 'inherit',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        touchAction: "pinch-zoom ".concat(this.props.vertical ? 'pan-x' : 'pan-y')
      };
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.formatChildren(this.props.children);
      var deltaX = this.props.deltaX;
      var deltaY = this.props.deltaY;
      return _react["default"].createElement("ul", {
        className: "slider-list",
        style: this.getListStyles({
          deltaX: deltaX,
          deltaY: deltaY
        })
      }, children);
    }
  }]);

  return ScrollTransition;
}(_react["default"].Component);

exports["default"] = ScrollTransition;
ScrollTransition.propTypes = {
  animation: _propTypes["default"].oneOf(['zoom']),
  cellSpacing: _propTypes["default"].number,
  currentSlide: _propTypes["default"].number,
  deltaX: _propTypes["default"].number,
  deltaY: _propTypes["default"].number,
  dragging: _propTypes["default"].bool,
  isWrappingAround: _propTypes["default"].bool,
  left: _propTypes["default"].number,
  slideCount: _propTypes["default"].number,
  slideHeight: _propTypes["default"].number,
  slideOffset: _propTypes["default"].number,
  slideWidth: _propTypes["default"].number,
  top: _propTypes["default"].number,
  vertical: _propTypes["default"].bool,
  wrapAround: _propTypes["default"].bool,
  zoomScale: _propTypes["default"].number
};
ScrollTransition.defaultProps = {
  cellSpacing: 0,
  currentSlide: 0,
  deltaX: 0,
  deltaY: 0,
  dragging: false,
  isWrappingAround: false,
  left: 0,
  slideCount: 0,
  slideHeight: 0,
  slideWidth: 0,
  top: 0,
  vertical: false,
  wrapAround: false,
  zoomScale: 0.85
};