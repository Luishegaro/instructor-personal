import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';


import { DietasProvider } from '../../providers/dietas/dietas';

@IonicPage()
@Component({
  selector: 'page-adm-asignardietacliente',
  templateUrl: 'adm-asignardietacliente.html',
})
export class AdmAsignardietaclientePage {
  dietas=[]
  dietasselec=[]
  tipodieta=[
    
    {key:"antes de entrenar",nombre:"Antes de entrenar",estadohiide:false},
    {key:"despues del gym",nombre:"Despues del Gym",estadohiide:false},
    {key:"desayuno",nombre:"Desayuno",estadohiide:false},
    {key:"merienda mañana",nombre:"Merienda mañana",estadohiide:false},
    {key:"almuerzo",nombre:"Almuerzo",estadohiide:false},
    {key:"merienda tarde",nombre:"Merienda tarde",estadohiide:false},
    {key:"cena",nombre:"Cena" ,estadohiide:false}
  ]
  items=[]
  ejers={}
  
ejer_eliminados=[]
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private view:ViewController,
    private dieta:DietasProvider
    ) {
      for(let i=0;i<navParams.data.ejer.length;i++){
        this.dietasselec.push(navParams.data.ejer[i])
      }
      if(navParams.data.elim) this.ejer_eliminados=navParams.data.elim
  }
  borrarselecionado(i,key){
    if(this.dietasselec[i].idejer_rut) this.ejer_eliminados.push(this.dietasselec[i].idejer_rut)
    this.dietasselec.splice(i, 1);
    this.tipodieta.forEach(tipo=>{
      this.ejers[tipo.key].forEach(ejer => {
        if(ejer.key==key){
          ejer.estadoadd=true
          console.log(ejer.key)

        }
      });
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdmAsignardietaclientePage');
    
    this.listarutinas()
  }
  dismiss(){
    this.view.dismiss({ejer:this.dietasselec,elim:this.ejer_eliminados})
  }
  listarutinas(){
    this.tipodieta.forEach(element => {
        this.ejers[element.key]=[]
      })
}
verejercicios(item){
  //this.navCtrl.push(EjerciciosPage,key)

  item["estadohiide"]=!item["estadohiide"]
  if(this.ejers[item.key].length==0 ){
    this.dieta.verDietasporTipo(item.key)
    .subscribe(list=>{
      list.forEach(element => {
        element["estadoadd"]=true
      });
      list.forEach(element => {
        this.dietasselec.forEach(sel => {
          if(element["key"]==sel["key"])
            element["estadoadd"]=false
        });
      });
      this.ejers[item.key]=list
      console.log(list)
    })
  }
  
}
solicitud(dieta,i,e?){
  if(!dieta.estadoadd || !e.checked){
    let encontrado=null
    for(let i=0;i<this.dietasselec.length;i++){
      
        if(this.dietasselec[i].key==dieta.key){
          encontrado=i
          break
        }
    }
    if(encontrado!=null){
      if(this.dietasselec[encontrado].idejer_rut) this.ejer_eliminados.push(this.dietasselec[encontrado].idejer_rut)
        
      this.dietasselec.splice(encontrado, 1);
      dieta.estadoadd=true
    }

  }else{
  let dato:any={}
    for(let j in dieta){
        dato[j]=dieta[j]
    }
    dato["iddietas"]=dato.key
    dieta.estadoadd=false
    this.dietasselec.push(dato)
  console.log(this.dietasselec)
  }
}

}
