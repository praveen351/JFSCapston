export class ResponseTypeEntity {
    public response_type_id: number;
    public response_type: string;
    public response_scope: string;
    public status: string;

    constructor(response_type?: string, response_scope?: string, status?: string) {
        this.response_type = response_type;
        this.response_scope = response_scope;
        this.status = status;
    }
}