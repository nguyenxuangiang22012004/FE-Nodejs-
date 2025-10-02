import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <div className="breadcrumb">
      <div className="breadcrumb__wrap">
        <ul className="breadcrumb__list">
          {items.map((item, index) => (
            <li 
              key={index} 
              className={item.hasSeparator ? 'has-separator' : item.isMarked ? 'is-marked' : ''}
            >
              {item.link ? (
                <Link to={item.link}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumb;