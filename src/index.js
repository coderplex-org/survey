import WebFont from 'webfontloader';
import ReactDOM from 'react-dom';
import routes from './components/routes';
import 'font-awesome/css/font-awesome.min.css';
import './styles/index.css';

WebFont.load({
  google: {
    families: [
      'Dosis:400,500,600,700',
      'Josefin Sans:400,600,700'
    ]
  }
});

ReactDOM.render(
  routes,
  document.getElementById('root')
);
