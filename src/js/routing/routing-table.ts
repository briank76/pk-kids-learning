import { ErrorComponent } from "../error-page/error-component";
import { SpellingReviewPage } from "../spelling-review/spelling-review.index";

export class RoutingTable {
    public readonly defaultPath = '**';

    public routes = [
        { 'path': '/', 'component': SpellingReviewPage },
        { 'path': '/spelling', 'component': SpellingReviewPage},
        { 'path': '**', 'component': ErrorComponent}
    ]
}