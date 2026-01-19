import React, { useState, useEffect, useRef } from "react";
import './lending.css';
import BtnLen from "./btnlen.jsx";
import { Backend } from "firebase/ai";
import Footer from "../footer/footer.jsx";
import SupportModal from "../SupportModal/SupportModal.jsx";
import Header from "../header/Header.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { useLanguage } from '../../../context/LanguageContext';

export default function Lending({ onNavigateToRegistration, onNavigateToHome }) {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isImgBlockVisible, setIsImgBlockVisible] = useState(false);
    const [isContactVisible, setIsContactVisible] = useState(false);
    const [visibleItems, setVisibleItems] = useState({});
    const [isMainTextVisible, setIsMainTextVisible] = useState(false);
    const [isPreferVisible, setIsPreferVisible] = useState(false);
    const [isPricesVisible, setIsPricesVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const imgBlockRef = useRef(null);
    const itemsRef = useRef([]);
    const mainTextRef = useRef(null);
    const preferRef = useRef(null);
    const pricesRef = useRef(null);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsImgBlockVisible(true);
                    observer.disconnect(); // Run animation only once
                }
            },
            {
                threshold: 0.5 // Trigger when 50% of the block is visible
            }
        );

        if (imgBlockRef.current) {
            observer.observe(imgBlockRef.current);
        }

        return () => {
            if (imgBlockRef.current) {
                observer.unobserve(imgBlockRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = entry.target.getAttribute('data-index');
                        setVisibleItems((prev) => ({ ...prev, [index]: true }));
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.5
            }
        );

        itemsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsMainTextVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1
            }
        );

        if (mainTextRef.current) {
            observer.observe(mainTextRef.current);
        }

        return () => {
            if (mainTextRef.current) {
                observer.unobserve(mainTextRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsPreferVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        if (preferRef.current) observer.observe(preferRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsPricesVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (pricesRef.current) observer.observe(pricesRef.current);
        return () => observer.disconnect();
    }, []);



    return (
        <>
            <div className="lending_page">
                <header className="lending_header  container_lending">
                    <div className="container flex_row flex_btw align-center">
                        <div className="nav">
                            <div className="logo">N<span>.</span>SELLER</div>

                        </div>

                        <div className={`burger_menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                            <span></span>
                            <span></span>
                        </div>

                        <div className={`mobile_menu_wrapper ${isMenuOpen ? 'open' : ''}`}>
                            <div className="links">
                                <a href="#start_selling" onClick={() => setIsMenuOpen(false)}>Маркетплейс</a>
                                <a href="#about_us" onClick={() => setIsMenuOpen(false)}>Про нас </a>
                                <a href="#services" onClick={() => setIsMenuOpen(false)}>Преемущества</a>
                                <a href="#tariffs" onClick={() => setIsMenuOpen(false)}>Тарифы</a>
                            </div>
                            <div className="btn_sing-up">
                                <button onClick={() => setIsLoginModalOpen(true)}>{t('lending.menu.login')}</button>
                            </div>
                        </div>
                    </div>

                    {/* <div className="nav_links flex_row flex_btw align-center"></div> */}

                </header>
                <section>
                    <div className="lending_main_bg ">
                        <div className="container">
                            <div className={`main_text container_lending ${isMainTextVisible ? 'visible' : ''}`} ref={mainTextRef}>
                                <h5>
                                    Novo - маркетплейс техники
                                </h5>
                                <h1 className={isMainTextVisible ? 'visible' : ''}>Продавай технику быстро и удобно! </h1>
                                {/* <button className="btn_get-started">
                                    стать продавцом на Novo
                                </button> */}
                                {BtnLen(t('lending.main.btn'), "#start_selling")}

                            </div>
                        </div>


                    </div>
                </section>
                <section id="about_us">
                    <div className="container_lending">
                        <div className="container">
                            <h5 className="text-center ">
                                Про компанию
                            </h5>
                            <h2>
                                NOVO - торговая площадка коммерческого транспорта и тяжелой техники
                            </h2>
                            <div className={`img_block flex_row justify-sbw flex-wrap ${isImgBlockVisible ? 'visible' : ''}`} ref={imgBlockRef}>
                                <div className="img_item mar_top-92" style={{ background: `linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.6) 100%), url(/lending/about1.png) no-repeat center` }}>
                                    <p >Коммерческий транспорт</p>
                                    {/* <img src="/lending/about1.png" alt="about1" /> */}

                                </div>
                                <div className="img_item mar_top-157" style={{ background: `linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.6) 100%), url(/lending/about2.png) no-repeat center` }}>
                                    <p>Сельскохоз техника</p>
                                </div>
                                <div className="img_item mar_top-92" style={{ background: `linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.6) 100%), url(/lending/about3.png) no-repeat center` }}>
                                    <p>Строительная техника</p>
                                </div>
                                <div className="img_item mar_top-30 " style={{ background: `linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.6) 100%), url(/lending/about4.png) no-repeat center` }}>
                                    <p>Складское оборудование</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <section id="services" className="bg_color-dark">
                    <div className="container_lending">
                        <div className="container ">
                            <div className={`text_block_prefer flex_row flex_around align-center ${isPreferVisible ? 'visible' : ''}`} ref={preferRef}>
                                <p>Понятный <br /> мессенджер</p>
                                <p className="mar_bottom-40">Удобный <br /> дизайн</p>
                                <p>Круглосуточная <br />поддержка</p>
                            </div>
                            <div className="block_prefer " ref={preferRef}>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="tariffs">
                    <div className={`container_lending block_prices ${isPricesVisible ? 'visible' : ''}`} ref={pricesRef}>
                        <div className="container  padd_top-120 ">
                            <h5 className="text-center ">
                                Тарифы и цены
                            </h5>
                            <h2>
                                Стань продавцом сегодня и получи 10 объявлений бесплатно!
                            </h2>
                            <div className="img_block flex_row flex-wrap flex_btw padd_top-120" ref={pricesRef}>
                                <a href="">
                                    <div className={`item_coin flex_column flex_btw ${isPricesVisible ? 'visible' : ''}`}>
                                        <div className="pattern-circle one-ring"></div>

                                        <p>Starter</p>
                                        <h3>Бесплатно</h3>
                                        <p><span>До 10 объявлений</span></p>
                                        <div className="arrow_btn"></div>
                                    </div>
                                </a>
                                <a href="">
                                    <div className={`item_coin flex_column flex_btw ${isPricesVisible ? 'visible' : ''}`}>
                                        <div className="pattern-circle two-rings"></div>

                                        <p>Premium</p>
                                        <h3><span>$</span>999<span>в месяц</span></h3>
                                        <p><span>До 30 объявлений</span></p>
                                        <div className="arrow_btn"></div>
                                    </div>
                                </a>
                                <a href="">

                                    <div className={`item_coin flex_column flex_btw ${isPricesVisible ? 'visible' : ''}`}>
                                        <div className="pattern-circle three-rings"></div>
                                        <p>Ultimate</p>
                                        <h3><span>$</span>1999<span>в месяц</span></h3>
                                        <p><span>До 50 объявлений</span></p>
                                        <div className="arrow_btn"></div>
                                    </div>
                                </a>
                            </div>
                            <div className="flex_row padd_top-120 flex_ctr">
                                <div className="item_coin_note">
                                    <img src="../../../public/lending/Mockup.png" alt="" />
                                </div>
                                <div className="flex_column flex_ctr">
                                    <div className="item_coin_at flex_column align-center">
                                        <p>Хотите размещать больше 50-ти объявлений в месяц? </p>
                                        <span>Мы предложим индивидуальные условия сотрудничества!</span>
                                        <button>отдел продаж</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <section id="start_selling" className="bg_color-dark">
                    <div className="container_lending padd_top-120 mar_bottom-60">
                        <div className="container ">
                            <div className="text_block_contact  flex_around align-center">
                                <h2>Начать продавать легко!</h2>
                                <div className={`flex_row sall_items ${visibleItems[0] ? 'visible' : ''}`} ref={el => itemsRef.current[0] = el} data-index="0">
                                    <div className="flex_item"><img src="../../../public/lending/sall_1.png" alt="" /></div>
                                    <div className="flex_item order-mobile">
                                        <div className="text_block-flex">
                                            <span>
                                                Шаг первый
                                            </span>
                                            <h4>Регистрация</h4>
                                        </div>

                                    </div>
                                </div>
                                <div className={`flex_row sall_items flex_wrap ${visibleItems[1] ? 'visible' : ''}`} ref={el => itemsRef.current[1] = el} data-index="1">
                                    <div className="flex_item order-mobile">
                                        <div className="text_block-flex">
                                            <span>
                                                Шаг второй
                                            </span>
                                            <h4>Выбор пакета</h4>
                                        </div>
                                    </div>
                                    <div className="flex_item"><img src="../../../public/lending/sall_2.png" alt="" /></div>
                                </div>
                                <div className={`flex_row sall_items ${visibleItems[2] ? 'visible' : ''}`} ref={el => itemsRef.current[2] = el} data-index="2">
                                    <div className="flex_item"><img src="../../../public/lending/sall_3.png" alt="" /></div>
                                    <div className="flex_item  order-mobile">
                                        <div className="text_block-flex">
                                            <span>
                                                Шаг первый
                                            </span>
                                            <h4>Размещение <br /> объявления</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="button_block flex_column flex_ctr mar_top-92">
                                    {BtnLen(t('lending.startSelling.btn'), onNavigateToRegistration)}
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                <Footer onOpenSupport={() => setIsModalOpen(true)} />

                <SupportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={onNavigateToHome} />
            </div>
        </>

    )
}