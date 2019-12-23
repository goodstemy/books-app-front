import React from 'react';
import {
  Link
} from "react-router-dom";

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: true,
      lastScrollPosition: 0,
    };

    this.watchScroll = this.watchScroll.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.watchScroll);
  }

  watchScroll() {
    const [
      {scrollTop},
      {lastScrollPosition},
    ] = [
      document.documentElement,
      this.state,
    ];

    this.setState({lastScrollPosition: scrollTop});

    if (scrollTop < lastScrollPosition) {
      return this.show();
    }

    if (scrollTop > 200) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    this.setState({isActive: true});
  }

  hide() {
    this.setState({isActive: false});
  }

  render() {
    return (
      <div style={{height: '100%', position: 'absolute'}}>
        <div className="aside" onMouseEnter={this.show}></div>
        {/*<div className={`hamburger hamburger--squeeze js-hamburger ${this.state.isActive ? 'hamburger-inactive' : 'hamburger-active'}`}>*/}
        {/*  <div className="hamburger-box">*/}
        {/*    <div className="hamburger-inner"></div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {this.props.isAuthorized ?
          <div className={`menu ${this.state.isActive ? 'menu-active' : 'menu-inactive'}`}>
            <li>
              <Link to="/">КНИГИ</Link>
            </li>
            <li>
              <Link to="/profile">ПРОФИЛЬ</Link>
            </li>
            <li>
              <a style={{cursor: 'pointer'}} onClick={this.props.logout}>ВЫХОД</a>
            </li>
          </div>
          :
          <div className={`menu ${this.state.isActive ? 'menu-active' : 'menu-inactive'}`}>
            <li>
              <Link to="/login">ВОЙТИ</Link>
            </li>
            <li>
              <Link to="/signup">РЕГИСТРАЦИЯ</Link>
            </li>
          </div>
        }
      </div>
    );
  }
}

export default Menu;
