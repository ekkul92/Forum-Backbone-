import {View} from 'backbone';
import tmpl from './moderatorButtons.ejs';
import tmpl_modal from './moderator_window.ejs';
import $ from 'jquery';


export default View.extend({

  events: {
    'click #exit_moderator' : 'exitModerator'
  },

  initialize: function() {
    let html = tmpl();
    $('.for_moderator').html(html);

    $('#enter_moderator').click(() => {
      let html = tmpl_modal();
      $('.window_moderator').html(html).fadeIn('normal');

      $("#overlay").show().click(() => {
        $(".window_moderator").hide();
        $("#overlay").hide();
      });
      $('.enter').click(this.enter);
    });

    this.showButt();
  },

  enter: function() {
    let password = $('.password').val();
    password = $.trim(password);

    if (password === '1') {
      sessionStorage.setItem('moderator', '1');
      $('.delete').show();
      $('.delete_theme').show();
      $('.delete_section').show();


      $('#overlay').hide();
      $('.window_moderator').hide();
      $('#exit_moderator').show();
      $('#enter_moderator').hide();
    } else {
      alert('Пароль не правильный');
    }
  },

  exitModerator: function(){
    sessionStorage.removeItem('moderator');
    $('#enter_moderator').fadeIn(200);
    $('#exit_moderator').hide();
    $('.delete_theme').hide();
    $('.delete_section').hide();
    $('.delete').hide();
  },

  showButt: function(){
    if (sessionStorage.getItem('moderator')) {
      $('#enter_moderator').hide();
      $('#exit_moderator').show();
    }
  }

});
