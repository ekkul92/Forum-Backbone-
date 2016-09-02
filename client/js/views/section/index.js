import $ from 'jquery';
import Backbone from 'backbone';
import tmpl from  './section.ejs';
import SectionsCollection from '../../collections/sections';
import SectionsView from '../sections/index';
import tmpl_modal from './modal.ejs';
import _ from 'underscore';
import moment from 'moment';
import striptags from 'striptags';

let sectionList = Backbone.View.extend({

  events: {
    'click td:first-child': 'navigation',
    'click .add_section': 'addSection'
  },

  template: tmpl,

  initialize: function () {

    this.$el.html(this.template());
    this.coll = new SectionsCollection();

    this.listenTo(this.coll, 'sync', this.render);
    this.listenTo(this.coll, 'create', this.render);

    this.coll.fetch();
  },

  render: function () {
    $('tbody').html('');
    const tbody = this.$('tbody');
    _.each(this.coll.models, function (model) {

      const modelView = new SectionsView({
        model: model
      });

      modelView.render();
      tbody.append(modelView.$el);
    }, this);

    if (sessionStorage.getItem('moderator')){
      $('.delete_section').show();
    }
  },

  navigation: function (e) {
    const section_name = $(e.target).text();
    sessionStorage.setItem('section', section_name);

     Backbone.history.navigate('themes',  {trigger: true});
  },

  addSection: function () {
    let current =  moment().format('YYYY MM DD');
    var html = tmpl_modal();
    var t = $('.modal_section');
    t.html(html);
    t.fadeIn(200);
    $('#overlay').fadeIn(200).click(() => {
      $('#overlay').fadeOut(200);
      $('.modal_section').fadeOut(200);
    });

    $('.create_section').click(() => {
      let section_name = $('.modal_section > input').val();
      section_name = striptags( section_name);
      section_name = $.trim(section_name);

      if (section_name === '') {
        alert('Введите название раздела!');
        return;
      }

      this.coll.create({name: section_name, date: current});

      $('.modal_section').fadeOut(200);
      $('#overlay').fadeOut(200);
    });
  }
});

export default sectionList;
