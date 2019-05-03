import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [ProjectService]
})
export class DetailsComponent implements OnInit {
  public url: string;
  public project: Project;
  public confirm: boolean;
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.url = Global.url;
    this.confirm = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.getProject(id);
    });
  }

  getProject(id) {
    this.projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error => {
        console.log(error as any);
      });
  }

  setConfirm(confirm) {
    this.confirm = confirm;
  }

  deleteProject(id) {
    this.projectService.deleteProject(id).subscribe(
      response => {
        if (response.project) {
          this.router.navigate(['/proyectos']);
        }
      },
      error => {
        console.log(error as any);
      });
  }

}
