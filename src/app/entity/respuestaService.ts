import { Planilla } from "./Planilla";
import { loteX } from './lote';

export class respuestaService {

    constructor(
        public codigo:String,
        public mensaje:String,
        public datos:datos){ }
}


export class datos {

    constructor(
        public planillas:Planilla[],
        public lotes:loteX[],
        public cantRegistros:number){ }
}
