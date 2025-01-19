import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Main({
    records=[], 
    currentPage, 
    setCurrentpage, 
    nPage, 
    numbers, 
    categories, 
    onCategoryChange, 
    onSearchChange}){

    const [cart, setCart] = useState([]);

    const navigate= useNavigate();
    const handleLogout= ()=>{
        navigate('/Login')
    }

      const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Remove item from cart by index
  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  // Extract numeric value from the price string
  const extractPrice = (price) => {
    return parseFloat(price.replace(/[^0-9.-]+/g, "")); // Removes any non-numeric characters like "$"
  };

  // Calculate total price of items in the cart
  const totalPrice = cart.reduce((total, item) => total + extractPrice(item.price), 0);

  // Handle Buy All action
  const handleBuyAll = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Here you can integrate with your payment or checkout system
    // For demonstration, we'll just alert the total price and clear the cart
    alert(`Thank you for your purchase! Total: $${totalPrice.toFixed(2)}`);
    setCart([]);
  };

    function prePage(){
        if(currentPage !== 1){
            setCurrentpage(currentPage - 1);
        }
    }
    function changeCPage(id){
        setCurrentpage(id);
    }
    function nextPage(){
        if(currentPage !== nPage){
            setCurrentpage(currentPage + 1);
        }
    }
  return (
    <div className='main-foodyzone'>
        <section className="header">
            <div className="heading-foodyzone">
                <h1 className="heading">FoodyZone</h1>
            </div>
            <div className="foodyzone-links">
                <ul>
                    {categories.map((category,id) =>{
                        return(
                    <li key={id}>
                        <a href="#" className="link" onClick={()=> onCategoryChange(category)}>{category}</a>
                    </li>
                    )
                    })}
                </ul>
            </div>
            <div className="search-foodyzone">
                <input className='search-input' type="text" placeholder='Enter Food' onChange={(e)=> onSearchChange(e.target.value)}/>
                <button className="login-btn" onClick={handleLogout}>Logout</button>
            </div>
        </section>
        <div className="bg">
        <section className="main">
        <div className="boxes">
          {records.length > 0 ? (
            records.map((data) => (
              <div className="box" key={data.id}>
                <div className="box-img">
                  <img src={data.image} alt={data.heading} />
                </div>
                <div className="box-info">
                  <h1 className="box-heading">{data.heading}</h1>
                  <p className="box-text">{data.text}</p>
                  <button className="box-btn" onClick={() => addToCart(data)}>
                    {data.price}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No records available</p>
          )}
        </div>
        </section>
         <section className="cart-section">
            <div className="cart">
          <h2>Cart</h2>
          <div className="cart-items">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div className="cart-item" key={index}>
                  <span>{item.heading}</span>
                  <span>${extractPrice(item.price).toFixed(2)}</span>
                  <button className="remove-btn" onClick={() => removeFromCart(index)}>X</button>
                </div>
              ))
            ) : (
              <p>No items in cart</p>
            )}
          </div>
          <div className="cart-total">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
           <button className="buy-btn" onClick={handleBuyAll}>Buy All</button>
          </div>
        </section>
        <section className="pages-main">
            <div className="pages">
            <ul>
                <li>
                    <a href="#" onClick={prePage}>Previous</a>
                </li>
                {numbers.map((n,i)=>(
                <li key={i}>
                    <a href="#" onClick={()=> changeCPage(n)}>{n}</a>
                </li>
                ))}
                <li>
                    <a href="#" onClick={nextPage}>Next</a>
                </li>
            </ul>
        </div>
        </section>
        </div>
    </div>
  )
}

export default Main
