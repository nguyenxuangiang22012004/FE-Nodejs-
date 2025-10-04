const CategoryFilter = () => {
    return (
        <div className="shop-w shop-w--style">
            <div className="shop-w__intro-wrap">
                <h1 className="shop-w__h">CATEGORY</h1>
                <span className="fas fa-minus shop-w__toggle" data-target="#s-category" data-toggle="collapse"></span>
            </div>
            <div className="shop-w__wrap collapse show" id="s-category">
                {/* Category list content */}
                <ul className="shop-w__category-list gl-scroll">
                    <li className="has-list">
                        <a href="#">Electronics</a>
                        <span className="category-list__text u-s-m-l-6">(23)</span>
                        <span className="js-shop-category-span is-expanded fas fa-plus u-s-m-l-6"></span>
                        {/* Subcategories would go here */}
                    </li>
                    {/* Add more categories */}
                </ul>
            </div>
        </div>
    );
};

export default CategoryFilter;