import React from 'react';

const SearchBar = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search blog posts</span>
        </label>
        <input
            type="text"
            id="location"
            placeholder="Enter location"
            name="s" 
        />

<input
            type="text"
            id="facility"
            placeholder="Enter facility required"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;
