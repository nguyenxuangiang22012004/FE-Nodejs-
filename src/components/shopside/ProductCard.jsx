import { Link } from "react-router-dom";
const ProductCard = ({ product, onQuickLook, onAddToCart }) => {
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="fas fa-star"></i>);
        }
        
        if (hasHalfStar) {
            stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
        }
        
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
        }
        
        return stars;
    };

    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="product-m">
                <div className="product-m__thumb">
                  <Link className="aspect aspect--bg-grey aspect--square u-d-block" to={`/product-detail/${product.id}`}>
                        <img className="aspect__img" src={product.image} alt={product.name} />
                    </Link>
                    <div className="product-m__quick-look">
                        <a className="fas fa-search" onClick={onQuickLook}></a>
                    </div>
                    <div className="product-m__add-cart">
                        <a className="btn--e-brand" onClick={onAddToCart}>Add to Cart</a>
                    </div>
                </div>
                <div className="product-m__content">
                    <div className="product-m__category">
                        <Link to="/shop-side-version-2">{product.category}</Link>
                    </div>
                    <div className="product-m__name">
                        <Link to="/product-detail">{product.name}</Link>
                    </div>
                    <div className="product-m__rating gl-rating-style">
                        {renderStars(product.rating)}
                        <span className="product-m__review">({product.reviews})</span>
                    </div>
                    <div className="product-m__price">{product.price}</div>
                    <div className="product-m__hover">
                        <div className="product-m__preview-description">
                            <span>{product.description}</span>
                        </div>
                        <div className="product-m__wishlist">
                            <a className="far fa-heart" href="#"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;