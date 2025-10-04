const ColorFilter = () => {
    return (
        <div className="shop-w shop-w--style">
            <div className="shop-w__intro-wrap">
                <h1 className="shop-w__h">COLOR</h1>
                <span className="fas fa-minus shop-w__toggle" data-target="#s-color" data-toggle="collapse"></span>
            </div>
            <div className="shop-w__wrap collapse show" id="s-color">
                <ul className="shop-w__list gl-scroll">
                    {/* Color options */}
                    <li>
                        <div className="color__check">
                            <input type="checkbox" id="jet" />
                            <label className="color__check-label" htmlFor="jet" style={{backgroundColor: '#333333'}}></label>
                        </div>
                        <span className="shop-w__total-text">(2)</span>
                    </li>
                    {/* Add more colors */}
                </ul>
            </div>
        </div>
    );
};

export default ColorFilter;