import { Observable } from "rxjs";
import { Subject } from "rxjs";

class MenuDisplayService {
    private menuState$: Subject<boolean> = new Subject<boolean>();
    
    public setMenuState(state: boolean): void {
        this.menuState$.next(state);
    }

    public getMenuState(): Observable<boolean> {
        return this.menuState$.asObservable();
    }
}
//export default new MenuDisplayService();
const menuDisplayService = new MenuDisplayService();
export { menuDisplayService };  // Exporting a singleton instance of the service