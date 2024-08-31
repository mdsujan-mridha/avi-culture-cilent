import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ marginTop: 250 }}>
            <div className='bg-primary' style={{ borderTop: '2px solid #583ee6' }}>
                <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 justify-between pt-7 pb-11'>
                    <aside className='text-white'>
                        <h2 className='text-2xl font-bold'>Who are we?</h2>
                        <div>
                            <ul className=''>
                                <li className='pt-3 hover:text-accent font-bold'><Link href="">About Aviculture Hub</Link></li>
                                <li className='pt-2 hover:text-accent font-bold'><Link href="">Contact Us</Link></li>
                                <li className='pt-2 hover:text-accent font-bold'><Link href="">Privacy Policy</Link></li>
                                <li className='pt-2 hover:text-accent font-bold'><Link href="">Company News</Link></li>
                            </ul>
                        </div>
                    </aside>
                    <aside className='text-[#d1d1d1]'>
                        <h2 className='text-2xl font-bold'>Resources for breeders</h2>
                        <div>
                            <ul className=''>
                                <li className='pt-3 hover:text-accent font-bold'><Link href="">Glossary of Terms</Link></li>
                                <li className='pt-2 hover:text-accent font-bold'><Link href="">Bird Sale Calendar</Link></li>
                                <li className='pt-2 hover:text-accent font-bold'><Link href="">AviManage</Link></li>
                            </ul>
                        </div>
                    </aside>
                    <aside className='text-[#d1d1d1]'>
                        <h2 className='text-2xl font-bold'>Shopping with us</h2>
                        <div>
                            <ul className=''>
                                <li className='pt-3 hover:text-accent font-bold'><Link href="">Glossary of Terms</Link></li>
                                <li className='pt-2 hover:text-accent font-bold'><Link href="">Shipping & Returns</Link></li>
                                <li className='pt-3'>
                                    <div className='flex items-center'>
                                        <input className='p-3 ' type="text" readOnly placeholder='Search products...' style={{ outline: 'none' }} />
                                        <button className='ml-1 p-3 bg-accent hover:bg-secondary text-white font-bold text-xl' type="button">Search</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
            <div className='bg-black'>

            </div>
        </footer>
    );
};

export default Footer;