import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import MCQ from './MCQ';
import RQ from './RQ';
import Loader from './Loading';
import questions from '../data/questions.json';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: {},
      selectedResources: [],
      currentIndex: 0,
      saving: false
    }
  }
  componentWillMount() {
    const localStorage = window.localStorage;
    const selectedResources =localStorage.getItem('selectedResources');
    const responses = localStorage.getItem('responses');
    const currentIndex = localStorage.getItem('currentIndex');
    const done = localStorage.getItem('done');
    if(done) {
      this.context.router.push('/finish');
      return;
    }
    if(selectedResources && responses && currentIndex) {
      this.setState({
        selectedResources,
        currentIndex,
        responses
      });
    }
  }
  handelMCQAnswer(selectedResources, currentIndex, responses) {
    this.setState({
      responses,
      selectedResources,
      currentIndex
    })
    const localStorage = window.localStorage;
    if(localStorage.getItem('currentIndex')) {
      const selectedResources = JSON.parse(localStorage.getItem('selectedResources'));
      const currentIndex = JSON.parse(localStorage.getItem('currentIndex'));
      if(currentIndex < selectedResources.length) {
        this.context.router.push(`/question/${selectedResources[currentIndex]}`)
        return;
      }
    }
  }
  saveResponseToRemote() {
    console.log('Saved')
    const localStorage = window.localStorage;
    const responses = JSON.parse(localStorage.getItem('responses'));
    console.log(responses);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    axios.post('https://survey-api.now.sh',JSON.stringify(responses),config)
      .then(res => {
        localStorage.setItem("done", JSON.stringify(true));
        this.context.router.push('/finish');
        console.log(res)
      })
      .catch(e => console.log(e));
  }
  handelRQAnswer(currentIndex, responses) {
    const selectedResources = this.state.selectedResources;
    if(currentIndex < selectedResources.length) {
      this.context.router.push(`/question/${selectedResources[currentIndex]}`)
      return;
    }
    this.setState({saving: true})
    this.saveResponseToRemote()
  }
  renderQuestion() {
    const resourceName = this.props.params.resourceName
    const question = questions.filter((question) => {
      return question.mainQuestion === resourceName;
    })[0];
    if(!question) {
      this.context.router.push('/404');
      return;
    }
    if(question.type === 'MCQ') {
      return <MCQ
                next={this.handelMCQAnswer.bind(this)}
                question={question}
              />
    }
    if(this.state.saving) {
      return <Loader />
    }
    return <RQ
              next={this.handelRQAnswer.bind(this)}
              question={question}
              resourceName={resourceName}
              router={this.context.router}
            />
  }
  render() {
    return (
      <div id="questions">
        <Header />
        <main className="form">
          {this.renderQuestion()}
        </main>
      </div>
    )
  }
}

Question.contextTypes = {
    router: React.PropTypes.object.isRequired
};
