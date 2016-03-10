import Storage from '../storage/Storage';
export declare class UserEntity {
    Token: string;
    UserId: string;
    UserName: string;
    Empresas: number[];
    Obras: number[];
    Tarefas: number[];
    Expiracao: string;
    Password: string;
    constructor({Token, UserId, UserName, Empresas, Obras, Tarefas, Expiracao, Password}?: {
        Token?: string;
        UserId?: string;
        UserName?: string;
        Empresas?: any[];
        Obras?: any[];
        Tarefas?: any[];
        Expiracao?: string;
        Password?: string;
    });
}
export declare class UserRepository {
    private $q;
    private $http;
    private $window;
    private Storage;
    static IID: string;
    static $inject: string[];
    type: string;
    private repository;
    protected encrypt: (value: string) => string;
    constructor($q: ng.IQService, $http: ng.IHttpService, $window: ng.IWindowService, Storage: Storage);
    private init();
    private registry(...users);
    private get(UserId);
    checkOnline(UserName?: string, Password?: string): ng.IPromise<UserEntity>;
    checkCredentials(UserName?: string, Password?: string): UserEntity;
}
