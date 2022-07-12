import {NgcCookieConsentConfig} from 'ngx-cookieconsent';
import {environment} from '../../environments/environment';

export class Configs {
    public static COOKIE_CONFIG: NgcCookieConsentConfig = {
        cookie: {
            domain: environment.currentUrl
        },
        position: 'bottom-left',
        theme: 'classic',
        palette: {
            popup: {
                background: '#333A3D',
                text: '#ffffff',
                link: '#ffffff',
                border: '#555555'
            },
            button: {
                background: '#555555',
                text: '#ffffff',
                border: 'transparent'
            }
        },
        type: 'info',
        content: {
            message: 'This website uses cookies to ensure you get the best experience on our website.',
            dismiss: 'Got it!',
            link: 'Learn more',
            href: 'https://www.store4pet.net/cookie-policy',
        }
    };
}
