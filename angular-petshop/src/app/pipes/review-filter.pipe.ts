import {Pipe, PipeTransform} from '@angular/core';
import {ReviewShort} from '../models/product/review-short';

@Pipe({
    name: 'reviewFilter'
})
export class ReviewFilterPipe implements PipeTransform {
    public static POINT = 'point';
    public static TIMESTAMP = 'timestamp';

    transform(reviews: ReviewShort[], ...args: any[]): ReviewShort[] {
        const sort = args[0];
        if (reviews === undefined || reviews === null || sort === undefined || sort === null) {
            return reviews;
        }
        return reviews.sort((a, b) => {
            switch (sort) {
                case ReviewFilterPipe.POINT:
                    if (a.point < b.point) {
                        return 1;
                    } else if (a.point > b.point) {
                        return -1;
                    } else {
                        return 0;
                    }
                case  ReviewFilterPipe.TIMESTAMP:
                    if (a.timestamp < b.timestamp) {
                        return 1;
                    } else if (a.timestamp > b.timestamp) {
                        return -1;
                    } else {
                        return 0;
                    }
            }
        });
    }

}
