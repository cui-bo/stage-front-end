import {Component} from '@angular/core';
import {AppService} from "./app.service";
import {catchError, of, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private appService: AppService
  ) {
  }

  download() {
    this.appService.getPdf()
      .pipe(
        catchError(err => {
          console.error(`err`, err);
          return of(null);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response: any) => {
          if (response) {
            const blob = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
          }
        },
        error: err => {
        },
        complete: () => {
        }
      });
  }

}
