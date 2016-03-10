import Toast from '../toaster/Toast';
import { Session } from '../session/Session';
import { UserRepository } from '../models/UserModel';
export declare class LoginCtrl {
    private $state;
    private Toast;
    private Session;
    private UserRepository;
    static IID: string;
    static $inject: string[];
    protected UserName: string;
    protected Password: string;
    constructor($state: ng.ui.IStateService, Toast: Toast, Session: Session, UserRepository: UserRepository);
    private _log(user);
    login(evt: any, UserName: any, Password: any): void;
    reset(): void;
}
