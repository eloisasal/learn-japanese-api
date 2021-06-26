import { FindManyOptions } from 'typeorm';
import { CommonGetRequest } from '../infrastructure/CommonSchema';

interface FindCriteriaParams extends CommonGetRequest {
    [x: string]: any;
}

export class FindCriteria {
    public static build(
        licensesRequest?: FindCriteriaParams,
    ): FindManyOptions<any> {
        if (!licensesRequest) {
            return {};
        }
        const { sort, offset, limit, ...licenses } = licensesRequest;
        const filterObject: any = {
            where: licenses,
            skip: offset,
            take: limit,
            order: this.buildSortCriteria(sort),
        };
        return filterObject;
    }
    private static buildSortCriteria(sort?: any) {
        let order: any = {};
        sort.split(',').forEach((sortVal: string) => {
            if (sortVal === 'modified') {
                order['modifiedAt'] = 'ASC';
            } else if (sortVal === '-modified') {
                order['modifiedAt'] = 'DESC';
            } else {
                const direction = this.isStartByHyphen(sortVal)
                    ? 'DESC'
                    : 'ASC';
                order[sortVal] = direction;
            }
        });
        return order;
    }
    private static isStartByHyphen = (str: string): boolean =>
        /^-.+$/.test(str);
}
