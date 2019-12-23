import React from 'react';

class BookCard extends React.Component {
  render() {
    return (
      <div className='book-card'>
        <div className='stand'>
          <img id='img' src={this.props.img} crossOrigin='anonymous'/>
          {/*<div className='card'>*/}
          {/*</div>*/}
          {/*<hr/>*/}
          {/*<h3 className='title'>Lorem ipsum dolor sit amet</h3>*/}
        </div>
        <h4 className='min-book-title'>Blue is Darkness</h4>
        <br/>
        <h5 className='min-book-author'>by Jeff Ryan</h5>
      </div>
    )
  }
}

export default BookCard;
