//import { LitElement } from 'lit';
//import { customElement } from 'lit/decorators.js';
import * as scssData from 'bundle-text:./completion-checklist.scss';
import htmlData from 'bundle-text:./completion-checklist.html';

//@customElement('completion-checklist-component')
export class CompletionChecklistComponent extends HTMLElement {
    constructor() {
        super();
    }

    public connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'});
        const htmlContent = new DOMParser().parseFromString(htmlData, 'text/html');
        const styles = document.createElement('style');
        styles.textContent = scssData;

        shadow.appendChild(styles);
        htmlContent.body.childNodes.forEach((x) => {
            shadow.appendChild(x);
        });
        
        this.setupEventListeners(shadow);
    }

    private setupEventListeners(shadow: ShadowRoot) {
        const elements = shadow.querySelectorAll('[id^="list-check"]') as NodeListOf<HTMLInputElement>;
        elements.forEach((x: HTMLInputElement) => {
            x.checked = false;
            x.addEventListener('click', (e: Event) => {
                const chkbox = e.target as HTMLInputElement;
                const listParent = chkbox?.parentElement?.parentElement?.parentElement;
                if (listParent) {
                    if (chkbox.checked) {
                        listParent.classList.remove('list-item-incomplete')
                        listParent.classList.add('list-item-complete');
                    } else {
                        listParent.classList.remove('list-item-complete')
                        listParent.classList.add('list-item-incomplete');
                    }
                } else {
                    console.log('error retrieving parent element');
                }
            });
        });
    }
}

customElements.define('completion-checklist-component', CompletionChecklistComponent);