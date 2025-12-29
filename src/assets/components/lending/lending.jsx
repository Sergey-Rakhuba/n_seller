import React from "react";
import './lending.css';

export default function Lending() {
    return (
        <>
            <div className="lending_page">
                <header className="lending_header flex_row flex_btw align-center container_lending">
                    <div className="nav">
                        <div className="logo">N<span>.</span>SELLER</div>

                    </div>
                    <div className="links">
                        <a href="#home">Маркетплейс</a>
                        <a href="#about">Про нас </a>
                        <a href="#services">Преемущества</a>
                        <a href="#contact">Тарифы</a>
                    </div>
                    <div className="btn_sing-up">
                        <button>Войти</button>
                    </div>
                </header>
                <section>
                    <div className="lending_main_bg ">
                        <div className="main_text container_lending">
                            <h5>
                                Novo - маркетплейс техники
                            </h5>
                            <h1>Продавай технику быстро и удобно! </h1>
                            <button className="btn_get-started">стать продавцем на Novo</button>

                        </div>

                    </div>
                </section>
                <section>
                    <div className="container_lending">
                        <h5>
                            Про компанию
                        </h5>
                        <h1>
                            NOVO - торговая площадка коммерческого транспорта и тяжелой техники
                        </h1>
                        <div className="img_block flex_row justify-sbw">
                            <div className="img_item">
                                <img src="/lending/about1.png" alt="about1" />
                                <p>Коммерческий транспорт</p>
                            </div>
                            <div className="img_item">
                                <img src="/lending/about2.png" alt="about2" />
                                <p>Сельскохоз техника</p>
                            </div>
                            <div className="img_item">
                                <img src="/lending/about3.png" alt="about3" />
                                <p>Строительная техника</p>
                            </div>
                            <div className="img_item">
                                <img src="/lending/about4.png" alt="about4" />
                                <p>Складское оборудование</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section></section>
                <section></section>
                <section></section>
                <section></section>
                <footer></footer>
            </div>

        </>

    )
}