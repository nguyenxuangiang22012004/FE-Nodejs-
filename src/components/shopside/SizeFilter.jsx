const SizeFilter = () => {
    return (
        <div className="shop-w shop-w--style">
            <div className="shop-w__intro-wrap">
                <h1 className="shop-w__h">SIZE</h1>
                <span className="fas fa-minus collapsed shop-w__toggle" data-target="#s-size" data-toggle="collapse"></span>
            </div>
            <div className="shop-w__wrap collapse" id="s-size">
                <ul className="shop-w__list gl-scroll">
                    {/* Size options */}
                    <li>
                        <div className="check-box">
                            <input type="checkbox" id="xs" />
                            <div className="check-box__state check-box__state--primary">
                                <label className="check-box__label" htmlFor="xs">XS</label>
                            </div>
                        </div>
                        <span className="shop-w__total-text">(2)</span>
                    </li>
                    {/* Add more sizes */}
                </ul>
            </div>
        </div>
    );
};


export default SizeFilter;