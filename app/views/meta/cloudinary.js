var $ = require('jquery-browserify');
var Backbone = require('backbone');
var _ = require('underscore');
var templates = require('../../../dist/templates');

module.exports = Backbone.View.extend({

  template: templates.meta.cloudinary,
  type: 'cloudinary',


  initialize: function(options) {
    this.name = options.data.name;
  },

  render: function () {
    var data = this.options.data;

    var cloudinary = {
      name: data.name,
      label: data.field.label,
      help: data.field.help,
      api_key: data.field.api_key,
      cloud_name: data.field.cloud_name,
      upload_preset: data.field.upload_preset,
      type: data.type
    };

    this.setElement($(_.template(this.template, cloudinary, {
      variable: 'meta'
    })));
    this.$form = this.$el.find('input[type=hidden]');
    return this.$el;
  },

  getValue: function() {
    if(this.$form.val()) {
      // if value is filled out
      //TODO get file extension
      var cloud_name = this.$form.prev().data('cloud_name');
      var cid = this.$form.val();
      $('#'+this.$form.attr('id')+'_preview').append('<img src="https://res.cloudinary.com/'+cloud_name+'/image/upload/c_limit,h_100,w_100/'+cid+'.jpg">');
    }
    return this.options.data.type === 'number' ?
      Number(this.$form.val()) : this.$form.val();
  },

  setValue: function(value) {
    this.$form.val(value);
  }

});
