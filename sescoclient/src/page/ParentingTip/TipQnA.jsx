import React, { useState } from 'react';

const TipQnA = () => {
    const [activeButtonId, setActiveButtonId] = useState(null);

    const handleToggle = (buttonId) => {
        if (activeButtonId === buttonId) {
            setActiveButtonId(null);
        } else {
            setActiveButtonId(buttonId);
        }
    };

    return (
        <div>
            <div className="container">
                <h2>Tip</h2>
                <div className="accordion">
                {/* 버튼１ */}
                    <div className="accordion-item">

                        <button id="accordion1" aria-expanded={activeButtonId === 'accordion1' ? 'true' : 'false'}
                            onClick={() => handleToggle('accordion1')}>
                            <span className="accordion-title">Why is the moon sometimes out during the day?</span>
                            <span className="icon" aria-hidden="true"></span>
                        </button>
                        {/* 버튼 클릭시 나오는 텍스트 */}
                        <div className="accordion-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.</p>
                        </div>
                    </div>
                    
                     {/* 버튼２ */}
                    <div className="accordion-item">

                        <button id="accordion2" aria-expanded={activeButtonId === 'accordion2' ? 'true' : 'false'}
                            onClick={() => handleToggle('accordion2')}>
                            <span className="accordion-title">Why is the sky blue?</span>
                            <span className="icon" aria-hidden="true"></span>
                        </button>
                        {/* 버튼 클릭시 나오는 텍스트 */}
                        <div className="accordion-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.</p>
                        </div>
                    </div>
                     {/* 버튼３ */}
                    <div className="accordion-item">

                        <button id="accordion３" aria-expanded={activeButtonId === 'accordion３' ? 'true' : 'false'}
                            onClick={() => handleToggle('accordion３')}>
                            <span className="accordion-title">Why is the sky blue?</span>
                            <span className="icon" aria-hidden="true"></span>
                        </button>
                        {/* 버튼 클릭시 나오는 텍스트 */}
                        <div className="accordion-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.</p>
                        </div>
                    </div>
                     {/* 버튼４ */}
                    <div className="accordion-item">

                        <button id="accordion４" aria-expanded={activeButtonId === 'accordion４' ? 'true' : 'false'}
                            onClick={() => handleToggle('accordion４')}>
                            <span className="accordion-title">Why is the sky blue?</span>
                            <span className="icon" aria-hidden="true"></span>
                        </button>
                        {/* 버튼 클릭시 나오는 텍스트 */}
                        <div className="accordion-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum sagittis vitae et leo duis ut. Ut tortor pretium viverra suspendisse potenti.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TipQnA