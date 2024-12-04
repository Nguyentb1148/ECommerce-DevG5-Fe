import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail, MdLocalPhone } from "react-icons/md";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="w-full py-4 bg-gray-950 text-white">
      <div className="w-[80%] mx-auto grid text-center justify-items-center gap-6 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
        <div id="contact ">
          <h3 className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl">DEVSHOP</h3>
          <p className=" text-white/70  pt-3">We are dedicated to the safety of our guests
            and employees and have updated our safety measures.</p>
          <div className="flex justify-center mt-4">
            <FaFacebook className="icon-footer" />
            <FaInstagram className="icon-footer" />
            <FaTwitter className="icon-footer" />
            <FaYoutube className="icon-footer" />
          </div>
        </div>
        <div className="grid place-items-center">
          <h3 className="title-footer">Information</h3>
          <ul className="">
            <li className="item-footer">About Us</li>
            <li className="item-footer">Contact US</li>
            <li className="item-footer">FAQ's</li>
            <li className="item-footer">Special Products</li>
          </ul>
        </div>
        <div className="grid place-items-center">
          <h3 className="title-footer">Category</h3>
          <ul>
            <li className="item-footer">Laptop</li>
            <li className="item-footer">SmartPhone</li>
            <li className="item-footer">SmartWatch</li>
            <li className="item-footer">HeadPhone</li>
          </ul>
        </div>
        <div className="">
          <h3 className="title-footer grid place-items-center">Contact</h3>
          <div className="flex mt-2">
            <IoLocationOutline className="contact-footer" />
            <span className="text-footer">116-118 Mai Thúc Lân</span>
          </div>
          <div className="flex mt-3">
            <MdOutlineEmail className="contact-footer" />
            <span className="text-footer">devshop@gmail.com</span>
          </div>
          <div className="flex mt-3">
            <MdLocalPhone className="contact-footer" />
            <span className="text-footer">+84 69696969</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;