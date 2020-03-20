import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {ApiService} from "../services/api/api.service";
import {IS_NOT_CHANGE_LOCALE} from "../constants";


@Component({
    selector: 'app-quppy-tree',
    templateUrl: './quppy-tree.component.html',
    styleUrls: ['./quppy-tree.component.scss']
})
export class QuppyTreeComponent implements OnInit {

    @Input() isChange: boolean;
    @Input() items: any[];
    @Input() json: any;
    @Input() locale: string;
    @Input() loader: boolean;

    @Output() qpChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private _api: ApiService) {
    }

    ngOnInit() {
    }

    parseChanges(arr, json) {
        if (arr.length) {
            return arr.some(item => {
                if (item.children) {
                    return this.parseChanges(item.children, json[item.key]);
                } else {
                    const isChange = typeof item.origin !== 'undefined';
                    isChange ? json[item.key] = item.dist.trim() : null;
                    return isChange;
                }
            });
        }
        return IS_NOT_CHANGE_LOCALE;
    }

    changeVerify(origin) {
        return typeof origin !== 'undefined';
    }

    change($event, item) {
        if (typeof item.origin === 'undefined') {
            item.origin = item.dist || '';
        }
        item.dist = $event.target.value;
        if (item.origin === item.dist) {
            delete item.origin;
        }
        this.onChange();
    }

    restore($event, item) {
        item.dist = item.origin;
        delete item.origin;
        $event.target.closest('.quppy-row').querySelector('textarea').value = item.dist;
        this.onChange();
    }

    onChange() {
        const isChange = this.parseChanges(this.items, this.json);
        this.qpChange.emit(isChange);
    }

}
