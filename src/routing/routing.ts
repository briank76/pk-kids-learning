import { Subject } from 'rxjs';
import { RoutingTable } from './routing-table';
/*
class UrlModel {
    url: string;
    protocol: string;
    host: string;
    path: string;
    port: string;
    queryParam: string;
}
*/

class RoutingModule {
    private routingTable = new RoutingTable();
    private currentUrl: string;
    private previousUrl: string;
    private readonly defaultRouteIndicator = '**'
    private routeSubject = new Subject();


    constructor() {
        this.currentUrl = '';
        this.previousUrl = '';
        //this.init();
    }

    public initRouting(): void {
        this.init();
    }

    public navigate(path: string, setPath = true): void {
        try
        {
            const url = this.parseUrl(path);
            
            if (url) {
                const primaryRoute = this.getRouteData(url.path);
                const defaultRoute = this.getRouteData(this.defaultRouteIndicator);
                if (setPath) {
                    this.setLocation(path);
                }
                this.routeSubject.next(primaryRoute ? primaryRoute : defaultRoute);
            } else {
                this.routeSubject.error('failed to find path')
            }
        } catch (err) {
            this.routeSubject.error(err);
        }
    }

    get getRouteSubject() {
        return this.routeSubject;
    }
    /*
    get getQueryParams() {
        if (this.url && this.url.param) {
            return this.url.param;
        } else {
            return new Map();
        }
    }*/


    private setLocation(pathId): void {
        const url = pathId;
        if (this.previousUrl !== url) {
            window.history.pushState(null, '', url);
            this.previousUrl = url;
        }
    }

    private getRouteData(pathId) {
        let routeData;
        if (this.routingTable && this.routingTable.routes) {
            routeData = this.routingTable.routes.find(x => x.path === pathId);
        }
        return routeData;
    }

    private parseUrl(incomingURL: string) {
        const url: string[] = incomingURL.split( '//' );
        if (url[0] === 'http:' || url[0] === 'https:') {
          const protocol = url[0] + '//';
          const tmpHost = url[1].split( '/' )[0];
          //console.log('tmpHost: ' + tmpHost);
          const host = tmpHost.split(':')[0];
          //console.log('host: ' + host);
          const port = tmpHost.split(':')[1] ? tmpHost.split(':')[1] : ''; 
          //console.log('port: ' + port);

          const test: string = protocol + host;
          //console.log(test);

          let fqdn = protocol + host;
          fqdn += port ? ':' + port : '';
          console.log(fqdn);
          let path = incomingURL.split(fqdn)[1] ? incomingURL.split(fqdn)[1] : '';
          const queryParam = new Map();
          if (path.indexOf('?') > 0) {
            const tmpPath = path.split('?');
            path = tmpPath[0];
            const tmpQueryParam = tmpPath[1].replace('?', '');
            tmpQueryParam.split('&').forEach((param) => {
                const splitParam = param.split('=');
                queryParam.set(splitParam[0], splitParam[1]);
            });
            //console.log(queryParam);
          }
          //console.log('path: ' + path);
          return {
            url: test,
            protocol: protocol,
            host: host,
            path: path,
            port: port,
            param: queryParam
          };
        }
    }

    private init(): void {
        const route = () => {
            //const pathId = window.location.pathname.replace('/', '');
            //console.log(pathId);
            this.navigate(window.location.href);
        };
        
        window.addEventListener('load', route);
        
        window.onpopstate = () => {
            // const pathId = window.location.pathname.replace('/', '');
            //const rm = injectionService.getInstance('RoutingModule');
            this.navigate(window.location.href, false);
        };
    }
}

const routingModule = new RoutingModule();
routingModule.initRouting();
export { routingModule };