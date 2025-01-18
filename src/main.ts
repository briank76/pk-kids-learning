import { routingModule } from "./routing/routing";
import "./app/components/completion-checklist/completion-checklist.component";
import "./app/components/menu/nav-menu.component";

document.addEventListener("DOMContentLoaded", () => {  
    const myapp = document.getElementById('app') as HTMLDivElement;
    //const routing = new RoutingModule();
    routingModule.getRouteSubject.subscribe({
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

    routingModule.initRouting();
});