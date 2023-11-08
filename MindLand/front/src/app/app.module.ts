import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlayerComponent } from './player/player.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { MyNumberComponent } from './my-number/my-number.component';
import { SkockoComponent } from './skocko/skocko.component';
import { ExerciseMenuComponent } from './exercise-menu/exercise-menu.component';
import { KorpaComponent } from './korpa/korpa.component';
import { PentiksComponent } from './pentiks/pentiks.component';
import { SlovotekaComponent } from './slovoteka/slovoteka.component';
import { KoZnaZnaComponent } from './ko-zna-zna/ko-zna-zna.component';
import { AsocijacijeComponent } from './asocijacije/asocijacije.component';
import { AsocijacijeMultiComponent } from './asocijacije-multi/asocijacije-multi.component';
import { SkockoMultiComponent } from './skocko-multi/skocko-multi.component';
import { MojBrojMultiComponent } from './moj-broj-multi/moj-broj-multi.component';
import { StartGameComponent } from './start-game/start-game.component';
import { KorpaMultiComponent } from './korpa-multi/korpa-multi.component';
import { KoZnaZnaMultiComponent } from './ko-zna-zna-multi/ko-zna-zna-multi.component';
import { SlovotekaMultiComponent } from './slovoteka-multi/slovoteka-multi.component';
import { FinishGameComponent } from './finish-game/finish-game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { StatisticsGlobalComponent } from './statistics-global/statistics-global.component';
import { StatisticsSlovotekaComponent } from './statistics-slovoteka/statistics-slovoteka.component';
import { StatisticsMojBrojComponent } from './statistics-moj-broj/statistics-moj-broj.component';
import { StatisticsSkockoComponent } from './statistics-skocko/statistics-skocko.component';
import { StatisticsKorpaComponent } from './statistics-korpa/statistics-korpa.component';
import { StatisticsAsocijacijeComponent } from './statistics-asocijacije/statistics-asocijacije.component';
import { StatisticsKoZnaZnaComponent } from './statistics-ko-zna-zna/statistics-ko-zna-zna.component';
import { ZaboravljenaLozinkaComponent } from './zaboravljena-lozinka/zaboravljena-lozinka.component';
import { PromenaZaboravljeneLozinkeComponent } from './promena-zaboravljene-lozinke/promena-zaboravljene-lozinke.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { AdminDodajAsocijacijuComponent } from './admin-dodaj-asocijaciju/admin-dodaj-asocijaciju.component';
import { AdminDodajPitanjeComponent } from './admin-dodaj-pitanje/admin-dodaj-pitanje.component';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PlayerComponent,
    HomepageComponent,
    MyNumberComponent,
    SkockoComponent,
    ExerciseMenuComponent,
    KorpaComponent,
    PentiksComponent,
    SlovotekaComponent,
    KoZnaZnaComponent,
    AsocijacijeComponent,
    AsocijacijeMultiComponent,
    SkockoMultiComponent,
    MojBrojMultiComponent,
    StartGameComponent,
    KorpaMultiComponent,
    KoZnaZnaMultiComponent,
    SlovotekaMultiComponent,
    FinishGameComponent,
    LeaderboardComponent,
    StatisticsGlobalComponent,
    StatisticsSlovotekaComponent,
    StatisticsMojBrojComponent,
    StatisticsSkockoComponent,
    StatisticsKorpaComponent,
    StatisticsAsocijacijeComponent,
    StatisticsKoZnaZnaComponent,
    ZaboravljenaLozinkaComponent,
    PromenaZaboravljeneLozinkeComponent,
    AdminLoginComponent,
    AdminHomepageComponent,
    AdminDodajAsocijacijuComponent,
    AdminDodajPitanjeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
