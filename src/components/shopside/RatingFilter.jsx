const RatingFilter = () => {
    return (
        <div className="shop-w shop-w--style">
            <div className="shop-w__intro-wrap">
                <h1 className="shop-w__h">RATING</h1>
                <span className="fas fa-minus shop-w__toggle" data-target="#s-rating" data-toggle="collapse"></span>
            </div>
            <div className="shop-w__wrap collapse show" id="s-rating">
                <ul className="shop-w__list gl-scroll">
                    {/* Rating options */}
                    <li>
                        <div className="rating__check">
                            <input type="checkbox" />
                            <div className="rating__check-star-wrap">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                        <span className="shop-w__total-text">(2)</span>
                    </li>
                    {/* Add more rating options */}
                </ul>
            </div>
        </div>
    );
};

export default RatingFilter;