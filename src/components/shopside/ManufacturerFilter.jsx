const ManufacturerFilter = () => {
    return (
        <div className="shop-w shop-w--style">
            <div className="shop-w__intro-wrap">
                <h1 className="shop-w__h">MANUFACTURER</h1>
                <span className="fas fa-minus shop-w__toggle" data-target="#s-manufacturer" data-toggle="collapse"></span>
            </div>
            <div className="shop-w__wrap collapse show" id="s-manufacturer">
                <ul className="shop-w__list-2">
                    {/* Manufacturer options */}
                    <li>
                        <div className="list__content">
                            <input type="checkbox" checked />
                            <span>Calvin Klein</span>
                        </div>
                        <span className="shop-w__total-text">(23)</span>
                    </li>
                    {/* Add more manufacturers */}
                </ul>
            </div>
        </div>
    );
};


export default ManufacturerFilter;
