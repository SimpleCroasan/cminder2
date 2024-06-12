import { Routes } from '@angular/router';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { NotaComponent } from './nota/nota.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { RecordatorioComponent } from './recordatorio/recordatorio.component';

export const routes: Routes = [

    {path: 'asignaturas', component: AsignaturasComponent
    
    },

    {path: '', component: InicioComponent

    },
    
    {path: 'notas/:id', component: NotaComponent

    },
    {path: 'menu', component: MenuComponent

    },
    
    {path: 'recordatorio/:id', component: RecordatorioComponent

    },



];
