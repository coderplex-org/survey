import React, { Component } from 'react';

export default class MCQ extends Component{
  constructor(props) {
    super(props);
    this.state = {
      answer: []
    }
  }
  componentWillMount() {
    const localStorage = window.localStorage;
    if(localStorage.getItem('currentIndex')) {
      const selectedResources = JSON.parse(localStorage.getItem('selectedResources'));
      const currentIndex = JSON.parse(localStorage.getItem('currentIndex'));
      if(currentIndex === 0) {
        this.setState({
          answer: selectedResources
        });
      } else if(currentIndex < selectedResources.length) {
        this.context.router.push(`/question/${selectedResources[currentIndex]}`)
        return;
      }
      if(localStorage.getItem('done')){
        this.context.router.push(`/finish`);
      }
    }
  }
  saveAnswer(answer, e) {
    answer = answer.value;
    if(e.target.checked) {
      this.setState({
        answer: [...this.state.answer, answer]
      });
    } else {
      const index = this.state.answer.findIndex((item) => item === answer);
      this.setState({
        answer: [...this.state.answer.slice(0, index),...this.state.answer.slice(index + 1)]
      });
    }
  }
  handelNext(e) {
    const localStorage = window.localStorage;
    const { answer } = this.state
    let responses = {};
    answer.forEach(item => {
      return responses[item] = {}
    });
    localStorage.setItem('selectedResources', JSON.stringify(answer));
    localStorage.setItem('currentIndex', JSON.stringify(0));
    localStorage.setItem('responses', JSON.stringify(responses));
    this.props.next(answer, 0, responses);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  render() {
    const { mainQuestion, options} = this.props.question;
    return (
      <section className="form__card">
        <h2 className="form__cardQuestion animated zoomIn">
          {mainQuestion}
        </h2>
        <ul className="form__cardOptions">
          {
            options.map(option => {
              const index = this.state.answer.findIndex((item) => item === option.value);
              let checked;
              if(~index) {
                checked = true
              } else {
                checked = false
              }
              return (
                <li key={option.value} className="form__cardOptionItem animated zoomIn">
                  <input
                    className="form__cardOptionInput" id={option.value}
                    type="checkbox"
                    checked={checked}
                    onChange={this.saveAnswer.bind(this, option)}
                  />
                  <label className="form__cardOptionLabel" htmlFor={option.value}>
                    {option.value}
                  </label>
                </li>
              )
            })
          }
        </ul>
        <div className="form__submitWrapper">
          <button onClick={this.handelNext.bind(this)} className="form__submit">
            Next
          </button>
        </div>
      </section>
    )
  }
}

MCQ.contextTypes = {
    router: React.PropTypes.object.isRequired
};
