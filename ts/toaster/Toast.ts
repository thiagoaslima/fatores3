export default class ToasterService {
    static IID = 'ToastMessages';
    static $inject = ['$cordovaToast'];
    
    constructor(private $cordovaToast) {}
    
    public show(message, duration = 'short', position = 'bottom') {
        if (this.$cordovaToast) {
            return this.$cordovaToast(message, duration, position)
        }
    }
}