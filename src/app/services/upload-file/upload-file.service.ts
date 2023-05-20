import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private _httpClient: HttpClient) {}

  upload(files: File[]): Observable<string[]> {
    return new Observable((subscriber) => {
      this._convertFiles(files)
        .then(converted => {
          const subscription = this._httpClient.post<string[]>(environment.uploadFileApi, {
            files: converted
          }).subscribe(result => {
            subscriber.next(result);
            subscription.unsubscribe();
          })
        })
    })
  }


  private async _convertFiles(files: File[]): Promise<string[]>{
    const convertedFiles: string[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const base64 = await this._convertBase64(file);
      convertedFiles.push(base64)
    }

    return convertedFiles
  }

  private _convertBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result as string);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
  }
}
