import { Cart } from "../Models/Cart.js";



export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, qty, imgSrc } = req.body;

    // Temporarily hardcoded user ID
    const userId = "687a2f2dede01888db70df7a";

    // Check if the cart already exists
    let cart = await Cart.findOne({ userId });

    const item = { productId, title, price, qty, imgSrc };

    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = new Cart({
        userId,
        items: [item],
      });
    } else {
      // Check if the item already exists in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // If found, update quantity and total price
        cart.items[itemIndex].qty += qty;
        cart.items[itemIndex].price += price * qty;
      } else {
        // If not found, add the new item
        cart.items.push(item);
      }
    }

    const savedCart = await cart.save();
    res.status(201).json({ message: "Item added to cart", cart: savedCart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const userCart=async(req,res)=>{
         const userId = "687a2f2dede01888db70df7a";
         let cart=await Cart.findOne({userId})

         if(!cart) return res.json({message:"not found"});

         res.json({message:"user cart",cart})
         
           
            
}