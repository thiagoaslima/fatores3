export default `
<ion-view title="Configuração">
    <ion-nav-buttons side="right">
        <button class="icon button button-balanced ion-checkmark" 
            ng-show="ConfigCtrl.selected.tarefa"
            ng-click="ConfigCtrl.save($event)"></button>
    </ion-nav-buttons>

    <ion-content overflow-scroll="true" padding="'true'" class="has-header">
        
        <!-- Empresas -->
        <basic-list items="ConfigCtrl.empresas" title="Empresa" prop="RazaoSocial"></basic-list>
        
        <!-- Obras -->
        <tree-list repo="ConfigCtrl.getObras" items="ConfigCtrl.obras" title="Obra" prop="Nome"></basic-list>
        
    </ion-content>
</ion-view>
`