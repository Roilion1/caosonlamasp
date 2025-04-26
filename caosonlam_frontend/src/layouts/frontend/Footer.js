import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="bg-gray-800 py-10">
                <div className="container mx-auto text-white">
                    <section className="footer-top mb-10">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            <aside className="col">
                                <h6 className="font-bold text-lg mb-4">Brands</h6>
                                <ul className="space-y-2">
                                    <li><a href="st#" className="hover:underline">Adidas</a></li>
                                    <li><a href="st#" className="hover:underline">Puma</a></li>
                                    <li><a href="st#" className="hover:underline">Reebok</a></li>
                                    <li><a href="st#" className="hover:underline">Nike</a></li>
                                </ul>
                            </aside>
                            <aside className="col">
                                <h6 className="font-bold text-lg mb-4">Company</h6>
                                <ul className="space-y-2">
                                    <li><a href="st#" className="hover:underline">About us</a></li>
                                    <li><a href="st#" className="hover:underline">Career</a></li>
                                    <li><a href="st#" className="hover:underline">Find a store</a></li>
                                    <li><a href="st#" className="hover:underline">Rules and terms</a></li>
                                    <li><a href="st#" className="hover:underline">Sitemap</a></li>
                                </ul>
                            </aside>
                            <aside className="col">
                                <h6 className="font-bold text-lg mb-4">Help</h6>
                                <ul className="space-y-2">
                                    <li><a href="st#" className="hover:underline">Contact us</a></li>
                                    <li><a href="st#" className="hover:underline">Money refund</a></li>
                                    <li><a href="st#" className="hover:underline">Order status</a></li>
                                    <li><a href="st#" className="hover:underline">Shipping info</a></li>
                                    <li><a href="st#" className="hover:underline">Open dispute</a></li>
                                </ul>
                            </aside>
                            <aside className="col">
                                <h6 className="font-bold text-lg mb-4">Account</h6>
                                <ul className="space-y-2">
                                    <li><a href="st#" className="hover:underline">User Login</a></li>
                                    <li><a href="st#" className="hover:underline">User register</a></li>
                                    <li><a href="st#" className="hover:underline">Account Setting</a></li>
                                    <li><a href="st#" className="hover:underline">My Orders</a></li>
                                </ul>
                            </aside>
                            <aside className="col">
                                <h6 className="font-bold text-lg mb-4">Social</h6>
                                <ul className="space-y-2">
                                    <li><a href="st#" className="hover:underline"><i className="fab fa-facebook"></i> Facebook</a></li>
                                    <li><a href="st#" className="hover:underline"><i className="fab fa-twitter"></i> Twitter</a></li>
                                    <li><a href="st#" className="hover:underline"><i className="fab fa-instagram"></i> Instagram</a></li>
                                    <li><a href="st#" className="hover:underline"><i className="fab fa-youtube"></i> Youtube</a></li>
                                </ul>
                            </aside>
                        </div>
                    </section>
                    <section className="footer-bottom text-center">
                        <p className="text-white mb-4">Privacy Policy - Terms of Use - User Information Legal Enquiry Guide</p>
                        <p className="text-gray-500">© 2019 Company name, All rights reserved</p>
                    </section>
                </div>
            </footer>
        );
    }
}

export default Footer;
