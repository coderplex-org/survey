import React, {Component} from 'react';
import Header from './Header';
import {browserHistory} from 'react-router';

export default class Finish extends Component  {
  componentWillMount() {
    const localStorage = window.localStorage;
    this.responses = JSON.parse(localStorage.getItem('responses'));
    if (!JSON.parse(localStorage.getItem("done"))) {
      browserHistory.push('/questions');
    }
  }
  render() {
    return (
      <div id="finish">
        <Header />
        <main className="form">
          <section className="form__card">
            <h2 className="form__cardQuestion animated zoomIn text-center">
              Thankyou For Your Time
            </h2>
            <h3 className="text-center">
              Results will posted on our facebook page
            </h3>
            <div className="form__submitWrapper">
              <a href="https://www.facebook.com/groups/free.code.camp.hyderabad/" className="form__submit form__submit--facebook">
                Follow Us On Facebook
              </a>
            </div>
          </section>
        </main>
      </div>
    )
  }
}
