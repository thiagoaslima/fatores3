declare module fatores {

    module models {
        interface IModel {
            Id: number;
            DataAtualizacao: string
        }

        interface IBasic extends IModel {
            Nome: string;
        }

        interface ITree extends IModel {
            children: number[];
        }

        interface IPost extends IModel {
            Inicio: string;
            Fim: string;
            DataCriacao: string;
        }

        interface IAtividade extends ITree {
            AtividadePaiId: number;
            Cor: string;
            DuracaoMaxima: number;
            DuracaoMinima: number;
            Status: boolean;
            AtividadesFilhas: number[];
            AtividadesTarefa: number[];
        }

        interface IAtividadeTarefa extends IModel {
            AtividadeId: number;
            Atividade: IAtividade;
            TarefaId: number;
            Tarefa: ITarefa;
            UserId: string;
            Usuario: IUser;
            ParticipaQS: boolean;
            PercentualQS: number;
            PercentualQS2: number;
            PercentualQS3: number;
            DataCriacao: string;
            DataAtualizacao: string;
            Status: boolean;
            Levantamentos: number[];
        }

        interface ICenario extends IModel {
            Descricao: string;
            Obrigatorio: boolean;
            UserId: string;
            Usuario: IUser;
            DataCriacao: string;
            DataAtualizacao: string;
            Status: boolean;
            Valores: number[];
        }

        interface ICenarioValor extends IModel {
            Descricao: string;
            CenarioId: number;
            Cenario: ICenario;
            UserId: string;
            Usuario: IUser;
            Status: boolean;
            DataCriacao: string;
            DataAtualizacao: string;
            Obras: number[];
            ObrasInativos: number[];
            TarefasProducao: number[];
            TarefasProducaoInativos: number[];
            TarefasCenarioDia: number[];
            TarefasCenarioDiaInativos: number[];
            CenariosDia: number[];
            Producao: number[]
        }

        interface IContexto extends IPost {
            CenarioValorId: number;
            CenarioValor: ICenarioValor;
            UserId: string;
            Usuario: IUser;
            ObraId: number;
            Obra: IObra;
            TarefaId: number;
            Tarefa: ITarefa;
            EmpresaId: number;
            Empresa: IEmpresa;
        }

        interface IEmpresa extends IModel {
            RazaoSocial: string;
            Tarefas: number[];
            Obras: number[];
        }

        interface IFuncao extends IBasic {
            Descricao: string;
            Peso: number;
            Status: boolean;
            DataCriacao: string;
            UserId: string;
            Usuario: IUser;
            Tarefas: number[];
            TarefasInativas: number[];
            Levantamentos: number[];
        }

        interface IRecursos extends IPost {
            UserId: string;
            Usuario: IUser;
            AtividadeTarefaId: number;
            AtividadeTarefa: IAtividadeTarefa;
            FuncaoId: number;
            Funcao: IFuncao;
            ObraId: number;
            Obra: IObra;
            EmpresaId: number;
            Empresa: IEmpresa;
            QuantidadeColaboradores: number;
            Colaboradores: string;
            ExperienciaFuncao: number;
            Comentario: string;
        }

        interface IObra extends ITree {
            EmpresaId: number;
            ObraId: number;
            Contratadas: number[];
        }

        interface IProducao extends IPost {
            QS1: number;
            QS2: number;
            QS3: number;
            Identificadores: string;
            ObraId: number;
            TarefaId: number;
            EmpresaId: number;
            UserId: string;
            Comentario: string;
            Atributos: number[];
        }

        interface ITarefa extends IBasic {
            UnidadeMedida: string;
            UnidadeMedida2: string;
            UnidadeMedida3: string;
            Funcoes: number[];
            CenariosValor: number[];
            AtributosProducao: number[];
            Atividades: number[];
        }

        interface IUser {
            Token: string;
            UserId: string;
            UserName: string;
            Empresas: number[];
            Obras: number[];
            Tarefas: number[];
            Expiracao: string;
            Password: string;
        }
    }
}