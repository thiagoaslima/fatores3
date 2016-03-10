export default `
<ion-side-menus>
    
    <ion-side-menu-content>
        <ion-nav-bar class="bar-balanced">
            <ion-nav-buttons side="left">
                <button class="button button-icon button-clear ion-navicon" menu-toggle=""></button>
            </ion-nav-buttons>
        </ion-nav-bar>
        <ion-nav-view></ion-nav-view>
    </ion-side-menu-content>
    
    <ion-side-menu side="left">
        <ion-header-bar class="bar-stable">
            <div class="title">Menu</div>
        </ion-header-bar>
        <ion-content padding="false" class="side-menu-left has-header" ion-content="">
            <ion-list>
                <ion-item ui-sref="configuration" menu-close="">Configuração</ion-item>
                <ion-item>Item 2</ion-item>
                <ion-item>Item 3</ion-item>
            </ion-list>
            <div class="spacer" style="width: 268px; height: 291px;"></div>
            <ion-list>
                <ion-item ng-click="logout()" menu-close="">Logout</ion-item>
            </ion-list>
        </ion-content>
    </ion-side-menu>
    
</ion-side-menus>
`;