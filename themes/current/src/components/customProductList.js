import React from 'react'
import { NavLink } from 'react-router-dom'
import text from '../lib/text'
import config from '../lib/config'
import * as helper from '../lib/helper'
import api from 'cezerin-client'
import ProductList from './productList'

export default class CustomProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = () => {
    const filter = {
      sku: config.home_products_sku,
      on_sale: null,
      search: null,
      category_id: null,
      price_from: null,
      price_to: null,
      sort: config.home_products_sort,
      fields: 'path,id,name,category_id,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,attributes',
      limit: config.home_products_limit,
      offset: 0
    };

    api.ajax.products.list(filter).then(({status, json}) => {
      this.setState({
        products: json.data
      })
    });
  }

  render() {
    const { settings, addCartItem } = this.props;

    return (
      <div>
        <ProductList
          products={this.state.products}
          addCartItem={addCartItem}
          settings={settings}
          loadMoreProducts={null}
          hasMore={false}
          columnCountOnMobile={2}
          columnCountOnDesktop={4}
        />
      </div>
    )
  }
}
