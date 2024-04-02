import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
//import ShopCategory from './ShopCategory'
import { useParams} from 'react-router-dom'
import Breadcrum from '../components/Breadcrum/Breadcrum'
import ProductDisplay from '../components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../components/DescriptionBox/DescriptionBox'
import ReletedProduct from '../components/ReletedProducts/ReletedProducts'

const Product = () => {
    const {all_product} = useContext(ShopContext)
    const {productId} = useParams();
    const product = all_product.find((e)=>e.id === Number(productId));
    return (
        <div>
            <Breadcrum product={product}/>
            <ProductDisplay product={product}/>
            <DescriptionBox/>
            <ReletedProduct />

        </div>
    )
}

export default Product