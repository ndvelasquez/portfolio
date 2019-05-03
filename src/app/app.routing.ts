import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { ErrorComponent } from './components/error/error.component';

const appRoutes: Routes = [
    { path: '', component: AboutComponent },
    { path: 'sobre-mi', component: AboutComponent },
    { path: 'proyectos', component: ProjectsComponent },
    { path: 'crear-proyectos', component: CreateComponent },
    { path: 'contacto', component: ContactComponent },
    { path: 'proyecto/:id', component: DetailsComponent },
    { path: 'editar-proyecto/:id', component: EditComponent },
    { path: '**', component: ErrorComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);