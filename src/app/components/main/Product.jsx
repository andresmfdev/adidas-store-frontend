import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  addProductToCart, 
  deleteProductCart, 
  selectAllCartproducts 
} from "../../../services/slices/cartSlice";
import { 
  addProductToFavorites, 
  selectAllFavorites 
} from "../../../services/slices/favoriteSlice";
import './styles/product.css'
import cart from '../../../assets/cart-ligth.svg'
import cartDark from '../../../assets/cart.svg'
import heart from '../../../assets/heart.svg'
import loved from '../../../assets/loved.svg'
import currency from "../../helpers/calcCurrency";
import { useNavigate } from "react-router-dom";
import { changeOption } from "../../../services/slices/validationSlice";

export default function Product({ product }){

  const dispatch = useDispatch()

  const favProducts = useSelector(selectAllFavorites)
  const cartProducts = useSelector(selectAllCartproducts)

  const navigate = useNavigate()

  const favorite = favProducts.find(elem => elem.id === product.id) || false

  const cartProduct = cartProducts.find(elem => elem.id === product.id) || 0

  function handleClickCart(){
    if(cartProduct.quantity > 0){
      dispatch(deleteProductCart(product))
    } else {
      dispatch(addProductToCart(product))
    }
  }

  function handleClickFav(){
    dispatch(addProductToFavorites(product))
  }

  const newPrice = product.price * (1 - product.discount/100)

  function handleSingleProduct(){
    dispatch(changeOption('product'))
    navigate(`/product/${product.id}`, {replace: true})
  }

  return (
    <div className="product_card">
      <div className="product_card_img"  onClick={handleSingleProduct}>
        <img src={product.image1} alt="photo" className="product_card_img_photo" />
        <div>
          {
            product.discount > 0 &&
            <div className="product_card_extra_discount">-{product.discount}%</div>
          }
        </div>
      </div>
      <div className="product_card_info">
        <h5 className="product_card_info_name" onClick={handleSingleProduct}>{product.name}</h5>
        <p className={`product_card_info_category ${product.discount === 0 && 'e'}`}>{product.breadcrumbs}</p>
        <div className={`product_card_info_extra ${product.discount === 0 && 'movil'}`}>
          <div className="product_card_info_extra_block">
            {
              product.discount > 0 &&
              <p className="product_card_info_extra_discount">{currency(product.price)}</p>
            }
            <p className={`product_card_info_extra_price ${product.discount === 0 && 'e'}`}>{currency(newPrice)}</p>
          </div>
          <div className="product_card_info_extra_icons" >
            <img 
              src={!favorite ? heart : loved} 
              alt="favorite" 
              className="product_card_info_extra_icons_heart" 
              onClick={handleClickFav}
            />
            <img 
              src={cartProduct.quantity > 0 ? cartDark : cart} 
              alt="cart" 
              className="product_card_info_extra_icons_shop"
              onClick={handleClickCart}
            />
          </div>
        </div>
      </div>
    </div>
  )
}