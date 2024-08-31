import React, { Fragment, useEffect } from 'react';
import missionImg from "../images/about/a-1.jpg";
import vissionImg from "../images/about/a-2.jpg";
import aboutImg from "../images/about/a-3.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const About = () => {

    useEffect(() => {

        AOS.init({
            duration: 1000,
        });

    }, [])

    const aboutUsData = [
        {
            _id: 1,
            title: "Mission",
            image: missionImg,
            description: " Our goal as Aviculture Management System is to enhance bird-human relations on a worldwide basis. With the help of our platform, avian enthusiasts may interact, exchange knowledge, and put the safety of birds first. rooted in the ideals of conservation, ethical behavior, and community involvement, we promote deep connections while maintaining honesty in all of our dealings. We hope to promote a greater respect for birds, encourage responsible ownership, and aid in the preservation of avian species through education and support for conservation programs. Take part on our mission to build a world where wildlife and nature lovers exist in love."
        },
        {
            _id: 2,
            title: "Vision",
            image: vissionImg,
            description: " Our vision as Aviculture Management System is to lead the worldwide change of the avian  business by establishing a standard of sustainability, quality, and compassion. The objective is for our platform to become a worldwide center for bird enthusiasts,providing innovative ideas that improve user experience and advance the safety of birds.We work to build a world where birds are valued, protected, and celebrated, with a focus on global reach, compassion, sustainability, and education. Help us create the future in which Birds Sales as well as Buy acts as an energy of hope for all bird lovers  worldwide. "
        }
    ]
    return (
        <Fragment>
            <div className='px-12 min-h-screen'>
                <h1 className='text-5xl font-bold text-center border-b-2 py-10 text-white'>  About us </h1>
                <div data-aos="fade-right" className='w-1/2 mx-auto'>
                    <p className='text-center text-2xl pt-9 font-bold text-white'>
                        An Aviculture Management System worldwide online community for avian enthusiasts .
                        We encourage excellence, ethics, and the care of birds by creating a community where
                        lovers may interact, exchange, and share experiences. Our global marketplace facilitates
                        interactions between trustworthy breeders, informed sellers, and concerned enthusiasts
                        by providing a large variety of bird species for purchase, sale, adoption, bird accessories
                        ,and medicine. To enable users to provide their delicate companions the greatest care
                        possible, we place an emphasis on ethical methods and offer educational materials,
                        professional advice, and educational resources. Please enjoy the wonders of birds with us
                        as we advocate for ethical ownership and international conservation initiatives.
                    </p>
                </div>
                <div data-aos="fade-up-left" className='w-1/2 mx-auto'>
                    <img className='rounded-xl py-10' src={aboutImg} alt="about us" />
                </div>
                <div className='flex gap-10 flex-col'>
                    {
                        aboutUsData.map((data, index) => (
                            <div className={`flex gap-5 justify-center items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`} key={data._id}>
                                <img data-aos="zoom-in-left" className='w-1/2' src={data.image} alt="about us" />
                                <div data-aos="zoom-in-right" className='w-1/2'>
                                    <h1 className='text-5xl font-bold border-b-2 py-3 text-white'> {data.title} </h1>
                                    <p className='text-xl font-bold pt-3 text-white'> {data.description} </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default About;