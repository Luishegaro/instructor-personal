import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Slides,ActionSheetController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { UsuarioProvider } from "../../providers/usuario/usuario"
import { DatosinstructorPage } from '../../pages/datosinstructor/datosinstructor'
import { AdmModpublicacionPage } from '../adm-modpublicacion/adm-modpublicacion';
import { AngularFireStorage } from 'angularfire2/storage';


/**
 * Generated class for the AdmClientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm-clientes',
  templateUrl: 'adm-clientes.html',
})
export class AdmClientesPage {
  solicitudes = []
  datosbuscado = []
  publicaciones = []
  
  publicacionesC = []
  num = 3
  rol

  @ViewChild('mySlider') slider: Slides;
  selectedSegment='second';
  slides = [
    {
      id: "second",
      title: "Second Slide"
    },
    {
      id: "third",
      title: "Third Slide"
    }
  ];
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private user: UsuarioProvider,
    private store:Storage,
    private alert:AlertController,
    public toastCtrl: ToastController,
    public storage:AngularFireStorage,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.store.get("rol").then(rol=>{
      this.rol=rol
    })
    
    this.lstarPublicaciones()
  }
  

   //funciones tab slide
   onSegmentChanged(segmentButton) {
    //console.log("Segment changed to", segmentButton.value);
     const selectedIndex = this.slides.findIndex((slide) => {
       return slide.id === segmentButton.value;
     });
     this.slider.slideTo(selectedIndex);
   }
 
   onSlideChanged(slider) {
     //console.log('Slide changed',slider,this.selectedSegment);
     const currentSlide = this.slides[slider.realIndex];
     this.selectedSegment = currentSlide.id;
   }
   //end funciones tab slide


  altodelIMG
  ionViewDidLoad() {
    this.verMispublicaciones()
    //alert("La resolución de tu pantalla es: " + screen.width + " x " + screen.height)
    this.altodelIMG = screen.width
  }


 
  aceptar(item) {
    this.user.modificarinstructor_cliente(item.key, { estado: true })
      .then(() => {
        item.estado = true
        item.rol = "instructor"
        delete item.key
        this.user.guardarRutina_cliente(item)
      })
      .catch(err => {
        console.log(err)
      })
  }
 
 /* verCliente(keycli) {
    this.navCtrl.push(AdmDatosclientePage, keycli)
  }*/
  
  lstarPublicaciones(infiniteScroll?){
    let mes=["Ene.","Feb.","Mar.","Abr.","May.","Jun.","Jul.","Ago.","Sep.","Oct.","Nov.","Dic."]
    let hoy=new Date()
    this.user.listarPublicasion(this.num)
      .subscribe(res => {
        res.forEach(element => {
          let prefi = ""
          let diap = element.fecha.toDate()
          if (diap.getDate() == hoy.getDate() &&
            diap.getMonth() == hoy.getMonth() &&
            diap.getFullYear() == hoy.getFullYear()
          )
            prefi = "Hoy "
          else if (diap.getDate() + 1 == hoy.getDate() &&
            diap.getMonth() == hoy.getMonth() &&
            diap.getFullYear() == hoy.getFullYear())
            prefi = "Ayer "
          else prefi = diap.getDate() + " de " + mes[diap.getMonth()]

          element["fecha2"] = prefi + " " + diap.getHours() + ":" + (diap.getMinutes() < 9 ? "0" + diap.getMinutes() : diap.getMinutes())
        });
        let aNuevo = res.length - this.publicaciones.length == 3 ? res.slice(res.length - 3) : res.slice(res.length - (res.length - this.publicaciones.length))
        this.publicaciones = this.publicaciones.concat(aNuevo)
        console.log(res)
        if (infiniteScroll) infiniteScroll.complete()
      })
  }
  estadoToast = true;
  alerta() {
    const toast = this.toastCtrl.create({
      message: 'En esta sección encontrarás a todos tus alumnos. Selecciona un alumno para poder adicionar rutinas y dietas',
      showCloseButton: true,
      closeButtonText: 'Ok',
      dismissOnPageChange: true
    });

    if (this.estadoToast) {
      toast.present()
      this.estadoToast = false
    }
    toast.onDidDismiss(() => {
      this.estadoToast = true
    });
  }



  verInstructor(key) {
    this.navCtrl.push(DatosinstructorPage, key)
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.num = this.num + 3
      this.lstarPublicaciones(infiniteScroll)
    }, 500);
  }

  //funciones soap
  soap() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'http://test.sintesis.com.bo/WSApp­war/ComelecWS?WSDL', true, 'wshegaro', 'Wshegaro2019');
    let sr =
      `<?xml version="1.0" encoding="UTF-8"?>
        <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://servicios.comelec.ws.sintesis.com.bo/">
          <SOAP-ENV:Body>
            <ns1:registroPlan>
              <datos>
                <categoriaProducto>1</categoriaProducto>
                <codigoComprador>231</codigoComprador>
                <codigoRecaudacion>231</codigoRecaudacion>
                <correoElectronico>hegaro@hegaro.com.bo</correoElectronico>
                <descripcionRecaudacion>PAGO Prueba</descripcionRecaudacion>
                <documentoIdentidadComprador/>
                <fecha>20190522</fecha>
                <fechaVencimiento>0</fechaVencimiento>
                <hora>190000</hora>
                <horaVencimiento>0</horaVencimiento>
                <moneda>BS</moneda>
                <nombreComprador>Nombre Comprador</nombreComprador>
                <planillas>
                  <descripcion>Pago de prueba</descripcion>
                  <montoCreditoFiscal>100</montoCreditoFiscal>
                  <montoPago>100</montoPago>
                  <nitFactura>12345678</nitFactura>
                  <nombreFactura>Sintesis Test</nombreFactura>
                  <numeroPago>1</numeroPago>
                </planillas>
                <precedenciaCobro>N</precedenciaCobro>
                <transaccion>A</transaccion>
              </datos>
              <cuenta>wshegaro</cuenta>
              <password>Wshegaro2019</password>
            </ns1:registroPlan>
          </SOAP-ENV:Body>
        </SOAP-ENV:Envelope>`;

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          let xml = xmlhttp.responseXML;
          alert("True " + xmlhttp.responseText);
        } else {
          alert('error ' + xmlhttp.responseXML);
          alert(xmlhttp.status);
        }
      }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'application/soap+xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  //VER PUBLICACIONES CUADRADOS
  verMispublicaciones(){
    this.user.listarMisPublicasion()
    .subscribe(data=>{
      this.publicacionesC=data
    })
  }

  opciones(p){
    this.actionSheetCtrl.create({
      buttons:[
        {
          text: 'Modificar',

          handler: () => {
            console.log('Archive clicked');
            let datos={
              key:p.key,
              comentario:p.comentario,
              imagenes:p.imagenes,
              titulo:p.titulo,
              costo:p.costo,
              semanas:p.semanas,
              meses:p.meses,
              coordenadas:p.coordenadas,
              direccion:p.direccion,
              
              horas:p.horas
            }
            this.navCtrl.push(AdmModpublicacionPage,datos)
          }
        },
        {
          text: 'Eliminar',

          handler: () => {
            console.log('Archive clicked');
            //this.eliminarpubli(p)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).present()
  }
  eliminarpubli(p){
    let alert = this.alert.create({
      title: 'Eliminar publicacion',
      message: 'Seguro que desea eliminar esta publicacion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            for(let i in p.imagenes)
              this.storage.ref("publicaciones/"+p.key+'/'+p.imagenes[i].nombre).delete()
            this.user.eliminarPublicasion(p.key)
           
          }
        }
      ]
    });
    alert.present();
  }


  "<?xml version='1.0' encoding='UTF-8'?><S:Envelope xmlns:S=\"http://schemas.xmlsoap.org/soap/envelope/\"><S:Body><ns0:registroPlanResponse xmlns:ns0=\"http://servicios.comelec.ws.sintesis.com.bo/\"><return><codigoError>0</codigoError><descripcionError>Pago registrado</descripcionError><idTransaccion>201905240000010</idTransaccion></return></ns0:registroPlanResponse></S:Body></S:Envelope>" 

  /*soap() {

    // build SOAP reques
    var sr =
      `<?xml version="1.0" encoding="UTF-8"?>
      <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="http://servicios.comelec.ws.sintesis.com.bo/">
      <SOAP-ENV:Body>
          <ns1:registroPlan>
          <datos>
              <categoriaProducto>3</categoriaProducto>
              <codigoComprador>231</codigoComprador>
              <codigoRecaudacion>JA20160603232902</codigoRecaudacion>
              <correoElectronico>hegaro@hegaro.com.bo</correoElectronico>
              <descripcionRecaudacion>PAGO Prueba</descripcionRecaudacion>
              <documentoIdentidadComprador/>
              <fecha>20190522</fecha>
              <fechaVencimiento>0</fechaVencimiento>
              <hora>114000</hora>
              <horaVencimiento>0</horaVencimiento>
              <moneda>BS</moneda>
              <nombreComprador>herlan garzon rodriguez</nombreComprador>
              <planillas>
              <descripcion>Pago de prueba</descripcion>
              <montoCreditoFiscal></montoCreditoFiscal>
              <montoPago></montoPago>
              <nitFactura></nitFactura>
              <nombreFactura></nombreFactura>
              <numeroPago>1</numeroPago>
              </planillas>
              <precedenciaCobro>N</precedenciaCobro>
              <transaccion>A</transaccion>
          </datos>
          <cuenta>wshegaro</cuenta>
          <password>Wshegaro2019</password>
          </ns1:registroPlan>
      </SOAP-ENV:Body>
      </SOAP-ENV:Envelope>`


    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', ' application/soap+xml; charset=utf-8');

    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Methods', 'POST');
    headers = headers.append("Accept", " application/soap+xml")

    console.log(headers.get('Content-Type'))
    this.http.post("http://test.sintesis.com.bo/WSApp-war/ComelecWS?WSDL", sr, { headers: headers })
      .subscribe(data => {
        console.log(data)
      })

  }*/
}
