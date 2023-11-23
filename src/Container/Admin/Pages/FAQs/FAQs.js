import React from 'react'
import Breadcrumbs from '../../../../Components/Breadcrumbs/Breadcrumbs';
import './Faqs.css';

const FAQs = () => {
    return (
        <div>
            <Breadcrumbs list={["Dashboard", "Faqs"]} />

            <div className='mt-4'>
                <div className='faq_box'>
                    <h6> 1- What is Lorem Ipsum? </h6>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged. It was popularised in
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more reently with desktop publishing software like Aldus PageMaker
                        luding versions of Lorem Ipsum. </p>
                </div>

                <div className='faq_box'>
                    <h6> 1- What is Lorem Ipsum? </h6>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged. It was popularised in
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more reently with desktop publishing software like Aldus PageMaker
                        luding versions of Lorem Ipsum. </p>
                </div>

                <div className='faq_box'>
                    <h6> 1- What is Lorem Ipsum? </h6>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged. It was popularised in
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more reently with desktop publishing software like Aldus PageMaker
                        luding versions of Lorem Ipsum. </p>
                </div>
            </div>
        </div>
    )
}

export default FAQs;