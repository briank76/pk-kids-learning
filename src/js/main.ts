import { SpellingReviewPage } from "./spelling-review/spelling-review.index";
import "./spelling-review/components/completion-checklist/completion-checklist.component";

document.addEventListener("DOMContentLoaded", () => {  
    const myapp = document.getElementById('app') as HTMLDivElement;
    if (myapp) {
        myapp.innerHTML = '';
        const page = new SpellingReviewPage();
        page.render(myapp);
    }
});