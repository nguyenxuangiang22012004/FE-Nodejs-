import React from 'react';

const CartItems = ({ items, onQuantityChange, onRemoveItem }) => {
  return (
    <div className="table-responsive">
      <table className="table-p">
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>
                <div className="table-p__box">
                  <div className="table-p__img-wrap">
                    <img className="u-img-fluid" src={item.image} alt={item.name} />
                  </div>
                  <div className="table-p__info">
                    <span className="table-p__name">
                      <a href={`/product/${item.id}`}>{item.name}</a>
                    </span>
                    <span className="table-p__category">
                      <a href="/shop">{item.category}</a>
                    </span>
                    <ul className="table-p__variant-list">
                      {item.variants.map((variant, index) => (
                        <li key={index}>
                          <span>{variant.name}: {variant.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </td>
              <td>
                <span className="table-p__price">${item.price.toFixed(2)}</span>
              </td>
              <td>
                <div className="table-p__input-counter-wrap">
                  <div className="input-counter">
                    <span 
                      className="input-counter__minus fas fa-minus"
                      onClick={() => onQuantityChange(item.id, -1)}
                    ></span>
                    <input 
                      className="input-counter__text input-counter--text-primary-style" 
                      type="text" 
                      value={item.quantity} 
                      readOnly
                    />
                    <span 
                      className="input-counter__plus fas fa-plus"
                      onClick={() => onQuantityChange(item.id, 1)}
                    ></span>
                  </div>
                </div>
              </td>
              <td>
                <div className="table-p__del-wrap">
                  <button 
                    className="far fa-trash-alt table-p__delete-link"
                    onClick={() => onRemoveItem(item.id)}
                  ></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartItems;