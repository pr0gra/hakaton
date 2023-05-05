import React from 'react'
import './Organizers.scss'
import OrgBox from '../../Elements/OrgBox/OrgBox'

import UnitLogo from '../../../assets/Org/unit.png'
import MtsLogo from '../../../assets/Org/mts.png'
import DodoLogo from '../../../assets/Org/dodo.png'

function Organizers() {
    return (
        <div className="container">
            <div className="organizers">
                <h1 className="organizers__title">Организатор</h1>
                <div className="organizers__section">
                    <OrgBox img={UnitLogo} />
                </div>

                {/* <h1 className="organizers__title">Партнёры</h1>
                <div className="organizers__section">
                    <OrgBox img={MtsLogo} />
                    <OrgBox img={DodoLogo} />
                </div> */}
            </div>
        </div>
    )
}

export default Organizers