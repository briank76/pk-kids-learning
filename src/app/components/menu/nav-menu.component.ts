import { routingModule } from "../../../routing/routing";
import * as htmlContent from 'bundle-text:./nav-menu.component.html';
import * as scssContent from 'bundle-text:./nav-menu.component.scss';

export class NavMenuComponent extends HTMLElement {
    constructor() {
        super();
    }

    public connectedCallback() {
        console.log('hi');
        const shadow = this.attachShadow({mode: 'open'});
        const content = new DOMParser().parseFromString(htmlContent, 'text/html');
        const styles = document.createElement('style');
        styles.textContent = scssContent;

        shadow.appendChild(styles);
        content.body.childNodes.forEach((x) => {
            shadow.appendChild(x);
        });
        this.addEventListeners(shadow);
    }

    private addEventListeners(shadow: ShadowRoot) {
        const routeLinks = shadow.querySelectorAll('[route-link]');
        console.log('routeLinks');
        console.log(routeLinks);
        routeLinks.forEach(rl => 
            rl.addEventListener('click', (e) => {
                e.preventDefault();
                const menuState = shadow.getElementById('menustate') as HTMLInputElement;
                if (menuState) {
                    menuState.checked = false;
                }
                if (e && e.currentTarget) {
                    const ct = e.currentTarget as HTMLAnchorElement
                    routingModule.navigate(ct.href);
                }
            })
        );
    }
}

customElements.define('nav-menu', NavMenuComponent);