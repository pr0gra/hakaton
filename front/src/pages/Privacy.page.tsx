import React from 'react'
import '../styles/privacy.page.scss'
import Header from '../components/Elements/Header/Header'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowIocn } from '../assets/icons/arrow.svg'

function Privacy() {
    const navigate = useNavigate();

    const goback = () => {
        navigate(-1)
    }

    return (
        <>
            <div className="privacy">
                <header className="privacy__header">
                    <button
                        className="privacy__goback"
                        onClick={goback}
                    >
                        <ArrowIocn className="privacy__arrow" />
                    </button>
                    <h1 className="privacy__title">Политика Конфиденциальности</h1>
                </header>
                <div className="privacy__content">
                    <h2 className="privacy__sub-title">1. Общие положения</h2>
                    <p className="privacy__text">
                        Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. № 152-ФЗ «О персональных данных» (далее — Закон о персональных данных) и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые Пупкин Максим Владимирович (далее — Оператор).
                    </p>
                    <ol className="privacy__list">
                        <li className="privacy__item privacy__text">Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.</li>
                        <li className="privacy__item privacy__text">Настоящая политика Оператора в отношении обработки персональных данных (далее — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://unithack.</li>
                    </ol>

                    <h2 className="privacy__sub-title">2. Основные понятия, используемые в Политике</h2>
                    <ol className="privacy__list">
                        <li className="privacy__item privacy__text">Автоматизированная обработка персональных данных — обработка персональных данных с помощью средств вычислительной техники.</li>
                        <li className="privacy__item privacy__text">Блокирование персональных данных — временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).</li>
                    </ol>
                </div>
            </div>
        </>
    )
}

export default Privacy