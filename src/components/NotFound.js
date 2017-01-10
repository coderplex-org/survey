import React from 'react';
import Header from './Header';
import {Link} from 'react-router';

const NotFound = () => (
  <div id="notfound">
    <Header />
    <main className="form">
      <section className="form__card">
        <h2 className="form__cardQuestion text-center">
          404
        </h2>
        <h3 className="text-center">
          Sorry, the page does not exist.
        </h3>
        <div className="form__submitWrapper">
          <Link to="/question/Which of the following resources have you used for learning HTML and CSS" className="form__submit">
            Back To Survey
          </Link>
        </div>
      </section>
    </main>
  </div>
)

export default NotFound;
