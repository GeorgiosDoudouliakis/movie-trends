export interface SearchPersonModel {
    id: number;
    name: string;
    known_for_department: string;
    profile_path: string;
    known_for: unknown[];
}