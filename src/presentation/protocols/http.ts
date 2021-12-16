export type HttpRequest = {
    body?: any;
    headers?: any;
    params?: any;
};

export type HttpResponse = {
    status: number;
    body: any;
};
