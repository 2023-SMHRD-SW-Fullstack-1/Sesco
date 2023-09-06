import React from "react";
import './locallist.css'

const Local = () => {
  return (
    <>
        <div class="wrapper">
        <div class="card">
            <div class="front">
            <h1>Signature</h1>
            <p>7.7 deck<span>2018</span></p>
            <p class="price">$ 89.00</p>
            </div>
            <div class="right">
            <h2>Signature</h2>
            <ul>
                <li>Width 7.7"</li>
                <li>Length  31.75"</li>
                <li>Wheelbase 14"</li>
                <li>Nose  6.875"</li>
                <li>Tail  6.25"</li>
            </ul>
            <button>Add to cart, yo</button>
            </div>
        </div>
        <div class="img-wrapper">
            
        </div>
        </div>
    </>
  )
}

export default Local

