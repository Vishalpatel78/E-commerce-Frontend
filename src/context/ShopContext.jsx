import React, {createContext, useEffect, useState} from 'react';
//import all_product from "../components/Assets/all_product";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for(let index =0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}


const ShopContextProvider = (props) => {
    const [all_product,setAll_product] = useState([]);
    const [cartItems, setCartItems] = React.useState(getDefaultCart());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_product(data))
    },[])
    
     const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'content-type':'application/json',

                },
                body:JSON.stringify({"itemID":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
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
