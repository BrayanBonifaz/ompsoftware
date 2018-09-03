export class Planilla {

    constructor(
    			public rowNum:number,
    			public id:number,
    			public numeroPlanilla:number,
                public numeroLote:number,
                public fechaPago:string,
                public cantAfiliados:string,
                public monto:string,
                public devengue:string,
                public estado:string
                ){ }
}