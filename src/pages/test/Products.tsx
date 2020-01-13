import React from 'react';
import {connect} from 'dva';
import ProductList from "@/components/ProductList";
import {ProductType} from "@/models/products";

export interface ProductsProps {
  products: Array<ProductType>;
}

const Products = ({products}: ProductsProps) => (
  <div>
    <h2>List of Products</h2>
    <ProductList products={products}/>
    <ProductList products={products}/>
  </div>
);

// export default Products;
export default connect(({products}: ProductsProps) => ({
  products,
}))(Products);
