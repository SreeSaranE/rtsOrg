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
        public DbSet<Application> Applications { get; set; }
        public DbSet<Interview> Interviews { get; set; }
        public DbSet<History> History { get; set; }
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
            modelBuilder.Entity<Application>()
                .HasOne(a => a.Job)
                .WithMany(j => j.Applications)
                .HasForeignKey(a => a.JobId);

            // Application -> Candidate
            modelBuilder.Entity<Application>()
                .HasOne(a => a.Candidate)
                .WithMany(c => c.Applications)
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

            // History -> Candidate
            modelBuilder.Entity<History>()
                .HasOne(h => h.Candidate)
                .WithMany(c => c.Histories)
                .HasForeignKey(h => h.CandidateId);

            // Offer -> Candidate
            modelBuilder.Entity<Offer>()
                .HasOne(o => o.Candidate)
                .WithMany(c => c.Offers)
                .HasForeignKey(o => o.CandidateId);
        }
    }
}
