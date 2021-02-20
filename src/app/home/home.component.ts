
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Nation } from '../model/nation';
import { HomeServiceService } from './home-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({opacity: 1}))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit,OnDestroy
{
    showImage = false;
    nations: Nation[] = [];
    hilitedName = '...';
    nation: Nation ={
      name: "",
      nativeName: "",
      alpha2Code: "",
      alpha3Code: "",
      capital: "",
      flag: "",
      latitude: 0,
      longitude: 0,
      latlng: []
    }

    constructor(
        private service:HomeServiceService,
        private changeDetectorRef:ChangeDetectorRef,
        private router: Router,
        private routeParams: ActivatedRoute ) {}

    ngOnInit(): void {
        this.service.getData()
            .pipe()
            .subscribe( (nations:Nation[]) => {
                this.nations = nations ? nations : [];
                const id = this.routeParams.snapshot.params['id'];
                this.nation = this.nations.find(x=> x.alpha3Code === id) ?? this.nation;
                this.showImage =  this.nation.alpha3Code !== "";
                this.setLatLong();
                this.changeDetectorRef.detectChanges();
            } );
    }

    hilite( nation:Nation ) {
        this.hilitedName = nation.name;
        this.changeDetectorRef.detectChanges();
    }

    changeCountry(nation:Nation) {
      this.showImage = false;
      this.nation = nation;
      this.setLatLong();
      this.router.navigate(['home', nation.alpha3Code]);
      setTimeout(()=>{                           //<<<---using ()=> syntax
        this.showImage = true;
      }, 20);

      this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy(): void {
    }

    setLatLong() {
      if(this.nation.latlng?.length > 0) {
        this.nation.latitude = this.nation.latlng[0];
        this.nation.longitude = this.nation.latlng[1];
      }
    }
}
