export default class ToasterService {
    constructor($cordovaToast) {
        this.$cordovaToast = $cordovaToast;
    }
    show(message, duration = 'short', position = 'bottom') {
        if (this.$cordovaToast) {
            return this.$cordovaToast(message, duration, position);
        }
    }
}
ToasterService.IID = 'ToastMessages';
ToasterService.$inject = ['$cordovaToast'];
