import { ErrorComponent } from "../app/pages/error-page/error-component"
import { MathPage } from "../app/pages/math-review/math.page";
import { SpellingReviewPage } from "../app/pages/spelling-review/spelling-review.index";
import { WordListPage } from "../app/pages/word-list/word-list.page";

export class RoutingTable {
    public readonly defaultPath = '**';

    public routes = [
        { 'path': '/', 'component': SpellingReviewPage },
        { 'path': '/spelling', 'component': SpellingReviewPage },
        { 'path': '/wordlist', 'component': WordListPage },
        { 'path': '/math', 'component': MathPage },
        { 'path': '**', 'component': ErrorComponent }
    ]
}