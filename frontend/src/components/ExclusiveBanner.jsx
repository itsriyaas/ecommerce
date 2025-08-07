import React from 'react';

const GenderExclusiveBanner = () => {
  return (
    <div className="container my-4">
      <div className="row g-0 border rounded overflow-hidden ">
        {/* Women Section */}
        <div className="col-12 col-md-6 position-relative text-top p-4 bg-light">
          <img
            src="https://chawkbazar.redq.io/_next/image?url=%2Fassets%2Fimages%2Fexclusive%2Fwomen.png&w=640&q=75"
            alt="Women"
            className="img-fluid position-relative z-1 max-height"
          />
          <div className="overlay-text ms-5">
            <p className="text-muted mb-0">NEW YEAR</p>
            <h1 className="display-1 text-dark fw-bold opacity-10">20</h1>
            <button className="btn btn-outline-dark mt-3 ms-5">#WOMEN EXCLUSIVE</button>
          </div>
        </div>

        {/* Men Section */}
        <div className="col-12 col-md-6 position-relative text-top p-4 bg-body">
          <img
            src="https://chawkbazar.redq.io/_next/image?url=%2Fassets%2Fimages%2Fexclusive%2Fmen.png&w=640&q=75"
            alt="Men"
            className="img-fluid position-relative z-1 max-height"
          />
          <div className="overlay-text ms-5">
            <p className="text-muted mb-0">EXCLUSIVE</p>
            <h1 className="display-1 text-secondary fw-bold opacity-10">25</h1>
            <button className="btn btn-outline-dark mt-3 ms-2">#MEN EXCLUSIVE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderExclusiveBanner;
