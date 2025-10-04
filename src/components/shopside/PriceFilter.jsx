const PriceFilter = () => {
    return (
        <div className="shop-w shop-w--style">
            <div className="shop-w__intro-wrap">
                <h1 className="shop-w__h">PRICE</h1>
                <span className="fas fa-minus shop-w__toggle" data-target="#s-price" data-toggle="collapse"></span>
            </div>
            <div className="shop-w__wrap collapse show" id="s-price">
                <form className="shop-w__form-p">
                    <div className="shop-w__form-p-wrap">
                        <div>
                            <label htmlFor="price-min"></label>
                            <input className="input-text input-text--primary-style" type="text" id="price-min" placeholder="Min" />
                        </div>
                        <div>
                            <label htmlFor="price-max"></label>
                            <input className="input-text input-text--primary-style" type="text" id="price-max" placeholder="Max" />
                        </div>
                        <div>
                            <button className="btn btn--icon fas fa-angle-right btn--e-transparent-platinum-b-2" type="submit"></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PriceFilter;