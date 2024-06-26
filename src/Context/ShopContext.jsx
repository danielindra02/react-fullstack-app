import { React, createContext, useState} from "react";
import all_product from "../Components/Assets/all_product"

export const ShopContext = createContext(null);

// membuat cart kosong sesuai dengan jumlah product yang ada berasarkan index
const getDefaultCart = () =>{
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => { 

    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    const addToCart = (itemId) => {
        // send the prev value, use spread operator '...', itemId Value akan menghasilkan nilai dari key tersebut 
         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        console.log(cartItems);
    }

    const removeFromCart = (itemId) => {
        // send the prev value, use spread operator '...', itemId Value akan menghasilkan nilai dari key tersebut 
         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    }


    // for loop to parse our cart items from our cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
            return totalAmount;
        }
    }
    
    //cek jika total cart lebih dari 0
    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0)
            {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;