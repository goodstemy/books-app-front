import React from 'react';

function SearchResult({
                          title = '',
                          author = '',
                          description = '',
                      }) {
    return <div
        className="search-result-item">
        <h3 className="search-result-item-title">{title}</h3>
        <hr/>
        <p className="search-result-item-description">{description.slice(0, 500)}...</p>
        <h5 className="search-result-item-author">by {author}</h5>
    </div>;
}

export default SearchResult;
