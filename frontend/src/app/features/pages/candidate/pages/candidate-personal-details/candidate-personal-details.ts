import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CandidateService } from '../../../../services/candidate/candidate-service';
import { candidateData } from '../../../../services/candidate/models/candidateData';
import { TokenService } from '../../../../../core/services/token/token-service';

@Component({
  selector: 'app-candidate-personal-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './candidate-personal-details.html',
  styleUrl: './candidate-personal-details.css',
})
export class CandidatePersonalDetails implements OnInit {

  constructor(private tokenService: TokenService){}
  private fb = inject(FormBuilder);
  private candidateService = inject(CandidateService);

  candidateId = '';

  form = this.fb.group({
    phone: ['', Validators.required],
    resume: [''],
    dateOdBirth: [''],
    skills: [''],
    summary: [''],
    education: [''],
    location: ['']
  });

  ngOnInit(): void {

    // Replace with logged in candidate id
    this.candidateId = this.tokenService.getUserId() ?? '';

    this.loadCandidate();
  }

  loadCandidate() {
    this.candidateService.getProfile(this.candidateId).subscribe({
      next: (candidate) => {

        this.form.patchValue({
          phone: candidate.phone,
          resume: candidate.resume,
          dateOdBirth: candidate.dateOdBirth,
          skills: candidate.skills,
          summary: candidate.summary,
          education: candidate.education,
          location: candidate.location
        });

      }
    });
  }

  updateCandidate() {

    if (this.form.invalid) return;

    const values = this.form.getRawValue();

    const body: candidateData = {
      candidateId: this.candidateId,
      phone: values.phone?.trim() || null,
      resume: values.resume?.trim() || null,
      dateOdBirth: values.dateOdBirth || null,
      skills: values.skills?.trim() || null,
      summary: values.summary?.trim() || null,
      education: values.education?.trim() || null,
      location: values.location?.trim() || null
    };

    this.candidateService.updateProfile(body).subscribe({
      next: () => {
        alert('Profile updated successfully.');
      },
      error: () => {
        alert('Failed to update.');
      }
    });
  }

}
