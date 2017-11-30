import { NgModule } from "@angular/core";

import {
	MatButtonModule,
	MatMenuModule,
	MatToolbarModule,
	MatIconModule,
	MatCardModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatSidenavModule,
	MatFormFieldModule,
	MatInputModule,
	MatProgressSpinnerModule,
	MatListModule,
	MatDialogModule
} from "@angular/material";

@NgModule({
	imports: [
		MatButtonModule,
		MatMenuModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSidenavModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatListModule,
		MatDialogModule
	],
	exports: [
		MatButtonModule,
		MatMenuModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSidenavModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatListModule,
		MatDialogModule
	]
})
export class MaterialModule {}
