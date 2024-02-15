import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component {
   constructor() {
      super()
      this.state = {
         robots: [],
         searchfield: ''
      }
   }

   componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/users')
         .then(response => response.json())
         .then(robots => this.setState({ robots }))
   }

   onSearchChange = (e) => {
      this.setState({ searchfield: e.target.value })
   }
   render() {
      const { robots, searchfield } = this.state;
      const filteredRobots = robots.filter(robot => {
         return robot.name.toLowerCase().includes(searchfield.toLowerCase());
      });

      if (!robots.length) {
         return <h1 className='tc p3'>Loading</h1>
      } else {
         return (
            <div className='tc'>
               <h1 className='ttu f1'>RoboFriends</h1>
               <SearchBox searchChange={this.onSearchChange} />
               <Scroll>
                  <ErrorBoundry>
                     <CardList robots={filteredRobots} />
                  </ErrorBoundry>
               </Scroll>

            </div >
         );
      }
   }
}

export default App;