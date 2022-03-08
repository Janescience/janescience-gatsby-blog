import React from 'react';
import * as Unicons from '@iconscout/react-unicons';


const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form
        className='blog-search-form container'
        action="/"
        method="get"
        autoComplete="off"
    >
        <div className='blog-search-group'>
            <input
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
                type="text"
                id="header-search"
                name="s"
                className='blog-search-input'
            />
            <Unicons.UilSearch color="#4f5969"/>
        </div>
        
    </form>
);

export default SearchBar