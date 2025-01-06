import { RoutingModule } from "./routing/routing";
import "./spelling-review/components/completion-checklist/completion-checklist.component";

document.addEventListener("DOMContentLoaded", () => {  
    const myapp = document.getElementById('app') as HTMLDivElement;
    const routing = new RoutingModule();
    routing.getRouteSubject.subscribe({
        next: (value) => {
            console.log(value);
            const key = 'component';
            const cmp = value[key];
            const page = new cmp();
            myapp.innerHTML = "";
            page.render(myapp);
            console.log('next');
        },
        error: (value: unknown) => {
            console.log(value);
            console.log('error');
        },
        complete: () => {
            console.log('complete');
        }
    });

    routing.initRouting();
});