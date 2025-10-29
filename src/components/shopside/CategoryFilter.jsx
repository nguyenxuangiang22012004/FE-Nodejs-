import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../services/NewArrivalService";

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <div className="shop-w shop-w--style">
      <div className="shop-w__intro-wrap">
        <h1 className="shop-w__h">CATEGORY</h1>
        <span
          className="fas fa-minus shop-w__toggle"
          data-target="#s-category"
          data-toggle="collapse"
        ></span>
      </div>

      <div className="shop-w__wrap collapse show" id="s-category">
        <ul className="shop-w__category-list gl-scroll">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id} className="has-list">
                <a href="#">{category.name}</a>
                
                {/* Hiển thị số lượng subcategories */}
                {category.subcategories && category.subcategories.length > 0 && (
                  <span className="category-list__text u-s-m-l-6">
                    ({category.subcategories.length})
                  </span>
                )}
                
                {/* Icon toggle */}
                {category.subcategories && category.subcategories.length > 0 && (
                  <span 
                    className={`js-shop-category-span ${expandedCategories[category.id] ? 'is-expanded' : ''} fas fa-plus u-s-m-l-6`}
                    onClick={() => toggleCategory(category.id)}
                    style={{ cursor: 'pointer' }}
                  ></span>
                )}

                {/* Subcategories list */}
                {category.subcategories && category.subcategories.length > 0 && (
                  <ul 
                    className="shop-w__category-list"
                    style={{ display: expandedCategories[category.id] ? 'block' : 'none' }}
                  >
                    {category.subcategories.map((sub) => (
                      <li key={sub.id}>
                        <a href="#">{sub.name}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilter;