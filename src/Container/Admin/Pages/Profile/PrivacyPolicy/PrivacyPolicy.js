import React from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../../../../Components/Breadcrumbs/Breadcrumbs';
import { BsArrowLeftShort } from "react-icons/bs";

const PrivacyPolicy = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Breadcrumbs list={["Dashboard", "Privacy & Policy"]} />

            <div className='material_main'>
                <h5> <BsArrowLeftShort onClick={() => navigate(-1)} /> Privacy & Policy</h5>

                <div className='mt-5'>
                    <div className='privacy_data'>
                        <h6>1. Types data we collect</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                        </p>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                        </p>
                    </div>

                    <div className='privacy_data'>
                        <h6>2. Use of your personal data</h6>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae.
                        </p>
                        <p>
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                        </p>
                    </div>

                    <div className='privacy_data'>
                        <h6>3. Disclosure of your personal data</h6>
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
                            praesentium voluptatum deleniti atque corrupti quos dolores et quas 
                            molestias excepturi sint occaecati cupiditate non provident, similique
                             sunt in culpa qui officia deserunt mollitia animi, id est laborum et 
                             dolorum fuga.
                        </p>
                    </div>

                    <div>
                        <button onClick={() => navigate(-1)} className='back_btn'>Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PrivacyPolicy