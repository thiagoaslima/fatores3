import { URLs } from '../core/settings';
import { assign } from '../utils/objects';

import Storage from '../storage/Storage';

export class UserEntity {
    public Token: string;
    public UserId: string;
    public UserName: string;
    public Empresas: number[];
    public Obras: number[];
    public Tarefas: number[];
    public Expiracao: string;
    public Password: string;

    constructor({Token = '',
        UserId = '',
        UserName = '',
        Empresas = [],
        Obras = [],
        Tarefas = [],
        Expiracao = "2001-01-01T00:00:00.0000000Z",
        Password = ''} = {}) {
        this.Token = Token;
        this.UserId = UserId;
        this.UserName = UserName;
        this.Expiracao = Expiracao;
        this.Password = Password;
        this.Empresas = Empresas;
        this.Obras = Obras;
        this.Tarefas = Tarefas;
    }
};

export class UserRepository {
    static IID = 'UserRepository';
    static $inject = ['$q', '$http', '$window', Storage.IID];

    public type: string = 'Users';
    private repository: UserEntity[] = [];
    protected encrypt: (value: string) => string;

    constructor(private $q: ng.IQService,
        private $http: ng.IHttpService,
        private $window: ng.IWindowService,
        private Storage: Storage) {

        this.encrypt = (value: string): string => {
            return $window.Crypto.SHA256(value).toString();
        }

        this.init();
    }

    private init(): void {
        const savedUsers = (this.Storage.read(this.type) || []).map(user => new UserEntity(user));
        savedUsers.length && this.registry(...savedUsers);
    }

    private registry(...users: UserEntity[]): void {
        this.repository.push(...users);
        this.Storage.write(this.type, this.repository);
    }

    private get(UserId: string): UserEntity[] {
        return this.repository.filter(user => user.UserId === UserId);
    }

    public checkOnline(UserName = '', Password = ''): ng.IPromise<UserEntity> {
        return this.$http.get(URLs.service + URLs.endpoints.token, {
            params: { UserName, Password }
        }).then(resp => {
            if (resp.status < 200 || resp.status >= 300) {
                debugger;
                throw new Error(resp);
            }

            const user: UserEntity = new UserEntity(assign(Object.create(null), resp.data, {
                Password: this.encrypt(Password)
            }));
            this.registry(user);

            return user;
        });
    }

    checkCredentials(UserName = '', Password = ''): UserEntity {
        if (!UserName || !Password) {
            throw new Error('No user');
        }
        
        const _pwd = this.encrypt(Password);

        const user = this.repository.filter(user => {
            return user.UserName === UserName && user.Password === _pwd;
        });

        if (user.length) {
            return user[0];   
        } else {
            throw new Error('No user');
        }
    }
}