export default `
<ion-view title="Configuração">
    <ion-nav-buttons side="right">
        <button class="icon button button-balanced ion-checkmark" 
            ng-show="ConfigCtrl.selected.tarefa"
            ng-click="ConfigCtrl.save($event)"></button>
    </ion-nav-buttons>

    <ion-content overflow-scroll="true" padding="'true'" class="has-header">
        
        <!-- Empresas -->
        <basic-list title="Empresas" 
                    prop="RazaoSocial"
                    items="ConfigCtrl.empresas"  
                    model="ConfigCtrl.selected.empresa">
        </basic-list>
        
        <!-- Obras -->
        <tree-list  title="Obras"
                    repo="ConfigCtrl.getObras" 
                    model="ConfigCtrl.selected.obra"
                    items="ConfigCtrl.obras"
                    items-ids="ConfigCtrl.selected.empresa.Obras">
        </tree-list>
        
    </ion-content>
</ion-view>
`