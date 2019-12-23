import React from 'react';
import {Link} from "react-router-dom";
import ColorThief from 'colorthief';
import {
  Redirect,
} from "react-router-dom";
import BookCard from './BookCard';

const MOUSEOVER_SHADOW_INTENSITY = '7px';
const MOUSELEAVE_SHADOW_INTENSITY = '5px';

class Home extends React.Component {
  componentDidMount() {
    const stands = document.getElementsByClassName('stand');
    const colorThief = new ColorThief();

    for (let i = 0; i < stands.length; i++) {
      const stand = stands[i];
      const img = stand.children[0];

      img.src = 'http://localhost:4001/image?url=https://www.sciencealert.com/images/2019-12/processed/CatsHaveFacialExpressionsButHardToRead_600.jpg';

      img.addEventListener('load', () => {
        const [r, g, b] = colorThief.getColor(img);
        const shadowColor = `${r}, ${g}, ${b}`;

        stand.style.boxShadow = `0px 0px ${MOUSELEAVE_SHADOW_INTENSITY} rgb(${shadowColor})`;
        stand._shadowColor = shadowColor;
      });

      stand.addEventListener('mouseover', () => {
        stand.style.boxShadow = `0px 0px ${MOUSEOVER_SHADOW_INTENSITY} rgb(${stand._shadowColor})`;
      });

      stand.addEventListener('mouseleave', () => {
        stand.style.boxShadow = `0px 0px ${MOUSELEAVE_SHADOW_INTENSITY} rgb(${stand._shadowColor})`;
      });
    }
  }

  render() {
    console.log(this.props);
    if (!this.props.isAuthorized) {
      return <Redirect to={{pathname: '/login'}}/>;
    }

    return (
      <div className="row center-xs">
        <div className="col-xs-8">
          <div className='books'>
            <Link to="/book">
              <BookCard img=''/>
            </Link>
            <Link to="/book">
              <BookCard img={process.env.PUBLIC_URL + '/book-image.png'}/>
            </Link>
            <Link to="/book">
              <BookCard img={process.env.PUBLIC_URL + '/book-cover2.png'}/>
            </Link>
            <Link to="/book">
              <BookCard img={process.env.PUBLIC_URL + '/book-cover3.png'}/>
            </Link>
            <Link to="/book">
              <BookCard img={process.env.PUBLIC_URL + '/book-cover4.png'}/>
            </Link>
            <Link to="/book">
              <BookCard img={process.env.PUBLIC_URL + '/book-cover5.jpg'}/>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
