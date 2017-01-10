import React from 'react';
import Header from './Header';
import {Link} from 'react-router';

const Home = () => (
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
      </section>
    </main>
  </div>
)

export default Home;
