export class Usuario {
	constructor(
		
		public nombre:string,
		public email:string,
		public estado:string,
		public password:string,
		public img?:string,
		public google?:boolean,
		public role?:string,
		public uid?:string,
	){
		
		
	}
}