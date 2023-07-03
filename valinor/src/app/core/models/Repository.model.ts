import { Owner } from "./Owner.model";

export interface Repository {
    id?: number;
    name: string;
    language: string;
    forks: number;
    html_url: string;
    description: string;
    watchers: number;
    open_issues: number;
    issues_url: string;
    owner: Owner;
    private: boolean;
    stargazers_count: number;
}