import React from 'react';
import Footer from './footer';

const Layout = (props: any) => {

  return (
    <main>
      {props.children}
      <Footer />
    </main>
  )
}

export default Layout
