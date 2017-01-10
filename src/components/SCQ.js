import React from 'react';

export default () => {
  return (
    <section className="form__card">
      <h2 className="form__cardQuestion">
        Which of the following resources have you used for learning HTML and CSS?
      </h2>
      <ul className="form__cardOptions">
        <li className="form__cardOptionItem">
          <input className="form__cardOptionInput" id="codeacademy" type="radio"/>
          <label className="form__cardOptionLabel" htmlFor="codeacademy">
            Codeacademy
          </label>
        </li>
      </ul>
      <div className="form__submitWrapper">
        <button className="form__submit">
          Next
        </button>
      </div>
    </section>
  )
}
