"use strict";

var React = require('react');
var mui = require('material-ui');
var MuiThemeMixin = require('../../mixins/MuiThemeMixin');
var DialogMixin = require('../../mixins/DialogMixin');

module.exports = React.createClass({
  displayName: 'CreateTodoDialog',

  mixins: [MuiThemeMixin, DialogMixin],

  getInitialState: function(){
    return {
      title: ""
    }
  },

  focus: function(){
    setTimeout(function() {
      if (this.isMounted()) {
        this.refs.textfield.focus();
      }
    }.bind(this), 300);
  },

  onSubmit: function(e){
    this.props.onSubmit({
      title: this.state.title
    });
    this.dismiss();
  },

  onCancel: function(e){
    this.dismiss();
  },

  onKeyDown: function(e){
    if(e.keyCode === 13) {
      this.onSubmit();
    }
  },

  onChangeTitle: function(e){
    var title = e.target.value.trim();
    this.setState({
      title: title
    });
  },

  render: function () {
    var dialogActions = [
      { text: 'CANCEL', onClick: this.onCancel  },
      { text: 'SUBMIT', onClick: this.onSubmit }
    ];

    var error = this.state.title ? null : "Required";

    return (
      <mui.Dialog
        ref="dialog"
        title="Create Todo"
        open={this.state.isOpen}
        actions={dialogActions}
        contentClassName="compact-dialog" >
        <p>What do you need to do?</p>

        <mui.TextField
          ref='textfield'
          errorText={"This field is required"}
          floatingLabelText="Todo Title"
          onChange={this.onChangeTitle}
          onKeyDown={this.onKeyDown} />

      </mui.Dialog>
    );
  }

});
