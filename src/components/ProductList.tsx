import React from 'react';
import {Table, Button} from 'antd';
import {ProductType} from "@/models/products";

export interface ProductsProps {
  products: Array<ProductType>;
}

const ProductList = ({products}: ProductsProps) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Actions',
    render: () => (
      <Button>Delete</Button>
    ),
  }];
  return (
    <Table
      dataSource={products}
      columns={columns}
    />
  );
};

export default ProductList
