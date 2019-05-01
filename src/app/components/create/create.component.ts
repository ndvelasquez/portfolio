import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Project } from 'src/app/models/project';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;

  constructor(
    private projectService: ProjectService,
    private uploadService: UploadService
    ) {
    this.title = 'Crear Proyecto';
    this.project = new Project('', '', '', '', 2019, '', '');
   }

  ngOnInit() {
  }

  onSubmit(form) {
    // Guardar datos
    this.projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project) {

          // Subir imagen
          this.uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
          .then((result: any) => {
            this.status = 'success';
            form.reset();
          });

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
