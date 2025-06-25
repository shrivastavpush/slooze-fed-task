import React, { useEffect } from 'react';

const TranslateDropdown = () => {
    useEffect(() => {
        // Only add the script if it's not already added
        if (!document.getElementById('google-translate-script')) {
            const addScript = document.createElement('script');
            addScript.id = 'google-translate-script';
            addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.body.appendChild(addScript);
        }

        // Initialize the translate element
        window.googleTranslateElementInit = googleTranslateElementInit;

        // Cleanup function
        return () => {
            // Remove the translate element when component unmounts
            const googleTranslateElement = document.querySelector('.goog-te-gadget');
            if (googleTranslateElement) {
                googleTranslateElement.remove();
            }
        };
    }, []);

    const googleTranslateElementInit = () => {
        // Clear any existing translate elements
        const existingElement = document.querySelector('.goog-te-gadget');
        if (existingElement) {
            existingElement.remove();
        }

        // Create new translate element with custom languages
        if (window.google && window.google.translate) {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    // Only include these languages
                    includedLanguages: 'en,hi,es,fr,de,ja,zh-CN,ar,pt,ru',
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false
                },
                'google_translate_element'
            );

            // Add custom styles to the dropdown
            const style = document.createElement('style');
            style.textContent = `
                /* Hide the Google branding */
                .goog-te-gadget img {
                    display: none !important;
                }
                
                /* Style the main container */
                .goog-te-gadget {
                    font-family: inherit !important;
                    color: #333 !important;
                    width: 100% !important;
                }
                
                /* Style the dropdown button */
                .goog-te-gadget-simple {
                    background-color: transparent !important;
                    border: 1px solid #e2e8f0 !important;
                    border-radius: 0.375rem !important;
                    padding: 0.5rem 2.5rem 0.5rem 1rem !important;
                    width: 100% !important;
                    height: auto !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: space-between !important;
                    cursor: pointer !important;
                    font-size: 0.875rem !important;
                    line-height: 1.25rem !important;
                    transition: all 0.2s !important;
                    position: relative !important;
                }
                
                .goog-te-gadget-simple::after {
                    content: '▼';
                    position: absolute !important;
                    right: 0.75rem !important;
                    top: 50% !important;
                    transform: translateY(-50%) !important;
                    font-size: 0.6rem !important;
                    color: #6b7280 !important;
                    pointer-events: none !important;
                }
                
                
                /* Hover and focus states */
                .goog-te-gadget-simple:hover,
                .goog-te-gadget-simple:focus {
                    border-color: #9ca3af !important;
                    outline: none !important;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
                }

                .goog-te-gadget-simple span a span:nth-child(3),
                .goog-te-gadget-simple span a span[aria-hidden="true"]{
                    display: none !important;
                }
                
                /* Style the dropdown menu */
                .goog-te-menu2 {
                    width: 100% !important;
                    max-width: 100% !important;
                    border: 1px solid #e5e7eb !important;
                    border-radius: 0.375rem !important;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
                    margin-top: 0.25rem !important;
                    overflow: hidden !important;
                }
                
                /* Style the dropdown items */
                .goog-te-menu2 > div {
                    padding: 0.5rem 1rem !important;
                    cursor: pointer !important;
                    transition: background-color 0.2s !important;
                }
                
                .goog-te-menu2 > div:hover {
                    background-color: #f3f4f6 !important;
                }
                
                /* Hide the language code in the dropdown */
                .goog-te-menu2-colmenu {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    };

    return (
        <div className='flex flex-col gap-2 w-full'>
            <p className="text-sm font-medium text-muted-foreground">Change Language</p>
            <div className="w-full" id="google_translate_element"></div>
        </div>
    );
};

export default TranslateDropdown;