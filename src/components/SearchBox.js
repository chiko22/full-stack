import React from 'react';

const SearchBox = ({ searchfield, searchChange }) => {
   return (
      <div className='pa2 w-100 flex justify-center'>
         <input
            className='pa3 ba b--green bg-lightest-blue w-20'
            type='search'
            placeholder='Search robots'
            onChange={searchChange} />
      </div>
   )
}

export default SearchBox;