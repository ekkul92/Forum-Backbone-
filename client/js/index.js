import './../css/index.css';
import 'quill/dist/quill.snow.css';
import $ from 'jquery';
import IndexRouter from './routers/index';
import  ForumRouter from './routers/navigate';
import ModeratorView from './views/moderator/index';

new ModeratorView({el: $('.for_moderator')});

const router = new IndexRouter();
const nav = new ForumRouter();
Backbone.history.start({pushState: true});
