import React, { Component } from 'react';
import Rating from 'react-rating';
import AlertContainer from 'react-alert';

export default class RQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      rating: {}
    }
    this.alertOptions = {
      offset: 14,
      position: 'top right',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
  }
  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent.bind(this);
  }
  onBackButtonEvent() {
    const localStorage = window.localStorage;
    const currentIndex = JSON.parse(localStorage.getItem('currentIndex')) - 1;
    if(currentIndex < 0) {
      this.showAlert('Cant Go Back');
      return;
    }
    localStorage.setItem('currentIndex', JSON.stringify(currentIndex));
  }
  componentWillMount() {
    const resourceName = this.props.resourceName;
    const responses = JSON.parse(localStorage.getItem('responses'));
    console.log(responses);
    const answer = responses[resourceName];
    const text = answer.desc || '';
    const rating = answer.rating || {};
    this.setState({
      text,
      rating
    });
  }
  componentWillReceiveProps(nextProps) {
    const resourceName = nextProps.resourceName;
    const responses = JSON.parse(localStorage.getItem('responses'));
    console.log(responses);
    const answer = responses[resourceName];
    const text = answer.desc || '';
    const rating = answer.rating || {};
    this.setState({
      text,
      rating
    });
  }
  handleRating(option, rate, e) {
    const rating = this.state.rating;
    rating[option] = rate;
    this.setState({
      rating
    });
  }
  handleTextArea(e) {
    this.setState({
      text: e.target.value
    });
  }
  showAlert(message){
    this.msg.show(message, {
      time: 2000,
      type: 'error',
      icon: <i className="fa fa-exclamation-triangle fa-3x"></i>
    });
  }
  handelNext(e) {
    const localStorage = window.localStorage;
    const {text, rating} = this.state;
    if(!text || Object.keys(rating).length < 6) {
      this.showAlert("Fill All Details");
      return;
    }
    const resourceName = this.props.question.mainQuestion
    const selectedResources = JSON.parse(localStorage.getItem('selectedResources'));
    const currentIndex = selectedResources.findIndex(item => item === resourceName) + 1;
    const responses = JSON.parse(localStorage.getItem('responses'));
    responses[resourceName] = {
      desc: text,
      rating
    };
    localStorage.setItem('responses', JSON.stringify(responses));
    localStorage.setItem('currentIndex', JSON.stringify(currentIndex));
    this.props.next(currentIndex, responses);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  render() {
    const {
      mainQuestion,
      website,
      subQuestions
    } = this.props.question;
    const desQues = subQuestions[0],
          ratingQues = subQuestions[1];
    return (
      <section className="form__card">
        <h2 className="form__cardQuestion form__cardQuestion--bgc animated zoomIn">
          <span>{mainQuestion}</span>
          <a className="form__cardQuestionLink" href={website} target="_blank">({website})</a>
        </h2>
        <div className="form__cardSubWrapper animated zoomIn">
          <h3 className="form__cardSubQuestion">
            {desQues.question}
          </h3>
          <textarea
            onChange={this.handleTextArea.bind(this)}
            placeholder="Your answer"
            value={this.state.text}
            >
            </textarea>
        </div>
        <div className="form__cardSubWrapper animated zoomIn">
          <h3 className="form__cardSubQuestion">
            {ratingQues.question}
          </h3>
          <ul className="form__cardOptions">
            {
              ratingQues.options.map(option => {
                const {rating} = this.state;
                let rate;
                if(rating[option]) {
                  rate = rating[option];
                }
                return (
                  <li key={option} className="form__cardOptionItem">
                    <label className="form__cardOptionLabel" htmlFor="">{option}</label>
                    <Rating
                      empty="fa fa-star-o custom custom-empty"
                      full="fa fa-star custom custom-full"
                      initialRate={rate}
                      onClick={this.handleRating.bind(this, option)}
                    />
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="form__submitWrapper">
          <button onClick={this.handelNext.bind(this)} className="form__submit">
            Next
          </button>
        </div>
        <AlertContainer ref={(a) => this.msg = a} {...this.alertOptions} />
      </section>
    )
  }
}
