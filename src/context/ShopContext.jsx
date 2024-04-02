import React, {createContext} from 'react';
import all_product from "../components/Assets/all_product";



export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for(let index =0; index <all_product.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}


const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = React.useState(getDefaultCart());

    
    
     const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
     }

     const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
     }

{/*a function to calculate total cart amount*/}
     const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            let itemInfo = all_product.find((product)=>product.id===Number(item));
            if (!itemInfo) {
                console.log(`Item with id ${item} not found in all_product`);
                continue; // Skip to the next iteration
            }
            totalAmount += itemInfo.new_price * cartItems[item];
        }
        return totalAmount;
    }
{/*Now a function that helps us to show the total number of products in cart option*/}  
    const getTotalCartItems = () =>{
        let totalItems = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItems+= cartItems[item];
            }
        }
        return totalItems;
    }

     const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
   
    return (
        <ShopContext.Provider value = { contextValue}>
            {props.children }
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
