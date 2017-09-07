import React from 'react';
import {
  View,
} from 'react-native';

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'SelectWidget',
      multiple: false,
      onSelect: () => {
      },
      onClose: () => {
      },
      keywords: ''
    };
  },

  unSelectAll() {
    React.Children.forEach(this._childrenWithProps, (child, idx) => {
      this.refs && this.refs[child.ref] && this.refs[child.ref]._onChange(false);
    });
  },

  render() {
    const {keywords} = this.props;
    this._childrenWithProps = [];
    React.Children.forEach(this.props.children, (child, idx) => {
      var val = child.props.value || child.props.title;
      var title = child.props.title || '';
      if (title.toLowerCase().indexOf(keywords.toLowerCase()) > -1) {
        let elem = React.cloneElement(child, {
          formStyles: this.props.formStyles,
          openModal: this.props.openModal,
          formName: this.props.formName,
          navigator: this.props.navigator,
          onFocus: this.props.onFocus,
          onBlur: this.props.onBlur,
          onValidation: this.props.onValidation,
          onValueChange: this.props.onValueChange,

          name: this.props.name + '{' + val + '}',
          ref: this.props.name + '{' + val + '}',
          value: val,
          unSelectAll: this.unSelectAll,

          multiple: this.props.multiple,
          onClose: this.props.onClose, // got from ModalWidget
          onSelect: this.props.onSelect, // got from DayPickerWidget
        });

        this._childrenWithProps.push(elem);
      }
    });

    return (
      <View>
        {this._childrenWithProps}
      </View>
    );
  },
});
