import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
import { LoginPage } from '../../pages/login/login';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  templateUrl: 'build/pages/register/register.html'
})
export class RegisterPage {
  register: any = {};
  submitted = false;
  public nrp: any = '';
  
  constructor(private http: Http, private alertController: AlertController, public navCtrl: NavController, private tracker: LocationTracker) 
  {

  }
  
  gologin()
  {
	this.navCtrl.push(LoginPage);
  }
  
  showAlert() {
    let alert = this.alertController.create({
      title: 'Perhatian',
      subTitle: 'Registrasi Gagal, coba nomor yang lain atau cek koneksi internet',
      buttons: ['OK']
    });
    alert.present();
  }
  
  getRegister()
  {
	let url= this.tracker.url + "Users";
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	let postBodyLogin: any = {
	  "realm": "polisi110",
	  "username": this.register.nrp,
	  "password": this.register.password,
	  "credentials": {},
	  "challenges": {},
	  "email": this.register.nrp + "@polri.go.id",
	  "emailVerified": true,
	  "status": "active",
	  "created": new Date().toJSON(),
	  "lastUpdated": new Date().toJSON()
	};
	this.http.post(url, postBodyLogin, options)
			.subscribe(() => 
			{
				this.navCtrl.setRoot(LoginPage);
			},
			error => 
			{
				this.handleError(error);
			});
  }
  
  handleError(error) {
        console.error(error);
		this.showAlert();
  }


}
