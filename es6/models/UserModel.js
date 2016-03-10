import { URLs } from '../core/settings';
import { assign } from '../utils/objects';
import Storage from '../storage/Storage';
export class UserEntity {
    constructor({ Token = '', UserId = '', UserName = '', Empresas = [], Obras = [], Tarefas = [], Expiracao = "2001-01-01T00:00:00.0000000Z", Password = '' } = {}) {
        this.Token = Token;
        this.UserId = UserId;
        this.UserName = UserName;
        this.Expiracao = Expiracao;
        this.Password = Password;
        this.Empresas = Empresas;
        this.Obras = Obras;
        this.Tarefas = Tarefas;
    }
}
;
export class UserRepository {
    constructor($q, $http, $window, Storage) {
        this.$q = $q;
        this.$http = $http;
        this.$window = $window;
        this.Storage = Storage;
        this.type = 'Users';
        this.repository = [];
        this.encrypt = (value) => {
            return $window.Crypto.SHA256(value).toString();
        };
        this.init();
    }
    init() {
        const savedUsers = (this.Storage.read(this.type) || []).map(user => new UserEntity(user));
        savedUsers.length && this.registry(...savedUsers);
    }
    registry(...users) {
        this.repository.push(...users);
        this.Storage.write(this.type, this.repository);
    }
    get(UserId) {
        return this.repository.filter(user => user.UserId === UserId);
    }
    checkOnline(UserName = '', Password = '') {
        return this.$http.get(URLs.service + URLs.endpoints.token, {
            params: { UserName, Password }
        }).then(resp => {
            if (resp.status < 200 || resp.status >= 300) {
                debugger;
                throw new Error(resp);
            }
            const user = new UserEntity(assign(Object.create(null), resp.data, {
                Password: this.encrypt(Password)
            }));
            this.registry(user);
            return user;
        });
    }
    checkCredentials(UserName = '', Password = '') {
        if (!UserName || !Password) {
            throw new Error('No user');
        }
        const _pwd = this.encrypt(Password);
        const user = this.repository.filter(user => {
            return user.UserName === UserName && user.Password === _pwd;
        });
        if (user.length) {
            return user[0];
        }
        else {
            throw new Error('No user');
        }
    }
}
UserRepository.IID = 'UserRepository';
UserRepository.$inject = ['$q', '$http', '$window', Storage.IID];
