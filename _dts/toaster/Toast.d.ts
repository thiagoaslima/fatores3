export default class ToasterService {
    private $cordovaToast;
    static IID: string;
    static $inject: string[];
    constructor($cordovaToast: any);
    show(message: any, duration?: string, position?: string): any;
}
