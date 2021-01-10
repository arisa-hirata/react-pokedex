import React from 'react';
import pokeball from './assets/pokeball.svg';

const Header = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-md fixed-top"
        style={{
          backgroundColor: '#e3350f',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }}>
        <a
          href="/"
        >
          <img src={pokeball} style={{ width: 40 }} />
        </a>
      </nav>
    </div>
  );
}

export default Header;
