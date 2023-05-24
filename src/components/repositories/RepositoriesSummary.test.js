import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("display all the information", () => {
  const mockRepo = {
    stargazers_count: 123,
    open_issues: 2,
    forks: 34,
    language: "JaveScript",
  };
  render(<RepositoriesSummary repository={mockRepo} />);

  for (let key in mockRepo) {
    const value = mockRepo[key];
    const infoField = screen.getByText(new RegExp(value, "y"));
    expect(infoField).toBeInTheDocument();
  }
});
