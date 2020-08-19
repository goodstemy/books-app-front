import React from 'react';

function BookCard({img, title, username}) {
    return (
        <div className='book-card'>
            <div className='stand'>
                <img id='img' src={img} crossOrigin='anonymous' alt='book-card'/>
            </div>
            <h4 className='min-book-title'>{title || "Blue is Darkness"}</h4>
            <br/>
            <h5 className='min-book-author'>by {username || "you"}</h5>
        </div>
    );
}

export default BookCard;
