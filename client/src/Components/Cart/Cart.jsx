import { useDispatch, useSelector } from "react-redux";
import "./Cart.scss";
import { removeItem, resetCart } from "../../redux/cartReducer";
import {loadStripe} from '@stripe/stripe-js';
import http from "../../services/httpService";

const Cart = () => {
   
    const data = useSelector(state => state.cart.products);
    const dispatch = useDispatch();

    const totalPrice = () => {
        let total = 0;
        data.forEach(x => {
            total += x.price * x.quantity;
        });
        return total.toFixed(2);
    }

    const stripePromise = loadStripe('pk_test_51ND9inKIa07q33wPqN2mVqWV2OZeuSWeyvI347xU8cMeLTznS8UBxpksS7LdhuntD6NkmrjtHBk9es7yD0MD7KFP00i5FZejGf');


    const handlePayment = async () => {
        try{
            const stripe = await stripePromise;
            const res = await http.post("/stripe",{
                products : data
            });
            await stripe.redirectToCheckout({
                sessionId: res.data.id
            });
        }
        catch(err){
            console.log(err);
        }
    }

    return ( 
        <div className="cart">
            <h1>Products in your Cart</h1>
            {data.map((item)=>(
                <div className="item" key={item.id}>
                    <img src={item.img} key={item.id} alt="" />
                    <div className="details">
                        <h1>{item.title}</h1>
                        <p>{item.desc.substring(0,100)}</p>
                        <div className="price">${item.quantity} x ${item.price}</div>
                    </div>
                    <i className="fa fa-trash delete" aria-hidden="true" onClick={() => dispatch(removeItem(item.id))}></i>
                </div>
            ))}
            <div className="total">
                <span>SUBTOTAL</span>
                <span>${totalPrice()}</span>
            </div>
            <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
            <span className="reset" onClick={() => dispatch(resetCart())}>Reset Cart</span>
        </div>
     );
}
 
export default Cart;