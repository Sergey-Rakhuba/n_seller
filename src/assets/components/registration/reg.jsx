import React, { useState } from "react";
import './reg.css'
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { useLanguage } from "../../../context/LanguageContext";

export default function Registration({ onNavigateToHome }) {
    const { t } = useLanguage();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoginModalOpen(true);
    };

    return (
        <> 
            <Header onNavigateToHome={onNavigateToHome} />
            <form id="registration" action="" onSubmit={handleSubmit}>
                <h1>{t('registration.title')}</h1>
                <p>{t('registration.subtitle')}</p>
                <section>
                    <p>{t('registration.account')}</p>
                    <div className="block_input flex_row justify-sbw flex_wrap">
                        <div className="block_input-el">
                            <label htmlFor="email">{t('registration.email')}</label>
                            <input type="email" id="email" placeholder={t('registration.emailPlaceholder')} />
                        </div>
                        <div className="block_input-el">
                            <label htmlFor="password">{t('registration.password')}</label>
                            <input type="password" id="password" placeholder={t('registration.passwordPlaceholder')} />
                        </div>
                        {/* <div className="block_input-el">
                            <label htmlFor="confirm_password">Подтвердите пароль</label>
                            <input type="password" id="confirm_password" placeholder="Подтвердите ваш пароль" />
                        </div> */}
                    </div>
                </section>
                <section className="flex_column flex_sbw ">
                    <p>{t('registration.company')}</p>
                    <div className="block_input flex_column flex_sbw flex_wrap">
                        <div className="flex_row">
                            <div className="block_input-el">
                                <label htmlFor="nameCompany">{t('registration.companyName')}</label>
                                <input type="text" id="nameCompany" placeholder={t('registration.companyNamePlaceholder')} />
                            </div>
                            <div className="block_input-el">
                                <label htmlFor="country">{t('registration.country')}</label>
                                <input type="text" id="country" placeholder={t('registration.countryPlaceholder')} />
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="block_input-el">
                                <label htmlFor="city">{t('registration.city')}</label>
                                <input type="text" id="city" placeholder={t('registration.cityPlaceholder')} />
                            </div>
                            <div className="block_input-el">
                                <label htmlFor="adres">{t('registration.address')}</label>
                                <input type="text" id="adres" placeholder={t('registration.addressPlaceholder')} />
                            </div>
                        </div>

                        <div className="flex_row">
                            <div className="block_input-el">
                                <label htmlFor="postIndex">{t('registration.zip')}</label>
                                <input type="text" id="postIndex" placeholder={t('registration.zipPlaceholder')} />
                            </div>
                            <div className="block_input-el">
                                <label htmlFor="phoneCompany">{t('registration.phone')}</label>
                                <input type="text" id="phoneCompany" placeholder={t('registration.phonePlaceholder')} />
                            </div>
                        </div>
                        <div className="flex_row">
                            <div className="block_input-el">
                                <label htmlFor="siteCompany">{t('registration.website')}</label>
                                <input type="text" id="siteCompany" placeholder={t('registration.websitePlaceholder')} />
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <p>{t('registration.contactPerson')}</p>
                    <div className="block_input flex_row justify-sbw flex_wrap">
                        <div className="block_input-el">
                            <label htmlFor="name">{t('registration.fullname')}</label>
                            <input type="text" id="name" placeholder={t('registration.fullnamePlaceholder')} />
                        </div>
                        <div className="block_input-el">
                            <label htmlFor="phone">{t('registration.mobile')}</label>
                            <input type="tel" id="phone" placeholder={t('registration.mobilePlaceholder')} />
                        </div>
                    </div>
                </section>

                <div className="flex_row flex_sbw checkbox_terms">
                    <input type="checkbox" /> 
                     <p> {t('registration.terms')} 
                        <a href="">{t('registration.termsLink')}</a> 
                        {t('registration.and')} 
                        <a href="">{t('registration.privacyLink')}</a> 
                        NOVO  
                        </p>
                </div>
                <button type="submit"  className="btn_get-started">{t('registration.continue')}</button>



            </form>
            <Footer />
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)} 
            />
        </>
    );
}