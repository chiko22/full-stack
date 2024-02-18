import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

import { setSearchField } from '../actions';

const mapStateToProps = state => {
   return {
      searchField: state.searchField
   }
};

const mapDispatchToProps = (dispatch) => {
   return {
      onSearchChange: (e) => dispatch(setSearchField(e.target.value))
   }
};

class App extends Component {
   constructor() {
      super()
      this.state = {
         robots: []
      }
   }

   componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/users')
         .then(response => response.json())
         .then(robots => this.setState({ robots }))
   }

   // onSearchChange = (e) => {
   //    this.setState({ searchfield: e.target.value })
   // }
   render() {
      const { robots } = this.state;
      const { searchField, onSearchChange } = this.props;
      const filteredRobots = robots.filter(robot => {
         return robot.name.toLowerCase().includes(searchField.toLowerCase());
      });

      if (!robots.length) {
         return <h1 className='tc p3'>Loading</h1>
      } else {
         return (
            <div className='tc'>
               <h1 className='ttu f1'>RoboFriends</h1>
               <SearchBox searchChange={onSearchChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);