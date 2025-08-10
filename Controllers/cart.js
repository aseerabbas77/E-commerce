import { Cart } from "../Models/Cart.js";



export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, qty, imgSrc } = req.body;

    // Temporarily hardcoded user ID
    const userId = req.user;

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
         const userId = req.user;
         let cart=await Cart.findOne({userId})

         if(!cart) return res.json({message:"not found"});

         res.json({message:"user cart",cart})
         
           
            
}

export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user; // Replace with req.user.id if using auth
    const productId = req.params.productId;

    console.log("Received productId:", productId); // Debug log

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const initialLength = cart.items.length;

    // Filter out the item
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await cart.save();

    res.json({ message: "Item removed from cart", cart });

  } catch (error) {
    console.error("Remove cart item error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/cart.js


export const clearCart = async (req, res) => {
  try {
    const userId = req.user; // Static user (replace with req.user.id if auth exists)

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Clear all items
    cart.items = [];

    // Save the updated cart
    await cart.save();

    res.json({
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const decreaseCartItemQty = async (req, res) => {
  try {
    const userId = req.user; // or req.user.id if using auth
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const item = cart.items[itemIndex];

    // Decrease qty
    item.qty -= 1;

    // Remove item if qty is 0
    if (item.qty <= 0) {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    res.json({
      message: "Cart item quantity decreased",
      cart,
    });

  } catch (error) {
    console.error("Decrease qty error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

