import React from 'react';

export const _addAccessibility = (children, slidesToShow, currentSlide) => {
  let needsTabIndex;
  if (slidesToShow > 1) {
    return React.Children.map(children, (child, index) => {
      needsTabIndex =
        index >= currentSlide && index < slidesToShow + currentSlide;
      const ariaProps = needsTabIndex
        ? { 'aria-hidden': 'false', tabIndex: 0 }
        : { 'aria-hidden': 'true' };
      return React.cloneElement(child, {
        ...child.props,
        ...ariaProps
      });
    });
  } else {
    return React.Children.map(children, (child, index) => {
      needsTabIndex = index !== currentSlide;
      const ariaProps = needsTabIndex
        ? { 'aria-hidden': 'true' }
        : { 'aria-hidden': 'false', tabIndex: 0 };
      return React.cloneElement(child, {
        ...child.props,
        ...ariaProps
      });
    });
  }
};
