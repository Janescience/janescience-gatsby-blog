import React from 'react';
import * as Unicons from '@iconscout/react-unicons';


const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form
        className='blog-search-form'
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
                placeholder='ค้นหาบทความ'
                name="s"
                className='blog-search-input'
            />
            <Unicons.UilSearch size="20" />
        </div>
        
    </form>
);

export default SearchBar