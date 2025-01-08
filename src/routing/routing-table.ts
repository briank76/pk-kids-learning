import { ErrorComponent } from "../app/pages/error-page/error-component"
import { SpellingReviewPage } from "../app/pages/spelling-review/spelling-review.index";
import { WordListPage } from "../app/pages/word-list/word-list.page";

export class RoutingTable {
    public readonly defaultPath = '**';

    public routes = [
        { 'path': '/', 'component': SpellingReviewPage },
        { 'path': '/spelling', 'component': SpellingReviewPage },
        { 'path': '/wordlist', 'component': WordListPage },
        { 'path': '**', 'component': ErrorComponent }
    ]
}