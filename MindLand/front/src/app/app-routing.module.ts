import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlayerComponent } from './player/player.component';
import { RegisterComponent } from './register/register.component';
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
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { StatisticsGlobalComponent } from './statistics-global/statistics-global.component';
import { StatisticsSlovotekaComponent } from './statistics-slovoteka/statistics-slovoteka.component';
import { StatisticsMojBrojComponent } from './statistics-moj-broj/statistics-moj-broj.component';
import { StatisticsSkockoComponent } from './statistics-skocko/statistics-skocko.component';
import { StatisticsKorpaComponent } from './statistics-korpa/statistics-korpa.component';
import { StatisticsKoZnaZnaComponent } from './statistics-ko-zna-zna/statistics-ko-zna-zna.component';
import { StatisticsAsocijacijeComponent } from './statistics-asocijacije/statistics-asocijacije.component';
import { ZaboravljenaLozinkaComponent } from './zaboravljena-lozinka/zaboravljena-lozinka.component';
import { PromenaZaboravljeneLozinkeComponent } from './promena-zaboravljene-lozinke/promena-zaboravljene-lozinke.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { AdminDodajAsocijacijuComponent } from './admin-dodaj-asocijaciju/admin-dodaj-asocijaciju.component';
import { AdminDodajPitanjeComponent } from './admin-dodaj-pitanje/admin-dodaj-pitanje.component';
import { FinishGameComponent } from './finish-game/finish-game.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'player', component: PlayerComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'exercise', component: ExerciseMenuComponent},
  {path: 'my-number', component: MyNumberComponent},
  {path: 'skocko', component: SkockoComponent},
  {path: 'korpa', component: KorpaComponent},
  {path: 'pentiks', component: PentiksComponent},
  {path: 'slovoteka', component: SlovotekaComponent},
  {path: 'pitanja', component: KoZnaZnaComponent},
  {path: 'asocijacije', component: AsocijacijeComponent},
  {path: 'start-game', component: StartGameComponent},
  {path: 'finish-game', component: FinishGameComponent},
  {path: 'asocijacije-multi', component: AsocijacijeMultiComponent},
  {path: 'skocko-multi', component: SkockoMultiComponent},
  {path: 'moj-broj-multi', component: MojBrojMultiComponent},
  {path: 'korpa-multi', component: KorpaMultiComponent},
  {path: 'pitanja-multi', component: KoZnaZnaMultiComponent},
  {path: 'slovoteka-multi', component: SlovotekaMultiComponent},
  {path: 'rang-lista', component: LeaderboardComponent},
  {path: 'stats-global', component: StatisticsGlobalComponent},
  {path: 'stats-slovoteka', component: StatisticsSlovotekaComponent},
  {path: 'stats-moj-broj', component: StatisticsMojBrojComponent},
  {path: 'stats-skocko', component: StatisticsSkockoComponent},
  {path: 'stats-korpa', component: StatisticsKorpaComponent},
  {path: 'stats-ko-zna-zna', component: StatisticsKoZnaZnaComponent},
  {path: 'stats-asocijacije', component: StatisticsAsocijacijeComponent},
  {path:'zaboravljena-lozinka', component: ZaboravljenaLozinkaComponent},
  {path:'promena_zaboravljene_lozinke/:reset_token', component: PromenaZaboravljeneLozinkeComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'admin-homepage', component: AdminHomepageComponent},
  {path: 'admin-asocijacije', component: AdminDodajAsocijacijuComponent},
  {path: 'admin-pitanja', component: AdminDodajPitanjeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
