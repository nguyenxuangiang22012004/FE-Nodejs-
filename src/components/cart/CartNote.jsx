import React from 'react';

const CartNote = ({ note, onNoteChange }) => {
  return (
    <div className="f-cart__pad-box">
      <h1 className="gl-h1">NOTE</h1>
      <span className="gl-text u-s-m-b-30">Add Special Note About Your Product</span>
      <div>
        <textarea 
          className="text-area text-area--primary-style" 
          id="f-cart-note"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Add your special note here..."
        ></textarea>
      </div>
    </div>
  );
};

export default CartNote;