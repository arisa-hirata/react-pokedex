import React from 'react';
import pokeball from './assets/pokeball.svg';

const Header = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-md fixed-top"
        style={{
          backgroundColor: '#e3350f',
          height: 60,
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row'
        }}>
        <a
          href="/"
          className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center"
        >
          <img src={pokeball} style={{ width: 40 }} />
        </a>
      </nav>
    </div>
  );
}

export default Header;
