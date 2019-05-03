import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Project } from 'src/app/models/project';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public savedProject: string;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private projectService: ProjectService,
    private uploadService: UploadService,
    private router: Router,
    private route: ActivatedRoute
  )
  {
    this.url = Global.url;
    this.title = 'Editar Proyecto';
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

  onSubmit() {
    this.projectService.updateProject(this.project).subscribe(
      response => {
        if (response.project) {

          // Subir imagen
          if (this.filesToUpload) {
            this.uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
            .then((result: any) => {
              this.savedProject = result.project;
              this.status = 'success';
            });
          } else {
            this.savedProject = response.project;
            this.status = 'success';
          }

        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files as Array<File>;
  }
}
