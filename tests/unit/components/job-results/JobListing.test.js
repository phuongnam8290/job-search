import { render, screen } from "@testing-library/vue";
import JobListing from "@/components/job-results/JobListing.vue";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "AirBnB",
    locations: ["New York"],
    minimumQualifications: ["Code"],
    ...jobProps,
  });

  const renderJobListing = (jobProps) => {
    render(JobListing, {
      props: {
        job: {
          ...createJobProps(jobProps),
        },
      },
    });
  };

  it("renders job title", () => {
    renderJobListing({ title: "Vue Programmer" });
    expect(screen.getByText("Vue Programmer")).toBeInTheDocument();
  });

  it("renders job organization", () => {
    renderJobListing({ organization: "Google" });
    expect(screen.getByText("Google")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    renderJobListing({ locations: ["Orlando", "Jacksonville"] });
    expect(screen.getByText("Orlando")).toBeInTheDocument();
    expect(screen.getByText("Jacksonville")).toBeInTheDocument();
  });

  it("renders job qualification", () => {
    renderJobListing({ minimumQualifications: ["Code", "Developer"] });
    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
  });
});
