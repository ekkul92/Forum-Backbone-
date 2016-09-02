import $ from 'jquery';
import Backbone from 'backbone';
import tmpl from  './theme.ejs';
import ThemesCollection from '../../collections/themes';
import ThemesView from '../themes/index';
import CommentList from '../comment/index';
import tmpl_modal_newTheme from './modal_newThemeForm.ejs';
import _ from 'underscore';
import moment from 'moment';
import striptags from 'striptags';

let ThemeList = Backbone.View.extend({

  events: {
    'click .add_theme' : 'addTheme',
    'click td:first-child': 'navigation',
    'click .back' : 'back'
  },

  template: tmpl,

  initialize: function () {

    const section =  sessionStorage.getItem('section');
    this.$el.html(this.template({section: section}));
    this.coll = new ThemesCollection(section);

    this.listenTo(this.coll, 'sync', this.render);
    this.listenTo(this.coll, 'create', this.render);

    this.coll.fetch();

  },

  render: function () {

    $('tbody').html('');
    const tbody = this.$('tbody');

    _.each(this.coll.models, function (model) {

      const modelView = new ThemesView({
        model: model
      });

      modelView.render();
      tbody.append(modelView.$el);
    }, this);


    if (sessionStorage.getItem('moderator')){
      $('.delete_theme').show();
    }
  },

  navigation: function(e) {
      const theme_name = $(e.target).text();
      sessionStorage.setItem('theme', theme_name);
      Backbone.history.navigate('comments',  {trigger: true});
  },

  addTheme: function() {
      let current =  moment().format('YYYY MM DD');

      let html = tmpl_modal_newTheme({});
      $('.new_theme').html(html).fadeIn(200);
      $('.random2').text(Math.round(Math.random()*1000));
      $('#overlay').fadeIn(200).click(() => {
        $('#overlay').fadeOut(200);
        $('.new_theme').fadeOut(200);
      });

      $('.button_create').click(() => {
        let theme_name = $("#theme").val();
        theme_name = striptags(theme_name);
        theme_name = $.trim(theme_name);

        const section = sessionStorage.getItem('section');
        const captcha2 = $('.captcha2').val();

        if (theme_name === ''){
          alert('Напишите, пожалуйста, название темы! ');
          return;
        }

        if (captcha2 !== $('.random2').text()){
          alert('Не правильно введено число! Попробуйте ещё раз!');
          return;
        }
        this.coll.create({name: theme_name,  date: current});

        $(".new_theme").fadeOut(200);
        $("#overlay").hide();
    });
  },

  back() {
    Backbone.history.navigate('sections', {trigger: true});
    $('.back').fadeOut(200);
  }

});

export default ThemeList;
