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
	MatDialogModule,
	MatSelectModule
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
		MatDialogModule,
		MatSelectModule
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
		MatDialogModule,
		MatSelectModule
	]
})
export class MaterialModule {}
