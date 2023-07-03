import { Repository } from "./Repository.model";

export interface Paginator {
    incomplete_results: false,
    items: Repository[],
    total_count: number
}