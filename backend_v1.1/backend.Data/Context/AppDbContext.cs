using backend.Models.DataBase;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Context
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<Interview> Interviews { get; set; }
        public DbSet<ApplicationHistory> ApplicationHistory { get; set; }
        public DbSet<Offer> Offers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Job -> User
            modelBuilder.Entity<Job>()
                .HasOne(j => j.Creator)
                .WithMany(u => u.JobsCreated)
                .HasForeignKey(j => j.CreatedBy);

            // Application -> Job
            modelBuilder.Entity<JobApplication>()
                .HasOne(a => a.Job)
                .WithMany(j => j.jobApplications)
                .HasForeignKey(a => a.JobId);

            // Application -> Candidate
            modelBuilder.Entity<JobApplication>()
                .HasOne(a => a.Candidate)
                .WithMany(c => c.jobApplications)
                .HasForeignKey(a => a.CandidateId);

            // Interview -> Candidate
            modelBuilder.Entity<Interview>()
                .HasOne(i => i.Candidate)
                .WithMany(c => c.Interviews)
                .HasForeignKey(i => i.CandidateId);

            // Interview -> User (Interviewer)
            modelBuilder.Entity<Interview>()
                .HasOne(i => i.Interviewer)
                .WithMany(u => u.InterviewsConducted)
                .HasForeignKey(i => i.InterviewerId);

            modelBuilder.Entity<ApplicationHistory>()
                .HasOne(h => h.jobApplication)
                .WithMany(a => a.ApplicationHistory)
                .HasForeignKey(h => h.ApplicationId);

            // Offer -> Candidate
            modelBuilder.Entity<Offer>()
                .HasOne(o => o.Candidate)
                .WithMany(c => c.Offers)
                .HasForeignKey(o => o.CandidateId);


            modelBuilder.Entity<Offer>()
                .Property(o => o.Salary)
                .HasPrecision(18, 2);
        }
    }
}
