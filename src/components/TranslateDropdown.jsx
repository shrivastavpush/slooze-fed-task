import React, { useEffect } from 'react';

const TranslateDropdown = () => {
    useEffect(() => {
        if (!document.getElementById('google-translate-script')) {
            const addScript = document.createElement('script');
            addScript.id = 'google-translate-script';
            addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.body.appendChild(addScript);
        }

        window.googleTranslateElementInit = googleTranslateElementInit;

        return () => {
            const googleTranslateElement = document.querySelector('.goog-te-gadget');
            if (googleTranslateElement) {
                googleTranslateElement.remove();
            }
        };
    }, []);

    const googleTranslateElementInit = () => {
        const existingElement = document.querySelector('.goog-te-gadget');
        if (existingElement) {
            existingElement.remove();
        }
        if (window.google && window.google.translate) {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: 'en,hi,es,fr,de,ja,zh-CN,ar,pt,ru',
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false
                },
                'google_translate_element'
            );

            const style = document.createElement('style');
            style.textContent = `
                .goog-te-gadget img {
                    display: none !important;
                }
                
                .goog-te-gadget {
                    font-family: inherit !important;
                    color: var(--foreground) !important;
                    width: 100% !important;
                }
                
                .goog-te-gadget-simple {
                    background-color: var(--background) !important;
                    border: 1px solid var(--border) !important;
                    color: var(--foreground) !important;
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
                    color: var(--muted-foreground) !important;
                    pointer-events: none !important;
                }
                
                .goog-te-gadget-simple:hover,
                .goog-te-gadget-simple:focus {
                    border-color: var(--primary) !important;
                    outline: none !important;
                    box-shadow: 0 0 0 2px var(--ring) !important;
                }

                .goog-te-gadget-simple span a {
                    color: var(--foreground) !important;
                    text-decoration: none !important;
                }

                .goog-te-gadget-simple span a span:nth-child(3),
                .goog-te-gadget-simple span a span[aria-hidden="true"] {
                    display: none !important;
                }
                
                .goog-te-menu2 {
                    width: 100% !important;
                    max-width: 100% !important;
                    background-color: var(--background) !important;
                    border: 1px solid var(--border) !important;
                    border-radius: 0.375rem !important;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
                    margin-top: 0.25rem !important;
                    overflow: hidden !important;
                }
                
                .goog-te-menu2 > div {
                    padding: 0.5rem 1rem !important;
                    cursor: pointer !important;
                    transition: background-color 0.2s !important;
                    color: var(--foreground) !important;
                }
                
                .goog-te-menu2 > div:hover {
                    background-color: var(--muted) !important;
                }
                
                .goog-te-menu2-colmenu {
                    display: none !important;
                }
                
                .goog-te-menu2-item-selected {
                    background-color: var(--muted) !important;
                }
                
                .goog-te-menu2-item-checkbox {
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