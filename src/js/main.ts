import { SpellingReviewPage } from "./spelling-review/spelling-review.index";
import "./spelling-review/components/completion-checklist/completion-checklist.component";

document.addEventListener("DOMContentLoaded", () => {  
    let myapp = document.getElementById('app') as HTMLDivElement;
    if (myapp) {
        myapp.innerHTML = '';
        let page = new SpellingReviewPage();
        page.render(myapp);
    }
});