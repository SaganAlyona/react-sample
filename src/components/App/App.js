import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { find, findIndex} from 'lodash';
import './App.css';
import { ListItem, HomeworkDetails } from '..';
import {HomeworkService} from '..';

export class App extends Component {
  state = {
    homeworks: []
  }

  async componentDidMount() {
    this.homeworkService = new HomeworkService();
    const homeworks = await this.homeworkService.fetchList();
    this.setState({ homeworks });
  }

  handleAction = async (action) => {
    switch(action.type) {
      case 'delete':
        const removeId = await this.homeworkService.deleteOne(action.value.id);
        this.setState({ homeworks: removeId });
        break;
      case 'update':
        try {
        const homeworks = await this.homeworkService.updateOne(action.value);
        const result = await homeworks.json();
          const index = findIndex(this.state.homeworks, { id: result.id });
          if (index > -1) {
            const newHomeworks = [...this.state.homeworks];
            newHomeworks[index] = result;
            this.setState({ homeworks: newHomeworks });
          }
            } catch (ignore) { }
        break;
      default:
        console.log('App click', action);
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          App main page
          <Link to="/"><div>Home</div></Link>
        </header>

        <Route path="/" exact={true}>
          {this.state.homeworks.map((hw) =>
            <ListItem
              key={hw.id}
              id={hw.id}
              title={hw.title}
              number={hw.number}
              onAction={this.handleAction}>
            </ListItem>
          )}
        </Route>

        <Route path="/homeworks/:hwid/" render={({ match }) => {
          const homework = find(this.state.homeworks, { id: match.params.hwid });
          if (!homework) return null;
          return <HomeworkDetails homework={homework} onAction={this.handleAction}></HomeworkDetails>
        }}/>
      </div>
    )
  }
}

