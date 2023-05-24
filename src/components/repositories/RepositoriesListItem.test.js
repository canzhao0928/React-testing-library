import { render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router-dom";

//using mock module to replace FileIcon to avoid act() warning
// jest.mock("../tree/FileIcon", () => {
//   return () => {
//     return "FileIcon component";
//   };
// });

function renderComponent() {
  const mockRepo = {
    full_name: "Can/react",
    language: "JavaScript",
    description: "a react repo",
    owner: {
      login: "Can",
    },
    name: "react",
    html_url: "https://github.com/canzhao0928/React-testing-library",
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={mockRepo} />
    </MemoryRouter>
  );
  return { mockRepo };
}

test("display link to git repo", async () => {
  const { mockRepo } = renderComponent();
  //the best way to deal with act warning is to use findBy
  await screen.findByRole("img", { name: mockRepo.language });

  const linkField = screen.getByRole("link", {
    name: /git repo/i,
  });
  expect(linkField).toHaveAttribute("href", mockRepo.html_url);
});

test("fileicon shows properly", async () => {
  const { mockRepo } = renderComponent();
  const icon = await screen.findByRole("img", { name: mockRepo.language });
  //show the whole html rendered
  // screen.debug();
  expect(icon).toHaveClass("js-icon");
});

test("shows a link to the code editor page", async () => {
  const { mockRepo } = renderComponent();
  await screen.findByRole("img", { name: mockRepo.language });

  const link = screen.getByRole("link", {
    name: new RegExp(mockRepo.owner.login),
  });

  expect(link).toHaveAttribute("href", `/repositories/${mockRepo.full_name}`);
});
