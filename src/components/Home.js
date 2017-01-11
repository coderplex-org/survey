import React, { Component } from 'react';
import Header from './Header';
import {Link} from 'react-router';
import AlertContainer from 'react-alert';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.alertOptions = {
      offset: 14,
      position: 'top right',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
  }
  componentDidMount() {
    const localStorage = window.localStorage;
    if(localStorage.getItem('done')) {
      this.showAlert('You have already complted this survey');
    }
    if(localStorage.getItem('selectedResources')) {
      this.context.router.push('/question/Which of the following resources have you used for learning HTML and CSS');
    }
  }
  showAlert(message){
    this.msg.show(message, {
      time: 2000,
      type: 'error',
      icon: <i className="fa fa-exclamation-triangle fa-3x"></i>
    });
  }
  render() {
    return(
      <div id="home">
        <Header />
        <main className="form">
          <section className="form__card">
            <p className="form__cardDescription">
              The objective of this survey is to collect user feedback for popular resources that helped you learn HTML and CSS. It's targeted towards people who are currently learning or have already learnt HTML and CSS on their own.
            </p>
            <div className="form__submitWrapper">
              <Link to="/question/Which of the following resources have you used for learning HTML and CSS" className="form__submit">
                Start
              </Link>
            </div>
            <AlertContainer ref={(a) => this.msg = a} {...this.alertOptions} />
          </section>
        </main>
      </div>
    )
  }
}

Home.contextTypes = {
    router: React.PropTypes.object.isRequired
};
