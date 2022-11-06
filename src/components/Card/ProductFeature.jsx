import React from "react";

const ProductFeature = ({FontAwesomeIcon, icon, productTitle, productText}) => {
  return (
    <div className="card-item max-w-sm bg-white rounded-lg flex flex-col items-center p-10 gap-5">
      <FontAwesomeIcon icon={icon} className="text-8xl text-gray-900" />
      <div>
        <h3 className="font-bold text-center">{productTitle}</h3>
        <p className="text-justify">
          {productText}
        </p>
      </div>
    </div>
  );
};

export default ProductFeature;
