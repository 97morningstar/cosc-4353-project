import React from 'react';
import classNames from 'classnames';
import { Link, Router } from 'react-router-dom';
import Image from '../../elements/Image';

import LogoImg from './NextFlood.png';



const Logo = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'brand',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      <h1 className="m-0">
    
        <a href="/">
          <Image
          style={{ marginTop: '20px'}}
            src={LogoImg}
            alt="Open"
            width={142}
            height={142} />
        </a>
        
      </h1>
    </div>
  );
}

export default Logo;