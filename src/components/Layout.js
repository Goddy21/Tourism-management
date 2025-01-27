// components/Layout.js
import React from 'react';
import VerticalNav from './Vertical-nav';
import HorizontalNav from './Horizontal-nav';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <VerticalNav />
      <div style={{ marginLeft: '300px', width: '100%' }}>
        <HorizontalNav />
        <div>{children}</div> {/* This is where the page content will go */}
      </div>
    </div>
  );
};

export default Layout;
