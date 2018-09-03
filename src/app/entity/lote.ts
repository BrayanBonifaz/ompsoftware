import { Planilla } from "./planilla";

export class loteX {

    constructor(public rowNum:number,
    	public loteId:number,
    	public numLote:String,
		public descLote:String,
		public fechaProceso:Date,
		public estadoLote:String,
		public estadoDescripcion:String,
		public fechaCreacion:Date,
		public numAfiliados:number,
		public flagUltimoProceso:String,
        public listaPlanillas:Planilla[]){ }
}