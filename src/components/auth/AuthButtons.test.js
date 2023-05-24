import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CreateServer from "../../test/server";
import AuthButtons from "./AuthButtons";
import { SWRConfig } from "swr";

async function renderComponent() {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );

  await screen.findAllByRole("link");
}

describe("when user is not signed in", () => {
  CreateServer([
    {
      path: "/api/user",
      res: () => {
        return {
          user: null,
        };
      },
    },
  ]);

  test("sign in and sign up are visiable", async () => {
    await renderComponent();
    const signIn = screen.getByRole("link", { name: /sign in/i });
    const signUp = screen.getByRole("link", { name: /sign up/i });

    expect(signIn).toBeInTheDocument();
    expect(signIn).toHaveAttribute("href", "/signin");
    expect(signUp).toBeInTheDocument();
    expect(signUp).toHaveAttribute("href", "/signup");
  });
  test("sign out is not visiable", async () => {
    await renderComponent();

    const signOut = screen.queryByRole("link", { name: /sign out/i });
    expect(signOut).toEqual(null);
  });
});

describe("when user is signed in", () => {
  CreateServer([
    {
      path: "/api/user",
      res: () => {
        return {
          user: { id: 1, email: "adasd@fgsd.com" },
        };
      },
    },
  ]);

  test("sign in and sign up are not visiable", async () => {
    await renderComponent();
    const signIn = screen.queryByRole("link", { name: /sign in/i });
    const signUp = screen.queryByRole("link", { name: /sign up/i });

    expect(signIn).not.toBeInTheDocument();
    expect(signUp).not.toBeInTheDocument();
  });
  test("sign out is visiable", async () => {
    await renderComponent();
    const signOut = screen.getByRole("link", { name: /sign out/i });

    expect(signOut).toBeInTheDocument();
    expect(signOut).toHaveAttribute("href", "/signout");
  });
});
//how to debug test
// test.only describe.only
//package.json  'test:debug': 'react-scripts --inspect-brk test --runInBand --no-cache'
//debugger
//npm run test:debug
//url : about:inspect
