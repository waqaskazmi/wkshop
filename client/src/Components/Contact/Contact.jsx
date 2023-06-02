import "./Contact.scss";

const Contact = () => {
    return ( 
        <div className="contact">
            <div className="wrapper">
                <span>BE IN TOUCH WITH US:</span>
                <div className="mail">
                    <input type="text" placeholder="Enter your email..." />
                    <button>JOIN US</button>
                </div>
                <div className="icons">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                    <i className="fa fa-google" aria-hidden="true"></i>
                    <i className="fa fa-pinterest" aria-hidden="true"></i>
                </div>
            </div>
        </div>
     );
}
 
export default Contact;