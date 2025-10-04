import React from 'react';

const ProductTabs = () => {
  return (
    <div className="u-s-p-y-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="pd-tab">
              <div className="u-s-m-b-30">
                <ul className="nav pd-tab__list">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#pd-desc">DESCRIPTION</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#pd-tag">TAGS</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="view-review" data-toggle="tab" href="#pd-rev">
                      REVIEWS <span>(23)</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content">
                {/*====== Tab 1 ======*/}
                <div className="tab-pane fade show active" id="pd-desc">
                  <div className="pd-tab__desc">
                    <div className="u-s-m-b-15">
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className="u-s-m-b-30">
                      <iframe src="https://www.youtube.com/embed/qKqSBm07KZk" allowFullScreen></iframe>
                    </div>
                    <div className="u-s-m-b-30">
                      <ul>
                        <li>
                          <i className="fas fa-check u-s-m-r-8"></i>
                          <span>Buyer Protection.</span>
                        </li>
                        <li>
                          <i className="fas fa-check u-s-m-r-8"></i>
                          <span>Full Refund if you don't receive your order.</span>
                        </li>
                        <li>
                          <i className="fas fa-check u-s-m-r-8"></i>
                          <span>Returns accepted if product not as described.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="u-s-m-b-15">
                      <h4>PRODUCT INFORMATION</h4>
                    </div>
                    <div className="u-s-m-b-15">
                      <div className="pd-table gl-scroll">
                        <table>
                          <tbody>
                            <tr>
                              <td>Main Material</td>
                              <td>Cotton</td>
                            </tr>
                            <tr>
                              <td>Color</td>
                              <td>Green, Blue, Red</td>
                            </tr>
                            <tr>
                              <td>Sleeves</td>
                              <td>Long Sleeve</td>
                            </tr>
                            <tr>
                              <td>Top Fit</td>
                              <td>Regular</td>
                            </tr>
                            <tr>
                              <td>Print</td>
                              <td>Not Printed</td>
                            </tr>
                            <tr>
                              <td>Neck</td>
                              <td>Round Neck</td>
                            </tr>
                            <tr>
                              <td>Pieces Count</td>
                              <td>1 Piece</td>
                            </tr>
                            <tr>
                              <td>Occasion</td>
                              <td>Casual</td>
                            </tr>
                            <tr>
                              <td>Shipping Weight (kg)</td>
                              <td>0.5</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/*====== End - Tab 1 ======*/}

                {/*====== Tab 2 ======*/}
                <div className="tab-pane" id="pd-tag">
                  <div className="pd-tab__tag">
                    <h2 className="u-s-m-b-15">ADD YOUR TAGS</h2>
                    <div className="u-s-m-b-15">
                      <form>
                        <input className="input-text input-text--primary-style" type="text" />
                        <button className="btn btn--e-brand-b-2" type="submit">ADD TAGS</button>
                      </form>
                    </div>
                    <span className="gl-text">Use spaces to separate tags. Use single quotes (') for phrases.</span>
                  </div>
                </div>
                {/*====== End - Tab 2 ======*/}

                {/*====== Tab 3 ======*/}
                <div className="tab-pane" id="pd-rev">
                  <div className="pd-tab__rev">
                    <div className="u-s-m-b-30">
                      <div className="pd-tab__rev-score">
                        <div className="u-s-m-b-8">
                          <h2>23 Reviews - 4.6 (Overall)</h2>
                        </div>
                        <div className="gl-rating-style-2 u-s-m-b-8">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                        </div>
                        <div className="u-s-m-b-8">
                          <h4>We want to hear from you!</h4>
                        </div>
                        <span className="gl-text">Tell us what you think about this item</span>
                      </div>
                    </div>
                    <div className="u-s-m-b-30">
                      <form className="pd-tab__rev-f1">
                        <div className="rev-f1__group">
                          <div className="u-s-m-b-15">
                            <h2>23 Review(s) for Man Ruched Floral Applique Tee</h2>
                          </div>
                          <div className="u-s-m-b-15">
                            <label htmlFor="sort-review"></label>
                            <select className="select-box select-box--primary-style" id="sort-review" defaultValue="best">
                              <option value="best">Sort by: Best Rating</option>
                              <option value="worst">Sort by: Worst Rating</option>
                            </select>
                          </div>
                        </div>
                        <div className="rev-f1__review">
                          {/* Review items would go here */}
                          <div className="review-o u-s-m-b-15">
                            <div className="review-o__info u-s-m-b-8">
                              <span className="review-o__name">John Doe</span>
                              <span className="review-o__date">27 Feb 2018 10:57:43</span>
                            </div>
                            <div className="review-o__rating gl-rating-style u-s-m-b-8">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="far fa-star"></i>
                              <span>(4)</span>
                            </div>
                            <p className="review-o__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="u-s-m-b-30">
                      <form className="pd-tab__rev-f2">
                        <h2 className="u-s-m-b-15">Add a Review</h2>
                        <span className="gl-text u-s-m-b-15">Your email address will not be published. Required fields are marked *</span>

                        {/* Rating table and form fields would go here */}
                        <div className="u-s-m-b-30">
                          <div className="rev-f2__group">
                            <div className="u-s-m-b-15">
                              <label className="gl-label" htmlFor="reviewer-text">YOUR REVIEW *</label>
                              <textarea className="text-area text-area--primary-style" id="reviewer-text"></textarea>
                            </div>
                            <div>
                              <p className="u-s-m-b-30">
                                <label className="gl-label" htmlFor="reviewer-name">NAME *</label>
                                <input className="input-text input-text--primary-style" type="text" id="reviewer-name" />
                              </p>
                              <p className="u-s-m-b-30">
                                <label className="gl-label" htmlFor="reviewer-email">EMAIL *</label>
                                <input className="input-text input-text--primary-style" type="text" id="reviewer-email" />
                              </p>
                            </div>
                          </div>
                          <div>
                            <button className="btn btn--e-brand-shadow" type="submit">SUBMIT</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/*====== End - Tab 3 ======*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;